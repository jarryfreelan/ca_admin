<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12" lg="8">
        <b-card no-body header-bg-variant="white">
          <b-card-header style="float: center; align-items: center; text-align:center;">
            <strong class="text-dark">REGISTER NEW MEMBER</strong>
          </b-card-header>
          <b-card-body>
            <b-row>
              <b-col cols="12" sm="12" md="12">
                <b-form @submit="onSubmit">
                  <strong class="text-dark" style="margin: 20px;">ACCOUNT INFO</strong>
                  <hr>

                  <b-form-group
                    label="Username * "
                    label-for="username"
                    label-align-sm="right" 
                    :label-cols="4"
                    :invalid-feedback="invalidFeedback.user_username"
                    :state="state.user_username"
                  >
                    <b-form-input id="username" type="text" v-model="newMember.user_username" @input="checkUsername" required></b-form-input>
                  </b-form-group>
                  <b-form-group
                    label="Email * "
                    label-for="email"
                    label-align-sm="right" 
                    :label-cols="4"
                    :invalid-feedback="invalidFeedback.user_email"
                    :state="state.user_email"
                  >
                    <b-form-input id="email" type="text" v-model="newMember.user_email" @input="checkEmail" required></b-form-input>
                  </b-form-group>
                  <b-form-group
                    label="Mobile * "
                    label-for="mobile"
                    label-align-sm="right" 
                    :label-cols="4"
                    :invalid-feedback="invalidFeedback.user_phone"
                    :state="state.user_phone"
                  >
                    <vue-tel-input
                      class="form-control"
                      id="phone"
                      v-model="newMember.user_phone"
                      required
                      :valid-characters-only="true"
                      style="padding: 3px 0 3px 0;"
                      @input="checkPhone"
                    />
                  </b-form-group>

                  <b-form-group
                    label="Login Password * "
                    label-align-sm="right" 
                    :label-cols="4"
                    label-for="user_password"
                    :invalid-feedback="invalidFeedback.user_password"
                    :state="state.user_password"
                  >
                    <b-input-group>
                      <b-form-input
                        id="user_password"
                        v-model="newMember.user_password"
                        type="password"
                        required
                        @input="checkLoginPassword"
                      />
                    </b-input-group>
                  </b-form-group>

                  <b-form-group
                    label="Re-enter Login Password * "
                    label-align-sm="right" 
                    :label-cols="4"
                    label-for="user_repeat_password"
                    :invalid-feedback="invalidFeedback.user_repeat_password"
                    :state="state.user_repeat_password"
                  >
                    <b-input-group>
                      <b-form-input
                        id="user_repeat_password"
                        v-model="newMember.user_repeat_password"
                        type="password"
                        required
                        @input="checkRepeatLoginPassword"
                      />
                    </b-input-group>
                  </b-form-group>

                  <b-form-group
                    label="Security Password * "
                    label-align-sm="right" 
                    :label-cols="4"
                    label-for="user_security_password"
                    :invalid-feedback="invalidFeedback.user_security_password"
                    :state="state.user_security_password"
                  >
                    <b-input-group>
                      <b-form-input
                        id="user_security_password"
                        v-model="newMember.user_security_password"
                        type="password"
                        required
                        @input="checkSecurityPassword"
                      />
                    </b-input-group>
                  </b-form-group>

                  <b-form-group
                    label="Re-enter Security Password * "
                    label-align-sm="right" 
                    :label-cols="4"
                    label-for="user_repeat_security_password"
                    :invalid-feedback="invalidFeedback.user_repeat_security_password"
                    :state="state.user_repeat_security_password"
                  >
                    <b-input-group>
                      <b-form-input
                        id="user_repeat_security_password"
                        v-model="newMember.user_repeat_security_password"
                        type="password"
                        required
                        @input="checkRepeatSecurityPassword"
                      />
                    </b-input-group>
                  </b-form-group>

                  <br><br>
                  <strong class="text-dark" style="margin: 20px;">Confirmation</strong>
                  <hr>
                  <b-form-group
                    label="My Security Password * "
                    label-for="mySecurityPassword"
                    label-align-sm="right" 
                    :label-cols="4"
                    >
                    <b-form-input id="auth_security" v-model="newMember.auth_security" type="password" required></b-form-input>
                  </b-form-group>
                      
                  <div slot="footer" style="float: center; align-items: center; text-align:center;margin: 10px;">
                    <b-button type="submit" variant="success">Register</b-button>
                  </div>
                </b-form>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>

export default {
  name: 'newMember',
  components: {
  },
  data: () => {
    return { 
      newMember: {
        user_username: '',
        user_email: '',
        user_phone: '',
        user_password: '',
        user_repeat_password: '',
        user_security_password: '',
        user_repeat_security_password: '',
        auth_security: '',
      },
      invalidFeedback: {
        user_username: '',
        user_email: '',
        user_phone: '',
        user_password: '',
        user_repeat_password: '',
        user_security_password: '',
        user_repeat_security_password: '',
      },
      state: {
        user_username: '',
        user_email: '',
        user_phone: '',
        user_password: '',
        user_repeat_password: '',
        user_security_password: '',
        user_repeat_security_password: '',
      },
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      const self = this
      var objParams = {
        e: 'registerNewMember',
        form: self.newMember,
      }
      this.$api.apiRequest(objParams)
        .then((response) => {
          if (response.status === 'SUCCESS') {
            self.notifice('success', 'New Member is registered', '')
            this.$router.push('/registration/record')
          }
        })
        .catch((error) => {
          self.notifice('error', 'error', 'error')
        })
    },
    notifice (type, title, message) {
      this.$notification[type]({
        message: title,
        description: message
      })
    },
    checkUsername (name) {
      if (name.length < 8) {
        this.invalidFeedback.user_username = this.$ml.get('register_invalid_username')
        this.state.user_username = false
      } else {
        this.invalidFeedback.user_username = ''
        this.state.user_username = true
      }

      if (this.state.user_username) {
        const self = this
        var objParams = {
          e: 'checkExistingRegisteredUsername',
          username: name
        }
        this.$api.apiRequest(objParams)
          .then((response) => {
            if (response.status === 'SUCCESS') {
              self.state.user_username = true
              self.invalidFeedback.user_username = ''
            }
          })
          .catch((error) => {
            self.state.user_username = false
            self.invalidFeedback.user_username = this.$ml.get('register_invalid_existing_username')
          })
      }
    },
    checkEmail (email) {
      var re = /\S+@\S+\.\S+/

      if (!email.match(re)) {
        this.invalidFeedback.user_email = this.$ml.get('profile_invalid_email')
        this.state.user_email = false
      } else {
        this.invalidFeedback.user_email = ''
        this.state.user_email = true
      }

      if(this.state.user_email) {
        const self = this
        var objParams = {
          e: 'checkExistingRegisteredEmail',
          email: email
        }
        this.$api.apiRequest(objParams)
          .then((response) => {
            if (response.status === 'SUCCESS') {
              self.state.user_email = true
              self.invalidFeedback.user_email = ''
            }
          })
          .catch((error) => {
            self.state.user_email = false
            self.invalidFeedback.user_email = this.$ml.get('profile_invalid_existing_email')
          })
      }  
    },
    checkPhone (formattedNumber, { number, valid, country }) {
      this.newMember.user_phone = number.international
      if (!valid) {
        if (number.international) {
          this.invalidFeedback.user_phone = this.$ml.get('profile_invalid_phone')
          this.state.user_phone = false
        } else {
          this.invalidFeedback.user_phone = ''
          this.state.user_phone = true
        }
      } else {
        this.invalidFeedback.user_phone = ''
        this.state.user_phone = true
      }
    },
    checkLoginPassword (loginPassword) {
      var lowerCaseLetters = /[a-z]/g
      var upperCaseLetters = /[A-Z]/g
      var numbers = /[0-9]/g

      this.invalidFeedback.user_password = '';

      if (loginPassword.length < 8) {
        this.invalidFeedback.user_password += this.$ml.get('register_invalid_password')
        this.state.user_password = false
      }
      if (!loginPassword.match(lowerCaseLetters)) {
        this.invalidFeedback.user_password += this.$ml.get('register_invalid_password_lowercase')
        this.state.user_password = false
      }
      if (!loginPassword.match(upperCaseLetters)) {
        this.invalidFeedback.user_password += this.$ml.get('register_invalid_password_uppercase')
        this.state.user_password = false
      }
      if (!loginPassword.match(numbers)) {
        this.invalidFeedback.user_password += this.$ml.get('register_invalid_password_digit')
        this.state.user_password = false
      } 
      if(loginPassword.length >= 8 && loginPassword.match(lowerCaseLetters) && loginPassword.match(upperCaseLetters) && loginPassword.match(numbers)){
        this.invalidFeedback.user_password = ''
        this.state.user_password = true
      }
      this.checkRepeatLoginPassword(this.newMember.user_repeat_security_password)
    },
    checkRepeatLoginPassword (repeatLoginPassword) {
      if (repeatLoginPassword !== this.newMember.user_password) {
        this.invalidFeedback.user_repeat_password = this.$ml.get('register_invalid_password_match')
        this.state.user_repeat_password = false
      } else {
        this.invalidFeedback.user_repeat_password = ''
        this.state.user_repeat_password = true
      }
    },
    checkSecurityPassword (securityPassword) {
      var lowerCaseLetters = /[a-z]/g
      var upperCaseLetters = /[A-Z]/g
      var numbers = /[0-9]/g

      this.invalidFeedback.user_security_password = '';

      if (securityPassword.length < 8) {
        this.invalidFeedback.user_security_password += this.$ml.get('register_invalid_password')
        this.state.user_security_password = false
      }
      if (!securityPassword.match(lowerCaseLetters)) {
        this.invalidFeedback.user_security_password += this.$ml.get('register_invalid_password_lowercase')
        this.state.user_security_password = false
      }
      if (!securityPassword.match(upperCaseLetters)) {
        this.invalidFeedback.user_security_password += this.$ml.get('register_invalid_password_uppercase')
        this.state.user_security_password = false
      }
      if (!securityPassword.match(numbers)) {
        this.invalidFeedback.user_security_password += this.$ml.get('register_invalid_password_digit')
        this.state.user_security_password = false
      } 
      if(securityPassword.length >= 8 && securityPassword.match(lowerCaseLetters) && securityPassword.match(upperCaseLetters) && securityPassword.match(numbers)){
        this.invalidFeedback.user_security_password = ''
        this.state.user_security_password = true
      }
      this.checkRepeatSecurityPassword(this.newMember.user_repeat_security_password)
    },
    checkRepeatSecurityPassword (repeatSecurityPassword) {
      if (repeatSecurityPassword !== this.newMember.user_security_password) {
        this.invalidFeedback.user_repeat_security_password = this.$ml.get('register_invalid_password_match')
        this.state.user_repeat_security_password = false
      } else {
        this.invalidFeedback.user_repeat_security_password = ''
        this.state.user_repeat_security_password = true
      }
    },
  },
}
</script>
<style scoped>
.card-header {
    background-color: #ffffff;
}
</style>
