<!--  -->
<template>
  <div class="chat-box">
      <div class="chat-wrap">
        <card-chat v-for="(item, index) in items" :key="index" :title="item.title" :type="item.type" :thumUrl="item.thumUrl"></card-chat>
      </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import CardChat from 'components/card-chat/card-chat'

export default {
  data () {
    return {
      items: [{
        id: '1',
        title: '客服小姐姐1号',
        type: '甜美萝莉音(海岛游)',
        thumUrl: '/static/img/icon/timg.jpg'
      }, {
        id: '2',
        title: '客服小姐姐2号',
        type: '迷人御姐音(欧洲游)',
        thumUrl: '/static/img/icon/timg.jpg'
      }, {
        id: '3',
        title: '客服小姐姐3号',
        type: '迷人御姐音(欧洲游)',
        thumUrl: '/static/img/icon/timg.jpg'
      }]
    }
  },
  components: {
    CardChat
  }
}
</script>
<style lang='less' scoped>

</style>
