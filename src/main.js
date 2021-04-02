import Vue from 'vue'
import App from './app.vue'
import store from './store'
import router from './router'
import Element from 'element-ui'
import VueWorker from 'vue-worker'
import less from 'less'
import *as Sentry from '@sentry/vue'
import { Integrations } from "@sentry/tracing";

// import 'babel-polyfill'
Vue.config.productionTip = false

Vue.use(less)
Vue.use(VueWorker)
Vue.use(Element,{size:'small',zIndex:3000})

// Vue.mixin({
//   created:function(){
//     console.log('top test')
//   }
// })

process.env.NODE_ENV==="production"&&Sentry.init({
  Vue,
  dsn: "https://e658cd8ac21e48268638f794bbd72e47@o495332.ingest.sentry.io/5567885",
  autoSessionTracking: true,
  integrations: [
    new Integrations.BrowserTracing(),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,

  release:'test-sentry',
  logErrors:true
});

new Vue({
  el:'#app',
  store:store,
  router,
  render: h => h(App)
})
