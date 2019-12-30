<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12" lg="12">
        <b-card no-body header-bg-variant="white">
          <b-card-header style="float: center; align-items: center; text-align:center;">
            <strong class="text-dark">SECURITY PASSWORD</strong>
          </b-card-header>
          <b-card-body>
            <b-row>
              <b-col cols="12" sm="12" md="8">
                <b-form @submit="onSubmit">
                  <b-form-group
                    v-if="authSec"
                    label="Current Password * "
                    label-for="currentPassword"
                    label-align-sm="right" 
                    :label-cols="5"
                    >
                    <b-form-input
                      id="currentPassword"
                      v-model="security.currentPassword"
                      type="password"
                      required
                    />
                  </b-form-group>
                  <b-form-group
                    v-if="!authSec"
                    label="Current Password * "
                    label-for="currentPassword"
                    label-align-sm="right" 
                    :label-cols="5"
                    description="Your Security Code is not existing. Please enter your login password in this field"
                    >
                    <b-form-input
                      id="currentPassword"
                      v-model="security.currentPassword"
                      type="password"
                      required
                    />
                  </b-form-group>
                  <b-form-group
                    label="New Password * "
                    label-for="newPassword"
                    label-align-sm="right" 
                    :label-cols="5"
                    :invalid-feedback="invalidFeedbackNewPassword"
                    :state="stateNewPassword"
                    >
                    <b-form-input
                      id="newPassword"
                      v-model="security.newPassword"
                      type="password"
                      required
                      @input="checkNewPassword"
                    />
                  </b-form-group>
                  <b-form-group
                    label="Repeat Password * "
                    label-for="repeatPassword"
                    label-align-sm="right" 
                    :label-cols="5"
                    :invalid-feedback="invalidFeedbackRepeatPassword"
                    :state="stateRepeatPassword"
                    >
                    <b-form-input
                      id="repeatPassword"
                      v-model="security.repeatPassword"
                      type="password"
                      required
                      @input="checkRepeatPassword"
                    />
                  </b-form-group>
                      
                  <div slot="footer" style="float: center; align-items: center; text-align:center;margin: 10px;">
                    <b-button type="submit" variant="success">Update</b-button>
                  </div>
                </b-form>
              </b-col>
              <b-col cols="12" sm="12" md="4">
                <b-alert show variant="warning">
                  <ul>
                    <li class="text-muted"> Security code is used for withdrawal request and purchase package. </li>
                    <li class="text-muted"> Security code is not recommended same with login password. </li>
                  </ul>
                </b-alert>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'personalInfo',
  components: {
  },
  data: () => {
    return { 
      security: [],
      stateNewPassword: true,
      stateRepeatPassword: true,
      invalidFeedbackNewPassword: '',
      invalidFeedbackRepeatPassword: '',
      currentPasswordDesc: '',
      authSec: 0,
    }
  },
  mounted () {
    this.authSec = store.getters.authSec > 0
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      const self = this
      var objParams = {
        e: 'resetSecurityPassword',
        form: self.security,
      }

      if(this.stateNewPassword && this.stateRepeatPassword) {
        this.$api.apiRequest(objParams)
          .then((response) => {
            if (response.status === 'SUCCESS') {
              this.security.currentPassword = ''
              this.security.newPassword = ''
              this.security.repeatPassword = ''
              store.commit('update_user_auth')
              this.authSec = 1
              self.notifice('success', this.$ml.get('success_update_password'), this.$ml.get('user_password_changed'))
            } else {
              self.notifice('error', this.$ml.get('error_update_password'), this.$ml.get('something_went_wrong_password'))
            }
          })
          .catch((error) => {
            self.notifice('error', this.$ml.get('error_update_password'), this.$ml.get('something_went_wrong_old_password'))
          })
      } else {
        this.$message.error(this.$ml.get('validation_error'))
      }
    },
    notifice (type, title, message) {
      this.$notification[type]({
        message: title,
        description: message
      })
    },

    checkNewPassword (loginPassword) {
      var lowerCaseLetters = /[a-z]/g
      var upperCaseLetters = /[A-Z]/g
      var numbers = /[0-9]/g

      this.invalidFeedbackNewPassword = '';

      if (loginPassword.length < 8) {
        this.invalidFeedbackNewPassword += this.$ml.get('register_invalid_password')
        this.stateNewPassword = false
      }
      if (!loginPassword.match(lowerCaseLetters)) {
        this.invalidFeedbackNewPassword += this.$ml.get('register_invalid_password_lowercase')
        this.stateNewPassword = false
      }
      if (!loginPassword.match(upperCaseLetters)) {
        this.invalidFeedbackNewPassword += this.$ml.get('register_invalid_password_uppercase')
        this.stateNewPassword = false
      }
      if (!loginPassword.match(numbers)) {
        this.invalidFeedbackNewPassword += this.$ml.get('register_invalid_password_digit')
        this.stateNewPassword = false
      } 
      if(loginPassword.length >= 8 && loginPassword.match(lowerCaseLetters) && loginPassword.match(upperCaseLetters) && loginPassword.match(numbers)){
        this.invalidFeedbackNewPassword = ''
        this.stateNewPassword = true
      }
      this.checkRepeatPassword(this.security.repeatPassword)
    },
    checkRepeatPassword (repeatPassword) {
      if (repeatPassword !== this.security.newPassword) {
        this.invalidFeedbackRepeatPassword = this.$ml.get('register_invalid_password_match')
        this.stateRepeatPassword = false
      } else {
        this.invalidFeedbackRepeatPassword = ''
        this.stateRepeatPassword = true
      }
    },
  }
}
</script>
<style scoped>
.card-header {
    background-color: #ffffff;
}
</style>
