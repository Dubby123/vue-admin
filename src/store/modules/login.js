import { Login } from "../../api/login";

const state = {
  userInfo: sessionStorage.getItem('userInfo') || '',
  token: sessionStorage.getItem('token') || ''
}
const mutations = {
  SET_USERINFO(state, value) {
    state.userInfo = value
  },
  SET_TOKEN(state, value) {
    state.token = value
  }
}
const actions = {
  GET_USERINFO({ commit }, repuestData) {
    return new Promise((resolve, reject) => {
      Login(repuestData).then(res => {
        resolve(res)
        commit('SET_USERINFO', res)
        commit('SET_TOKEN', res.token)
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
