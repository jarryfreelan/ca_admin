<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12" lg="12">
        <b-card no-body header-bg-variant="white">
          <b-card-header style="float: center; align-items: center; text-align:center;">
            <strong class="text-dark">PACKAGES</strong>
          </b-card-header>
          <b-card-body>
            <b-row>
              <b-col cols="12" sm="12" md="12" style="float: center; align-items: center; text-align:center;">
                <a-table 
                  :columns="packageCols" 
                  :dataSource="packageData"
                  :loading="loading"
                >
                </a-table>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import moment from 'moment'

const packColumns = [
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt'
    },
    {
      title: 'Package (USD)',
      dataIndex: 'package_amount',
      key: 'package_amount'
    },
    {
      title: 'Month Floating (%)',
      dataIndex: 'package_float',
      key: 'package_float'
    },
    {
      title: 'Status',
      dataIndex: 'package_status',
      key: 'package_status',
    }
  ]

export default {
  name: 'package',
  components: {
  },
  data: () => {
    return { 
      packageData: [],
      packageCols: packColumns,
      loading: false,
    }
  },
  mounted () {
    this.getPackages()
  },
  methods: {
    getPackages() {
      const self = this
      var objParams = {
        e: 'getUserPackages'
      }
      this.$api.apiRequestTrans(objParams)
        .then((response) => {
          if (response.status === 'SUCCESS') {
            self.packageData = response.packages
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
<style scoped>
.card-header {
    background-color: #ffffff;
}
</style>
