import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../views/layout/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/login',
  },
  {
    path: '/login',
    name:'login',
    component: () => import( '../views/Login/index.vue')
  },
  {
    path: '/console',
    component: layout,
    children:[{
      path: '/index',
      name: 'console',
      component: () => import( '../views/Console/index.vue'),
    }]
  },
  {
    path: '/info',
    component: layout,
    children:[
      {
      path: '/index',
      component: () => import( '../views/Console/index.vue'),
    },
      {
        path: '/category',
        component: () => import( '../views/Console/index.vue'),
      },
      {
        path: '/detail',
        component: () => import( '../views/Console/index.vue'),
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
