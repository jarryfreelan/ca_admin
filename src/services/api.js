import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { globalConstData } from './global'

Vue.use(Vuex)

export default {
  install: (Vue, options) => {
    Vue.prototype.$api = {
      apiRequest: async (object, p_url, p_method) => {
        return new Promise((resolve, reject) => {
          const params = new URLSearchParams()
          for (var [key, value] of Object.entries(object)) {
            if (typeof value === 'object') {
              for (var [key2, value2] of Object.entries(value)) {
                params.append(key2, value2)
              }
            } else {
              params.append(key, value)
            }
          }

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
          
          axios({ url: globalConstData.api_url+p_url, data: params, method: p_method })
            .then((resp) => {
              if (resp.data.status === 'success') {
                resolve(resp.data)
              } else if(resp.data.status === 'errorServer') {
                store.commit('auth_error')
                delete axios.defaults.headers.common['capi']
                delete axios.defaults.headers.common['sess']
                delete axios.defaults.headers.common['token']
                router.push('/login')
                reject(resp.data)
              } else {
                reject(resp.data)
              }
            })
            .catch((err) => {
              console.log(err)
            })
        })
      },

      uploadFile: async (formData) => {
        return new Promise((resolve, reject) => {
          // Call list of menu from backend server (php)
          axios({ url: globalConstData.db_url + '/uploadDemo.php', data: formData, method: 'POST', headers: { 'Content-Type': 'multipart/form-data' } })
            .then(resp => {
              resolve(resp.data)
            })
            .catch(err => {
              reject(err)
            })
        })
      },

      apiRequestTrans: async (object) => {
        return new Promise((resolve, reject) => {
          var params = new URLSearchParams()
          for (var [key, value] of Object.entries(object)) {
            if (typeof value === 'object') {
              for (var [key2, value2] of Object.entries(value)) {
                params.append(key2, value2)
              }
            } else {
              params.append(key, value)
            }
          }
          params.append('id', store.getters.id)
          params.append('token', store.getters.token)
          params.append('sess', store.getters.sess)
          axios({ url: globalConstData.api_trans_url, data: params, method: 'POST' })
            .then(resp => {
              if(resp.data.status === 'TOKEN_FAIL') {
                store.commit('session_timeout')
                router.push('/login')
              } else if (resp.data.status === 'SUCCESS') {
                resolve(resp.data)
              } else {
                reject(resp.data)
              }
            })
            .catch(err => {
              store.commit('auth_error')
              router.push('/login')
              reject(err)
            })
        })
      },
    }
  },
}
