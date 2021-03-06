import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../views/layout/index.vue'
import  { getToKen } from "../utils/app";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/login',
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
  {
    path: '/info',
    name:'信息管理',
    component: layout,
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
 const whiteRouter = ['/login']

const router = new VueRouter({
  routes
})
router.beforeEach((to ,from,next)=>{
  if( whiteRouter.indexOf(to.path)!==-1){
    next()
  }else {
    if(!getToKen() ){
      next('/login')
    }else {
      next()
    }
  }
})
export default router
