<!--  -->
<template>
  <div style="background-color:#f2f2f2;">
    <div class="bg-header">
      <div class="banner-me">
        <div class="banner-top">
          <div class="banner-head" :style="{backgroundImage:'url('+ avatarUrl +')'}">
          </div>
          <div class="banner-name">
            <p>{{nickName}}</p>
          </div>
        </div>
        <div class="banner-bottom">
          <div class="btn-login" v-if="canIUse">
              <span>点击登陆</span>
              <button  open-type="getUserInfo" @getuserinfo="bindGetUserInfo"></button>
          </div>
          <div class="weui-flex" v-else>
            <div class="weui-flex__item">
              <div class="banner-bottom-item">
                 <p>0</p>
              </div>
              <p>积分</p>
            </div>
            <div class="weui-flex__item">
              <div class="banner-bottom-item">
                 <p>0</p>
              </div>
              <p>门店储值</p>
            </div>
            <div class="weui-flex__item">
              <div class="banner-bottom-item">
                 <p>0</p>
              </div>
              <p>优惠券</p>
            </div>
            <div class="weui-flex__item">
              <div class="banner-bottom-item">
                 <p>0</p>
              </div>
              <p>排名</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section class="sec-order">
      <div class="journey-title weex-ct weex-div">
          <div class="journey-title-icon weex-ct weex-div"></div>
          <p class="journey-title-text weex-el weex-text margin">
             我的订单
          </p>
      </div>
      <div class="order-opts">
          <div class="weui-flex">
            <div class="weui-flex__item order-opt" @click="toOrder('1')">
              <div class="order-opt-img">
                 <img src="/static/img/icon/payoff.png" alt="">
              </div>
              <p>待支付</p>
            </div>
            <div class="weui-flex__item order-opt"  @click="toOrder('2')">
               <div class="order-opt-img">
                 <img src="/static/img/icon/pay.png" alt="">
               </div>
              <p>已支付</p>
            </div>
            <div class="weui-flex__item order-opt"  @click="toOrder('3')">
              <div class="order-opt-img">
                <img src="/static/img/icon/order.png" alt="">
              </div>
              <p>已预约</p>
            </div>
            <div class="weui-flex__item order-opt">
              <div class="order-opt-img">
                <img src="/static/img/icon/kf.png" alt="">
              </div>
              <p>联系客服</p>
            </div>
          </div>
      </div>
    </section>
    <div class="line"></div>
    <section class="sec-application">
      <div class="journey-title weex-ct weex-div">
          <div class="journey-title-icon weex-ct weex-div"></div>
          <p class="journey-title-text weex-el weex-text margin">
             我的应用
          </p>
      </div>
    </section>
    <mptoast></mptoast>
  </div>

</template>

<script type='text/ecmascript-6'>
import Mptoast from 'mptoast'
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      perId: 0
    }
  },
  components: {
    Mptoast
  },
  methods: {
    ...mapMutations({
      setNickName: 'SET_NICKNAME',
      setAvatarUrl: 'SET_AVATARURL',
      setCanIUse: 'SET_CANIUSE'
    }),
    bindGetUserInfo (e) {
      if (e.mp.detail.userInfo) {
        this.setNickName(e.mp.detail.userInfo.nickName)
        this.setAvatarUrl(e.mp.detail.userInfo.avatarUrl)
        this.setCanIUse(false)
      }
    },
    toOrder (type) {
      wx.navigateTo({ url: `../orders/main?id=${this.perId}&type=${type}` })
    }
    // getUserInfo () {
    //   this.key = wx.getStorageSync('key')
    //   if (this.key) {
    //     api.checkLogin({ key: this.key }).then(res => {
    //       console.log(res)
    //       if (res.state === 'ok') {
    //         this.$mptoast('登陆成功', 'success', 2000)
    //       }
    //     })
    //   }
    // }
  },
  computed: {
    ...mapGetters(['nickName', 'avatarUrl', 'canIUse'])
  }
}
</script>
<style lang='less' scoped>
.bg-header {
  background-repeat: no-repeat;
  width: 100%;
  position: relative;
  background-image: url('../../../static/img/bg/bg@2x.png');
  background-size: cover;
  height: 3.33rem;
  .banner-me {
    height: 2.82rem;
    background-color: #ffffff;
    -moz-box-shadow: 5px 5px 8px #b8b8b8;
    -webkit-box-shadow: 5px 5px 8px #b8b8b8;
    box-shadow: 5px 5px 8px #b8b8b8;
    width: 90%;
    border-radius: 30rpx;
    position: absolute;
    left: 50%;
    margin-left: -45%;
    top: 0.9rem;
    .banner-top {
      position: relative;
      display: flex;
      .banner-head {
        width: 1.3rem;
        height: 1.3rem;
        overflow: hidden;
        border-radius: 50%;
        margin: -40rpx 0 0 20rpx;
        background-color: #808080;
        border: 10rpx solid #fff;
        flex: 1.1;
        background-size: cover;
      }
      .banner-name {
        flex: 4;
        color: #808080;
        padding: 0 0 0 0.4rem;
        font-size: 0.3rem;
        line-height: 1rem;
      }
    }
    .banner-bottom {
      color: #808080;
      text-align: center;
      font-size: 0.28rem;
      margin-top: 0.35rem;
    }
  }
}
.sec-order {
  background-color: #fff;
  margin-top: 0.7rem;
  .order-opts {
    .order-opt {
      padding: 0.2rem 0 0;
      .order-opt-img {
        width: 0.6rem;
        height: 0.6rem;
        margin: 0 auto;
        display: block;
        img {
          width: 100%;
          height: 100%;
        }
      }

      p {
        color: #808080;
        text-align: center;
        font-size: 0.26rem;
        line-height: 0.6rem;
      }
    }
  }
}
.sec-application {
  background-color: #fff;
}
.btn-login {
  height: 0.8rem;
  width: 4rem;
  margin: 0 auto;
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
  position: relative;
  span {
    position: absolute;
    width: 100%;
    text-align: center;
    color: #fff;
    line-height: 0.8rem;
    left: 0;
  }
  button {
    padding: 0.2rem 0.1rem;
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
  }
}
.weex-ct {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  position: relative;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
  -webkit-flex-shrink: 0;
  flex-shrink: 0;
  -webkit-box-flex: 0;
  -webkit-flex-grow: 0;
  flex-grow: 0;
  -webkit-flex-basis: auto;
  flex-basis: auto;
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
  align-items: stretch;
  -webkit-align-content: flex-start;
  align-content: flex-start;
  border: 0 solid black;
  margin: 0;
  padding: 0;
  min-width: 0;
}
.journey-title {
  height: 0.9rem;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  padding: 0 0.3rem;
  border-bottom: 1px solid #f2f2f2;
}
.journey-title-icon {
  width: 0.08rem;
  height: 0.4rem;
  border-radius: 0.02rem;
  background-color: #ffc900;
  margin-right: 0.2rem;
}
.weex-el {
  display: block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
  -webkit-flex-shrink: 0;
  flex-shrink: 0;
  -webkit-box-flex: 0;
  -webkit-flex-grow: 0;
  flex-grow: 0;
  -webkit-flex-basis: auto;
  flex-basis: auto;
  border: 0 solid black;
  margin: 0;
  padding: 0;
  min-width: 0;
}
.weex-text {
  display: -webkit-box;
  display: -moz-box;
  -webkit-box-orient: vertical;
  position: relative;
  // white-space: pre-wrap;
  font-size: 0.24rem;
  word-wrap: break-word;
  overflow: hidden;
}
.journey-title-text {
  color: #3d3d3d;
  font-size: 0.34rem;
  font-weight: 700;
}
</style>
