<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12" lg="8">
        <b-card no-body header-bg-variant="white">
          <b-card-header style="float: center; align-items: center; text-align:center;">
            <strong class="text-dark">DEPOSIT</strong>
          </b-card-header>
          <b-card-body>
            <b-row>
              <b-col cols="12" sm="12" md="12">
                <a-spin tip="Loading..." :spinning="purchaseSpinner" size="large">
                  <b-form @submit="onSubmit">
                    <strong class="text-dark" style="margin: 20px;">Deposit INFO</strong>
                    <hr>
                    <b-form-group
                      id="currency"
                      label="Currency Type * "
                      label-for="currency"
                      label-align-sm="right" 
                      :label-cols="5"
                    >
                      <b-form-select 
                        id="currency"
                        required
                        v-model="form.currency" 
                        @change="checkPurchaseCurrency(form.currency)"
                        style="max-width: 200px;" 
                      >
                        <option :value="coin" v-for="coin  in acceptedCoins" :key="coin">
                          {{ coin }}
                        </option>
                      </b-form-select>
                    </b-form-group>
                    <b-form-group
                      id="currency"
                      label="Amount * "
                      label-for="currency"
                      label-align-sm="right" 
                      :label-cols="5"
                      :invalid-feedback="invalidFeedback.currency"
                      :state="state.currency"
                    >
                      <b-form-input
                        id="amount"
                        v-model="form.amount"
                        type="number"
                        step="any" 
                        required
                        style="max-width: 200px;" 
                        @input="checkPurchaseCoinAmount"
                      />
                    </b-form-group>
                    <b-form-group
                      id="usdAmount"
                      label="Amount (USD) * "
                      label-for="usdAmount"
                      label-align-sm="right" 
                      :label-cols="5"
                      description="Minimum Topup Amount: $20. "
                    >
                      <b-input-group class="mb-3">
                        <b-form-input
                          id="usdAmount"
                          v-model="form.usdAmount"
                          type="number"
                          step="any"
                          required
                          @input="checkPurchaseUSDAmount"
                          style="max-width: 200px;" 
                          disabled
                        />
                      </b-input-group>
                    </b-form-group>
                    <b-form-group
                      id="email"
                      label="Email * "
                      label-for="email"
                      label-align-sm="right" 
                      :label-cols="5"
                      :invalid-feedback="invalidFeedback.email"
                      :state="state.email"
                    >
                      <b-input-group>
                        <b-form-input
                          id="email"
                          v-model="form.email"
                          type="email"
                          required
                          @input="checkEmail"
                          style="max-width: 400px;"
                        />
                      </b-input-group>
                    </b-form-group>
                    <b-form-group
                      id="name"
                      label="Name * "
                      label-for="Name"
                      label-align-sm="right" 
                      :label-cols="5"
                      :invalid-feedback="invalidFeedback.name"
                      :state="state.name"
                    >
                      <b-input-group class="mb-3">
                        <b-form-input
                          id="name"
                          v-model="form.name"
                          type="text"
                          style="max-width: 400px;"
                        />
                      </b-input-group>
                    </b-form-group>

                    <br><br>
                    <strong class="text-dark" style="margin: 20px;">Confirmation</strong>
                    <hr>
                    <b-form-group
                      id="securityPassword"
                      label="Security Password * "
                      label-for="securityPassword"
                      label-align-sm="right" 
                      :label-cols="5"
                    >
                      <b-input-group class="mb-3">
                        <b-form-input
                          id="securityPassword"
                          v-model="form.auth_security"
                          type="password" 
                          style="max-width: 400px;"
                          required 
                        />
                      </b-input-group>
                    </b-form-group>
                    <div slot="footer" style="float: center; align-items: center; text-align:center;margin: 10px;">
                      <b-button type="submit" variant="success"><i class="fa fa-dollar"></i> Process</b-button>
                    </div>
                  </b-form>
                </a-spin>
              </b-col>
            </b-row>
            <b-modal id="purchase-pay-now-modal" hide-footer>
              <template v-slot:modal-title>
                <h4><li class="fa fa-edit" style="padding-right: 10px;" /><strong>Deposit Detail</strong></h4>
              </template>
              <div>
                <dl class="row">
                  <img :src="qr_url" width="80%">

                  <dt class="col-sm-3">Address</dt>
                  <dd class="col-sm-9">{{ cp_address }}</dd>

                  <dt class="col-sm-3">Buyer Name</dt>
                  <dd class="col-sm-9">{{ form.name }}</dd>

                  <dt class="col-sm-3">Buyer Email</dt>
                  <dd class="col-sm-9">{{ form.email }}</dd>

                  <dt class="col-sm-3">Amount</dt>
                  <dd class="col-sm-9">{{ form.amount }} {{ form.currency }}</dd>

                  <dt class="col-sm-3">Amount (USD)</dt>
                  <dd class="col-sm-9">$ {{ form.usdAmount }}</dd>
                </dl>
                <b-button block squared variant="success" block @click="payNow">Pay Now</b-button>
              </div>
            </b-modal>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import store from '@/store'
export default {
  name: 'walletPurchase',
  data: () => {
    return { 
      form: {
        currency: '',
        amount: '0',
        usdAmount: '0',
        email: '',
        name: '',
        auth_security: '',
      },
      invalidFeedback: {
        currency: '',
        amount: '',
        email: '',
        name: '',
      },
      state: {
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
      qr_url: '',
      cp_address: '',
    }
  },
  mounted () {
    this.purchaseSpinner = true
    this.getUserCoinPaymentProfile()
    this.getAcceptedCoins()
  },
  methods: {
    getUserCoinPaymentProfile() {
      const self = this
      var objParams = {
        e: 'getUserCoinPaymentDeposit'
      }
      this.$api.apiRequestTrans(objParams)
        .then((response) => {
          if (response.status === 'SUCCESS') {
            self.form.name = response.userCP.user_fullname
            self.form.email = response.userCP.user_email_coinpayment
          }
        })
        .catch((error) => {
          
        })
    },
    getAcceptedCoins() {
      const self = this
      var objParams = {
        e: 'wallet-accepted-currency'
      }
      this.$api.apiRequestTrans(objParams)
        .then((response) => {
          if (response.status === 'SUCCESS') {
            self.acceptedCoins = response.coins

            if(self.acceptedCoins.length > 0) {
              self.form.currency = self.acceptedCoins[0]
              self.checkPurchaseCurrency(self.form.currency)
              self.purchaseSpinner = false
            }
          }
        })
        .catch((error) => {
          self.notifice('error', 'error', '')
        })
    },
    onSubmit (evt) {
      evt.preventDefault()
      const self = this
      self.purchaseSpinner = true
      var objParams = {
        e: 'processDeposit',
        form: self.form,
      }
      this.$api.apiRequestTrans(objParams)
        .then((response) => {
          if (response.status === 'SUCCESS') {
            self.gateway_url = response.status_url
            console.log(response)
            self.qr_url = response.qr_code
            self.cp_address = response.address
            self.$bvModal.show('purchase-pay-now-modal')
          }
          self.purchaseSpinner = false
        })
        .catch((error) => {
          self.purchaseSpinner = false
          this.$modal.error({
            title: 'Transaction Fail',
            content: error.msg,
          })
        })
    },
    payNow () {
      window.open(this.gateway_url, '_blank')
      this.$bvModal.hide('purchase-pay-now-modal')
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
        e: 'checkCoinPaymentsRates',
        currency: currency,
      }
      this.$api.apiRequestTrans(objParams)
        .then((response) => {
          if (response.status === 'SUCCESS') {
            self.usd_to_btc = response.usd_to_btc
            self.coin_btc_rate = response.coin_btc_rate
            self.checkPurchaseCoinAmount(self.form.amount)
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
      this.form.usdAmount = parseFloat(coinAmount * (this.coin_btc_rate / this.usd_to_btc)).toFixed(2);

      if(coinAmount<=0) {
        this.invalidFeedback.currency = 'Amount cannot be 0'
        this.state.currency = false
      } else {
        this.invalidFeedback.currency = ''
        this.state.currency = true
      }
    },
    checkPurchaseUSDAmount(usdAmount) {
      this.form.amount = parseFloat(usdAmount * (this.usd_to_btc / this.coin_btc_rate)).toFixed(8);

      if(usdAmount<=0) {
        this.invalidFeedback.currency = 'Amount cannot be 0'
        this.state.currency = false
      } else {
        this.invalidFeedback.currency = ''
        this.state.currency = true
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
    },
  }
}
</script>

<style scoped>
  .card-header {
    background-color: #ffffff;
  }
  .spin-content {
    border: 1px solid #91d5ff;
    background-color: #e6f7ff;
    padding: 30px;
  }
</style>