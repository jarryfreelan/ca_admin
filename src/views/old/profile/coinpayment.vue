<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12" lg="12">
        <b-card no-body header-bg-variant="white">
          <b-card-header style="float: center; align-items: center; text-align:center;">
            <strong class="text-dark">CoinPayments Info</strong>
          </b-card-header>
          <b-card-body>
            <a-spin tip="Loading..." :spinning="purchaseSpinner" size="large">
              <b-form @submit="onSubmit">
                <b-row>
                  <b-col cols="12" sm="12" md="6">
                    <b-form-group
                      label="CoinPayments Email * "
                      label-for="currentPassword"
                      label-align-sm="right" 
                      :label-cols="4"
                      >
                      <b-form-input id="currentPassword" type="email" v-model="profileCP.user_email_coinpayment" required></b-form-input>
                    </b-form-group>
                    <br><br>
                    <b-alert show variant="warning">
                      <ul>
                        <li class="text-muted"> Please fill your CoinPayments Account Correctly. </li>
                        <li class="text-muted"> Any incorrect information will cause withdrawal request unsuccessful. </li>
                      </ul>
                    </b-alert>
                  </b-col>
                  <b-col cols="12" sm="12" md="6">
                    <b-form-group
                      label="First Preferred Currency * "
                      label-for="user_prefered_currency1"
                      label-align-sm="right" 
                      :label-cols="6"
                      >
                      <b-form-select id="user_prefered_currency1" v-model="profileCP.user_prefered_currency1">
                        <option :value="coin" v-for="coin in acceptedCoins" :key="coin">
                          {{ coin }}
                        </option>
                      </b-form-select>
                    </b-form-group>
                    <b-form-group
                      label="Second Preferred Currency * "
                      label-for="user_prefered_currency2"
                      label-align-sm="right" 
                      :label-cols="6"
                      >
                      <b-form-select id="user_prefered_currency2" v-model="profileCP.user_prefered_currency2">
                        <option :value="coin" v-for="coin in acceptedCoins" :key="coin">
                          {{ coin }}
                        </option>
                      </b-form-select>
                    </b-form-group>
                    <b-form-group
                      label="Third Preferred Currency * "
                      label-for="user_prefered_currency3"
                      label-align-sm="right" 
                      :label-cols="6"
                      >
                      <b-form-select id="user_prefered_currency3" v-model="profileCP.user_prefered_currency3">
                        <option :value="coin" v-for="coin in acceptedCoins" :key="coin">
                          {{ coin }}
                        </option>
                      </b-form-select>
                    </b-form-group>
                  </b-col>
                </b-row>
                <div slot="footer" style="float: center; align-items: center; text-align:center;margin: 10px;">
                  <b-button type="submit" variant="success">Update</b-button>
                </div>
              </b-form>
            </a-spin>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>

export default {
  name: 'coinPayment',
  components: {
  },
  data: () => {
    return { 
      acceptedCoins: [],
      purchaseSpinner: false,
      profileCP: [],
    }
  },
  mounted () {
    this.purchaseSpinner = true
    this.getAcceptedCoins()
    this.getUserCoinpayments()
  },
  methods: {
    getAcceptedCoins() {
      const self = this
      var objParams = {
        e: 'acceptedCurrency'
      }
      this.$api.apiRequest(objParams)
        .then((response) => {
          if (response.status === 'SUCCESS') {
            self.acceptedCoins = response.coins

            if(self.acceptedCoins.length > 0) {
              self.purchaseSpinner = false
            }

          }
        })
        .catch((error) => {
          self.notifice('error', 'error', '')
        })
    },
    notifice (type, title, message) {
      this.$notification[type]({
        message: title,
        description: message
      })
    },
    getUserCoinpayments() {
      const self = this
      var objParams = {
        e: 'getUserCoinPayment'
      }
      this.$api.apiRequest(objParams)
        .then((response) => {
          if (response.status === 'SUCCESS') {
            self.profileCP = response.profileCP
          }
        })
        .catch((error) => {
          self.notifice('error', 'error', 'error')
        })
    },
    onSubmit (evt) {
      evt.preventDefault()
      const self = this
      var objParams = {
        e: 'updateUserCoinPayment',
        form: self.profileCP,
      }
      this.$api.apiRequest(objParams)
        .then((response) => {
          if (response.status === 'SUCCESS') {
            self.notifice('success', 'User CoinPayments Account is updated', '')
          }
        })
        .catch((error) => {
          self.notifice('error', 'error', 'error')
        })
    },
  }

}
</script>
<style scoped>
.card-header {
    background-color: #ffffff;
}
</style>
