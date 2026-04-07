/**
 * Serial transport abstraction.
 * Provides a unified interface for WebSerial (browser) and Node.js serialport.
 *
 * @typedef {Object} SerialTransport
 * @property {function(Uint8Array): Promise<void>} write - Send bytes
 * @property {function(number, number): Promise<Uint8Array>} read - Read N bytes with timeout ms
 * @property {function(): Promise<void>} flush - Flush buffers
 * @property {function(): Promise<void>} close - Close port
 * @property {boolean} isOpen
 */

/**
 * Create a WebSerial transport (browser).
 * Caller must have already obtained the SerialPort via navigator.serial.requestPort().
 * @param {SerialPort} port - WebSerial port object
 * @param {{baudRate?: number}} [opts]
 * @returns {Promise<SerialTransport>}
 */
export async function createWebSerialTransport(port, opts = {}) {
  const baudRate = opts.baudRate || 9600;
  await port.open({ baudRate, dataBits: 8, parity: 'none', stopBits: 1, flowControl: 'none' });

  const reader = port.readable.getReader();
  const writer = port.writable.getWriter();
  let buffer = new Uint8Array(0);
  let isOpen = true;

  // Background reader that fills buffer
  const readLoop = (async () => {
    try {
      while (isOpen) {
        const { value, done } = await reader.read();
        if (done) break;
        if (value) {
          const newBuf = new Uint8Array(buffer.length + value.length);
          newBuf.set(buffer);
          newBuf.set(value, buffer.length);
          buffer = newBuf;
        }
      }
    } catch (e) {
      if (isOpen) console.error('WebSerial read error:', e);
    }
  })();

  return {
    get isOpen() { return isOpen; },

    async write(data) {
      await writer.write(data);
    },

    async read(count, timeoutMs = 3000) {
      const deadline = Date.now() + timeoutMs;
      while (buffer.length < count) {
        if (Date.now() > deadline) {
          throw new Error(`Read timeout: wanted ${count} bytes, got ${buffer.length}`);
        }
        await new Promise(r => setTimeout(r, 10));
      }
      const result = buffer.slice(0, count);
      buffer = buffer.slice(count);
      return result;
    },

    async flush() {
      buffer = new Uint8Array(0);
    },

    async close() {
      isOpen = false;
      try { reader.releaseLock(); } catch (e) {}
      try { writer.releaseLock(); } catch (e) {}
      await port.close();
    },
  };
}

/**
 * Create a Node.js serialport transport.
 * @param {string} path - Port path (e.g. '/dev/ttyUSB0', 'COM3')
 * @param {{baudRate?: number}} [opts]
 * @returns {Promise<SerialTransport>}
 */
export async function createNodeTransport(path, opts = {}) {
  // Dynamic import hidden from Vite's static analysis via variable
  const mod = 'serialport';
  const { SerialPort } = await import(/* @vite-ignore */ mod);
  const baudRate = opts.baudRate || 9600;

  const port = new SerialPort({ path, baudRate, dataBits: 8, parity: 'none', stopBits: 1, autoOpen: false });
  await new Promise((resolve, reject) => {
    port.open(err => err ? reject(err) : resolve());
  });

  let buffer = Buffer.alloc(0);
  port.on('data', chunk => {
    buffer = Buffer.concat([buffer, chunk]);
  });

  return {
    get isOpen() { return port.isOpen; },

    async write(data) {
      return new Promise((resolve, reject) => {
        port.write(data, err => {
          if (err) reject(err);
          else port.drain(err2 => err2 ? reject(err2) : resolve());
        });
      });
    },

    async read(count, timeoutMs = 3000) {
      const deadline = Date.now() + timeoutMs;
      while (buffer.length < count) {
        if (Date.now() > deadline) {
          throw new Error(`Read timeout: wanted ${count} bytes, got ${buffer.length}`);
        }
        await new Promise(r => setTimeout(r, 5));
      }
      const result = new Uint8Array(buffer.slice(0, count));
      buffer = buffer.slice(count);
      return result;
    },

    async flush() {
      buffer = Buffer.alloc(0);
      return new Promise(resolve => port.flush(resolve));
    },

    async close() {
      return new Promise(resolve => port.close(resolve));
    },
  };
}
