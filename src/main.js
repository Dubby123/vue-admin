import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import './styles/main.scss'
import './icons/index'
import 'element-ui/lib/theme-chalk/index.css';
import "./router/Permt";
// import "./router/index";
import  global from './utils/global' //全局注册方法


Vue.use(global)
Vue.use(ElementUI);
Vue.config.productionTip = false
 let vue=new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

