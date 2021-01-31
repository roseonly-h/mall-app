import Vue from 'vue'
import Vuex from 'vuex'
import {
  getUserCookie,
  setCookie,
  removeUserCookie
} from "@/utils/userCookie.js"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 导航栏的收放状态 false -> 展开
    collapsed: false,
    user: getUserCookie(),
    // 左侧菜单栏的路由
    menuRoutes: [],
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed
      // this.state.collapsed = ! this.state.collapsed
    },
    // 用户信息缓存
    setUserInfo(state, userInfo) {
      state.user = userInfo
    },
    changeMenuRoutes(state, routes) {
      state.menuRoutes = routes
    },
    loginOut(state) {
      state.user = {
        username: '',
        role: '',
        email: '',
        appkey: ''
      }
    }
  },
  actions: {
    changeCollapsed({
      commit
    }) {
      commit('changeCollapsed')
    },
    setUserInfo({
      commit
    }, userInfo) {
      commit('setUserInfo', userInfo)
      setCookie(userInfo)
    },
    changeMenuRoutes({
      commit
    }, routes) {
      commit('changeMenuRoutes', routes)
    },
    // 先设置user为空，再清除缓存
    loginOut({
      commit
    }) {
      commit('loginOut')
      removeUserCookie()
    }
  },
  modules: {}
})