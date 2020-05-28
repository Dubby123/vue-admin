import  { defaultRouterMap , asynRouterMap  } from '@/router/index'
import { GetRole } from '@/api/user'

function hasPermission(roles,route) {
  //roles :角色列表
  //route : 单个的路由
  const curRoles = roles.map(item => item.role)
  if(route.mate && route.mate.role){
    return   curRoles.some(item=>route.mate.role.includes(item))
  }else {
    return true
  }

}
 function filterAsyncRouter( routes, roles) {
  const res =[]
  routes.forEach(item=> {
    const tem = { ...item}
    if( hasPermission(roles,tem)){
      if(tem.children){
        tem.children = filterAsyncRouter(tem.children,roles)
      }
      res.push(tem)

    }
  })
   return res
}

const state = {
  routes:[],
  addRoutes:[],
  roles:[]
}
const getters = {
  routes: state => state.routes,
  addRoutes:state =>state.addRoutes,
  roles:state=>state.roles
}
const  mutations = {
  SET_ROUTERS(state,value){
    state.addRoutes = value
    state.routes = defaultRouterMap.concat(value)
  },
  SET_ROLES(state,value){
    state.roles = value
  }
}
const  actions ={
  getRoles( { commit }){
    return new Promise((resolve ,reject)=>{
      GetRole().then(res=>{
        let data = res.data.data
        commit('SET_ROLES',data)
        resolve(data)
      }).catch(err=>{
        reject(err)
      })
    })
  },
  handleRoles({ commit } ,roles){

   return  new Promise((resolve ) =>{
      let accessedRouter
      if(roles.some(item=>item.role ==='admin')){
        accessedRouter = asynRouterMap || []
      }else {
        //路由数组和权限数组做匹配
        accessedRouter = filterAsyncRouter(asynRouterMap,roles)
      }
      commit('SET_ROUTERS',accessedRouter)
      resolve(accessedRouter)
    })
  }

}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
