
import router from './index'
import  store from '@/store/index'
const whiteRouter = ['/login']; // indexOf方法，判断数组中是否存在指定的某个对象，如果不存在，则返回-1
router.beforeEach((to,from,next)=>{
  if(store.getters['login/token']){
    if(to.path === '/login'){
      next()
    }else{
          if (store.getters['permission/roles'].length === 0) {
            store.dispatch('permission/getRoles').then(res => {
              let roles = res
              store.dispatch('permission/handleRoles',roles).then(res => {
                console.log('12313',store.getters['permission/addRoutes'])
                router.addRoutes(store.getters['permission/addRoutes'])
                console.log('router',router)
                next({ ...to, replace: true })
              })
            })
          } else {
            next()
          }
    }
  }else{
    if(whiteRouter.indexOf(to.path)!== -1){
      next()
    }else {
      next('/login')
    }

   }
})
