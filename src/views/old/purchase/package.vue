<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="3" lg="3">
        <div class="brand-card">
          <div class="brand-card-header" style="background-color: #B87333;">
            <i class="fa fa-trophy"></i>
          </div>
          <div class="brand-card-body">
            <div>
              <div class="text-value">500</div>
              <div class="text-uppercase text-muted small">USD</div>
            </div>
            <div>
              <div class="text-value">7%</div>
              <div class="text-uppercase text-muted small">month</div>
            </div>
          </div>
        </div>
      </b-col>
      <b-col sm="3" lg="3">
        <div class="brand-card">
          <div class="brand-card-header" style="background-color: #C0C0C0;">
            <i class="fa fa-trophy"></i>
          </div>
          <div class="brand-card-body">
            <div>
              <div class="text-value">2000</div>
              <div class="text-uppercase text-muted small">USD</div>
            </div>
            <div>
              <div class="text-value">15%</div>
              <div class="text-uppercase text-muted small">month</div>
            </div>
          </div>
        </div>
      </b-col>
      <b-col sm="3" lg="3">
        <div class="brand-card">
          <div class="brand-card-header" style="background-color: #FFD700;">
            <i class="fa fa-trophy"></i>
          </div>
          <div class="brand-card-body">
            <div>
              <div class="text-value">5000</div>
              <div class="text-uppercase text-muted small">USD</div>
            </div>
            <div>
              <div class="text-value">22%</div>
              <div class="text-uppercase text-muted small">month</div>
            </div>
          </div>
        </div>
      </b-col>
      <b-col sm="3" lg="3">
        <div class="brand-card">
          <div class="brand-card-header" style="background-color: #aa6c39;">
            <i class="fa fa-trophy"></i>
          </div>
          <div class="brand-card-body">
            <div>
              <div class="text-value">10000</div>
              <div class="text-uppercase text-muted small">USD</div>
            </div>
            <div>
              <div class="text-value">30%</div>
              <div class="text-uppercase text-muted small">month</div>
            </div>
          </div>
        </div>
      </b-col>

    </b-row>
  </div>
</template>

<script>
import moment from 'moment'


const packages = [
  {
    package_id: '1',
    package_amount: 500, 
    package_name: '$500 (7% per month floating)',
    package_floating: '7', 
  },
  {
    package_id: '2',
    package_amount: 2000,
    package_name: '$2000 (15% per month floating)', 
    package_floating: '15', 
  },
  {
    package_id: '3',
    package_amount: 5000, 
    package_name: '$5000 (22% per month floating)',
    package_floating: '22', 
  },
  {
    package_id: '4',
    package_amount: 10000, 
    package_name: '$10000 (30% per month floating)',
    package_floating: '30', 
  }
]

export default {
  name: 'package',
  components: {
  },
  data: () => {
    return { 
      packages: [],
    }
  },
  mounted () {
    this.getPackages()
  },
  methods: {
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
  },
}
</script>
<style scoped>
.card-header {
    background-color: #ffffff;
}
</style>
