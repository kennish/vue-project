// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'

import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)

import Utils from './lib/utils'
Vue.use(Utils)

import Ajax from './lib/ajax'
Vue.use(Ajax)

import axios from './http'
// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.axios = axios

// import Sys from './settings/sys'
// Vue.use(Sys)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
