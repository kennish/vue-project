import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/home'
// import Home from '@/components/Hello'
import Login from '@/views/logn/lognIn'
import Layout from '@/views/layout/layout'

import MenuNode from '@/views/suim/menuNode'
import UserProfile from '@/views/suim/userProfile'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'is-active',
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
      component: Layout,
      meta: {
        title: '大金融后台',
        login: true
      },
      children: [
        {
          path: '',
          component: MenuNode,
          meta: {
            title: '菜单信息管理'
          }
        },
        {
          path: '/userProfile',
          name: 'UserProfile',
          component: UserProfile,
          meta: {
            title: '用户信息管理'
          }
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

export default router

router.beforeEach(function (to, from, next) {
  if (to.matched.some((item) => item.meta.login)) {  // 匹配到需要登录才能进入
    let info = router.app.$local.fetch('innjia')
    if (info.token) { // 如果有token表示已登录
      next()
    } else {
      router.app.$Message.error('请登录')
      router.push({
        path: '/login',
        query: {
          redirect: to.path.slice(1)
        }
      })
    }
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  if (to.meta.title) {
    window.document.title = to.meta.title
  } else {
    window.document.title = '大金融平台'
  }
})
