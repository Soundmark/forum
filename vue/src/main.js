// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import ElemenetUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import store from '@/store'
import router from './router'

Vue.use(ElemenetUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})

router.beforeEach((to, from, next) => {
  let getUser = JSON.parse(localStorage.getItem('userInfo'))
  if (getUser) {
    store.state.isLogin = true
    store.state.userName = getUser.name
    store.state.userId = getUser.id
    next()
  } else {
    store.state.isLogin = false
    store.state.userName = ''
    store.state.userId = ''
    if (to.meta.needSignIn) {
      next('/sign-in')
    } else {
      next()
    }
  }
})

// 请求头中加入token
axios.interceptors.request.use(config => {
  if (localStorage.getItem('dogleft_userToken')) {
    config.headers.Authorizatior = 'Bearer ' + localStorage.getItem('dogleft_userToken')
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 判断token是否过期
axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response) {
    if (error.response.status === 401) {
      localStorage.removeItem('userInfo')
      localStorage.removeItem('doglert_userToken')
    }
  }
})
