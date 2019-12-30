<template>
  <div class="app flex-row align-items-center">
    <vue-particles
      color="#ffffff"
      :particleOpacity="0.7"
      linesColor="#ffffff"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="5"
      :linesWidth="2"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="4">
          <b-card no-body class="p-0" style="min-width: 280px;">
            <b-card-body>
              <b-form @submit="onSubmit">
                <h1>{{ $ml.get('login_title') }}</h1>
                <p class="text-muted">{{ $ml.get('login_desc') }}</p>
                <div v-for="error in errorValidation.username" style="padding-bottom: 2px; display: inline-block;">
                  <a-tag color="#f50" style="align-items-center">{{ error }}</a-tag>
                </div>
                <b-input-group class="mb-3">
                  <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                  <b-form-input type="text" class="form-control" v-model="form.username" :placeholder="$ml.get('login_username')" autocomplete="username email" />
                </b-input-group>
                <div v-for="error in errorValidation.password" style="padding-bottom: 2px; display: inline-block;">
                  <a-tag color="#f50" style="align-items-center">{{ error }}</a-tag>
                </div>
                <b-input-group class="mb-4">
                  <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                  <b-form-input type="password" class="form-control" v-model="form.password" :placeholder="$ml.get('login_password')" autocomplete="current-password" />
                </b-input-group>
                <div v-for="error in errorValidation.captcha" style="padding-bottom: 2px; display: inline-block;">
                  <a-tag color="#f50" style="align-items-center">{{ error }}</a-tag>
                </div>
                <b-input-group class="mb-4">
                  <b-input-group-prepend><b-input-group-text><i class="fa fa-chain"></i></b-input-group-text></b-input-group-prepend>
                  <b-form-input type="text" class="form-control" v-model="form.captcha" :placeholder="$ml.get('login_captcha')" autocomplete="captcha" style="margin-right: 10px;" />
                  <img :src="captchaImageUrl" alt="CAPTCHA" class="captcha-image">
                  <b-input-group-prepend @click="reloadCaptcha"><b-input-group-text><i class="fa fa-refresh"></i></b-input-group-text></b-input-group-prepend>
                </b-input-group>

                <b-button type="submit" variant="primary" block squared>{{ $ml.get('login_login') }}</b-button>
              </b-form>
            </b-card-body>
            <b-row class="px-4">
              <b-col cols="6">
                
                <b-button variant="link" class="px-0" @click="signUp">{{ $ml.get('login_signUp') }}</b-button>
              </b-col>
              <b-col cols="6" class="text-right">
                <b-button variant="link" class="px-0">{{ $ml.get('login_forgotPassword') }}</b-button>
              </b-col>
            </b-row>
            <b-card-footer class="px-4">
              <b-row>
                <b-col cols="12" class="text-right">
                  <b-button variant="link" class="px-0" @click="switchLang('en')"><i class="flag-icon flag-icon-us h3" title="EN" id="af"></i></b-button>
                  <b-button variant="link" class="px-0" @click="switchLang('cn')"><i class="flag-icon flag-icon-cn h3" title="CN" id="af"></i></b-button>
                </b-col>
              </b-row>
            </b-card-footer>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { globalConstData } from '@/services/global'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: '',
        captcha: '',
      },
      captchaImageUrl: '',
      errorValidation: {
        username: [],
        password: [],
        captcha: [],
      },
    }
  },
  mounted() {
    if(localStorage.getItem('lang')) {
      this.$ml.change(localStorage.getItem('lang'))
    } else {
      localStorage.setItem('lang', 'en')
    }

    this.reloadCaptcha()
  },
  methods: {
    sessionCheck() {
      if(localStorage.getItem('caSess') === null || localStorage.getItem('caSess') === undefined) {
        localStorage.setItem('caSess', this.generateKey(100))
      }
    },
    reloadCaptcha() {
      this.sessionCheck()
      const self = this
      this.$auth.captcha()
        .then((response) => {
          self.captchaImageUrl = response.captcha
        })
        .catch((error) => {
          console.log(error)
        })
    },
    signUp: function() {
      this.$router.push('/register')
    },
    onSubmit (evt) {
      evt.preventDefault()
      const self = this
      self.errorValidation = []
      this.$auth.login(this.form)
        .then((response) => {
          self.notifice('success', this.$ml.get(response.msg), '')
          self.$router.push('/dashboard');
        })
        .catch((error) => {
          if(error.status === 'errorValidation') {
            for (const [key, value] of Object.entries(error.error)) {
              for (var i = 0; i < value.length; i++) {
                value[i] = value[i].split(' ').join('_')
                value[i] = value[i].split('.').join('')
                value[i] = this.$ml.get(value[i])
              }
            }
            self.errorValidation = error.error
          } else {
            self.notifice('error', this.$ml.get(error.error), ' ')
          }
        })
    },
    notifice (type, title, message) {
      this.$notification[type]({
        message: title,
        description: message
      })
    },
    switchLang (lang) {
      this.$ml.change(lang)
      localStorage.setItem('lang', lang)
    },
    generateKey(length=100) {
      var result = ''
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      var charactersLength = characters.length
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      return result
    },
  }
}
</script>

<style scoped>
.card {
    opacity:0.85;
}
.particles-js {
  background-image: url("/img/bg/bg.jpg");
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.btn-link {
  padding: 0;
  padding-bottom: 0;
}
</style>
