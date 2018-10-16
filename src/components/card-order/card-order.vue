<!-- 订单列表模板 -->
<template>
  <scroll-view scroll-y @scrolltolower="loadMore" style="height:100%">
    <div class="order-container">
      <div class="order-item" v-for="(item, index) in lists" :index="index" :key="item.id">
        <div class="module seller">
          <div class="o-t-title-shop">
            <div class="tcont">
              <div class="contact">
                <a>
                  <p class="title">
                    {{item.orders_type}}
                  </p>
                  <p class="arrow">
                    <i class="iconfont icon-enter"></i>
                  </p>
                  <p class="title-regdate" v-if="type!=='reserved'">
                    下单时间:{{item.orders_regdate}}
                  </p>
                </a>
              </div>
              <div class="state">
                <div class="state-cont">
                  <p class="h">
                    {{item.orders_pay_state}}
                  </p>
                  <p class="gray">
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="module item">
          <a class="item-list o-t-item" :href="type!=='reserved' ?'../order-detail/main?id='+ item.orders_id +'':''">
            <div v-if="type!=='reserved'" class="item-img" :style="{backgroundImage:'url( ' + item.orders_image + ') '}"></div>
            <div v-if="type==='reserved'" class="item-img"></div>
            <div class="item-info">
              <h3 class="title">
                {{item.orders_cp_name}}
              </h3>
              <p class="sku" v-if="item.orders_cp_date">
                出行日期:{{item.orders_cp_date}}
              </p>
              <p class="sku" v-if="item.orders_start_date">
                开始日期：{{item.orders_start_date}}
              </p>
              <p class="sku" v-if="item.orders_end_date">
                结束日期：{{item.orders_end_date}}
              </p>
              <p class="sku">
                <div class="sku-span">
                  <span>成人:{{item.orders_crxs_price}}x{{item.orders_adult_num}}</span>
                </div>
                <div class="sku-span">
                  <span>儿童:{{item.orders_etxs_price}}x{{item.orders_child_num}}</span>
                </div>
              </p>
            </div>
            <div class="item-pay">
              <div class="item-pay-data" v-if="type!=='reserved'">
                <p class="price">
                  ￥{{item.orders_crxs_price}}
                </p>
                <!-- <p class="price">
                  <del class="">
                    ￥2799.00
                  </del>
                </p> -->
                <p class="nums">
                  x{{item.orders_num}}
                </p>
              </div>
            </div>
          </a>
        </div>
        <div class="module pay">
          <div class="o-total-price">
            <div class="cont">
              <span>共1件商品</span>
              <span> 合计:￥{{item.orders_total}}</span>
            </div>
          </div>
        </div>
        <div class="module orderop" v-show="type!=='paid'">
          <div class="o-tab-btn clearfix">
            <ul class="clearfix">
              <li class="h" v-show="type==='unpaid'" @click="pay(item)">
                付款
              </li>
              <li v-show="type==='unpaid'" @click="show(item)">
                取消订单
              </li>
              <li v-show="type==='reserved'">
                联系客服
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </scroll-view>
</template>

<script type='text/ecmascript-6'>
import { mapGetters } from 'vuex'
import api from 'api/api'

export default {
  data () {
    return {
      order_id: ''
    }
  },
  props: {
    type: {
      type: String,
      default: 'paid'
    },
    lists: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  computed: {
    ...mapGetters(['oid'])
  },
  methods: {
    loadMore () {
      this.$emit('loadMore')
    },
    cancelOrder () {
      api
        .cancelOrder({ oid: this.oid, orderId: this.order_id })
        .then(res => {
          if (res.state === 'ok') {
            this.$emit('cancelState', true)
          }
        })
        .catch(errMsg => {
          this.$mptoast({
            text: errMsg,
            icon: 'error',
            duration: 2000
          })
        })
    },
    pay (item) {
      api
        .getPay({
          oid: this.oid,
          orderId: item.orders_id,
          type: 'order'
        })
        .then(res => {
          let orderId = res.orderId
          wx.requestPayment({
            timeStamp: res.timeStamp,
            nonceStr: res.nonceStr,
            package: res.package,
            signType: res.signType,
            paySign: res.paySign,
            success: res => {
              this.$mptoast({
                text: '支付成功',
                icon: 'success',
                duration: 2000
              })
              api
                .postPay({
                  oid: this.oid,
                  orderId: orderId
                })
                .then(res => {
                  if (res.state === 'ok') {
                    wx.navigateTo({
                      url: '../orders/main'
                    })
                  }
                })
                .catch(erMsg => {})
            },
            fail: res => {
              this.$mptoast({
                text: '支付失败',
                icon: 'error',
                duration: 2000
              })
            },
            complete: res => {}
          })
        })
        .catch(errMsg => {
          console.log(errMsg)
        })
    },
    handleOk () {
      this.cancelOrder()
    },
    show (item) {
      this.order_id = item.orders_id
      this.$emit('visible', true)
    }
  }
}
</script>
<style lang='less' scoped>
.order-container {
  height: 100%;
  .order-item {
    border-bottom: 0.01rem solid #e7e7e7;
    position: relative;
  }
}

.o-t-title-shop {
  height: 0.8rem;
  padding: 0 0.24rem;
  box-sizing: border-box;
  -webkit-box-pack: center;
  -ms-box-pack: center;
  -o-box-pack: center;
  box-pack: center;
  -webkit-box-align: center;
  -ms-box-align: center;
  -o-box-align: center;
  box-align: center;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-box;
  display: -o-box;
  display: box;
  background: #fff;
  .ico {
    margin-right: 0.2rem;
    line-height: 0;
    width: 0.32rem;
  }
  .contact {
    -webkit-box-flex: 1;
    -ms-box-flex: 1;
    -o-box-flex: 1;
    box-flex: 1;
    a {
      width: 100%;
      display: -webkit-box;
      display: -moz-box;
      display: -ms-box;
      display: -o-box;
      display: box;
      padding-right: 2rem;
      box-sizing: border-box;
    }
    .title {
      line-height: 0.5rem;
      text-align: left;
      overflow: hidden;
      -webkit-line-clamp: 1;
      -moz-line-clamp: 1;
      -ms-line-clamp: 1;
      -o-line-clamp: 1;
      line-clamp: 1;
      -webkit-box-orient: vertical;
      -ms-box-orient: vertical;
      -o-box-orient: vertical;
      box-orient: vertical;
      display: -webkit-box;
      display: -moz-box;
      display: -ms-box;
      display: -o-box;
      display: box;
      word-break: break-all;
      color: #ff5000;
      font-weight: 700;
    }
    .arrow {
      -webkit-box-flex: 1;
      -ms-box-flex: 1;
      -o-box-flex: 1;
      box-flex: 1;
    }
    .title-regdate {
      line-height: 0.5rem;
      text-align: left;
      overflow: hidden;
      -webkit-line-clamp: 1;
      -moz-line-clamp: 1;
      -ms-line-clamp: 1;
      -o-line-clamp: 1;
      line-clamp: 1;
      -webkit-box-orient: vertical;
      -ms-box-orient: vertical;
      -o-box-orient: vertical;
      box-orient: vertical;
      display: -webkit-box;
      display: -moz-box;
      display: -ms-box;
      display: -o-box;
      display: box;
      word-break: break-all;
      color: #666666;
      margin-left: 20rpx;
    }
  }
  .tcont {
    width: 100%;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-box;
    display: -o-box;
    display: box;
    & > div {
      -webkit-box-pack: center;
      -ms-box-pack: center;
      -o-box-pack: center;
      box-pack: center;
      -webkit-box-align: center;
      -ms-box-align: center;
      -o-box-align: center;
      box-align: center;
      display: -webkit-box;
      display: -moz-box;
      display: -ms-box;
      display: -o-box;
      display: box;
    }
  }
  .state {
    margin-left: 0.24rem;
    text-align: right;
  }
}
.o-t-item {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-box;
  display: -o-box;
  display: box;
  padding: 0.1rem 0.24rem;
  box-sizing: border-box;
  background: #f5f5f5;
  .item-img {
    width: 1.2rem;
    height: 1.2rem;
    margin-right: 0.22rem;
    overflow: hidden;
    -webkit-box-pack: center;
    -ms-box-pack: center;
    -o-box-pack: center;
    box-pack: center;
    -webkit-box-align: center;
    -ms-box-align: center;
    -o-box-align: center;
    box-align: center;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-box;
    display: -o-box;
    display: box;
    background: #fff;
    overflow: hidden;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url('../../../static/img/bg/car_road.png');
    img {
      max-width: 100%;
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
  }
  .item-info {
    -webkit-box-flex: 1;
    -ms-box-flex: 1;
    -o-box-flex: 1;
    box-flex: 1;
    .title {
      overflow: hidden;
      -webkit-line-clamp: 2;
      -moz-line-clamp: 2;
      -ms-line-clamp: 2;
      -o-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      -ms-box-orient: vertical;
      -o-box-orient: vertical;
      box-orient: vertical;
      display: -webkit-box;
      display: -moz-box;
      display: -ms-box;
      display: -o-box;
      display: box;
      word-break: break-all;
    }
    p {
      margin-top: 0.1rem;
      overflow: hidden;
      -webkit-line-clamp: 2;
      -moz-line-clamp: 2;
      -ms-line-clamp: 2;
      -o-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      -ms-box-orient: vertical;
      -o-box-orient: vertical;
      box-orient: vertical;
      display: -webkit-box;
      display: -moz-box;
      display: -ms-box;
      display: -o-box;
      display: box;
      word-break: break-all;
    }
    .sku-span {
      display: inline-block;
      margin-left: 0.1rem;
    }
  }
  .item-pay {
    width: 1.6rem;
    text-align: right;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-box;
    display: -o-box;
    display: box;
    -webkit-box-orient: vertical;
    .item-pay-data {
      -webkit-box-flex: 1;
      -ms-box-flex: 1;
      -o-box-flex: 1;
      box-flex: 1;
    }
    .price {
      line-height: 0.32rem;
      font-weight: 700;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      del {
        color: #999;
        text-decoration: line-through;
      }
    }
    .nums {
      color: #999;
      font-size: 12px;
    }
  }
}
.o-total-price {
  min-height: 0.6rem;
  padding: 0.05rem 0.24rem 0.05rem 0;
  text-align: right;
  -webkit-box-pack: center;
  -ms-box-pack: center;
  -o-box-pack: center;
  box-pack: center;
  -webkit-box-align: center;
  -ms-box-align: center;
  -o-box-align: center;
  box-align: center;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-box;
  display: -o-box;
  display: box;
  background: #fff;
  border-bottom: 0.01rem solid #e7e7e7;
  .cont {
    width: 100%;
    word-break: break-all;
    & > span {
      display: inline-block;
      margin-left: 0.24rem;
    }
  }
  b {
    font-weight: 700;
  }
}
.o-tab-btn {
  padding: 0.05rem 0.24rem 0.05rem 0;
  border-bottom: 0.01rem solid #e7e7e7;
  background: #fff;
  & > ul {
    position: relative;
    float: right;
    &:before,
    &:after {
      content: '';
      display: table;
    }
    li {
      float: right;
      padding: 0 0.2rem;
      margin: 0.1rem 0 0.1rem 0.1rem;
    }
  }
  &:before,
  &:after {
    content: '';
    display: table;
  }
  .h {
    border-color: #ff5000 !important;
    color: #ff5000 !important;
  }
}
.o-t-item .item-pay .item-pay-btn a,
.o-item-pay-btn a,
.o-tab-btn > ul li {
  height: 0.52rem;
  line-height: 0.52rem;
  text-align: center;
  border: 1px solid #999;
  border-radius: 0.04rem;
}
</style>
