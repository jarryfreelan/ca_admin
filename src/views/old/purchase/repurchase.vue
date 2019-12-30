<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12" lg="12">
        <b-card no-body header-bg-variant="white">
          <b-card-header style="float: center; align-items: center; text-align:center;">
            <strong class="text-dark">PURCHASE PACKAGE</strong>
          </b-card-header>
          <b-card-body>
            <b-row>
              <b-col cols="12" sm="12" md="12">
                <b-form @submit="onSubmit">
                  <strong class="text-dark" style="margin: 20px;">PACKAGE INFO</strong>
                  <hr>
                  <b-form-group
                    label="Package * "
                    label-for="package"
                    size="sm"
                    label-align-sm="right" 
                    :label-cols="4"
                    >
                    <b-form-select 
                      id="package"
                      required
                      v-model="purchase.package" 
                      @change="selectPackage"
                      style="max-width: 300px;"
                    >
                      <option value="0">-- Please Select Package --</option>
                      <option :value="pack.package_id" v-for="pack in packages" :key="pack.package_id">
                        Voucher ${{ pack.package_amount }} ( {{ pack.package_float }}% per month )
                      </option>
                    </b-form-select>
                  </b-form-group>
                  <b-form-group
                    label="Payment Type * "
                    label-for="paymentType"
                    label-align-sm="right" 
                    :label-cols="4"
                    >
                    <b-form-select 
                      id="paymentType"
                      required
                      v-model="purchase.payment_type"
                      style="max-width: 300px;"
                    >
                      <option :value="paymentType.name" v-for="paymentType in paymentTypes" :key="paymentType.name">
                        {{ paymentType.type }} 
                      </option>
                    </b-form-select>
                  </b-form-group>

                  <br><br>
                  <strong class="text-dark" style="margin: 20px;">Purchase Fee </strong>
                  <hr>
                  <b-form-group
                    label="E-wallet (Balance)"
                    label-for="walletbalance"
                    size="sm"
                    label-align-sm="right" 
                    :label-cols="4"
                    :invalid-feedback="invalidFeedbackBalance"
                    :state="stateBalance"
                    >
                    <b-form-input id="wallatBalance" v-model="purchase.balance" type="number" disabled style="max-width: 300px;"></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="Purchase Fee"
                    label-for="purchaseFee"
                    size="sm"
                    label-align-sm="right" 
                    :label-cols="4"
                    >
                    <b-form-input id="purchaseFee" v-model="purchase.payment_fee" type="number" disabled style="max-width: 300px;"></b-form-input>
                  </b-form-group>

                  <br><br>
                  <strong class="text-dark" style="margin: 20px;">Confirmation</strong>
                  <hr>
                  <b-form-group
                    label="My Security Password * "
                    label-for="mySecurityPassword"
                    size="sm"
                    label-align-sm="right" 
                    :label-cols="4"
                    >
                    <b-form-input id="mySecurityPassword" type="password" v-model="purchase.auth_security" style="max-width: 300px;"></b-form-input>
                  </b-form-group>
                      
                  <div slot="footer" style="float: center; align-items: center; text-align:center;margin: 10px;">
                    <b-button type="submit" variant="success">Purchase</b-button>
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

const paymentTypes = [
  {
    name: 'e-wallet',
    type: 'E-Wallet',
  }
]

export default {
  name: 'repurchase',
  components: {
  },
  data: () => {
    return { 
      packages: [],
      paymentTypes: paymentTypes,
      wallet: [],
      wallatBalance: 0, 
      purchase: {
        package: 0,
        package_amount: 0,
        package_float: 0,
        balance: 0,
        payment_type: 'e-wallet',
        payment_fee: 0,
        auth_security: '',
      },
      invalidFeedbackBalance: '',
      stateBalance: true,
    }
  },
  mounted () {
    this.getWallet()
    this.getPackages()
  },
  methods: {
    getWallet() {
      const self = this
      var objParams = {
        e: 'getWallet'
      }
      this.$api.apiRequest(objParams)
        .then((response) => {
          if (response.status === 'SUCCESS') {
            self.wallet = response.wallet
            self.wallet.asset = parseFloat(response.wallet.asset).toFixed(2)
            self.wallet.bonus = parseFloat(response.wallet.bonus).toFixed(2)
            self.purchase.balance = self.wallet.asset
            self.wallatBalance = self.wallet.asset
          }
        })
        .catch((error) => {
          console.log(error)
          self.notifice('error', 'Error', '')
        })
    },
    getPackages() {
      const self = this
      var objParams = {
        e: 'getPackages'
      }
      this.$api.apiRequestTrans(objParams)
        .then((response) => {
          if (response.status === 'SUCCESS') {
            self.packages = response.packages
          }
        })
        .catch((error) => {
          console.log(error)
          self.notifice('error', 'Error', '')
        })
    },
    notifice (type, title, message) {
      this.$notification[type]({
        message: title,
        description: message
      })
    },
    selectPackage() {
      if(this.purchase.package !== 0) {
        var selectedPackage = this.packages.find(x => x.package_id === this.purchase.package)
        if(selectedPackage !== undefined) {
          this.purchase.payment_fee = parseFloat(selectedPackage.package_amount).toFixed(2)
          this.purchase.balance = parseFloat(this.wallatBalance) - parseFloat(this.purchase.payment_fee)
          this.purchase.package_amount = parseFloat(selectedPackage.package_amount).toFixed(2)
          this.purchase.package_float = parseFloat(selectedPackage.package_float)
        } else {
          this.purchase.balance = parseFloat(this.wallatBalance)
          this.purchase.payment_fee = 0
          this.purchase.package_amount = 0
          this.purchase.package_float = 0
        }
      } else {
        this.purchase.balance = parseFloat(this.wallatBalance)
        this.purchase.payment_fee = 0
        this.purchase.package_amount = 0
        this.purchase.package_float = 0
      }
      this.checkBalance(this.purchase.balance)
    },
    checkBalance(balance){
      if(balance < 0) {
        this.invalidFeedbackBalance = 'Balance is not enough'
        this.stateBalance = false
      } else {
        this.invalidFeedbackBalance = ''
        this.stateBalance = true
      }
    },
    onSubmit (evt) {
      evt.preventDefault()
      const self = this
      self.purchaseSpinner = true
      var objParams = {
        e: 'processPurchasePackage',
        form: self.purchase,
      }

      if(!this.stateBalance) {
        this.$modal.error({
          title: 'Purchase Fail',
          content: 'Balance is not enough',
        })
      } else if(parseInt(this.purchase.package) === 0) {
        this.$modal.error({
          title: 'Purchase Fail',
          content: 'Please select Package',
        })
      } else {
        this.$api.apiRequestTrans(objParams)
          .then((response) => {
            if (response.status === 'SUCCESS') {
              self.notifice('success', 'Purchase Success', '')
              this.$router.go()
            }
          })
          .catch((error) => {
            self.purchaseSpinner = false
            this.$modal.error({
              title: 'Purchase Fail',
              content: error.msg,
            })
          })
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
