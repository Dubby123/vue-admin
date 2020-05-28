import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../views/layout/index.vue'
Vue.use(VueRouter)

 export const defaultRouterMap = [
  {
    path: '/',
    redirect:'login',
    hidden:true
  },
  {
    path: '/login',
    name:'登录',
    hidden:true,
    component: () => import( '../views/Login/Index.vue')
  },
  {
    path: '/console',
    redirect:'index',
    name: '控制台',
    component: layout,
    children:[{
      path: '/index',
      name: '首页',
      component: () => import( '../views/Console/Index'),
    }]
  },

]
export const  asynRouterMap = [
  {
    path: '/info',
    component: layout,
    mate:{
      role:['sale','manager'],
      system:'infoSystem',
      name: "用户管理",
      icon: 'user'
    },
    children:[
      {
        path: '/infoIndex',
        name:'信息类表',
        component: () => import( '../views/Info/Index'),
      },
      {
        path: '/infoCategory',
        name:'信息分类',
        component: () => import( '../views/Info/Category'),
      },
      {
        path: '/InfoDetail',
        name:'信息详情',
        hidden:true,
        component: () => import( '../views/Info/Detailed'),
      }
    ]
  },
  {
    path: '/user',
    name:'用户管理',
    mate:{
      role:['sale'],
      system:'userSystem',
      name: "用户管理",
      icon: 'user'
    },
    component: layout,
    children:[
      {
        path: '/userIndex',
        name:'用户列表',
        component: () => import( '../views/User/Index'),
      },
    ]
  }
]

const createRouter = () => new VueRouter ({
  mode: 'history',
  scrollBehavior () {
    return { x:0,y:0}
  },
  routes: defaultRouterMap
})

const  router = createRouter()

/*
* 重置路由，相当于重新写个路由
* **/
// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher
// }
export  default router

