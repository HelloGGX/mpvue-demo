<!-- 自定义底部弹出层 -->
<template>
  <div>
    <section class="sku-selector-bg" v-show="visible">
      <div :animation="animationData" class="sku-selector-main store-selector-main-hide">
        <div class="sku-selector-container">
          <div class="sku-selector-head">
            <img class="index_topimg" :src="info.image_url">
            <div class="sku-selector-head-content">
              <div class="sku-selector-price ">
                ￥<span class="index_price">{{resultPrice}}</span>
              </div>
              <div class="sku-selector-desc detaile-info">{{info.title}}</div>
            </div>
            <div class="sku-selector-close-btn" @click="visible=false">
              <i class="iconfont icon-close"></i>
            </div>
          </div>
          <div id="sku-selector-body" class="sku-grid">
            <div class="sku-props-wrap">
              <div class="sku">
                <div class="sku-title">出发地</div>
                <div class="sku-subprops"><span class="one-prop selected">成都</span>
                </div>
              </div>
              <div class="sku">
                <div class="sku-title">成人</div>
                <div class="sku-price">￥{{adultPrice}}</div>
                <div class="sku-subprops">
                  <input-num v-model="adultNum"></input-num>
                </div> 
                <!-- <div class="sku-subprops">
                      <span  :class="[{selected: !perType}, 'one-prop']" @click="toggle()">成人</span>
                      <span  :class="[{selected: perType}, 'one-prop']" @click="toggle()">儿童</span>
                    </div> -->
              </div>
              <div class="sku">
                <div class="sku-title">儿童</div>
                <div class="sku-price">￥{{childPrice}}</div>
                <div class="sku-subprops">
                  <input-num v-model="childNum"></input-num>
                </div>
              </div>
            </div>
          </div>
          <div class="sku-selector-bottom" @click="selectorConfirm()">确定</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script type='text/ecmascript-6'>
import InputNum from 'components/input-num/input-num'

export default {
  data () {
    return {
      perType: true, // 选的是成人还是儿童
      // perNum: 1,
      adultNum: 1,
      childNum: 0,
      adultPrice: 0,
      childPrice: 0,
      animationData: {},
      animationShowHeight: 500
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    InputNum
  },
  model: {
    prop: 'visible',
    event: 'change'
  },
  watch: {
    visible (val) {
      if (val) {
        this.showSku()
        this.adultPrice = Number(this.info.sale_price)
        this.childPrice = Number(this.info.child_price)
      }
      this.$emit('change', val)
    }
  },
  computed: {
    resultPrice () {
      // 这里的sale_price是成人价
      return this.adultPrice * this.adultNum + this.childPrice * this.childNum
    }
  },
  methods: {
    showSku () {
      // 显示遮罩层
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: 'linear',
        delay: 0
      })
      this.animation = animation
      animation.translateY(this.animationShowHeight).step()
      this.animationData = animation.export()
      setTimeout(
        function () {
          animation.translateY(0).step()
          this.animationData = animation.export()
        }.bind(this),
        200
      )
    },
    selectorConfirm () {
      if (this.childNum === 0 && this.adultNum === 0) {
        this.visible = false
        this.$mptoast({
          text: '出游人数不能都为0哦~',
          icon: 'error',
          duration: 2000
        })
      } else {
        this.$emit('confirm', {
          title: this.info.title,
          adultNum: this.adultNum,
          childNum: this.childNum,
          adultPrice: this.adultPrice,
          childPrice: this.childPrice,
          totalPrice: this.resultPrice
        })
      }
    }
  }
}
</script>

<style lang='less' scoped>
.sku-props-wrap {
  padding-left: 0.24rem;
  background: #fff;
  .sku {
    padding: 0.24rem 0;
    position: relative;
    .sku-title {
      color: #333;
      font-size: 0.28rem;
      line-height: 0.4rem;
      margin-bottom: 0.18rem;
      display: inline-block;
    }
    .sku-price {
      color: #333;
      font-size: 0.28rem;
      line-height: 0.4rem;
      margin-bottom: 0.18rem;
      display: inline-block;
      margin-left: 0.1rem;
    }
    .sku-subprops {
      position: absolute;
      right: 0.2rem;
      top: 0.2rem;
    }
    .sku-subprops .one-prop {
      display: inline-block;
      background: #f7f7f7;
      -webkit-border-radius: 0.32rem;
      -moz-border-radius: 0.32rem;
      border-radius: 0.32rem;
      color: #333;
      padding: 0.16rem 0.2rem;
      line-height: 0.32rem;
      margin-right: 0.24rem;
      margin-bottom: 0.2rem;
      &.selected {
        background-image: -webkit-gradient(
          linear,
          left top,
          right top,
          from(#ff9300),
          to(#f35)
        );
        background-image: linear-gradient(90deg, #ff9300, #f35);
        color: #fff;
      }
    }
    &:after {
      pointer-events: none;
      position: absolute;
      content: '';
      height: 1px;
      background: #e0e0e0;
      left: 0;
      right: 0;
      bottom: 0;
      -webkit-transform-origin: 100% 100%;
      transform-origin: 100% 100%;
    }
  }
}

.sku-selector-bg {
  position: fixed;
  width: 100%;
  max-width: 640px;
  height: 100%;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 20000;
}

.sku-selector-main,
.sku-selector-main2 {
  max-width: 640px;
  padding-top: 0.6rem;
  z-index: 20001;
  width: 100%;
}

.sku-selector-main {
  position: fixed;
  height: 56%;
  bottom: 0;
  -webkit-transition: bottom 0.15s linear;
  transition: bottom 0.15s linear;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}

.sku-selector-main-show {
  bottom: 0;
}

.sku-selector-main-focus {
  position: absolute;
  top: -1rem;
  height: 200%;
}

.sku-selector-main-hide {
  bottom: -9.36rem;
}

.sku-selector-main2 {
  position: fixed;
  height: 70%;
  bottom: 0;
  left: 0;
  right: 0;
  -webkit-transition: bottom 0.15s linear;
  transition: bottom 0.15s linear;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}

.sku-selector-main-hide2 {
  bottom: -70%;
}

.sku-selector-container {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 0.1rem;
  background-color: #fff;
}

.sku-selector-head {
  position: relative;
  width: 100%;
  height: 1.66rem;
  border-bottom: 1px solid #f2f2f2;
}

.sku-selector-head img {
  position: absolute;
  height: 2.02rem;
  width: 2.02rem;
  top: -0.6rem;
  left: 0;
  border: 2px solid #fff;
  border-radius: 0.1rem;
  box-shadow: 0 0 0.04rem #58595b;
  z-index: 1;
}

.sku-selector-number,
.sku-specs {
  border-bottom: 1px solid #f2f2f2;
}

.sku-selector-head-content {
  position: relative;
  height: 100%;
  width: 100%;
  padding: 0.46rem 0 0 2.22rem;
}

.sku-selector-head-content.discount-style {
  padding-top: 0.2rem;
}

.sku-selector-price {
  position: relative;
  width: 100%;
  height: 0.36rem;
  margin-bottom: 0.1rem;
  line-height: 1;
  font-size: 0.36rem;
  color: #e02e24;
}

.sku-selector-desc {
  width: 4.5rem;
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 0.24rem;
  line-height: 1.4;
  color: #151516;
  word-break: break-all;
  word-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

#sku-selector-body {
  position: relative;
  width: 100%;
  max-height: 100%;
  padding-bottom: 40%;
}

#sku-selector-body.sku-selector-body2 {
  position: absolute;
  max-height: none;
  width: auto;
  top: 1.66rem;
  left: 0.2rem;
  right: 0.2rem;
  bottom: 0.96rem;
}

.sku-selector-bottom {
  position: absolute;
  width: 80%;
  height: 0.88rem;
  left: 50%;
  bottom: 0;
  line-height: 0.88rem;
  margin-left: -40%;
  font-size: 0.36rem;
  color: #fff;
  background-color: #e02e24;
  text-align: center;
  margin-bottom: 0.2rem;
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#ff8e02),
    to(#fb314a)
  );
  background-image: linear-gradient(90deg, #ff8e02, #fb314a);
  border-radius: 0.4rem;
  overflow: hidden;
}

.sku-selector-close-btn {
  position: absolute;
  width: 0.68rem;
  height: 0.68rem;
  padding: 0.2rem;
  top: 0;
  right: 0;
}

.sku-selector-close-btn i {
  font-size: 0.42rem;
}

.sku-selector-main-spec {
  height: auto;
}

.sku-selector-main-spec .sku-selector-container #sku-selector-body {
  padding-bottom: 0.56rem;
  overflow: hidden;
}

.sku-selector-main-spec .sku-selector-container .sku-selector-normal {
  position: relative;
  height: 0.36rem;
  margin-bottom: 0.2rem;
  line-height: 1;
  font-size: 0.24rem;
  color: #58595b;
  text-decoration: line-through;
}

.sku-selector-bg .g-sales-limit-discount {
  position: relative;
  top: -0.08rem;
  display: inline-block;
  font-size: 0.24rem;
  color: #151516;
  line-height: 0.44rem;
  height: 0.4rem;
  background-color: #fde750;
  padding: 0 0.06rem;
  margin-top: 0.06rem;
  border-radius: 0.04rem;
  font-family: Helvetica;
}

.sku-selector-bg .g-sales-limit-discount:after {
  content: '';
  width: 0;
  height: 0;
  border-color: transparent transparent #fde750;
  border-width: 0 0.06rem 0.08rem;
  border-style: solid;
  position: absolute;
  left: 0.3rem;
  top: -0.07rem;
}

@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .sku-selector-main {
    height: 10.04rem;
  }
  .sku-selector-container {
    padding-bottom: 0.68rem;
  }
  .sku-selector-bottom {
    bottom: 0.68rem;
  }
  #sku-selector-body.sku-selector-body2 {
    bottom: 1.64rem;
  }
}

.goods-buy-button,
.goods-chat-button,
.goods-chat-button-disable,
.goods-like-button,
.goods-unlike-button {
  border-top: 1px solid #f2f2f2;
  border-left: 1px solid #f2f2f2;
}

.goods-buy-button span:before,
.goods-chat-button-disable span:before,
.goods-chat-button span:before,
.goods-home-button span:before,
.goods-like-button span:before,
.goods-mall-button span:before,
.goods-unlike-button span:before {
  content: '';
  top: -0.5rem;
}
</style>
