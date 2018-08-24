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
import api from 'api/api'
export default {
  data () {
    return {
      items: []
    }
  },
  components: {
    CardChat
  },
  mounted () {
    this.getChat()
  },
  methods: {
    getChat () {
      api
        .getChatData()
        .then(res => {
          console.log(res)
          if (res.state === 'ok') {
            this.items = res.lists
          }
        })
        .catch(errMsg => {
          console.log(errMsg)
        })
    }
  }
}
</script>
<style lang='less' scoped>
</style>
