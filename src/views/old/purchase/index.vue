<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12" lg="12">
        <package-card />
      </b-col>
      <b-col sm="12" lg="7">
        <repurchase-card />
      </b-col>
      <b-col sm="12" lg="5">
        <purchased-package-card />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import RepurchaseCard from './repurchase'
import PackageCard from './package'
import PurchasedPackageCard from './purchasedPackage'

export default {
  name: 'purchase',
  components: {
    RepurchaseCard,
    PackageCard,
    PurchasedPackageCard
  },
  data: () => {
    return { 
    }
  }
}
</script>
<style scoped>
.card-header {
    background-color: #ffffff;
}
</style>
