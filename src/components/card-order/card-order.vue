<!-- 订单列表模板 -->
<template>
  <div class="order-item">
  <div class="module seller">
    <div class="o-t-title-shop">
      <div class="tcont">
        <div class="ico">
          <img lazy-load src="//img.alicdn.com/tps/TB1WP4JPVXXXXXOaXXXXXXXXXXX-32-32.png">
        </div>
        <div class="contact">
          <a href="//shop.m.taobao.com/shop/shop_index.htm?user_id=670365218">
            <p class="title">
              自由行
            </p>
            <p class="arrow">
              <i class="iconfont icon-enter"></i>
            </p>
          </a>
        </div>
        <div class="state">
          <div class="state-cont">
            <p class="h">
              等待买家付款
            </p>
            <p class="gray">
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="module item">
    <div class="item-list o-t-item">
      <div class="item-img">
        <p>
          <img lazy-load src="//gw.alicdn.com/tfscom/TB1AfYzJVXXXXcxXFXXorbaIVXX-80-80.jpg_q75">
        </p>
      </div>
      <div class="item-info">
        <h3 class="title">
          歌诗达邮轮赛琳娜号 游轮旅游日本旅游 2018年上海出发
        </h3>
        <p class="sku">
          成人出行日期:2018-08-25
        </p>
      </div>
      <div class="item-pay">
        <div class="item-pay-data">
          <p class="price">
            ￥1799.00
          </p>
          <p class="price">
            <del class="">
              ￥2799.00
            </del>
          </p>
          <p class="nums">
            x1
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="module pay">
    <div class="o-total-price">
      <div class="cont">
        <span>共1件商品</span>
        <span> 合计:￥1799.00</span>
      </div>
    </div>
  </div>
  <div class="module orderop" v-show="type!=='paid'">
    <div class="o-tab-btn clearfix">
      <ul class="clearfix">
        <li class="h" name="pay" v-show="type==='unpaid'">
          付款
        </li>
        <li class="" name="cancelOrder" v-show="type==='unpaid'">
          取消订单
        </li>
         <li class="" name="reserved" v-show="type==='reserved'">
          联系客服
        </li>
      </ul>
    </div>
  </div>
   <!--底部弹出层-->
    <mptoast></mptoast>
  </div>
</template>

<script type='text/ecmascript-6'>
import { mapGetters } from 'vuex'
import api from 'api/api'
import Mptoast from 'mptoast'
export default {
  data () {
    return {
      orderId: ''
    }
  },
  props: {
    type: {
      type: String,
      default: 'paid'
    }
  },
  components: {
    Mptoast
  },
  computed: {
    ...mapGetters(['oid'])
  },
  methods: {
    cancelOrder () {
      api
        .cancelOrder({ openId: this.oid, orderId: this.orderId })
        .then(res => {})
        .catch(errMsg => {
          this.$mptoast({
            text: errMsg,
            icon: 'error',
            duration: 2000
          })
        })
    }
  }
}
</script>
<style lang='less' scoped>
.order-item {
  border-bottom: 0.01rem solid #e7e7e7;
  position: relative;
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
