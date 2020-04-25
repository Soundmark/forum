import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    isLogin: false,
    userName: '',
    userData: {},
    userId: '',
    breadNav: [],
    showBreadNav: true,
    currentPage: 1,
    detailData: {}
  },
  mutations: {
    storeUserData (state, data) {
      state.userData = data
    },
    checkUser (state, userInfo) {
      state.userName = userInfo.name
      state.userId = userInfo.id
      state.isLogin = true
    },
    setBreadNav (state, nav) {
      state.breadNav = nav
    },
    setShowBreadNav (state, status) {
      state.showBreadNav = status
    },
    setCurrentPage (state, num) {
      state.currentPage = num
    },
    saveDetailData (state, data) {
      state.detailData = data
    }
  },
  actions: {
    getUserData ({commit}, data) {
      commit('storeUserData', data)
    },
    getDetailData ({commit}, data) {
      commit('saveDetailData', data)
    }
  }
})

export default store
