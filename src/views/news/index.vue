<template>
  <div class="animated fadeIn">
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
          </b-collapse>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'news',
  data: () => {
    return { 
      news: [],
    }
  },
  mounted () {
    this.getNews()
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
    getNews() {
      const self = this
      var objParams = {
        e: 'getNews'
      }
      this.$api.apiRequest(objParams, 'news', 'GET')
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
