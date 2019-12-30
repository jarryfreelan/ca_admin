<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12" lg="12">
        <b-card no-body header-bg-variant="white">
          <b-card-header style="float: center; align-items: center; text-align:center;">
            <strong class="text-dark">REGISTRATION RECORD</strong>
          </b-card-header>
          <b-card-body>
            <b-row>
              <b-col cols="12" sm="12" md="12">
                <b-table :items="users" :fields="recordFields"></b-table>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>

export default {
  name: 'memberRecord',
  components: {
  },
  data: () => {
    return {
      recordFields: [
        {
          key: 'user_username',
          label: 'Username',
          sortable: true
        },
        {
          key: 'user_email',
          label: 'Email Address',
          sortable: true
        },
        {
          key: 'user_phone',
          label: 'Phone',
          sortable: true,
        },
        {
          key: 'user_created_at',
          label: 'Created At',
          sortable: true,
        }
      ],
      users: [] 
    }
  },
  mounted() {
    this.getMemberRecord()
  },
  methods: {
    getMemberRecord() {
      const self = this
      var objParams = {
        e: 'getAllRegisteredMemberRecord'
      }
      this.$api.apiRequest(objParams)
        .then((response) => {
          if (response.status === 'SUCCESS') {
            self.users = response.users
          }
        })
        .catch((error) => {
          
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
