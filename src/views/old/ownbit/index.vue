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
                  <b-form @submit="onSubmit">
                    <strong class="text-dark" style="margin: 20px;">Deposit INFO</strong>
                    <hr>
                    <b-form-group
                      id="Currency"
                      label="Currency * "
                      label-for="currency"
                      label-align-sm="right" 
                      :label-cols="5"
                    >
                      <b-form-input
                        id="Currency"
                        v-model="form.currency"
                        type="text"
                        required
                      />
                    </b-form-group>

                    <b-form-group
                      id="amount"
                      label="Amount * "
                      label-for="amount"
                      label-align-sm="right" 
                      :label-cols="5"
                    >
                      <b-form-input
                        id="amount"
                        v-model="form.amount"
                        type="text"
                        required
                      />
                    </b-form-group>

                    </b-form-group>
                    <div slot="footer" style="float: center; align-items: center; text-align:center;margin: 10px;">
                      <b-button type="submit" variant="success"><i class="fa fa-dollar"></i> Process</b-button>
                    </div>
                  </b-form>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col sm="12" lg="8">
        <b-card no-body header-bg-variant="white">
          <b-card-header style="float: center; align-items: center; text-align:center;">
            <strong class="text-dark">Transfer</strong>
          </b-card-header>
          <b-card-body>
            <b-row>
              <b-col cols="12" sm="12" md="12">
                <qrcode-vue :value="requestedOrder.address" :size="size" level="H"></qrcode-vue>
              </b-col>
              <b-col cols="12" sm="12" md="12">
                Address: {{ requestedOrder.address }}
              </b-col>
              <b-col cols="12" sm="12" md="12">
                Requested Amount: {{ requestedOrder.amount }} 
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import store from '@/store'
export default {
  name: 'walletPurchase',
  components: {
    QrcodeVue,
  },
  data: () => {
    return { 
      form: {
        currency: '',
        amount: '0',
      },
      requestedOrder: {
        address: '',
        amount: ''
      },
      size: 200,
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      const self = this
      var objParams = {
        e: 'getBitBillOrder',
        form: self.form,
      }
      this.$api.apiRequestTrans(objParams)
        .then((response) => {
          if (response.status === 'SUCCESS') {
            var order = JSON.parse(response.order);
            console.log(order.data.crypto)
            self.requestedOrder.address = order.data.crypto[0].address
            self.requestedOrder.amount = order.data.crypto[0].requestedAmount
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    notifice (type, title, message) {
      this.$notification[type]({
        message: title,
        description: message
      })
    }
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