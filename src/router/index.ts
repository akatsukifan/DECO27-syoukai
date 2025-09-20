import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/introduction',
      name: 'introduction',
      // route level code-splitting
      // this generates a separate chunk (Introduction.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/IntroductionView.vue'),
    },
  ],
})

export default router