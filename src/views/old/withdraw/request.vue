<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12" lg="12">
        <b-card no-body header-bg-variant="white">
          <b-card-header style="float: center; align-items: center; text-align:center;">
            <strong class="text-dark">WITHDRAWAL REQUEST</strong>
          </b-card-header>
          <b-card-body>
            <b-row>
              <b-col cols="12" sm="12" md="12">
                <b-form>
                  <b-form-group
                    label="E-Wallet (Balance: 0.00) * "
                    label-for="wallet"
                    size="sm"
                    label-align-sm="right" 
                    :label-cols="4"
                    >
                    <b-form-input id="wallet" type="text" disabled></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="Type * "
                    label-for="type"
                    size="sm"
                    label-align-sm="right" 
                    :label-cols="4"
                    >
                    <b-form-select 
                      id="type"
                      required
                      v-model="selectedWithdraw"
                    >
                      <option :value="withdrawType.id" v-for="withdrawType in withdrawTypes" :key="withdrawType.id">
                        {{ withdrawType.value }} 
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
                      v-model="selectedPayment"
                    >
                      <option :value="paymentType.id" v-for="paymentType in paymentTypes" :key="paymentType.id">
                        {{ paymentType.type }} 
                      </option>
                    </b-form-select>
                  </b-form-group>

                  <b-form-group
                    label="Coin Payment Address * "
                    label-for="paymentAddress"
                    size="sm"
                    label-align-sm="right" 
                    :label-cols="4"
                    >
                    <b-form-input id="paymentAddress" type="text"></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="Amount * "
                    label-for="withdrawAmount"
                    size="sm"
                    label-align-sm="right" 
                    :label-cols="4"
                    >
                    <b-form-input id="withdrawAmount" type="text"></b-form-input>
                  </b-form-group>
\
                  <strong class="text-dark" style="margin: 20px;">Confirmation</strong>
                  <hr>
                  <b-form-group
                    label="My Security Password * "
                    label-for="mySecurityPassword"
                    size="sm"
                    label-align-sm="right" 
                    :label-cols="4"
                    >
                    <b-form-input id="mySecurityPassword" type="password"></b-form-input>
                  </b-form-group>
                      
                  <div slot="footer" style="float: center; align-items: center; text-align:center;margin: 10px;">
                    <b-button type="submit" variant="success">Submit</b-button>
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

const withdrawTypes = [
  {
    id: '1',
    value: 'Coin Payments', 
  }
]

export default {
  name: 'repurchase',
  components: {
  },
  data: () => {
    return { 
      withdrawTypes: withdrawTypes,
      selectedWithdraw: 1,
    }
  }
}
</script>
<style scoped>
.card-header {
    background-color: #ffffff;
}
</style>
