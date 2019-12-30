<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col cols="12" sm="12" md="12">
          <b-row>
            <b-col cols="12" sm="12" md="6">
              <h6 class="text-success">Total Asset: <strong>USD 29.703</strong></h6>
            </b-col>
            <b-col cols="12" sm="12" md="6">
              <h6 class="text-success text-right">Amount Allowed Withdraw: <strong>USD 29.703</strong></h6>
            </b-col>
          </b-row>
        <br>
      </b-col>
      <b-col cols="12" sm="12" md="12">
        <b-tabs
          active-nav-item-class="font-weight-bold text-uppercase text-secondary"
          class="bg-light"
          card
        >
          <b-tab title="Asset" active>
            <b-row>
              <b-col sm="6" lg="4">
                <b-card :no-body="true">
                  <b-card-body class="p-0 clearfix">
                    <i class="fa fa-bitcoin bg-primary p-4 font-2xl mr-3 float-left"></i>
                    <div class="h5 text-primary mb-0 pt-3">$29.703</div>
                    <div class="text-muted text-uppercase font-weight-bold font-xs">Asset</div>
                  </b-card-body>
                </b-card>
              </b-col>
              <b-col sm="6" lg="4">
                <b-card :no-body="true">
                  <b-card-body class="p-0 clearfix">
                    <i class="fa fa-leaf bg-danger p-4 font-2xl mr-3 float-left"></i>
                    <div class="h5 text-danger mb-0 pt-3">$29.703</div>
                    <div class="text-muted text-uppercase font-weight-bold font-xs">Bonus</div>
                  </b-card-body>
                </b-card>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Purchase">
            <wallet-purchase />
          </b-tab>
          <b-tab title="Withdraw" >
            <wallet-withdraw />
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import WalletPurchase from './components/walletPurchase'
import WalletWithdraw from './components/walletWithdraw'
export default {
  name: 'WalletTab',
  components: {
    WalletPurchase,
    WalletWithdraw
  },
  data: () => {
    return { 
    }
  }
}
</script>