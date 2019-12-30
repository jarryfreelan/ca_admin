<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12" lg="12">
        <request-withdawn-card />
      </b-col>
      <b-col sm="12" lg="12">
        <records-card />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import RequestWithdawnCard from './request'
import RecordsCard from './record'

export default {
  name: 'withdraw',
  components: {
    RequestWithdawnCard,
    RecordsCard
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
