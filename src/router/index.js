import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('../views/Landing.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/flow',
    name: 'Flow',
    component: () => import('../views/Flow.vue')
  },
  {
    path: '/removed',
    name: 'Removed',
    component: () => import('../views/Removed.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
