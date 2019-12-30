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
        <b-col md="6" sm="8">
          <b-card no-body class="p-0" style="min-width: 280px;">
            <b-card-body class="p-4">
              <b-form @submit="onSubmitR">
                <h1>{{ $ml.get('register_title') }}</h1>
                <p class="text-muted">{{ $ml.get('register_desc') }}</p>

                <b-form-group
                  class="mb-3"
                  label-for="Username"
                  :invalid-feedback="invalidFeedback.username"
                  :state="state.username"
                >
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      id="username"
                      v-model="form.username"
                      type="text"
                      :placeholder="$ml.get('register_username')"
                    />
                  </b-input-group>
                </b-form-group>

                <b-form-group
                  class="mb-3"
                  label-for="Referral User ID"
                >
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      id="referral_user"
                      v-model="form.referral_user"
                      type="text"
                      :placeholder="$ml.get('register_referral_user')"
                    />
                  </b-input-group>
                </b-form-group>

                <b-form-group
                  class="mb-3"
                  label-for="Email"
                  :invalid-feedback="invalidFeedback.email"
                  :state="state.email"
                >
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text>@</b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      id="email"
                      v-model="form.email"
                      type="text"
                      :placeholder="$ml.get('register_email')"
                    />
                  </b-input-group>
                </b-form-group>

                <b-form-group
                  class="mb-3"
                  label-for="password"
                  :invalid-feedback="invalidFeedback.password"
                  :state="state.password"
                >
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      id="password"
                      v-model="form.password"
                      type="password"
                      :placeholder="$ml.get('register_password')"
                    />
                  </b-input-group>
                </b-form-group>

                <b-form-group
                  class="mb-3"
                  label-for="password"
                  :invalid-feedback="invalidFeedback.confirm_password"
                  :state="state.confirm_password"
                >
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      id="confirm_password"
                      v-model="form.confirm_password"
                      type="password"
                      :placeholder="$ml.get('register_confirm_password')"
                    />
                  </b-input-group>
                </b-form-group>

                <b-form-group
                  class="mb-3"
                  label-for="captcha"
                  :invalid-feedback="invalidFeedback.captcha"
                  :state="state.captcha"
                >
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="fa fa-chain"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input 
                      type="text" 
                      class="form-control" 
                      v-model="form.captcha" 
                      :placeholder="$ml.get('register_captcha')" 
                      autocomplete="captcha" style="margin-right: 10px;" 
                    />
                    <img :src="captchaImageUrl" alt="CAPTCHA" class="captcha-image">
                    <b-input-group-prepend @click="reloadCaptcha">
                      <b-input-group-text>
                        <i class="fa fa-refresh"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                  </b-input-group>
                </b-form-group>

                <b-button type="submit" block squared variant="success">{{ $ml.get('register_register') }}</b-button>
              </b-form>
            </b-card-body>
            <b-row class="px-4">
              <b-col cols="12" style="padding-bottom: 20px;">
                <b-button variant="link" class="px-0" @click="loginPage">{{ $ml.get('register_already_have_account') }}?</b-button>
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
export default {
  name: 'Register',
  data () {
    return {
      form: {
        username: '',
        referral_user: '',
        email: '',
        password: '',
        confirm_password: '',
        captcha: '',
      },
      invalidFeedback: {
        username: '',
        referral_user: '',
        email: '',
        password: '',
        confirm_password: '',
        captcha: '',
      },
      state: {
        username: true,
        referral_user: true,
        email: true,
        password: true,
        confirm_password: true,
        captcha: true,
      },
      captchaImageUrl: '',
    }
  },
  mounted() {
    if(localStorage.getItem('lang')) {
      this.$ml.change(localStorage.getItem('lang'))
    } else {
      localStorage.setItem('lang', 'en')
    }

    if(this.$route.params.id) {
      this.form.referral_user = this.$route.params.id
    } else {
      this.form.referral_user = '';
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
    loginPage() {
      this.$router.push('/login')
    },
    resetValue() {
      this.invalidFeedback.username = ''
      this.invalidFeedback.referral_user = ''
      this.invalidFeedback.email = ''
      this.invalidFeedback.password = ''
      this.invalidFeedback.confirm_password = ''
      this.invalidFeedback.captcha = ''

      this.state.username = true
      this.state.referral_user = true
      this.state.email = true
      this.state.password = true
      this.state.confirm_password = true
      this.state.captcha = true
    },
    onSubmitR (evt) {
      evt.preventDefault()
      const self = this
      self.resetValue()

      this.$auth.register(this.form)
        .then((response) => {
          self.notifice('success', this.$ml.get(response.msg), '')
          self.loginPage()
        })
        .catch((error) => {
          if(error.status === 'errorValidation') {
            for (const [key, value] of Object.entries(error.error)) {
              var errMsg = '';
              for (var i = 0; i < value.length; i++) {
                value[i] = value[i].split(' ').join('_')
                value[i] = value[i].split('.').join('')
                value[i] = this.$ml.get(value[i])
                errMsg = errMsg + value[i] + '. ';
              }
              self.invalidFeedback[key] = errMsg
              self.state[key] = false
            }
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
.vue-tel-input {
  border: 1px solid #e4e7ea;
}
.vti_dropdown {
  padding: 0px;
}
.btn-link {
  padding: 0;
  padding-bottom: 0;
}
</style>