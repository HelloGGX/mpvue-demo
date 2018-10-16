<!-- 订单确认支付页面 -->
<template>
  <div style="padding:12px;background-color:#f2f2f2;">
    <section class="order-section">
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
                套餐类型
              </span>
              <span>
                :
              </span>
            </div>
            <div class="sub-value">
              特价*5日机票+西瓜卡
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
    </section>
    <div class="line">
    </div>
    <section class="order-section">
      <div class="mod-common-tips-wrap" style="color:#3d3d3d;font-size:12px;padding-top:0px;">
        <em class="icon">
        </em>
        <span class="desc">
          此商品需二次确认
        </span>
      </div>
      <div class="mod-common-tips-wrap" style="color:#666;font-size:12px;padding-top:3px;">
        <span class="desc">
          付款后卖家将在9个工作小时内（工作日9：00-18：00）核实是否有位，若核实无位或超时未确认，将自动退款
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
              <input-num v-model="shadow.adultNum">
              </input-num>
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
                  {{shadow.adultPrice}}
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
              <input-num v-model="shadow.childNum">
              </input-num>
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
                  {{shadow.childPrice}}
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
            <span class="add-passenger-btn" @click="passengerUp()">
              选择出行人
            </span>
          </div>

        </div>
      </div>
    </div>
    <div class="weui-cells weui-cells_after-title ">
      <a class="weui-cell weui-cell_access mod-travellers-item" v-for="(item,index) in selectItems" :key="index">
        <div class="weui-cell__hd">
          <div :class="['traveller-del']"></div>
        </div>
        <div class="weui-cell__bd">
          <span>{{item.name}}</span>
          <span>{{item.cred_num}}</span>
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
          <input type="text" placeholder="请输入姓名" v-model.trim="name" class="contact-input weui-input">
        </div>
      </div>
      <div class="weui-cell weui-cell_input input-wrap">
        <div class="weui-cell__hd">
          <div class="weui-label">
            手机号
          </div>
        </div>
        <div class="weui-cell__bd">
          <input type="number" placeholder="请输入手机号" v-model.number.trim="phone" class="contact-input weui-input">
        </div>
      </div>
      <div class="weui-cell weui-cell_input input-wrap">
        <div class="weui-cell__hd">
          <div class="weui-label">
            邮箱
          </div>
        </div>
        <div class="weui-cell__bd">
          <input type="text" placeholder="请输入邮箱" v-model.trim="email" class="contact-input weui-input">
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
        <span class="desc">
          旅游意外险
        </span>
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
                <input type="text" v-model="message" placeholder="如有特殊需要,请在这里留言">
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
          <div :class="[{up: priceUpState},'main-price-detail']" @click="up()">
            明细
          </div>
        </div>
        <div class="price-submit" @tap="pay">
          去付款
        </div>
      </div>
      <action-sheet ref="priceDetail" :shadow="shadow" v-model="priceUpState">
        <div class="component-price-detail">
          <div class="price-scroller">
            <div class="title">
              费用明细
            </div>
            <ul class="price-list">
              <li class="buynow-wrap">
                <div class="item-title">
                  <div style="color:#666">
                    成人
                  </div>
                  <div class="red">
                    ￥{{shadow.adultPrice}}×{{shadow.adultNum}}人
                  </div>
                </div>
              </li>
              <li class="buynow-wrap">
                <div class="item-title">
                  <div style="color:#666">
                    儿童
                  </div>
                  <div class="red">
                    ￥{{shadow.childPrice}}×{{shadow.childNum}}人
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </action-sheet>
      <action-sheet ref="passenger" :shadow="shadow" showConfirm='true' zIndex='9001' @confirm="confirm" v-model="passengerUpState">
        <div class="new-passenger" @click="addPassenger()">
          +新增
        </div>
        <div class="cell cell-top-border cell-bottom-border">
          <div class="cell-item">
            <div class="cell cell-indent cell-bottom-border" v-for="(item,index) in shadow.passenger" :key="index">
              <div class="cell-item">
                <div class="option">
                  <div class="child">
                    <div class="passenger">
                      <div class="indent passenger-label">
                        <div class="passenger-bar passenger-edit" @click="shadow.edit(item)">
                        </div>
                        <div class="passenger-name">
                          <span>
                            {{item.name}}
                          </span>
                          <span class="passenger-type passenger-normal">
                          </span>
                        </div>
                        <div class="passenger-no">
                          <span>
                            {{item.cred_type}}
                          </span>
                          <span>
                            {{item.cred_num}}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <input type="checkbox" class="checkbox" @click="shadow.selectItem(item)">
                </div>
              </div>
            </div>
          </div>
        </div>
      </action-sheet>
    </div>
    <mptoast>
    </mptoast>
  </div>
</template>

<script type='text/ecmascript-6'>
import InputNum from 'components/input-num/input-num'
import ActionSheet from 'components/actSheet/actionSheet'
import Mptoast from 'mptoast'
import api from 'api/api'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      id: '', // 商品id
      dateId: '', // 日期id
      title: '', // 商品标题
      totalPrice: 0, // 总价
      date: '', // 出发日期,
      name: '', // 姓名
      phone: '', // 手机
      email: '', // 邮箱
      message: '', // 用户留言
      priceUpState: false, // 用于明细设置弹出层状态
      passengerUpState: false, // 用于行人设置弹出层状态
      selectItems: [], // 选中的出行人
      copySelectItems: [], // 选中出行人过度数组
      editId: '' // 准备编辑的出行人id
    }
  },
  props: {
    shadow: {
      // 解决mpvue的插槽中变量无效的问题
      type: Object,
      default: function () {
        return {
          adultNum: 1, // 成人人数
          childNum: 0, // 儿童人数
          adultPrice: 0, // 成人单价
          childPrice: 0, // 儿童单价
          passenger: [],
          edit: () => {},
          selectItem: () => {}
        }
      }
    }
  },
  components: {
    InputNum,
    Mptoast,
    ActionSheet
  },
  onShow () {
    api
      .getOldPassager({ oid: this.oid })
      .then(res => {
        this.shadow.passenger = res.guests || []
        this.balance()
      })
      .catch(errMsg => {
        console.log(errMsg)
      })
  },
  methods: {
    init () {
      this.id = this.$root.$mp.query.id
      this.dateId = this.$root.$mp.query.dateId
      this.title = this.$root.$mp.query.title
      this.shadow.adultNum = this.$root.$mp.query.adultNum || 0
      this.shadow.childNum = this.$root.$mp.query.childNum || 0
      this.shadow.adultPrice = Number(this.$root.$mp.query.adultPrice) || 0
      this.shadow.childPrice = Number(this.$root.$mp.query.childPrice) || 0
      this.totalPrice = this.$root.$mp.query.totalPrice || 0
      this.date = this.$root.$mp.query.date
      this.shadow.edit = this.passengerEdit
      this.shadow.selectItem = this.selectItem
    },
    balance () {
      // 修复删除或者编辑行人后，选中的人也跟着改变的问题
      if (this.shadow.passenger.length === 0) {
        this.selectItems = []
      } else {
        const len = this.selectItems.length
        if (this.editId !== '') {
          let editItem = this.shadow.passenger.find(item => {
            return item.id === this.editId
          })
          if (!editItem) {
            // 如果已经被删除
            for (let i = 0; i < len; i++) {
              if (this.selectItems[i].id === this.editId) {
                this.selectItems.splice(i, 1)
              }
            }
          } else {
            // 如果处于编辑模式
            for (let i = 0; i < len; i++) {
              if (this.selectItems[i].id === this.editId) {
                this.selectItems[i] = editItem
              }
            }
          }
        }
      }
    },
    vaild (callBack) {
      const regPhone = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/g
      const regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g
      if (this.name === '' || this.phone === '' || this.email === '') {
        this.$mptoast({
          text: '联系人信息不完整,请检查',
          icon: 'info',
          duration: 1000
        })
      } else if (!regPhone.test(this.phone)) {
        this.$mptoast({
          text: '联系人手机号不正确',
          icon: 'info',
          duration: 1000
        })
      } else if (!regEmail.test(this.email)) {
        this.$mptoast({
          text: '联系人邮箱不正确',
          icon: 'info',
          duration: 1000
        })
      } else {
        callBack()
      }
    },
    up () {
      // 明细的弹出层
      this.priceUpState = !this.priceUpState
    },
    selectItem (e) {
      // 选中出行人
      if (this.copySelectItems.length === 0) {
        this.copySelectItems.push(e)
      } else {
        const len = this.copySelectItems.length
        for (let i = 0; i < len; i++) {
          if (e.id === this.copySelectItems[i].id) {
            this.copySelectItems.splice(i, 1)
          } else if (i === this.copySelectItems.length - 1) {
            this.copySelectItems.push(e)
          }
        }
      }
    },
    confirm () {
      const allNum = Number(this.shadow.adultNum) + Number(this.shadow.childNum)
      if (allNum !== this.copySelectItems.length) {
        this.$mptoast({
          text: `最多可选择${allNum}人`,
          icon: 'error',
          duration: 2000
        })
      } else {
        this.passengerUpState = !this.passengerUpState
        this.selectItems = this.copySelectItems
      }
    },
    addPassenger () {
      // 添加出行人
      wx.navigateTo({
        url: '../passenger/main'
      })
      this.passengerUpState = !this.passengerUpState
    },
    passengerEdit (item) {
      wx.navigateTo({
        url: `../passenger/main?id=${item.id}&name=${item.name}&cred_type=${
          item.cred_type
        }&cred_num=${item.cred_num}`
      })
      this.editId = item.id
      this.passengerUpState = !this.passengerUpState
    },
    passengerUp () {
      // 添加行人的弹出层
      api
        .getOldPassager({ oid: this.oid })
        .then(res => {
          this.shadow.passenger = res.guests || []
          this.passengerUpState = !this.passengerUpState
        })
        .catch(errMsg => {
          console.log(errMsg)
        })
    },
    pay (res) {
      if (this.getTotalPrice === 0) {
        this.$mptoast({
          text: '总价格不能为0',
          icon: 'error',
          duration: 3000
        })
      } else if (this.getAllNum !== this.selectItems.length) {
        this.$mptoast({
          text: '出行人总数与添加的人数不符',
          icon: 'error',
          duration: 1000
        })
      } else {
        // let timeStamp = res.timeStamp // 点击支付的时候的时间戳
        this.vaild(this.getPay)
      }
    },
    getPay () {
      api
        .getPay({
          oid: this.oid,
          id: this.id,
          dateId: this.dateId,
          adultNum: this.shadow.adultNum,
          adultPrice: this.shadow.adultPrice,
          childNum: this.shadow.childNum,
          childPrice: this.shadow.childPrice,
          totalPrice: this.totalPrice,
          passager: JSON.stringify(this.selectItems),
          name: this.name,
          phone: this.phone,
          email: this.email,
          message: this.message
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
                  console.log(res)
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
    }
  },
  mounted () {
    this.init()
  },
  computed: {
    ...mapGetters(['oid']),
    getTotalPrice () {
      return (
        this.shadow.adultNum * this.shadow.adultPrice +
        this.shadow.childNum * this.shadow.childPrice
      )
    },
    getAllNum () {
      return Number(this.shadow.adultNum) + Number(this.shadow.childNum)
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
</style>
