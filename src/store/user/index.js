import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  state: {
    status: localStorage.getItem('caStatus') || '',
    token: localStorage.getItem('caToken') || '',
    sess: localStorage.getItem('caSess') || '',
    username: localStorage.getItem('caUsername') || '',
    email: localStorage.getItem('caEmail') || '',
  },
  mutations: {
    auth_success(state, token) {
      state.status = 'success'
      state.token = token
      localStorage.setItem('caStatus', 'success')
      localStorage.setItem('caToken', token)
    },
    auth_user(state, userJsonString) {
      const user = JSON.parse(userJsonString)
      state.username = user.username
      state.email = user.email
      localStorage.setItem('caUsername', user.username)
      localStorage.setItem('caEmail', user.email)
    },
    auth_error (state) {
      state.status = 'error'
      state.token = ''
      state.username = ''
      state.email = ''
      localStorage.setItem('caStatus', 'error')
      localStorage.removeItem('caToken')
      localStorage.removeItem('caUsername')
      localStorage.removeItem('caEmail')
    },
    session_timeout (state) {
      state.status = 'error'
      state.token = ''
      state.username = ''
      state.email = ''
      localStorage.setItem('caStatus', 'error')
      localStorage.removeItem('caToken')
      localStorage.removeItem('caUsername')
      localStorage.removeItem('caEmail')
    },
    logout (state) {
      state.status = 'logout'
      state.token = ''
      state.username = ''
      state.email = ''
      localStorage.setItem('caStatus', 'logout')
      localStorage.removeItem('caToken')
      localStorage.removeItem('caUsername')
      localStorage.removeItem('caEmail')
    },
    update_user(state, email) {
      state.email = email
      localStorage.setItem('caEmail', email)
    },
  },
  actions: {},
  getters: {
    username: state => state.username,
    email: state => state.email,
    token: state => state.token,
    sess: state => state.sess,
    isLoggedIn: state => (state.token.length) > 0,
    authStatus: state => state.status,
  },
}
