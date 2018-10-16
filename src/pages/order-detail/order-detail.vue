<!-- 订单确认支付页面 -->
<template>
  <div style="padding:12px;background-color:#f2f2f2;">
    <section class="order-section">
      <a :href="'../detail/main?id='+ goodId +''">
        <div class="mod-product-title-wrap productTitle">
          <h2 class="title">
            {{title}}
          </h2>
        </div>
        <div class="ModProductSubtitle-wrap">
          <div class="product-sub">
            <div class="sub-item">
              <div class="sub-key">
                <span>
                  行程类型
                </span>
                <span>
                  :
                </span>
              </div>
              <div class="sub-value">
                {{type}}
              </div>
            </div>
          </div>
          <div class="product-sub">
            <div class="sub-item">
              <div class="sub-key">
                <span>
                  出行日期
                </span>
                <span>
                  :
                </span>
              </div>
              <div class="sub-value">
                {{date}}
              </div>
            </div>
            <span class="jump-item">
              预订须知
            </span>
          </div>
        </div>
      </a>
    </section>
    <div class="line">
    </div>
    <section class="order-section">
      <div class="mod-common-tips-wrap" style="color:#3d3d3d;font-size:12px;padding-top:0px;">
        <em class="icon">
        </em>
        <span class="desc">
          {{qrs.type==='1'?'及时确认':'该商品需要二次确认'}}
        </span>
      </div>
      <div class="mod-common-tips-wrap" style="color:#666;font-size:12px;padding-top:3px;">
        <span class="desc">
          {{qrs.content}}
        </span>
      </div>
    </section>
    <div class="line">
    </div>
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
              x
              <P>1</P>
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
              x
              <P>2</P>
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
    <div class="line">
    </div>
    <div class="mod-block-title-wrap border-radius-top">
      <span class="title">
        出行人
      </span>
      <span class="sub-title">
      </span>
    </div>
    <div class="traveller-select-wrap">
      <div class="cell cell-indent border-radius-bt">
        <div class="cell-item">
          <div class="traveller-select">
            <div class="label-item">
              <div class="title">
                <span>
                  出行人
                </span>
              </div>
            </div>
            <div class="tips">
              <span>
                添加
              </span>
              <span class="num">
                <span>
                  {{getAllNum}}
                </span>
                <span>
                  位
                </span>
              </span>
              <span>
                出行人
              </span>
            </div>
            <!-- <span class="add-passenger-btn" @click="passengerUp()">
              选择出行人
            </span> -->
          </div>

        </div>
      </div>
    </div>
    <div class="weui-cells weui-cells_after-title ">
      <a class="weui-cell weui-cell_access mod-travellers-item" v-for="(item,index) in passenger" :key="index">
        <div class="weui-cell__hd">
          <div :class="['traveller-del']"></div>
        </div>
        <div class="weui-cell__bd">
          <span>{{item.orders_guest_name}}</span>
          <span>{{item.orders_guest_number}}</span>
        </div>
      </a>
    </div>
    <div class="line">
    </div>
    <div class="mod-block-title-wrap border-radius-top">
      <span class="title">
        联系人
      </span>
      <span class="sub-title">
      </span>
    </div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell weui-cell_input input-wrap">
        <div class="weui-cell__hd">
          <div class="weui-label">
            姓名
          </div>
        </div>
        <div class="weui-cell__bd">
          <input type="text" placeholder="请输入姓名" disabled="true" v-model.trim="name" class="contact-input weui-input">
        </div>
      </div>
      <div class="weui-cell weui-cell_input input-wrap">
        <div class="weui-cell__hd">
          <div class="weui-label">
            手机号
          </div>
        </div>
        <div class="weui-cell__bd">
          <input type="number" placeholder="请输入手机号" disabled="true" v-model.number.trim="phone" class="contact-input weui-input">
        </div>
      </div>
      <div class="weui-cell weui-cell_input input-wrap">
        <div class="weui-cell__hd">
          <div class="weui-label">
            邮箱
          </div>
        </div>
        <div class="weui-cell__bd">
          <input type="text" placeholder="请输入邮箱" disabled="true" v-model.trim="email" class="contact-input weui-input">
        </div>
      </div>
    </div>
    <div class="line">
    </div>
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
        <p>
          旅游意外险
        </p>
        <ul class="content-wrap">
          <li class="content" v-for="(item,index) in insurance" :key="index">
            {{item}}
          </li>
        </ul>
      </div>
    </section>
    <div class="line">
    </div>
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
                <input type="text" v-model="message" disabled="true" placeholder="如有特殊需要,请在这里留言">
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
          <span>
            请您仔细阅读
          </span>
          <div class="userAgreement-link">
            预订须知
          </div>
          <span>
            <span>
              ，
            </span>
            <span>
              点击去付款即代表您已阅读并同意条款内容。
            </span>
          </span>
        </div>
      </div>
    </div>
    <div class="container-price mod-buybanner">
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
          <!-- <div :class="[{up: priceUpState},'main-price-detail']">
            明细
          </div> -->
        </div>
        <div class="action-wrap" v-if="pay_state==='未支付'">
          <div class="cart normal" @click="show()">取消</div>
          <div class="buy normal" @click="pay()">
            去付款
          </div>
        </div>
      </div>
    </div>
    <i-modal title="提示" :visible="visible" @ok="handleOk" @cancel="handleClose">
      <view>确定要删除该订单吗？</view>
    </i-modal>
    <mptoast>
    </mptoast>
  </div>
</template>

<script type='text/ecmascript-6'>
import Mptoast from 'mptoast'
import api from 'api/api'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      id: '', // 订单id
      goodId: '', // 商品id
      type: '', // 行程类型
      title: '', // 商品标题
      totalPrice: 0, // 总价
      date: '', // 出发日期,
      name: '', // 姓名
      phone: '', // 手机
      email: '', // 邮箱
      message: '', // 用户留言
      adultNum: 0, // 成人人数
      childNum: 0, // 儿童人数
      adultPrice: 0, // 成人单价
      childPrice: 0, // 儿童单价
      passenger: [], // 行人
      qrs: {},
      insurance: [], // 保险
      pay_state: '', // 订单状态
      visible: false
    }
  },
  components: {
    Mptoast
  },
  onLoad () {
    this.id = this.$root.$mp.query.id
  },
  methods: {
    init () {
      this._getOrderDetail()
    },
    cancelOrder () {
      api
        .cancelOrder({ oid: this.oid, orderId: this.id })
        .then(res => {
          if (res.state === 'ok') {
            this.$mptoast({
              text: '取消订单成功',
              icon: 'success',
              duration: 2000
            })
            this.visible = false
            wx.redirectTo({
              url: '../orders/main'
            })
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
    pay () {
      api
        .getPay({
          oid: this.oid,
          orderId: this.id,
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
                    wx.redirectTo({
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
    _getOrderDetail () {
      api
        .getOrderDetail({ oid: this.oid, orderId: this.id })
        .then(res => {
          if (res.state === 'ok') {
            this.goodId = res.lists[0].orders_products_id
            this.title = res.lists[0].orders_cp_name
            this.type = res.lists[0].orders_class
            this.date = res.lists[0].orders_ctrq
            this.name = res.lists[0].user_name
            this.phone = res.lists[0].user_tel
            this.email = res.lists[0].user_emil
            this.message = res.lists[0].orders_remarks || '没有留言'
            this.adultNum = res.lists[0].orders_adult_num
            this.childNum = res.lists[0].orders_child_num
            this.adultPrice = res.lists[0].orders_crxs_price
            this.childPrice = res.lists[0].orders_etxs_price
            this.passenger = res.users
            this.qrs = res.lists[0].orders_qrs
            this.insurance = res.lists[0].orders_baoxian
            this.pay_state = res.lists[0].orders_pay_state
          }
        })
        .catch(errMsg => {
          console.log(errMsg)
        })
    },
    handleOk () {
      this.cancelOrder()
    },
    show () {
      this.visible = true
    },
    handleClose () {
      this.visible = false
    }
  },
  mounted () {
    this.init()
  },
  computed: {
    ...mapGetters(['oid']),
    getTotalPrice () {
      return this.adultNum * this.adultPrice + this.childNum * this.childPrice
    },
    getAllNum () {
      return Number(this.adultNum) + Number(this.childNum)
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
    p {
      font-size: 30rpx;
    }
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
    padding-top: 0;
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
      &.up:after {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
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
}
.component-price-detail {
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
.input-wrap {
  font-size: 14px;
  color: #333;
  input {
    font-size: 14px;
    width: 100%;
    color: #666;
  }
}
.label-item {
  -webkit-box-direction: normal;
  -webkit-box-orient: vertical;
  -webkit-flex-direction: column;
  -moz-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}

.traveller-select-wrap {
  .traveller-select {
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
  .add-passenger-btn,
  .label-item {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
  }
  .label-item {
    -webkit-box-direction: normal;
    -webkit-box-orient: vertical;
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    .title {
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
      color: #333;
      font-size: 14px;
      margin-right: 12px;
      min-width: 75px;
    }
  }
  .tips {
    font-size: 14px;
    color: #666;
  }
  .num {
    color: #fca500;
  }
  .add-passenger-btn {
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -moz-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    -moz-justify-content: center;
    justify-content: center;
    position: absolute;
    right: 12px;
    width: 1.54rem;
    height: 0.64rem;
    font-size: 0.26rem;
    color: #3d3d3d;
    border-radius: 0.06rem;
    -webkit-border-radius: 0.06rem;
    text-align: center;
    line-height: 0.48rem;
    background: #ffdc00;
  }
}
.new-passenger {
  color: #e90;
  text-align: center;
  font-size: 15px;
  background: #fff;
  line-height: 45px;
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
  &:after {
    pointer-events: none;
    position: absolute;
    content: '';
    height: 1px;
    background: #d5d5d5;
    left: 0;
    right: 0;
    bottom: 0;
    -webkit-transform-origin: 100% 100%;
    transform-origin: 100% 100%;
  }
}
.option {
  position: relative;
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
.child {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -moz-box-flex: 1;
  -moz-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.passenger,
.passenger > .passenger-label {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: flex;
}
.passenger {
  position: relative;
  width: 100%;
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
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  -moz-justify-content: space-between;
  justify-content: space-between;
  & > .passenger-label {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -moz-box-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    flex: 1;
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
    margin-right: 4px;
    min-height: 35px;
    font-size: 15px;
  }
  & > .indent {
    padding-left: 42px;
  }
}
.passenger-edit {
  background: url('../../../static/img/icon/edit.png');
  background-size: 18px 20px;
  background-repeat: no-repeat;
}
.passenger-bar {
  position: absolute;
  width: 35px;
  height: 35px;
  left: 2px;
  top: 50%;
  margin-top: -18px;
  z-index: 9999;
}
.passenger-name {
  display: block;
  color: #333;
  font-size: 16px;
  overflow: hidden;
  span {
    &:first-child {
      overflow: hidden;
      white-space: nowrap;
      max-width: 200px;
      display: inline-block;
      text-overflow: ellipsis;
    }
  }
}
.passenger-type {
  font-size: 13px;
  color: #a5a5a5;
  padding-left: 5px;
}
.passenger-no {
  display: block;
  margin-top: 5px;
  color: #333;
  font-size: 12px;
  line-height: 14px;
  & > span {
    margin-right: 5px;
  }
}
.checkbox {
  display: inline-block;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  width: 21px;
  height: 21px;
  outline: 0;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  margin: 0;
  padding: 0;
  font-size: 100%;
}
.mod-travellers-item {
  span {
    font-size: 28rpx;
    color: #666;
    margin-right: 0.1rem;
  }
  .traveller-del-btn {
    display: inline-block;
    box-sizing: border-box;
    padding: 0 6px;
    height: 30px;
    border-radius: 2px;
    vertical-align: middle;
    text-align: center;
    text-decoration: none;
    font-size: 14px;
    line-height: 30px;
    transition: background 1s ease;
    -webkit-appearance: none;
    background-color: #ff5000;
    outline: none;
    color: #fff;
  }
  .traveller-del {
    background: url('../../../static/img/icon/per.png') 50% no-repeat;
    background-size: 20px 20px;
    width: 40rpx;
    height: 40rpx;
  }
}
.mod-buybanner .action-wrap {
  height: 0.96rem;
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
.mod-buybanner .action-wrap .buy,
.mod-buybanner .action-wrap .cart {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -moz-box-flex: 1;
  -moz-flex: 1;
  -ms-flex: 1;
  flex: 1;
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
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  justify-content: center;
  width: 20%;
  height: 0.8rem;
  font-size: 0.28rem;
  font-weight: 500;
  color: #fff;
}
.mod-buybanner .action-wrap .cart {
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#ffd101),
    to(#ff9302)
  );
  background-image: linear-gradient(90deg, #ffd101, #ff9302);
  border-radius: 0.4rem 0 0 0.4rem;
}
.mod-buybanner .action-wrap .buy {
  margin-right: 0.18rem;
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#ff7500),
    to(#f35)
  );
  background-image: linear-gradient(90deg, #ff7500, #f35);
  border-radius: 0 0.4rem 0.4rem 0;
}
</style>
