import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import introPage from '../pages/intro.vue';
import errorPage from '../pages/error.vue';
import blogApp from '../pages/blog/list/index.vue';
import blogPreview from '../pages/blog/preview/index.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/intro' },
  { path: '/intro', component: IntroPage },
  { path: '/blog', name: 'blog-list', component: BlogApp },
  { path: '/blog/:id', name: 'blog-preview', component: BlogPreview },
  { path: '/error', name: 'blog-preview', component: ErrorPage, meta: {
    hideNavbar: true,
   }},

  { path: '/:catchAll(.*)', redirect: '/error'},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router