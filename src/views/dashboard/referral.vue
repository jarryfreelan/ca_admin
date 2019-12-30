<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12" lg="12">
        <b-card no-body header-bg-variant="white">
          <b-card-header style="float: center; align-items: center; text-align:center;">
            <strong class="text-dark">REFERRAL LINK</strong>
          </b-card-header>
          <b-card-body>
            <b-row>
              <b-col cols="12" sm="12" md="12" style="float: center; align-items: center; text-align:center;">
                <a :href="urlLink" target="_blank">{{ urlLink }}</a>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12" sm="12" md="12" style="float: center; align-items: center; text-align:center;">
                <li class="fa fa-share-alt" style="padding: 10px;"></li>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12" sm="12" md="12" style="float: center; align-items: center; text-align:center;">
                <qrcode-vue :value="urlLink" :size="size" level="H"></qrcode-vue>
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
  name: 'referrallink',
  components: {
    QrcodeVue,
  },
  data: () => {
    return { 
      urlLink: '',
      size: 200,
      username: '',
    }
  },
  mounted () {
    this.username = store.getters.username
    this.urlLink = 'http://pea2u.com/#/register/'+this.username
  },
}
</script>
<style scoped>
.card-header {
    background-color: #ffffff;
}
</style>
