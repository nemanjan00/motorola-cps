/**
 * Cross-platform XML parsing.
 * Uses DOMParser in browser, falls back to a minimal parser for Node.js.
 */

/**
 * Parse XML string to a DOM Document.
 * @param {string} xml
 * @returns {Document}
 */
export function parseXml(xml) {
  if (typeof globalThis.DOMParser !== 'undefined') {
    return new globalThis.DOMParser().parseFromString(xml, 'text/xml');
  }
  // Node.js fallback — use the minimal SAX-like parser
  return miniParse(xml);
}

/**
 * Serialize a DOM Document back to XML string.
 * @param {Document} doc
 * @returns {string}
 */
export function serializeXml(doc) {
  if (typeof globalThis.XMLSerializer !== 'undefined') {
    return new globalThis.XMLSerializer().serializeToString(doc);
  }
  // Node.js fallback
  return miniSerialize(doc.documentElement || doc);
}

// --- Minimal XML parser for Node.js (no dependencies) ---
// Handles the simple CPS XML: elements, attributes, text content, DOCTYPE, PI.
// No CDATA, no namespaces, no entities beyond &amp; &lt; &gt; &quot; &apos;

/**
 * @param {string} xml
 * @returns {Document}
 */
function miniParse(xml) {
  const doc = { nodeType: 9, childNodes: [], documentElement: null };
  const stack = [doc];
  let pos = 0;

  function current() { return stack[stack.length - 1]; }

  function unescapeXml(s) {
    return s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"').replace(/&apos;/g, "'");
  }

  while (pos < xml.length) {
    const ltIdx = xml.indexOf('<', pos);
    if (ltIdx === -1) break;

    // Text before tag
    if (ltIdx > pos) {
      const text = xml.slice(pos, ltIdx).trim();
      if (text) {
        current().childNodes.push({ nodeType: 3, textContent: unescapeXml(text), parentNode: current() });
      }
    }

    // Skip processing instructions, DOCTYPE, comments
    if (xml.startsWith('<?', ltIdx)) {
      pos = xml.indexOf('?>', ltIdx) + 2;
      continue;
    }
    if (xml.startsWith('<!', ltIdx)) {
      pos = xml.indexOf('>', ltIdx) + 1;
      continue;
    }

    // Closing tag
    if (xml[ltIdx + 1] === '/') {
      const gtIdx = xml.indexOf('>', ltIdx);
      stack.pop();
      pos = gtIdx + 1;
      continue;
    }

    // Opening tag
    const gtIdx = xml.indexOf('>', ltIdx);
    const tagContent = xml.slice(ltIdx + 1, gtIdx);
    const selfClosing = tagContent.endsWith('/');
    const raw = selfClosing ? tagContent.slice(0, -1).trim() : tagContent.trim();

    // Parse tag name and attributes
    const spaceIdx = raw.indexOf(' ');
    const tagName = spaceIdx === -1 ? raw : raw.slice(0, spaceIdx);
    const attrStr = spaceIdx === -1 ? '' : raw.slice(spaceIdx + 1);

    const el = {
      nodeType: 1,
      tagName,
      nodeName: tagName,
      attributes: {},
      childNodes: [],
      parentNode: current(),
      textContent: '',
      getAttribute(name) { return this.attributes[name] ?? null; },
      getElementsByTagName(name) {
        const results = [];
        function walk(node) {
          for (const child of (node.childNodes || [])) {
            if (child.nodeType === 1) {
              if (child.tagName === name || name === '*') results.push(child);
              walk(child);
            }
          }
        }
        walk(this);
        return results;
      },
    };

    // Parse attributes
    const attrRe = /(\w+)\s*=\s*"([^"]*)"/g;
    let m;
    while ((m = attrRe.exec(attrStr)) !== null) {
      el.attributes[m[1]] = unescapeXml(m[2]);
    }

    current().childNodes.push(el);
    if (!doc.documentElement && el.nodeType === 1) doc.documentElement = el;

    if (!selfClosing) {
      stack.push(el);
    }
    pos = gtIdx + 1;
  }

  // Compute textContent for all elements
  function computeText(node) {
    if (node.nodeType === 3) return node.textContent;
    let text = '';
    for (const child of (node.childNodes || [])) {
      text += computeText(child);
    }
    if (node.nodeType === 1) node.textContent = text;
    return text;
  }
  computeText(doc);

  return doc;
}

/**
 * @param {object} node
 * @param {number} [indent=0]
 * @returns {string}
 */
function miniSerialize(node, indent = 0) {
  if (!node) return '';
  if (node.nodeType === 3) return escapeXml(node.textContent);
  if (node.nodeType === 9) {
    return node.documentElement ? miniSerialize(node.documentElement) : '';
  }

  const tag = node.tagName;
  const attrs = Object.entries(node.attributes || {})
    .map(([k, v]) => ` ${k}="${escapeXml(v)}"`)
    .join('');

  const children = (node.childNodes || []);
  const hasElementChildren = children.some(c => c.nodeType === 1);

  if (children.length === 0) {
    return `<${tag}${attrs}/>`;
  }

  if (!hasElementChildren) {
    // Text-only element
    const text = children.map(c => c.nodeType === 3 ? escapeXml(c.textContent) : '').join('');
    return `<${tag}${attrs}>${text}</${tag}>`;
  }

  const tabs = '\t'.repeat(indent);
  let xml = `${tabs}<${tag}${attrs}>\n`;
  for (const child of children) {
    if (child.nodeType === 1) {
      xml += '\t' + miniSerialize(child, indent + 1) + '\n';
    }
  }
  xml += `${tabs}</${tag}>`;
  return xml;
}

function escapeXml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
