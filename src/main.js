import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'

import Vue from 'vue'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { DatePicker, notification, message, Spin, Modal, Table, Tag, Popover, Tree } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import BootstrapVue from 'bootstrap-vue'
import JQuery from 'jquery'
import App from './App'
import router from './router'
import VueParticles from './vue-particles'
import VuePrism from 'vue-prism'
import VueTelInput from 'vue-tel-input'
import AuthService from './services/auth'
import ApiService from './services/api'
import DateTimeManagment from './services/datetime'
import './i18n'

Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.use(VueParticles, VuePrism)
Vue.use(VueTelInput)
Vue.use(AuthService)
Vue.use(ApiService)
Vue.use(DateTimeManagment)
Vue.use(DatePicker)
Vue.use(message)
Vue.use(notification)
Vue.use(Spin)
Vue.use(Modal)
Vue.use(Table)
Vue.use(Tag)
Vue.use(Popover)
Vue.use(Tree)

Vue.prototype.$message = message
notification.config({
  placement: 'bottomRight',
})
Vue.prototype.$notification = notification
Vue.prototype.$modal = Modal

window.$ = JQuery

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
