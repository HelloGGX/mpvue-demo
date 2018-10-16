<!-- 第三方页面承载 -->
<template>
  <div>
    <web-view :src="getSrc"></web-view>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data () {
    return {
      src: ''
    }
  },
  onLoad () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  mounted () {
    this.src = this.$root.$mp.query.src
  },
  methods: {},
  computed: {
    getSrc () {
      return this.src
    }
  }
}
</script>
<style lang='less' scoped>
</style>