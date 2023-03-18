import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useSession } from '@/model/session'
import LoginPageVue from '@/views/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPageVue
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: () => import('../views/StatisticsView.vue'),
      beforeEnter: secureRoute
    }
  ]
})

export default router


function secureRoute (to : RouteLocationNormalized, from : RouteLocationNormalized, next : NavigationGuardNext ) {
  const session = useSession();
  if (session.user) {
      next()
  } else { 
      next('/login')
  }
}