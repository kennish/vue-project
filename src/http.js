/**
 * Created by superman on 17/2/16.
 * http配置
 */

import axios from 'axios'
import router from './router'
import sys from './settings/sys'

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = sys.decoUrl
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

// http request 拦截器
axios.interceptors.request.use(
    config => {
      if (router.app.$local.fetch('innjia').token) { // 判断是否存在token，如果存在的话，则每个http header都加上token  router.app拿到根实例
        config.headers.token = router.app.$local.fetch('innjia').token
      }
      return config
    },
    err => {
      return Promise.reject(err)
    })

// http response 拦截器
axios.interceptors.response.use(
    response => {
      return response
    },
    error => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            // 返回401 清除localstore 里 token信息并跳转到登录页面 router.app拿到根实例
            router.app.$local.save('innjia', null)
            router.replace({
              path: '/login',
              query: {redirect: router.currentRoute.fullPath.slice(1)}
            })
        }
      }
      // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
      return Promise.reject(error.response.data)
    })

export default axios
