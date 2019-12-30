<template>
  <div>
    <b-row>
      <b-col cols="12" sm="12" md="12">
        <a-spin tip="Loading..." :spinning="purchaseSpinner" size="large">
          <b-form @submit="onSubmitWithdraw">
            <b-row>
              <b-col sm="12" lg="12">
                <b-alert show variant="warning"><i class="fa fa-star" /> Required 3 working days for company to transfer money to your coin payment account. </b-alert>
              </b-col>
              <b-col cols="12" sm="4" md="4">
                <b-form-group
                  id="currency"
                  label="Currency"
                  label-for="currency"
                  :invalid-feedback="invalidFeedbackPurchase.currency"
                  :state="statePurchase.currency"
                >
                  <b-input-group>
                    <b-input-group-prepend><b-input-group-text><i class="fa fa-bitcoin"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input
                      id="amount"
                      v-model="formWithdraw.amount"
                      type="number"
                      step="any"
                      class="text-right" 
                      required
                      @input="checkPurchaseCoinAmount"
                    />
                    <b-form-select 
                      id="currency"
                      required
                      v-model="formWithdraw.currency" 
                      @change="checkPurchaseCurrency(formWithdraw.currency)"
                      style="max-width: 100px;" 
                    >
                      <option :value="coin" v-for="coin  in acceptedCoins" :key="coin">
                        {{ coin }}
                      </option>
                    </b-form-select>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col cols="12" sm="2" md="2">
                <b-form-group
                  id="usdAmount"
                  label="USD"
                  label-for="usdAmount"
                >
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="fa fa-dollar"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input
                      id="usdAmount"
                      v-model="formWithdraw.usdAmount"
                      type="number"
                      step="any"
                      required
                      @input="checkPurchaseUSDAmount"
                    />
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12" sm="6" md="6">
                <b-form-group
                  id="email"
                  label="Email"
                  label-for="email"
                  :invalid-feedback="invalidFeedbackPurchase.email"
                  :state="statePurchase.email"
                >
                  <b-input-group>
                    <b-input-group-prepend><b-input-group-text>@</b-input-group-text></b-input-group-prepend>
                    <b-form-input
                      id="email"
                      v-model="formWithdraw.email"
                      type="email"
                      required
                      @input="checkEmail"
                    />
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col cols="12" sm="6" md="6">
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12" sm="6" md="6">
                <b-form-group
                  id="name"
                  label="Name"
                  label-for="Name"
                >
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="fa fa-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input
                      id="name"
                      v-model="formWithdraw.name"
                      type="text"
                    />
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col cols="12" sm="6" md="6">
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12" sm="6" md="6">
                <b-form-group
                  id="address"
                  label="Coin Payment Address"
                  label-for="Address"
                  required
                >
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="fa fa-address-card-o"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input
                      id="address"
                      v-model="formWithdraw.address"
                      type="text"
                    />
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col cols="12" sm="6" md="6">
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12" sm="6" md="6">
                <b-button type="submit" variant="primary" block><i class="fa fa-credit-card"></i> Withdraw</b-button>
              </b-col>
              <b-col cols="12" sm="6" md="6">
              </b-col>
            </b-row>
          </b-form>
        </a-spin>
      </b-col>
    </b-row>
    <b-modal id="withdraw-modal" hide-footer>
      <template v-slot:modal-title>
        <h4><li class="fa fa-edit" style="padding-right: 10px;" /><strong>Confirm?</strong></h4>
      </template>
      <div>
        <dl class="row">
          <dt class="col-sm-4">Buyer Name</dt>
          <dd class="col-sm-8">{{ formWithdraw.name }}</dd>

          <dt class="col-sm-4">Buyer Email</dt>
          <dd class="col-sm-8">{{ formWithdraw.email }}</dd>

          <dt class="col-sm-4">Amount</dt>
          <dd class="col-sm-8">{{ formWithdraw.amount }} {{ formWithdraw.currency }}</dd>

          <dt class="col-sm-4">Coin Payment Address</dt>
          <dd class="col-sm-8">{{ formWithdraw.address }} </dd>
        </dl>
        <b-button block squared variant="success" block @click="withdrawNow">Submit</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import store from '@/store'
export default {
  name: 'walletPurchase',
  data: () => {
    return { 
      formWithdraw: {
        currency: '',
        amount: '0',
        usdAmount: '0',
        email: '',
        name: '',
        address: '',
      },
      invalidFeedbackPurchase: {
        currency: '',
        amount: '',
        email: '',
        name: '',
      },
      statePurchase: {
        currency: true,
        amount: true,
        email: true,
        name: true,
      },
      acceptedCoins: [],
      minCoin: 0,
      maxCoin: 0,
      usd_to_btc: 0,
      coin_btc_rate: 0,
      gateway_url: '',
      purchaseSpinner: false,
    }
  },
  mounted () {
    this.purchaseSpinner = true
    this.formWithdraw.name = store.getters.username
    this.formWithdraw.email = store.getters.email
    this.getAcceptedCoins()
  },
  methods: {
    getAcceptedCoins() {
      const self = this
      var objParams = {
        e: 'wallet-accepted-currency'
      }
      this.$api.apiRequest(objParams)
        .then((response) => {
          if (response.status === 'SUCCESS') {
            self.acceptedCoins = response.coins

            if(self.acceptedCoins.length > 0) {
              self.formWithdraw.currency = self.acceptedCoins[0]
              self.checkPurchaseCurrency(self.formWithdraw.currency)
              self.purchaseSpinner = false
            }

          } else {
            // self.notifice('error', this.$ml.get('fail_activate_2fa'), this.$ml.get('authentication_app_fail_activate_2fa'))
          }
        })
        .catch((error) => {
          // self.notifice('error', this.$ml.get('fail_activate_2fa'), this.$ml.get('authentication_app_fail_activate_2fa'))
        })
    },
    onSubmitWithdraw (evt) {
      evt.preventDefault()
      this.$bvModal.show('withdraw-modal')
    },
    withdrawNow () {
      const self = this
      self.purchaseSpinner = true
      var objParams = {
        e: 'wallet-withdraw-step1',
        form: self.formWithdraw,
      }
      this.$api.apiRequest(objParams)
        .then((response) => {
          if (response.status === 'SUCCESS') {
            
            this.$bvModal.hide('withdraw-modal')
            this.$router.push('/wallet/transaction-history')
            
            // self.notifice('success', this.$ml.get('success_activate_2fa'), this.$ml.get('authentication_app_activated'))
          } else {
            // self.notifice('error', this.$ml.get('fail_activate_2fa'), this.$ml.get('authentication_app_fail_activate_2fa'))
          }
          self.purchaseSpinner = false
        })
        .catch((error) => {
          console.log(error)
          self.purchaseSpinner = false
          this.$modal.error({
            title: 'Transaction Fail',
            content: error.msg,
          })
          this.$bvModal.hide('withdraw-modal')
          this.$router.push('/wallet/transaction-history')
          // self.notifice('error', this.$ml.get('fail_activate_2fa'), this.$ml.get('authentication_app_fail_activate_2fa'))
        })
          
    },
    notifice (type, title, message) {
      this.$notification[type]({
        message: title,
        description: message
      })
    },
    checkPurchaseCurrency(currency) {
      const self = this
      var objParams = {
        e: 'wallet-rate-coin-usd',
        currency: currency,
      }
      this.$api.apiRequest(objParams)
        .then((response) => {
          if (response.status === 'SUCCESS') {
            self.usd_to_btc = response.usd_to_btc
            self.coin_btc_rate = response.coin_btc_rate
            self.checkPurchaseCoinAmount(self.formWithdraw.amount)
          } else {
            self.usd_to_btc = 0
            self.coin_btc_rate = 0
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    checkPurchaseCoinAmount(coinAmount) {
      this.formWithdraw.usdAmount = parseFloat(coinAmount * (this.coin_btc_rate / this.usd_to_btc)).toFixed(2);

      if(coinAmount<=0) {
        this.invalidFeedbackPurchase.currency = 'Amount cannot be 0'
        this.statePurchase.currency = false
      } else {
        this.invalidFeedbackPurchase.currency = ''
        this.statePurchase.currency = true
      }
    },
    checkPurchaseUSDAmount(usdAmount) {
      this.formWithdraw.amount = parseFloat(usdAmount * (this.usd_to_btc / this.coin_btc_rate)).toFixed(8);

      if(usdAmount<=0) {
        this.invalidFeedbackPurchase.currency = 'Amount cannot be 0'
        this.statePurchase.currency = false
      } else {
        this.invalidFeedbackPurchase.currency = ''
        this.statePurchase.currency = true
      }
    },
    checkEmail (email) {
      var re = /\S+@\S+\.\S+/

      if (!email.match(re)) {
        this.invalidFeedbackPurchase.email = this.$ml.get('invalid_email')
        this.statePurchase.email = false
      } else {
        this.invalidFeedbackPurchase.email = ''
        this.statePurchase.email = true
      } 
    },
  }
}
</script>

<style scoped>
  .spin-content {
    border: 1px solid #91d5ff;
    background-color: #e6f7ff;
    padding: 30px;
  }
</style>