<!-- 滚动到顶部按钮 -->
<template>
    <div class="go-top" :class="changeShow" @click.stop="scrollToTop">
      <span>顶部</span>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'scrollTop',
  props: {
    offsetTop: {
      type: Number,
      default: 0
    }
  },
  model: {
    prop: 'offsetTop',
    event: 'change'
  },
  computed: {
    changeShow () {
      return this.offsetTop > 250 ? 'top-button-show' : 'top-button-hide'
    }
  },
  methods: {
    scrollToTop () {
      this.$emit('scrollToTop')
    }
  },
  data () {
    return {
    }
  },
  watch: {
    offsetTop (val) {
      this.$emit('update:offsetTop', val)
    }
  }
}
</script>
<style lang='less' scoped>
#go-top, .go-top {
  display: block;
  width: .86rem;
  height: .86rem;
  position: fixed;
  right: .36rem;
  bottom: .128rem;
  z-index: 999;
  background-image: url("../../../static/img/icon/top.png");
  background-size: contain;
  opacity: 1;
  -webkit-transition: bottom .8s ease,opacity .6s ease;
  span{
    position: absolute;
    bottom: .14rem;
    width: 100%;
    display: block;
    height: .24rem;
    line-height: .24rem;
    text-align: center;
    font-size: .2rem;
    color: #333;
  }
}
.top-button-hide {
  bottom: -1.28rem;
  opacity: 0;
}
.top-button-show {
  bottom: 1.28rem;
  opacity: 1;
}

</style>
