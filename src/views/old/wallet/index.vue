<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12" lg="12">
        <b-card no-body>
          <b-tabs
            card fill
            active-nav-item-class="font-weight-bold text-uppercase text-secondary"
          >
            <b-tab title="My Wallet" active>
              <wallet-tab />
            </b-tab>
            <b-tab title="Transaction History" >
              <transaction-tab />
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import WalletTab from './WalletTab'
import TransactionTab from './TransactionTab'

export default {
  name: 'wallet',
  components: {
    WalletTab,
    TransactionTab
  },
  data: () => {
    return { 
    }
  }
}
</script>
