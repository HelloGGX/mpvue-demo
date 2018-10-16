<!--  -->
<template>
  <div>
    <div class="sheet-wrap" :style="{zIndex:zIndex,transform:'translateY(' + animationShowHeight+'%' +')'}">
      <div style="position: relative;overflow: hidden;height: 100%;width: 100%;">
        <div class="operate" v-show="showConfirm">
          <div class="operate-cancel" @click="cancel()">取消</div>
          <div class="operate-confirm" @click="confirm()">确定</div>
        </div>
        <slot></slot>
      </div>
    </div>
    <div style="transition-duration:0.2s;" class="overlay" v-show="upState" @click="cancel()"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      animationData: {}
    }
  },
  model: {
    prop: 'upState',
    event: 'change'
  },
  props: {
    upState: {
      type: Boolean,
      default: false
    },
    shadow: {
      default: {}
    },
    animationShowHeight: {
      type: Number,
      default: 100
    },
    showConfirm: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 9000
    }
  },

  methods: {
    cancel () {
      this.upState = !this.upState
      this.$emit('cancel')
    },
    confirm () {
      this.$emit('confirm')
    },
    up () {
      // 显示遮罩层

      this.animationShowHeight = -this.animationShowHeight
      // let animation = wx.createAnimation({
      //   duration: 200,
      //   timingFunction: 'linear',
      //   delay: 0
      // })
      // this.animation = animation
      // animation.translateY(`${this.animationShowHeight}%`).step()
      // this.animationData = animation.export()
    }
  },
  watch: {
    upState (val) {
      this.$emit('change', val)
      this.up()
    }
  }
}
</script>
<style lang='less'>
.sheet-wrap {
  width: 100%;
  left: 0;
  right: 0;
  overflow: hidden;
  position: fixed;
  z-index: 9000;
  background: #f2f3f4;
  transition: all 0.2s linear 0s;
  -webkit-transition: all 0.2s linear 0s;
  transform: translateY(0);
  -webkit-transform: translateY(0);
  color: #333;
  padding-bottom: 1rem;
  transform-origin: 50% 50% 0;
  transition-property: transform;
}
.overlay {
  position: fixed;
  z-index: 8999;
  top: -100px;
  left: 0;
  bottom: -100px;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
}
.operate {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  -moz-align-items: center;
  align-items: center;
  font-size: 16px;
  color: #ffc900;
  .operate-cancel,
  .operate-confirm {
    line-height: 45px;
    padding-left: 10px;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -moz-box-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
  .operate-confirm {
    text-align: right;
    font-weight: 700;
    padding-left: 0;
    padding-right: 10px;
  }
}
</style>
