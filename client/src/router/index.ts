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
      path: '/meals',
      name: 'meals',
      component: () => import('../views/Meals.vue'),
      beforeEnter: secureRoute
    },
    {
      path: '/log',
      name: 'log',
      component: () => import('../views/Log.vue'),
      beforeEnter: secureRoute
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin.vue'),
      beforeEnter: secureRoute
    },
    {
      path: '/friends',
      name: 'friends',
      component: () => import('../views/Friends.vue'),
      beforeEnter: secureRoute
    },
  ]
})

export default router


function secureRoute (to : RouteLocationNormalized, from : RouteLocationNormalized, next : NavigationGuardNext ) {
  const session = useSession();
  if (session.user) {
      next()
  } else { 
    if(!session.redirectUrl && to.path != '/login') {
      session.redirectUrl = to.fullPath;
    }
  }
}