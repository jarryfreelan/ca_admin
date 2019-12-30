<template>
  <div class="animated fadeIn">
    <b-tabs
      active-nav-item-class="font-weight-bold text-uppercase text-secondary"
      class="bg-light"
      card
    >
      <b-tab title="Purchase" active>
        <b-row>
          <b-col sm="12">
            <a-table 
              :columns="transactionColumns" 
              :dataSource="transactionData" 
              size="small" 
              :scroll="{ x: 300 }"
            >
              <template slot="transDate" slot-scope="text, record">
                {{ getDate (record.transDate) }}

                <a-tag color="pink" v-if="record.status === 'initialized'">
                  <a :href="record.status_url"  target="_blank">{{ record.status }}</a>
                </a-tag>
                <a-tag color="blue" v-if="record.status === 'pending'">
                  <a :href="record.status_url"  target="_blank">{{ record.status }}</a>
                </a-tag>
                <a-tag color="green" v-if="record.status === 'success'">
                  <a :href="record.status_url"  target="_blank">{{ record.status }}</a>
                </a-tag>
                <a-tag color="red" v-if="record.status === 'fail'">
                  <a :href="record.status_url"  target="_blank">{{ record.status }}</a>
                </a-tag>
              </template>

              <template slot="expandedRowRender" slot-scope="record" style="margin: 0 0 0 100px;">
                <dl class="row">
                  <dt class="col-sm-3">Transaction ID</dt>
                  <dd class="col-sm-9">{{ record.id }}</dd>

                  <dt class="col-sm-3">Transaction Date</dt>
                  <dd class="col-sm-9">{{ record.transDate }}</dd>

                  <dt class="col-sm-3">Buyer Name</dt>
                  <dd class="col-sm-9">{{ record.name }}</dd>

                  <dt class="col-sm-3">Buyer Email</dt>
                  <dd class="col-sm-9">{{ record.email }}</dd>

                  <dt class="col-sm-3">Amount</dt>
                  <dd class="col-sm-9">{{ record.amount }} {{ record.currency }}</dd>

                  <dt class="col-sm-3">Converted USD</dt>
                  <dd class="col-sm-9">$ {{ record.usdamount }}</dd>

                  <dt class="col-sm-3">Address</dt>
                  <dd class="col-sm-9">{{ record.address }}</dd>

                  <dt class="col-sm-3">CoinPayment Status URL <small>(Continue your payment with this link if you do not complete the payment)</small></dt>
                  <dd class="col-sm-9"><a :href="record.status_url"  target="_blank">{{ record.status_url }}</a></dd>

                  <dt class="col-sm-3">
                    <span v-if="record.status === 'fail'" class="text-danger font-weight-bold">
                      Fail Message
                    </span>
                  </dt>
                  <dd class="col-sm-9">
                    <span v-if="record.status === 'fail'" class="text-danger font-weight-bold">
                      {{ record.failMsg }}
                    </span>
                  </dd>
                </dl>
              </template>
            </a-table>
          </b-col>
        </b-row>
      </b-tab>
      <b-tab title="Withdraw" >
        <b-row>
          <b-col sm="12">
            <a-table 
              :columns="transactionColumns" 
              :dataSource="transactionData" 
              size="small"
            >
              <template slot="transDate" slot-scope="text, record">
                {{ getDate (record.transDate) }}

                <a-tag color="pink" v-if="record.status === 'initialized'">
                  <a :href="record.status_url"  target="_blank">{{ record.status }}</a>
                </a-tag>
                <a-tag color="blue" v-if="record.status === 'pending'">
                  <a :href="record.status_url"  target="_blank">{{ record.status }}</a>
                </a-tag>
                <a-tag color="green" v-if="record.status === 'success'">
                  <a :href="record.status_url"  target="_blank">{{ record.status }}</a>
                </a-tag>
                <a-tag color="red" v-if="record.status === 'fail'">
                  <a :href="record.status_url"  target="_blank">{{ record.status }}</a>
                </a-tag>
              </template>

              <template slot="expandedRowRender" slot-scope="record" style="margin: 0 0 0 100px;">
                <dl class="row">
                  <dt class="col-sm-3">Transaction ID</dt>
                  <dd class="col-sm-9">{{ record.id }}</dd>

                  <dt class="col-sm-3">Transaction Date</dt>
                  <dd class="col-sm-9">{{ record.transDate }}</dd>

                  <dt class="col-sm-3">Buyer Name</dt>
                  <dd class="col-sm-9">{{ record.name }}</dd>

                  <dt class="col-sm-3">Buyer Email</dt>
                  <dd class="col-sm-9">{{ record.email }}</dd>

                  <dt class="col-sm-3">Amount</dt>
                  <dd class="col-sm-9">{{ record.amount }} {{ record.currency }}</dd>

                  <dt class="col-sm-3">Converted USD</dt>
                  <dd class="col-sm-9">$ {{ record.usdamount }}</dd>

                  <dt class="col-sm-3">Address</dt>
                  <dd class="col-sm-9">{{ record.address }}</dd>

                  <dt class="col-sm-3">
                    <span v-if="record.status === 'fail'" class="text-danger font-weight-bold">
                      Fail Message
                    </span>
                  </dt>
                  <dd class="col-sm-9">
                    <span v-if="record.status === 'fail'" class="text-danger font-weight-bold">
                      {{ record.failMsg }}
                    </span>
                  </dd>
                </dl>
              </template>
            </a-table>
          </b-col>
        </b-row>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import moment from 'moment'

const transColumns = [
    {
      title: 'Date',
      dataIndex: 'transDate',
      key: 'transDate',
      scopedSlots: { customRender: 'transDate' },
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency' 
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount' 
    },
    {
      title: 'USD($)',
      dataIndex: 'usdamount',
      key: 'usdamount'
    }
  ]

export default {
  name: 'TransactionTab',
  data: () => {
    return {
      transactionData: [],
      transactionColumns: transColumns,
    }
  },
  mounted () {
    this.getTransactions()
  },
  methods: {
    getDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    getTransactions() {
      const self = this
      var objParams = {
        e: 'get-purchase-transaction-history'
      }
      this.$api.apiRequest(objParams)
        .then((response) => {
          if (response.status === 'SUCCESS') {
            self.transactionData = response.transactions
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
