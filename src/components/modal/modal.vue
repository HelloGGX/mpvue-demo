<!-- 自己的模态框 -->
<template>
  <div>
    <div :class="[visible ? 'drawer_screen_in' : '', 'drawer_screen']" @tap="powerDrawer" data-statu="close"></div>
      <!--content-->
      <!--使用animation属性指定需要执行的动画-->
      <div :animation="animationData" class="drawer_box" v-if="visible">
        <!--drawer content-->
        <div class="drawer_title">{{modalTit}}
          <i @tap="powerDrawer" data-statu="close" class="iconfont icon-close"></i>
        </div>
        <div class="drawer_content">
            <slot name="content"></slot>
        </div>
        <div class="btn_ok" v-if="showBtn"  @tap="powerDrawer" data-statu="close">确定</div>
      </div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data () {
    return {
      animationData: 0
    }
  },
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    modalTit: {
      type: String,
      default: '弹窗标题'
    },
    visible: {
      type: Boolean,
      default: false
    },
    showBtn: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible (val) {
      this.$emit('change', val)
    }
  },
  computed: {
  },
  methods: {
    // ...mapMutations({
    //   setVisible: 'SET_VISIBLE'
    // }),
    powerDrawer (e) {
      var currentStatu = e.currentTarget.dataset.statu
      this.util(currentStatu)
      this.$emit('closeCall')
    },
    util (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例
      var animation = wx.createAnimation({
        duration: 200, // 动画时长
        timingFunction: 'linear', // 线性
        delay: 0 // 0则不延迟
      })
      // 第2步：这个动画实例赋给当前的动画实例
      this.animation = animation
      // 第3步：执行第一组动画
      animation.opacity(0).rotateX(-100).step()
      // 第4步：导出动画对象赋给数据对象储存
      this.animationData = animation.export()
      // 第5步：设置定时器到指定时候后，执行第二组动画
      setTimeout(function () {
        // 执行第二组动画
        animation.opacity(1).rotateX(0).step()
        // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
        this.animationData = animation
        // 关闭
      }.bind(this), 200)
    }
  }
}
</script>

<style lang='less' scoped>
/*mask*/
.drawer_screen_in {
  visibility: visible!important;
  opacity: 1!important;
}
.drawer_screen {
 width: 100%;
 height: 100%;
 position: fixed;
 top: 0;
 left: 0;
 z-index: 1000;
 visibility: hidden;
 background: rgba(0,0,0,.4);
 opacity: 0;
-webkit-transition-duration: .4s;
transition-duration: .4s;
will-change: opacity;
contain: strict;
}

/*content*/
.drawer_box {
 width:6rem;
overflow:hidden;
position:fixed;
top:50%;
left:50%;
z-index:1001;
background:#FAFAFA;
border-radius:26rpx;
display:block;
margin-left:-3rem;
margin-top:-3.25rem;

}

.drawer_title{
 padding: 0.25rem;
 text-align: center;
 font-size:0.36rem;
 position: relative;
  i {
    position:absolute;
    right:0.4rem;
    top:0.2rem;
    font-size:0.38rem;
  }
}
.drawer_content {
 height: 210px;
 overflow-y: scroll; /*超出父盒子高度可滚动*/
}
.btn_ok{
width:100%;
height:0.88rem;
text-align:center;
line-height:0.88rem;
font-size:0.32rem;
border-top:1rpx solid #808080;

}
</style>
