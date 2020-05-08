
import { GetCategoryAll } from '../../api/new'
const state ={
   categoryList:[]
}
const mutations ={
  SET_CATEGORYLIST (state, value){
    state.categoryList = value
  }
}
const actions ={
  GET_CATEGORYLIST({ commit}){
    return new Promise((resolve, reject) => {
      GetCategoryAll().then(res=>{
        resolve(res.data.data)
        commit('SET_CATEGORYLIST',res.data.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
