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
                <h1>{{ $ml.get('register') }}</h1>
                <p class="text-muted">{{ $ml.get('register_create_your_account') }}</p>

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
                      required
                      :placeholder="$ml.get('register_username')"
                      @input="checkUsername"
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
                      id="referralUserID"
                      v-model="form.referralUserID"
                      type="text"
                      :placeholder="$ml.get('register_referralUserID')"
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
                      type="email"
                      required
                      :placeholder="$ml.get('register_email')"
                      @input="checkEmail"
                    />
                  </b-input-group>
                </b-form-group>

                <b-form-group
                  class="mb-3"
                  label-for="Phone"
                  :invalid-feedback="invalidFeedback.phone"
                  :state="state.phone"
                >
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-phone"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <vue-tel-input
                      class="form-control"
                      id="phone"
                      v-model="form.phone"
                      required
                      :valid-characters-only="true"
                      :placeholder="$ml.get('register_phone_number')"
                      style="padding: 3px 0 3px 0;"
                      @input="checkPhone"
                    />
                  </b-input-group>
                </b-form-group>

                <b-form-group
                  class="mb-3"
                  label-for="password"
                  :invalid-feedback="invalidFeedback.loginPassword"
                  :state="state.loginPassword"
                >
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      id="loginPassword"
                      v-model="form.loginPassword"
                      type="password"
                      required
                      :placeholder="$ml.get('register_login_password')"
                      @input="checkLoginPassword"
                    />
                  </b-input-group>
                </b-form-group>

                <b-form-group
                  class="mb-3"
                  label-for="password"
                  :invalid-feedback="invalidFeedback.repeatLoginPassword"
                  :state="state.repeatLoginPassword"
                >
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      id="repeatLoginPassword"
                      v-model="form.repeatLoginPassword"
                      type="password"
                      required
                      :placeholder="$ml.get('register_repeat_login_password')"
                      @input="checkRepeatLoginPassword"
                    />
                  </b-input-group>
                </b-form-group>

                <b-button type="submit" block squared variant="success">{{ $ml.get('register_create_account') }}</b-button>
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
        referralUserID: '',
        email: '',
        phone: '',
        country: '',
        loginPassword: '',
        repeatLoginPassword: '',
      },
      invalidFeedback: {
        username: '',
        referralUserID: '',
        email: '',
        phone: '',
        loginPassword: '',
        repeatLoginPassword: '',
      },
      state: {
        username: true,
        referralUserID: true,
        email: true,
        phone: true,
        loginPassword: true,
        repeatLoginPassword: true,
      },
    }
  },
  mounted() {
    this.$ml.change(localStorage.getItem('lang'))

    if(this.$route.params.id) {
      this.form.referralUserID = this.$route.params.id
    } else {
      this.form.referralUserID = '';
    }
  },
  methods: {
    loginPage: function() {
      this.$router.push('/login');
    },
    onSubmitR (evt) {
      evt.preventDefault()
      const self = this
      if (this.state.username && this.state.email && this.state.phone && this.state.loginPassword && this.state.repeatLoginPassword) {
        this.$auth.register(this.form)
          .then((response) => {
            if (response.code === 'SUCCESS') {
              self.notifice('success', this.$ml.get('register_success_register'), this.$ml.get('register_account_was_created_success'))
              this.$router.push('/login')
            } else {
              self.notifice('error', this.$ml.get('register_error_register'), this.$ml.get('register_something_went_wrong'))
            }
          })
          .catch((error) => {
            self.notifice('error', this.$ml.get('register_error_register'), this.$ml.get('register_something_went_wrong'))
          })
      } else {
        this.$message.error(this.$ml.get('register_validation_error'))
      }
    },
    notifice (type, title, message) {
      this.$notification[type]({
        message: title,
        description: message
      })
    },
    checkUsername (name) {
      if (name.length < 8) {
        this.invalidFeedback.username = this.$ml.get('register_invalid_username')
        this.state.username = false
      } else {
        this.invalidFeedback.username = ''
        this.state.username = true
      }

      if (this.state.username) {
        const self = this
        this.$auth.checkExistingUsername(name)
          .then((response) => {
            if (response.code === 'SUCCESS') {
              self.state.username = true
              self.invalidFeedback.username = ''
            }
          })
          .catch((error) => {
            self.state.username = false
            self.invalidFeedback.username = this.$ml.get('register_invalid_existing_username')
          })
      }
    },
    checkEmail (email) {
      var re = /\S+@\S+\.\S+/

      if (!email.match(re)) {
        this.invalidFeedback.email = this.$ml.get('register_invalid_email')
        this.state.email = false
      } else {
        this.invalidFeedback.email = ''
        this.state.email = true
      }

      if(this.state.email) {
        const self = this
        this.$auth.checkExistingEmail(email)
          .then((response) => {
            if (response.code === 'SUCCESS') {
              self.state.email = true
              self.invalidFeedback.email = ''
            }
          })
          .catch((error) => {
            self.state.email = false
            self.invalidFeedback.email = this.$ml.get('register_invalid_existing_email')
          })
      }  
    },
    checkPhone (formattedNumber, { number, valid, country }) {
      this.form.phone = number.international
      this.form.country = country.name
      if (!valid) {
        if (number.international) {
          this.invalidFeedback.phone = this.$ml.get('register_invalid_phone')
          this.state.phone = false
        } else {
          this.invalidFeedback.phone = ''
          this.state.phone = true
        }
      } else {
        this.invalidFeedback.phone = ''
        this.state.phone = true
      }
    },
    checkLoginPassword (loginPassword) {
      var lowerCaseLetters = /[a-z]/g
      var upperCaseLetters = /[A-Z]/g
      var numbers = /[0-9]/g

      this.invalidFeedback.loginPassword = '';

      if (loginPassword.length < 8) {
        this.invalidFeedback.loginPassword += this.$ml.get('register_invalid_password')
        this.state.loginPassword = false
      }
      if (!loginPassword.match(lowerCaseLetters)) {
        this.invalidFeedback.loginPassword += this.$ml.get('register_invalid_password_lowercase')
        this.state.loginPassword = false
      }
      if (!loginPassword.match(upperCaseLetters)) {
        this.invalidFeedback.loginPassword += this.$ml.get('register_invalid_password_uppercase')
        this.state.loginPassword = false
      }
      if (!loginPassword.match(numbers)) {
        this.invalidFeedback.loginPassword += this.$ml.get('register_invalid_password_digit')
        this.state.loginPassword = false
      } 
      if(loginPassword.length >= 8 && loginPassword.match(lowerCaseLetters) && loginPassword.match(upperCaseLetters) && loginPassword.match(numbers)){
        this.invalidFeedback.loginPassword = ''
        this.state.loginPassword = true
      }
      this.checkRepeatLoginPassword(this.form.repeatLoginPassword)
    },
    checkRepeatLoginPassword (repeatLoginPassword) {
      if (repeatLoginPassword !== this.form.loginPassword) {
        this.invalidFeedback.repeatLoginPassword = this.$ml.get('register_invalid_password_match')
        this.state.repeatLoginPassword = false
      } else {
        this.invalidFeedback.repeatLoginPassword = ''
        this.state.repeatLoginPassword = true
      }
    },
    switchLang (lang) {
      this.$ml.change(lang)
      localStorage.setItem('lang', lang)
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