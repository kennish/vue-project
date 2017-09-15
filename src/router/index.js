import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/home'
// import Home from '@/components/Hello'
import Login from '@/views/logn/lognIn'
import Layout from '@/views/layout/layout'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录页'
      }
    },
    {
      path: '/innjia',
      name: 'Innjia',
      component: Layout
    }
  ]
})

export default router

router.beforeEach(function (to, from, next) {
  next()
  console.log(to)
  window.document.title = to.meta.title
})
