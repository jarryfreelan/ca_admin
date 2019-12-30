<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12" lg="12">
        <b-card no-body header-bg-variant="white">
          <b-card-header style="float: center; align-items: center; text-align:center;">
            <strong class="text-dark">NEWS</strong>
          </b-card-header>
          <b-card-body>
            <b-row>
              <b-col cols="12" sm="12" md="12">
                <div style="padding: 10px;">
                  <h5>{{ news.title }}</h5>
                  <h6>{{ changeLLLDateLocate(news.updateAt) }}</h6>
                  <hr><hr>
                  <div v-html="news.content"></div>
                </div>
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
  name: 'news',
  components: {
  },
  data: () => {
    return { 
      news: []
    }
  },
  mounted () {
    const self = this
    self.getNews()
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
        e: 'getLatestNews'
      }
      this.$api.apiRequest(objParams)
        .then((response) => {
          if (response.status === 'SUCCESS') {
            self.news = response.news
          }
        })
        .catch((error) => {
          self.notifice('error', 'Error', '')
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
<style scoped>
.card-header {
    background-color: #ffffff;
}
</style>
