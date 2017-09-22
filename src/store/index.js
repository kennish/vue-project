import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

Vue.use(Vuex)

let login = {
  state: {
    userName: '覃东'
  }
}

let home = {
  state: {
    userName: '覃西'
  },
  mutations: {
    change (context) {
      context.userName = '123'
    }
  }
}

let store = new Vuex.Store({
  modules: {
    login,
    home
  }
})

export default store
