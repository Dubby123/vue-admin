import router from '@/router/index'
import  store from '@/store/index'
const whiteList=['login']
router.beforeEach((to,from,next)=>{

  if(store.getters.token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('permission/getRoles').then(res => {
          let roles = res.data.role
          store.dispatch('permission/handleRoles', roles).then(res => {
            router.addRoutes(store.getters.addRoutes())
            next({ ...to, replace: true })
          })
        })
      } else {
        next()
      }
    }
  }else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }

})
