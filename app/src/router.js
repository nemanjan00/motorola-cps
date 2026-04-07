import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'home', component: () => import('./views/HomeView.vue') },
  { path: '/channels', name: 'channels', component: () => import('./views/ChannelsView.vue') },
  { path: '/config', name: 'config', component: () => import('./views/RadioConfigView.vue') },
  { path: '/info', name: 'info', component: () => import('./views/RadioInfoView.vue') },
  { path: '/tuner', name: 'tuner', component: () => import('./views/TunerView.vue') },
  { path: '/raw', name: 'raw', component: () => import('./views/RawBlocksView.vue') },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
