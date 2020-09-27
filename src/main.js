import Vue from 'vue'
import App from './app.vue'
import store from './store'
import router from './router'
import Element from 'element-ui'
// import 'babel-polyfill'
Vue.config.productionTip = false

Vue.use(Element,{size:'small',zIndex:3000})

new Vue({
  el:'#app',
  store:store,
  router,
  render: h => h(App)
})
