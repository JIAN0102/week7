import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/fronted/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/fronted/Login.vue'),
  },
  {
    path: '/admin',
    name: '後台 Admin',
    component: () => import('../views/backend/layout/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: '後台產品列表',
        component: () => import('../views/backend/Products.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
