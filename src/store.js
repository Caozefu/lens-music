import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginStatus: false,
    userInfo: null
  },
  getters: {
    loginStatus: state => state.loginStatus,
    userInfo: state => state.userInfo
  },
  mutations: {
    REFRESH_LOGIN(state, params) {
      state.loginStatus = params
    },
    UPDATE_INFO(state, params) {
      state.userInfo = params
    },
    LOGOUT(state) {
      state.loginStatus = false;
      state.userInfo = null;
    }
  },
  actions: {
    refreshLoginStatus({commit}, params) {
      commit('REFRESH_LOGIN', params)
    },
    updateUserInfo({commit}, params) {
      commit('UPDATE_INFO', params)
    },
    logout({commit}) {
      commit('LOGOUT')
    }
  }
})
