<!-- 订单确认支付页面 -->
<template>
  <div style="padding:12px;background-color:#f2f2f2;">
    <section class="order-section">
      <div class="mod-product-title-wrap productTitle">
        <h2 class="title">{{title}}</h2>
      </div>
      <div class="ModProductSubtitle-wrap">
        <div class="product-sub">
          <div class="sub-item">
            <div class="sub-key">
              <span>套餐类型</span>
              <span>:</span>
            </div>
            <div class="sub-value">特价*5日机票+西瓜卡</div>
          </div>
        </div>
        <div class="product-sub">
          <div class="sub-item">
            <div class="sub-key">
              <span>出行日期</span>
              <span>:</span>
            </div>
            <div class="sub-value">{{date}}</div>
          </div>
          <span class="jump-item">预订须知</span>
        </div>
      </div>
    </section>
    <div class="line"></div>
    <section class="order-section">
      <div class="mod-common-tips-wrap" style="color:#3d3d3d;font-size:12px;padding-top:0px;">
        <em class="icon"></em>
        <span class="desc">此商品需二次确认</span>
      </div>
      <div class="mod-common-tips-wrap" style="color:#666;font-size:12px;padding-top:3px;">
        <span class="desc">付款后卖家将在9个工作小时内（工作日9：00-18：00）核实是否有位，若核实无位或超时未确认，将自动退款</span>
      </div>
    </section>
    <div class="line"></div>
    <section class="order-section">
      <div class="mod-block-title-wrap border-radius-top">
        <span class="title">
          购买数量
        </span>
        <span class="sub-title">
        </span>
      </div>
      <div class="ModSku-wrap">
        <div class="sku-data">
          <div class="form-item border-radius-bt">
            <label class="sku-label">
              <div class="sku-type">
                <span class="sku-name">
                   成人
                </span>
              </div>
            </label>
            <div class="right-block-wrap">
              <div class="num-wrap">
                <input-num v-model="adultNum"></input-num>
              </div>
              <div class="item-price">
                <span class="price-title">
                  单价：
                </span>
                <span class="price-value">
                  <span>
                    ￥
                  </span>
                  <span>
                    {{adultPrice}}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div class="form-item border-radius-bt">
            <label class="sku-label">
              <div class="sku-type">
                <span class="sku-name">
                   儿童
                </span>
              </div>
            </label>
            <div class="right-block-wrap">
              <div class="num-wrap">
                <input-num v-model="childNum"></input-num>
              </div>
              <div class="item-price">
                <span class="price-title">
                  单价：
                </span>
                <span class="price-value">
                  <span>
                    ￥
                  </span>
                  <span>
                    {{childPrice}}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="line"></div>
    <section class="order-section">
       <div class="mod-block-title-wrap border-radius-top">
        <span class="title">
          出行保障
        </span>
        <span class="sub-title">
        </span>
      </div>
      <div class="mod-common-tips-wrap" style="color:#C1874D;background:#FFFBE8;padding-bottom:;">
        <span class="desc">
          80%的出境游客选择购买保险，为自己的出行增添保障；若放弃购买，请自行承担风险。
        </span>
      </div>
      <div class="mod-common-tips-wrap" style="color:#999;background:#fafafa;padding-top:9px;padding-bottom:9px;">
        <span class="desc">
          旅游意外险
        </span>
      </div>
    </section>
    <div class="line"></div>
    <section class="order-section">
      <div class="ModTripInput-wrap">
        <div class="cell cell-indent border-radius-top border-radius-bt">
          <div class="cell-item">
            <div class="container">
              <label class="cell-label">
                <div class="title-wrap">
                  <span>
                    买家留言
                  </span>
                </div>
              </label>
              <div class="input-wrap">
                <input type="text" placeholder="如有特殊需要,请在这里留言">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="ModProtocols-wrap">
        <div class="component-userAgreement">
          <em class="icon">
          </em>
          <div class="agree-desc">
            <span>请您仔细阅读</span>
            <div class="userAgreement-link">
              预订须知
            </div>
            <span>
              <span>，</span>
              <span>点击去付款即代表您已阅读并同意条款内容。</span>
            </span>
          </div>
        </div>
    </div>
    <div class="container-price">
      <div class="component-price-button component-price-normal-button">
        <div class="price-detail">
          <div class="main-price-wrap">
            <div class="main-price">
              <span class="red">
                <span class="yuan">
                  ￥
                </span>
                <span>
                  {{getTotalPrice}}
                </span>
              </span>
              <span class="sub-title">
              </span>
            </div>
          </div>
          <div class="main-price-detail" @click="up()" >
            明细
          </div>
        </div>
        <div class="price-submit">
          去付款
        </div>
      </div>
      <div class="component-price-detail" :animation="animationData" >
        <div style="position: relative;overflow: hidden;height: 100%;width: 100%;">
          <div class="price-scroller">
            <div class="title">费用明细</div>
            <ul class="price-list">
              <li class="buynow-wrap">
                <div class="item-title">
                  <div style="color:#666">成人</div>
                  <div class="red">￥{{adultPrice}}×{{adultNum}}人</div>
                </div>
              </li>
              <li class="buynow-wrap">
                <div class="item-title">
                  <div style="color:#666">儿童</div>
                  <div class="red">￥{{childPrice}}×{{childNum}}人</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import InputNum from 'components/input-num/input-num'
export default {
  data () {
    return {
      title: '', // 商品标题
      adultNum: 1, // 成人人数
      childNum: 0, // 儿童人数
      adultPrice: 0, // 成人单价
      childPrice: 0, // 儿童单价
      totalPrice: 0, // 总价
      date: '', // 出发日期
      animationData: {},
      animationShowHeight: 100
    }
  },
  components: {
    InputNum
  },
  methods: {
    init () {
      this.title = this.$root.$mp.query.title
      this.adultNum = this.$root.$mp.query.adultNum
      this.childNum = this.$root.$mp.query.childNum
      this.adultPrice = Number(this.$root.$mp.query.adultPrice)
      this.childPrice = Number(this.$root.$mp.query.childPrice)
      this.totalPrice = this.$root.$mp.query.totalPrice
      this.date = this.$root.$mp.query.date
    },
    up () {
      // 显示遮罩层
      this.animationShowHeight = -this.animationShowHeight
      let animation = wx.createAnimation({
        duration: 200,
        timingFunction: 'linear',
        delay: 0
      })
      this.animation = animation
      animation.translateY(`${this.animationShowHeight}%`).step()
      this.animationData = animation.export()
    }
  },
  mounted () {
    this.init()
  },
  computed: {
    getTotalPrice () {
      return this.adultNum * this.adultPrice + this.childNum * this.childPrice
    }
  }
}
</script>
<style lang='less' scoped>
.order-section {
  padding: 0.2rem;
  background-color: #fff;
}
.mod-product-title-wrap .title {
  display: -webkit-box;
  font-size: 0.3rem;
  line-height: 0.36rem;
  color: #3d3d3d;
  word-break: break-all;
  overflow: hidden;
  font-weight: 700;
  padding: 0 0.24rem;
  background: #fff;
}
.ModProductSubtitle-wrap {
  line-height: 18px;
  font-size: 13px;
  color: #3d3d3d;
  background: #fff;
  padding: 0 0.24rem;
  .product-sub {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    .sub-item {
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-flex;
      display: -ms-flexbox;
      display: flex;
    }
  }
  .product-sub {
    -webkit-box-align: start;
    -ms-flex-align: start;
    -webkit-align-items: flex-start;
    -moz-align-items: flex-start;
    align-items: flex-start;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    -webkit-justify-content: space-between;
    -moz-justify-content: space-between;
    justify-content: space-between;
    padding-top: 0.17rem;
    .sub-item {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      -moz-box-flex: 1;
      -moz-flex: 1;
      -ms-flex: 1;
      flex: 1;
      .sub-key {
        padding-right: 0.24rem;
        min-width: 1.2rem;
      }
    }
  }
  .product-sub .jump-item {
    display: inline-block;
    color: #e90;
    padding-right: 11px;
    background-image: url('../../../static/img/icon/right.png');
    background-repeat: no-repeat;
    background-position: 100%;
    background-size: 11px 16px;
  }
}
.mod-common-tips-wrap {
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  justify-content: center;
  -webkit-box-direction: normal;
  -webkit-box-orient: horizontal;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  -moz-align-items: center;
  align-items: center;
  background: #fff;
  padding: 6px 12px 0;
  color: #3d3d3d;
  line-height: 1.5;
  .icon {
    display: inline-block;
    width: 24px;
    height: 16px;
    background: url(https://gw.alicdn.com/tfs/TB1.J.6sHGYBuNjy0FoXXciBFXa-30-30.png)
      no-repeat left 3px top;
    background-size: 16px;
  }
  .desc {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -moz-box-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
}
.mod-common-tips-wrap,
.mod-common-tips-wrap .desc {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: flex;
}
.mod-block-title-wrap {
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
  position: relative;
  background: #fff;
  padding-left: 12px;
  height: 0.88rem;
  font-size: 0.3rem;
  .title {
    color: #333;
    font-weight: bolder;
    min-width: 75px;
    margin-right: 12px;
  }
  .sub-title {
    font-size: 0.24rem;
    color: #666;
  }
}
.ModSku-wrap {
  .sku-data {
    position: relative;
  }
  .form-item {
    position: relative;
    background-color: #fff;
    max-height: 77px;
    box-sizing: border-box;
    padding: 0.2rem 0.2rem 0.2rem 0.24rem;
    color: #a5a5a5;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    -webkit-justify-content: space-between;
    -moz-justify-content: space-between;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -moz-align-items: center;
    align-items: center;
  }
  .sku-label,
  .sku-type {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
  }
  .sku-label {
    height: 1rem;
    font-size: 15px;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    -webkit-justify-content: flex-start;
    -moz-justify-content: flex-start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -moz-align-items: center;
    align-items: center;
  }
  .sku-type {
    margin-right: 0.2rem;
    -webkit-box-direction: normal;
    -webkit-box-orient: vertical;
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    .sku-name {
      color: #333;
      padding-bottom: 5px;
    }
  }
  .right-block-wrap {
    text-align: right;
  }
  .num-wrap {
    position: relative;
    height: 0.88rem;
  }
  .num-wrap {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    -webkit-justify-content: flex-end;
    -moz-justify-content: flex-end;
    justify-content: flex-end;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -moz-align-items: center;
    align-items: center;
  }
  .item-price {
    font-size: 14px;
    padding-top: 0.26rem;
    .price-title {
      color: #999;
    }
    .price-value {
      color: #333;
    }
  }
}
.mod-common-tips-wrap {
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  justify-content: center;
  -webkit-box-direction: normal;
  -webkit-box-orient: horizontal;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  -moz-align-items: center;
  align-items: center;
  background: #fff;
  padding: 6px 12px 0;
  color: #3d3d3d;
  line-height: 1.5;
  .desc {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -moz-box-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
}
.mod-common-tips-wrap,
.mod-common-tips-wrap .desc {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: flex;
}
.ModTripInput-wrap {
  .container {
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
    .cell-label {
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-direction: normal;
      -webkit-box-orient: vertical;
      -webkit-flex-direction: column;
      -moz-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      .title-wrap {
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
      }
      .input-wrap {
        -webkit-box-flex: 1;
        -webkit-flex: 1 1 auto;
        -moz-box-flex: 1;
        -moz-flex: 1 1 auto;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
      }
    }
  }
  input {
    display: block;
    width: 100%;
    outline: none;
    border: 0;
  }
}
.cell-label {
  min-width: 75px;
  margin-right: 12px;
  color: #a5a5a5;
  display: inline-block;
}
.ModProtocols-wrap {
  .component-userAgreement {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    color: #a5a5a5;
    font-size: 13px;
    position: relative;
    margin-top: 0.3rem;
    line-height: 1.5;
    .agree-desc {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      -moz-box-flex: 1;
      -moz-flex: 1;
      -ms-flex: 1;
      flex: 1;
    }
    .userAgreement-link {
      display: inline;
      color: #e90;
    }
  }
  .icon {
    display: inline-block;
    width: 24px;
    height: 16px;
    background: url(https://gw.alicdn.com/tfs/TB1.J.6sHGYBuNjy0FoXXciBFXa-30-30.png)
      no-repeat left 3px top;
    background-size: 16px;
    margin-right: 3px;
    margin-top: 2px;
  }
}
.container-price {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 7.5rem;
  z-index: 300;
}
.component-price-button {
  position: absolute;
  bottom: 0;
  width: 7.5rem;
  height: 0.96rem;
  z-index: 9001;
  padding-top: 1px;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  padding-bottom: 0;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  background-color: #fff;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: flex;
  position: relative;
  &:before {
    pointer-events: none;
    position: absolute;
    content: '';
    height: 1px;
    background: #d5d5d5;
    left: 0;
    right: 0;
    top: 0;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }
  .price-detail {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-direction: normal;
    -webkit-box-orient: horizontal;
    -webkit-flex-direction: row;
    -moz-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    -webkit-justify-content: space-between;
    -moz-justify-content: space-between;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -moz-align-items: center;
    align-items: center;
    color: #333;
    font-size: 20px;
    background: #fff;
    position: relative;
    .main-price-wrap {
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-direction: normal;
      -webkit-box-orient: vertical;
      -webkit-flex-direction: column;
      -moz-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      -moz-justify-content: center;
      justify-content: center;
      height: 100%;
    }
    .main-price {
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
      margin-left: 0.24rem;
    }
    .yuan {
      font-size: 12px;
    }
    .main-price-detail {
      font-size: 12px;
      color: #999;
      padding-right: 28px;
      &:after {
        content: '';
        width: 12px;
        height: 7px;
        position: absolute;
        top: 50%;
        right: 12px;
        background-image: url('../../../static/img/icon/down.png');
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: 12px 7px;
        margin-top: -3px;
        -webkit-transition: all 0.15s linear 0s;
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
    }
  }
  &.component-price-normal-button > div {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -moz-box-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
  .price-submit {
    display: inline-block;
    box-sizing: border-box;
    border: 0 none;
    border-radius: 3px;
    color: #fff;
    vertical-align: middle;
    text-align: center;
    text-decoration: none;
    font-size: 20px;
    height: 44px;
    line-height: 44px;
    transition: background 0.3s ease;
    -webkit-appearance: none;
    background-color: #ff5000;
    outline: 0;
  }
  .price-submit {
    display: block;
    height: 0.96rem;
    line-height: 0.96rem;
    font-size: 18px;
    font-weight: 700;
    border-radius: 0;
    background-image: -webkit-gradient(
      linear,
      left top,
      right top,
      from(#ff9300),
      to(#f35)
    );
    background-image: linear-gradient(90deg, #ff9300, #f35);
  }
}
.component-price-detail {
  position: fixed;
  z-index: 9000;
  width: 7.5rem;
  background: #f2f3f4;
  transition: all 0.2s linear 0s;
  -webkit-transition: all 0.2s linear 0s;
  transform: translate(0);
  -webkit-transform: translate(0);
  color: #333;
  padding-bottom: 1rem;
  .price-scroller {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    height: 100%;
    overflow-y: scroll;
  }
  .title {
    font-size: 15px;
    padding-left: 0.22rem;
    height: 1rem;
    line-height: 1rem;
    background: #fff;
    text-align: center;
  }
  .price-list .buynow-wrap {
    background: #fff;
    .item-title {
      height: auto;
      line-height: auto;
      padding-top: 12px;
      padding-bottom: 12px;
      & > div:first-child {
        -webkit-box-flex: 2;
        -webkit-flex: 2;
        -moz-box-flex: 2;
        -moz-flex: 2;
        -ms-flex: 2;
        flex: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      & > div:last-child {
        min-width: 1.17rem;
        text-align: right;
      }
    }
  }
  .item-title {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    -webkit-justify-content: space-between;
    -moz-justify-content: space-between;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -moz-align-items: center;
    align-items: center;
    font-size: 15px;
    margin-left: 0.22rem;
    padding-right: 0.22rem;
    height: 1rem;
  }
}
</style>
