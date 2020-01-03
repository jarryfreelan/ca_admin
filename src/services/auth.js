import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { globalConstData } from './global'

Vue.use(Vuex)

export default {
  install: (Vue, options) => {
    Vue.prototype.$auth = {
      register: async (user) => {
        return new Promise((resolve, reject) => {
          const params = new URLSearchParams()
          for (const [key, value] of Object.entries(user)) {
            params.append(key, value)
          }
          axios.defaults.headers.common['capi'] = globalConstData.api_key;
          axios.defaults.headers.common['sess'] = localStorage.getItem('caSess')
          axios({ url: globalConstData.api_url+'register', data: params, method: 'POST' })
            .then((resp) => {
              if (resp.data.status === 'success') {
                resolve(resp.data)
              } else {
                reject(resp.data)
              }
            })
            .catch((err) => {
              console.log(err)
            })
        })
      },
      captcha: async () => {
        return new Promise((resolve, reject) => {
          axios.defaults.headers.common['capi'] = globalConstData.api_key;
          axios.defaults.headers.common['sess'] = localStorage.getItem('caSess')
          axios({ url: globalConstData.api_url+'refreshcaptcha', method: 'GET' })
            .then((resp) => {
               if (resp.data.status === 'success') {
                  resolve(resp.data)
                } else {
                  reject(resp.data)
                }
            })
            .catch((err) => {
              console.log(err)
            })
        })
      },
      login: async (user) => {
        return new Promise((resolve, reject) => {
          const params = new URLSearchParams()
          for (const [key, value] of Object.entries(user)) {
            params.append(key, value)
          }
          axios.defaults.headers.common['capi'] = globalConstData.api_key;
          axios.defaults.headers.common['sess'] = localStorage.getItem('caSess')
          axios({ url: globalConstData.api_url+'login639', data: params, method: 'POST' })
            .then((resp) => {
              if (resp.data.status === 'success') {
                store.commit('auth_success', resp.data.token)
                resolve(resp.data)
              } else {
                reject(resp.data)
              }
            })
            .catch((err) => {
              store.commit('auth_error')
              console.log(err)
            })
        })
      },
      logout: async () => {
        return new Promise((resolve, reject) => {
          if(localStorage.getItem('caSess') === null || localStorage.getItem('caSess') === undefined) {
            axios.defaults.headers.common['sess'] = ''
          } else {
            axios.defaults.headers.common['sess'] = localStorage.getItem('caSess')
          }

          if(localStorage.getItem('caToken') === null || localStorage.getItem('caToken') === undefined) {
            axios.defaults.headers.common['token'] = ''
          } else {
            axios.defaults.headers.common['token'] = localStorage.getItem('caToken')
          }

          axios.defaults.headers.common['capi'] = globalConstData.api_key;
          
          axios({ url: globalConstData.api_url+'logout', data: [], method: 'GET' })
            .then((resp) => {
              if (resp.data.status === 'success') {
                store.commit('logout')
                resolve(resp.data)
              } else if(resp.data.status === 'errorServer') {
                store.commit('auth_error')
                router.push('/login')
                reject(resp.data)
              } else {
                reject(resp.data)
              }
            })
            .catch((err) => {
              console.log(err)
            })

          delete axios.defaults.headers.common['capi']
          delete axios.defaults.headers.common['sess']
          delete axios.defaults.headers.common['token']
        })
      },
    }
  },
}
