import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')
const Page404 = () => import('@/views/coreui/pages/Page404')
const Page500 = () => import('@/views/coreui/pages/Page500')


//Crypto Asset
const mLogin = () => import('@/views/account/Login')
// const mRegister = () => import('@/views/account/Register')
const mDashboard = () => import('@/views/dashboard')
const mNews = () => import('@/views/news')
const mRegister = () => import('@/views/registration')

Vue.use(Router)

function configRoutes() {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      cname: '主页',
      component: DefaultContainer,
      meta: {
        authRequired: true,
        hidden: true,
      },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          cname: '主页',
          component: mDashboard
        },
        {
          path: 'news',
          name: 'News',
          cname: '资源动态',
          component: mNews
        },
        {
          path: 'registration',
          name: 'Registration',
          cname: '注册管理员',
          component: mRegister
        },
      ]
    },
    {
      path: '/',
      redirect: '/404',
      name: 'auth',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: mLogin
        },
        /*{
          path: 'register',
          name: 'Register',
          component: mRegister
        },
        {
          path: 'register/:id',
          name: 'Register',
          component: mRegister
        }*/
      ]
    },
    { 
      path: "*",
      component: Page404 
    }
  ]
}

const router = new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    if (!store.getters.isLoggedIn) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
