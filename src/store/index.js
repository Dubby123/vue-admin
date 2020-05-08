import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import login from './modules/login'
import category from './modules/category'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    login,
    category
  }
})
