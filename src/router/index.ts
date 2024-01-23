import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import introPage from '../pages/intro.vue';
import errorPage from '../pages/error.vue';
import blogApp from '../pages/blog/list/index.vue';
import blogPreview from '../pages/blog/preview/index.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/intro' },
  { path: '/intro', component: introPage },
  { path: '/blog', name: 'blog-list', component: blogApp },
  { path: '/blog/:id', name: 'blog-preview', component: blogPreview },

  { path: '/:catchAll(.*)', component: errorPage,  meta: {
    hideNavbar: true,
   }},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;