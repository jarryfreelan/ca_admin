<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12" lg="12">
        <b-card no-body header-bg-variant="white">
          <b-card-header style="float: center; align-items: center; text-align:center;">
            <strong class="text-dark">PERSONAL INFO</strong>
          </b-card-header>
          <b-card-body>
            <b-row>
              <b-col cols="12" sm="12" md="12" style="float: right; align-items: right; text-align:right;">
                <b-dropdown :text="$ml.get('langB')" variant="outline-danger" class="m-2" size="sm">
                  <b-dropdown-item @click = "switchLang('en')"><i class="flag-icon flag-icon-us" title="EN" id="en"></i> English</b-dropdown-item>
                  <b-dropdown-item @click = "switchLang('cn')"><i class="flag-icon flag-icon-cn" title="CN" id="cn"></i> 中文</b-dropdown-item>
                </b-dropdown>
              </b-col>
            </b-row>
            <br>
            <b-row>
              <b-col cols="12" sm="12" md="12">
                <b-form @submit="onSubmit">
                  <b-row>
                    <b-col cols="12" sm="12" md="6">

                      <b-form-group
                        label="Username "
                        label-for="username"
                        size="sm"
                        label-align-sm="right" 
                        :label-cols="4"
                        >
                        <b-form-input id="username" type="text" v-model="username" disabled required></b-form-input>
                      </b-form-group>

                      <b-form-group
                        label="Full Name * "
                        label-for="fullname"
                        size="sm"
                        label-align-sm="right" 
                        :label-cols="4"
                        >
                        <b-form-input id="fullname" type="text" v-model="profile.user_fullname" required></b-form-input>
                      </b-form-group>
                      
                      <b-form-group
                        label="Email * "
                        label-for="email"
                        label-align-sm="right" 
                        :label-cols="4"
                        :invalid-feedback="invalidFeedbackEmail"
                        :state="stateEmail"
                        >
                        <b-form-input id="email" type="email" v-model="profile.user_email" @input="checkEmail" required></b-form-input>
                      </b-form-group>
                      <b-form-group
                        label="Date of Birth * "
                        label-for="dob"
                        label-align-sm="right" 
                        :label-cols="4"
                        >
                        <a-date-picker style="width: 100%" id="dob" v-model="profile.user_dob" size="large" required />
                      </b-form-group>
                      <b-form-group
                        label="Gender * "
                        label-for="gender"
                        label-align-sm="right" 
                        :label-cols="4"
                        >
                        <b-form-select id="gender" v-model="profile.user_gender" required>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </b-form-select>
                      </b-form-group>
                      <b-form-group
                        label="Mobile * "
                        label-for="mobile"
                        label-align-sm="right" 
                        :label-cols="4"
                        :invalid-feedback="invalidFeedbackPhone"
                        :state="statePhone"
                        >
                        <b-input-group>
                          <vue-tel-input
                            class="form-control"
                            id="mobile"
                            v-model="profile.user_phone"
                            required
                            :valid-characters-only="true"
                            style="padding: 3px 0 3px 0;"
                            @input="checkPhone"
                          />
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                    <b-col cols="12" sm="12" md="6">
                      <b-form-group
                        label="Address 1 * "
                        label-for="address1"
                        label-align-sm="right" 
                        :label-cols="4"
                        >
                        <b-form-input id="address1" type="text" v-model="profile.user_address1" required></b-form-input>
                      </b-form-group>
                      <b-form-group
                        label="Address 2 "
                        label-for="address2"
                        label-align-sm="right" 
                        :label-cols="4"
                        >
                        <b-form-input id="address1" type="text" v-model="profile.user_address2"></b-form-input>
                      </b-form-group>
                      <b-form-group
                        label="PostCode * "
                        label-for="postcode"
                        label-align-sm="right" 
                        :label-cols="4"
                        >
                        <b-form-input id="postcode" type="text" v-model="profile.user_postcode" required></b-form-input>
                      </b-form-group>
                      <b-form-group
                        label="Country * "
                        label-for="country"
                        label-align-sm="right" 
                        :label-cols="4"
                        >
                        <b-form-select id="country" required v-model="profile.user_country">
                          <option :value="country" v-for="country in countryList" :key="country">
                            {{ country }}
                          </option>
                        </b-form-select>
                      </b-form-group>
                      <b-form-group
                        label="State * "
                        label-for="state"
                        label-align-sm="right" 
                        :label-cols="4"
                        >
                        <b-form-input id="state" type="text" v-model="profile.user_state" required></b-form-input>
                      </b-form-group>
                      <b-form-group
                        label="City * "
                        label-for="city"
                        label-align-sm="right" 
                        :label-cols="4"
                        >
                        <b-form-input id="city" type="text" v-model="profile.user_city" required></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                      
                  <div slot="footer" style="float: center; align-items: center; text-align:center;margin: 10px;">
                    <b-button type="submit" variant="success">Update</b-button>
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
import store from '@/store'
import moment from 'moment'
import { globalCountryData } from './globalCountry'
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'

export default {
  name: 'personalInfo',
  components: {
    AppHeaderDropdown,
  },
  data: () => {
    return { 
      username: '',
      id: '',
      profile: [],
      countryList: globalCountryData,
      stateEmail: true,
      invalidFeedbackEmail: '',
      statePhone: true, 
      invalidFeedbackPhone: '',
    }
  },
  mounted () {
    this.username = store.getters.username
    this.id = store.getters.id
    this.getUserProfile()

    if(this.$ml.get('lang') === 'cn') {
      moment.locale('zh-cn')
    } else {
      moment.locale('en')
    }
  },
  methods: {
    switchLang (lang) {
      this.$ml.change(lang)
      localStorage.setItem('lang', lang)
      this.$router.go()
    },
    getUserProfile() {
      const self = this
      var objParams = {
        e: 'getUserData'
      }
      this.$api.apiRequest(objParams)
        .then((response) => {
          if (response.status === 'SUCCESS') {
            self.profile = response.profile
            self.profile.user_dob = this.$datetime.dateStringToMoment(self.profile.user_dob)
          }
        })
        .catch((error) => {
          self.notifice('error', 'error', 'error')
        })
    },
    onSubmit (evt) {
      evt.preventDefault()
      this.profile.user_dob_string = this.$datetime.momentToDateString(this.profile.user_dob)
      const self = this
      var objParams = {
        e: 'updateUserProfile',
        form: self.profile,
      }
      this.$api.apiRequest(objParams)
        .then((response) => {
          if (response.status === 'SUCCESS') {
            store.commit('update_user', JSON.stringify(response.profile))
            self.notifice('success', 'Profile is updated', '')
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
    checkEmail (email) {
      var re = /\S+@\S+\.\S+/

      if (!email.match(re)) {
        this.invalidFeedbackEmail = this.$ml.get('profile_invalid_email')
        this.stateEmail = false
      } else {
        this.invalidFeedbackEmail = ''
        this.stateEmail = true
      }

      if(this.stateEmail) {
        const self = this
        var objParams = {
          e: 'checkExistingEmail',
          email: email
        }
        this.$api.apiRequest(objParams)
          .then((response) => {
            if (response.status === 'SUCCESS') {
              self.stateEmail = true
              self.invalidFeedbackEmail = ''
            }
          })
          .catch((error) => {
            self.stateEmail = false
            self.invalidFeedbackEmail = this.$ml.get('profile_invalid_existing_email')
          })
      }  
    },
    checkPhone (formattedNumber, { number, valid, country }) {
      this.profile.user_phone = number.international
      if (!valid) {
        if (number.international) {
          this.invalidFeedbackPhone = this.$ml.get('profile_invalid_phone')
          this.statePhone = false
        } else {
          this.invalidFeedbackPhone = ''
          this.statePhone = true
        }
      } else {
        this.invalidFeedbackPhone = ''
        this.statePhone = true
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
