/** ajax请求数据 **/
import axios from 'axios'
import apiurl from '@/settings/sys'

let url = apiurl.decoUrl

let ajax = {
  post (options) {
    axios({
      method: 'post',
      url: url + options.url,
      data: options.data
    })
    .then(options.success)
    .catch(options.error)
  },
  get (options) {
    axios({
      method: 'get',
      url: url + options.url,
      data: options.data
    })
    .then(options.success)
    .catch(options.error)
  }
}

export default {
  install: function (vm) {
    vm.prototype.$axios = ajax
  }
}
