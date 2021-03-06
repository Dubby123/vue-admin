import { Login } from "../../api/login";
import { setToKen,setUserName} from '../../utils/app'
const state = {
  userInfo: '',
  token: ''
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
        resolve(res.data)
        setToKen(res.data.data.token)
        setUserName( res.data.data.username)
        commit('SET_USERINFO', res.data.data.username)
        commit('SET_TOKEN', res.data.data.token)
      }).catch(err => {
        reject(err)
      })
    })
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
