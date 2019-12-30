<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12" lg="12">
        <b-card no-body header-bg-variant="white">
          <b-card-header style="float: center; align-items: center; text-align:center;">
            <strong class="text-dark">GENEALOGY</strong>
          </b-card-header>
          <b-card-body>
            <b-row>
              <b-col cols="12" sm="12" md="12">
                <a-tree
                  class="draggable-tree"
                  :treeData="treeData"
                />
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import TreeChart from 'vue-tree-chart'

export default {
  name: 'genealogy',
  components: {
    TreeChart
  },
  data: () => {
    return { 
      treeData: [
        {
          title: '0-0',
          key: '0-0',
          children: [
            {
              title: '0-0-1',
              key: '0-0-1',
              children: [
                {
                  title: '0-0-1-1',
                  key: '0-0-1-1',
                },
                {
                  title: '0-0-2-1',
                  key: '0-0-2-1',
                }
              ]
            },
            {
              title: '0-0-2',
              key: '0-0-2',
            }
          ]
        },
        {
          title: '0-1',
          key: '0-1',
          children: [
            {
              title: '0-1-1',
              key: '0-1-1',
              children: [
                {
                  title: '0-1-1-1',
                  key: '0-1-1-1',
                },
                {
                  title: '0-1-2-1',
                  key: '0-1-2-1',
                }
              ]
            },
            {
              title: '0-1-2',
              key: '0-1-2',
            }
          ]
        },
      ]
    }
  },
}
</script>
<style scoped>
.card-header {
    background-color: #ffffff;
}
</style>
