<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12" lg="12">
        <b-card no-body header-bg-variant="white">
          <b-card-header style="float: center; align-items: center; text-align:center;">
            <strong class="text-dark">ACCOUNT INFORMATION</strong>
          </b-card-header>
          <b-card-body>
            <b-row>
              <b-col cols="12" sm="12" md="12">
                <strong class="text-success">Account Overview</strong>
              </b-col>
              <b-col cols="12" sm="12" md="12" style="float: center; align-items: center; text-align:center;margin: 10px;">
                <table width="100%" style="margin: 10px;">
                  <tr>
                    <td width="50%" style="border-right: 1px solid red">
                      <span><h5><strong>{{ username }}</strong></h5></span>
                      <a-tag color="pink">
                        Active
                      </a-tag>
                    </td>
                    <td width="50%">
                      <span><h5><strong>USD {{ package }}</strong></h5></span>
                      <span class="text-muted"><strong>Package</strong></span>
                    </td>
                  </tr>
                </table>
              </b-col>
            </b-row>
            <b-row style="padding-top: 20px;">
              <b-col cols="12" sm="12" md="12">
                <strong class="text-success">Wallets Report</strong>
              </b-col>
              <b-col cols="12" sm="12" md="12" style="float: center; align-items: center; text-align:center;margin: 10px;">
                <table width="100%" style="margin: 10px;">
                  <tr>
                    <td width="50%" style="border-right: 1px solid red">
                      <span><h5><strong>{{ wallet.asset }}</strong></h5></span>
                      <span class="text-muted"><strong>e-Wallet</strong></span>
                    </td>
                    <td width="50%">
                      <span><h5><strong>{{ wallet.bonus }}</strong></h5></span>
                      <span class="text-muted"><strong>Bonus</strong></span>
                    </td>
                  </tr>
                </table>
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
  name: 'accountInfo',
  components: {
  },
  data: () => {
    return { 
      username: '',
      package: '',
      wallet: [],
    }
  },
  mounted () {
    this.username = store.getters.username
    this.getWallet()
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
          }
        })
        .catch((error) => {
          self.notifice('error', 'Error', '')
        })
    },
    notifice (type, title, message) {
      this.$notification[type]({
        message: title,
        description: message
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