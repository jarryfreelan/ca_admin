<template>
  <div class="animated fadeIn">

    

    <b-card no-body header-bg-variant="white">
      <b-card-header>
        <strong class="text-dark">Admin List 
          <b-button size="sm" style="float: right" variant="primary" @click='registerAdmin'>Add Admin</b-button>
        </strong>
      </b-card-header>
      <b-card-body>
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>No</th>
              <th>Username</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='(item,index) in items'>
              <td>{{ index + 1 }}</td>
              <td>{{ item.username }}</td>
              <td>{{ item.role }}</td>
              <td>{{ ( item.active == 1 ? 'Active' : 'Inactive' ) }}</td>
              <td>
                <b-dropdown :disabled='item.disabled' right text="Action">
                  <b-dropdown-item @click='getAdminDetail(item.id)'>Edit</b-dropdown-item>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-item @click='resetAdminPassword(item.id)'>Reset Password</b-dropdown-item>
                </b-dropdown>
              </td>
            </tr>
          </tbody>
        </table>
      </b-card-body>
    </b-card>

    <b-modal
      :title='new_admin ? "Admin Registration" : "Admin Detail"'
      v-model="modalAdmin"
      hide-footer
    >
        <b-row>
          <b-col sm="12" lg="12">
            <b-row>
              <b-col cols="12" sm="12" md="12" xl class="mb-12 mb-xl-0">
                <b-form-group
                  label="Username"
                >
                  <b-form-input
                    v-model="username"
                    type="text"
                    placeholder="Enter username"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row v-if='new_admin'>
              <b-col cols="12" sm="12" md="12" xl class="mb-12 mb-xl-0">
                <b-form-group
                  label="Password"
                >
                  <b-form-input
                    v-model="password"
                    type="text"
                    placeholder="Enter Password"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row v-if='!new_admin'>
              <b-col cols="12" sm="12" md="12" xl class="mb-12 mb-xl-0">
                <b-form-group
                  label="Role"
                >
                  <b-form-select                 
                    v-model="role"
                    :options="{ 'admin': 'Admin', 'superadmin': 'SuperAdmin' }"
                  >
                  </b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row v-if='!new_admin'>
              <b-col cols="12" sm="12" md="12" xl class="mb-12 mb-xl-0">
                <b-form-group
                  label="Status"
                >
                  <b-form-select                 
                    v-model="active"
                    :options="{ '1': 'Active', '0': 'Inactive' }"
                  >
                  </b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-button v-if='!new_admin' @click="updateAdmin" style="width:100px; float: right" block variant="primary">Update</b-button>
            <b-button v-if='new_admin' @click="createAdmin" style="width:100px; float: right" block variant="primary">Create</b-button>
          </b-col>
        </b-row>

    </b-modal>

    <b-modal
      title="Reset Admin Password"
      v-model="modalPassword"
      hide-footer
    >
      <b-row>
        <b-col sm="12" lg="12">
          <b-row>
            <b-col cols="12" sm="12" md="12" xl class="mb-12 mb-xl-0">
              <b-form-group
                label="Password"
              >
                <b-form-input
                  v-model="password_detail"
                  type="text"
                  placeholder="Enter password"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-button @click="updatePassword" style="width:100px; float: right" variant="primary">Update</b-button>
    </b-modal>
  </div>
</template>

<script>
export default {
  components: { },
  name: 'registration',
  data: () => {
    return { 
      modalAdmin: false,
      modalPassword: false,
      new_admin: false,

      username: '',
      password: '',
      password_detail: '',
      role: '',
      active: '',
      selected_id: '',
      items: [],
    }
  },
  mounted () {
    this.getAdminList()
  },
  methods: {
    changeLLDateLocate: function (dateString) {
      var dateFormat = ''
      if(this.$ml.get('lang') === 'en'){
        dateFormat = this.$datetime.dateLLToDateString(dateString, 'en')
      } else if(this.$ml.get('lang') === 'cn'){
        dateFormat = this.$datetime.dateLLToDateString(dateString, 'zh-cn')
      }
      return dateFormat
    },
    changeLLLDateLocate: function (dateString) {
      var dateFormat = ''
      if(this.$ml.get('lang') === 'en'){
        dateFormat = this.$datetime.dateLLLToDateString(dateString, 'en')
      } else if(this.$ml.get('lang') === 'cn'){
        dateFormat = this.$datetime.dateLLLToDateString(dateString, 'zh-cn')
      }
      return dateFormat
    },
    registerAdmin: function() {
      this.new_admin = true
      this.username = ''
      this.password = ''
      this.modalAdmin = true
    },
    createAdmin: function() {
      const self = this
      var objParams = {
        username: self.username,
        password: self.password
      }
      this.$api.apiRequest(objParams, 'register462', 'POST')
        .then((response) => {
          self.notifice('success',response.msg)
          self.username = ""
          self.password = ""
          self.modalAdmin = false
          self.getAdminList()
        })
        .catch((error) => {
          console.log(error)
          if (error.status === 'errorValidation') {
            if (error.error.username) {
              self.notifice('error',error.error.username[0])
            } 
            if (error.error.password) {
              self.notifice('error',error.error.password[0])
            }
          }
          
        })
    },
    getAdminList: function() {
      const self = this

      this.$api.apiRequest('', 'admin546', 'GET')
        .then((response) => {
          console.log(response)

          self.items = []

          response.admins.forEach((key, value) => {
            var obj = {}
            obj.id = key.id
            obj.username = key.username
            obj.role = key.role
            obj.active = key.active
            obj.disabled = ( key.username === window.localStorage.CURRENT_USERNAME ? true : false )
            self.items.push(obj)
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateAdmin() {
      const self = this
      var objParams = {
        username: self.username,
        role: self.role,
        active: self.active
      }
      this.$api.apiRequest(objParams, 'update135/' + self.selected_id, 'PUT')
        .then((response) => {
          self.notifice('success',response.msg)
          
          self.modalAdmin = false
          self.username = ''
          self.role = ''
          self.active = ''
          self.selected_id = ''
          self.getAdminList()
        })
        .catch((error) => {
          console.log(error)
          if (error.status === 'errorValidation') {
            /*if (error.error.username) {
              self.notifice('error',error.error.username[0])
            } 
            if (error.error.password) {
              self.notifice('error',error.error.password[0])
            }*/
          }
        })
    },
    updatePassword: function() {
      const self = this
      var objParams = {
        password: self.password_detail,
      }
      this.$api.apiRequest(objParams, 'password732/' + self.selected_id, 'PUT')
        .then((response) => {
          self.notifice('success',response.msg)
          
          self.modalPassword = false
          self.password_detail = ''

          self.getAdminList()
        })
        .catch((error) => {
          console.log(error)
          if (error.status === 'errorValidation') {
            /*if (error.error.username) {
              self.notifice('error',error.error.username[0])
            } 
            if (error.error.password) {
              self.notifice('error',error.error.password[0])
            }*/
          }
        })
    },
    getAdminDetail: function(adminID) {
      const self = this

      this.$api.apiRequest('', 'admin546/' + adminID, 'GET')
        .then((response) => {
          console.log(response)
          self.username = response.admin[0].username
          self.role = response.admin[0].role
          self.active = response.admin[0].active
          self.selected_id = response.admin[0].id

          self.new_admin = false
          self.modalAdmin = true
        })
        .catch((error) => {
          console.log(error)
        })
    },
    resetAdminPassword: function(adminID) {
      this.selected_id = adminID
      this.modalPassword = true
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
