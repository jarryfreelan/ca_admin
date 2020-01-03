<template>
  <div class="animated fadeIn">
    <b-card no-body header-bg-variant="white">
      <b-card-header>
        <strong class="text-dark">News List 
          <b-button size="sm" style="float: right" variant="primary" @click='showNewsModal'>Create News</b-button>
        </strong>
      </b-card-header>
      <b-card-body>
        <b-row>
          <b-col sm="12" lg="12" v-for="(info, index)  in news" :key="info.id">
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle="'accordion-' + index" variant="white">
                  <strong>{{ info.title }}</strong> <p>{{ changeLLDateLocate(info.vdate) }}</p>
                </b-button>
              </b-card-header>
              <b-collapse :id="'accordion-' + index" visible accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <div style="padding: 10px;">
                    <h5>{{ info.title }}</h5>
                    <h6>{{ changeLLDateLocate(info.vdate) }}</h6>
                    <hr>
                    <div v-html="info.content"></div>
                  </div>
                </b-card-body>
                <b-button size="sm" pill @click="editNews(info.id)" style="margin: 5px; float: right" variant="primary">Edit</b-button>
              </b-collapse>
            </b-card>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>

    <b-modal
      :title="new_news ? 'News Creation' : 'News Detail' "
      v-model="modalNews"
      hide-footer
    >
      <b-row>
        <b-col sm="12" lg="12">
          <b-row>
            <b-col cols="12" sm="12" md="12" xl class="mb-12 mb-xl-0">
              <b-form-group
                label='Title'
              >
                <b-form-input
                  v-model="title"
                  type="text"
                  placeholder="Enter title"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
        <b-col sm="12" lg="12">
          <b-row>
            <b-col cols="12" sm="12" md="12" xl class="mb-12 mb-xl-0">
              <b-form-group
                label='Content'
              >
              
                <html-editor-component
                  divHeight="auto"
                  htmlEditorHeight="400px"
                  :htmlEditorContent="htmlEditorContent"
                  v-on:interface="handleFcAfterDateBack($event)"
                />
    
                <!-- <b-form-input
                  v-model="content"
                  type="text"
                  placeholder="Enter content"
                /> -->
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
        <b-col sm="12" lg="12">
          <b-row>
            <b-col cols="12" sm="12" md="12" xl class="mb-12 mb-xl-0">
              <b-form-group
                label='Date'
              >
                <b-form-input
                  v-model="date"
                  type="text"
                  placeholder="Enter date (Eg: YYYY-MM-DD)"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
        <b-col sm="12" lg="12" v-if='!new_news'>
          <b-row>
            <b-col cols="12" sm="12" md="12" xl class="mb-12 mb-xl-0">
              <b-form-group
                label='Status'
              >
                <b-form-select                 
                  v-model="status"
                  :options="{ '1': 'Active', '0': 'Inactive' }"
                >
                </b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
        <b-col sm="12" lg="12" v-if='!new_news'>
          <b-row>
            <b-col cols="6" sm="6" md="6" xl class="mb-6 mb-xl-0">
              <b-form-group
                label='Created At'
              >
              {{ createdAt }}
              </b-form-group>
            </b-col>
            <b-col cols="6" sm="6" md="6" xl class="mb-6 mb-xl-0">
              <b-form-group
                label='Updated At'
              >
              {{ updatedAt }}
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-button v-if='!new_news' @click="updateNews" style="width:100px; float: right" variant="primary">Update</b-button>
      <b-button v-if='new_news' @click="createNews" style="width:100px; float: right" variant="primary">Create</b-button>
    </b-modal>

  </div>
</template>

<script>
import HtmlEditorComponent from './htmlEditorComponent'

export default {
  components: { HtmlEditorComponent },
  name: 'news',
  data: () => {
    return { 
      news: [],

      new_news: false,
      modalNews: false,

      title: '',
      content: '',
      date: '',
      status: '',
      createdAt: '',
      updatedAt: '',
      selected_id: '',

      htmlEditorContent: '',
    }
  },
  mounted () {
    this.getNews()
  },
  methods: {
    handleFcAfterDateBack (event) {
      this.htmlEditorContent = event
      console.log(event)
      this.html_value = event
    },
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
    showNewsModal: function (){
      this.new_news = true
      this.modalNews = true
    },
    updateNews: function () {
      const self = this
      var objParams = {
        title: self.title,
        content: self.htmlEditorContent,
        vdate: self.date,
        active: self.status
      }
      this.$api.apiRequest(objParams, 'event414/' + self.selected_id, 'PUT')
        .then((response) => {
          self.title = ''
          self.htmlEditorContent = ''
          self.date = ''
          self.modalNews = false
          self.notifice('success',response.msg)
          self.getNews()
        })
        .catch((error) => {
          self.notifice('error', this.$ml.get(error.error), ' ')
        })
    },
    createNews: function () {
      const self = this
      var objParams = {
        title: self.title,
        content: self.htmlEditorContent,
        vdate: self.date,
      }
      this.$api.apiRequest(objParams, 'event414', 'POST')
        .then((response) => {
          self.title = ''
          self.content = ''
          self.date = ''
          self.modalNews = false
          self.notifice('success',response.msg)
          self.getNews()
        })
        .catch((error) => {
          self.notifice('error', this.$ml.get(error.error), ' ')
        })
    },
    editNews: function (newsID) {
      const self = this
      this.$api.apiRequest('', 'event414/' + newsID, 'GET')
        .then((response) => {
          self.title = response.event.title
          self.htmlEditorContent = response.event.content
          self.date = response.event.vdate
          self.status = response.event.active
          self.createdAt = response.event.created_at
          self.updatedAt = response.event.updated_at
          self.selected_id = newsID
          self.modalNews = true
          self.new_news = false
        })
        .catch((error) => {
          self.notifice('error', this.$ml.get(error.error), ' ')
        })
    },
    getNews() {
      const self = this
      var objParams = {
        e: 'getNews'
      }
      this.$api.apiRequest('', 'event414', 'GET')
        .then((response) => {
          self.news = response.events
        })
        .catch((error) => {
          self.notifice('error', this.$ml.get(error.error), ' ')
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
