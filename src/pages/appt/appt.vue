<!--  -->
<template>
  <div>
    <div class="bg-step">
      <img src="/static/img/bg/step@2x.png" alt="">
    </div>
    <form @submit="formSubmit">
      <div class="weui-cells weui-cells_after-title appt-time">
        <picker-date title="开始日期" @selectDate="selectStartDate"></picker-date>
        <input v-show="false" type="text" name="startTime" :value="startTime">
        <picker-date title="结束日期" @selectDate="selectEndDate"></picker-date>
        <input v-show="false" type="text" name="endTime" :value="endTime">
      </div>
      <div class="line"></div>
      <div class="weui-cells weui-cells_after-title">
        <picker-select title="成人数" :array="peopleNum" @select="selectAdult"></picker-select>
        <input v-show="false" type="text" name="child" :value="adultNum">
        <picker-select title="儿童数" :array="peopleNum" @select="selectChild"></picker-select>
        <input v-show="false" type="text" name="adult" :value="childNum">
      </div>
      <div class="line"></div>
      <div class="weui-cells weui-cells_after-title">
        <picker-select title="行程类型" :array="tripType" @select="selectType"></picker-select>
        <input v-show="false" type="text" name="tripType" :value="trip">
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">目的地</div>
          </div>
          <div class="weui-cell__bd">
            <input type="text" name="addr" v-model="addr" class="weui-input addr" placeholder="请输入目的地">
          </div>
        </div>
        <picker-select title="预期花费" :array="priceNum" @select="selectPrice"></picker-select>
        <input v-show="false" type="text" name="price" :value="price">
      </div>
      <view class="btn-submit">
        <p>确认预约</p>
        <button formType="submit">确认预约</button>
      </view>
    </form>
    <mptoast></mptoast>
    <modal v-model="visible" modalTit="绑定手机号">
      <div slot="content">
        <div>
          <div class="bind-phone">
            <button class="btn-phone" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"></button>
            <i-button type="success" shape="circle">微信手机号一键绑定</i-button>
          </div>
          <div class="tip-txt">
            <p>绑定手机号代表同意《用户协议》和《隐私政策》</p>
          </div>
          <div class="tip-img">
            <img src="/static/img/icon/phone.png" alt="">
            <span>使用手机号绑定</span>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script type='text/ecmascript-6'>
import { mapGetters, mapMutations } from 'vuex'
import PickerSelect from 'base/picker/picker-select'
import PickerDate from 'base/picker/picker-date'
import api from 'api/api'
import Mptoast from 'mptoast'
import Modal from 'components/modal/modal'

export default {
  data () {
    return {
      peopleNum: ['不限', '0', '1', '2', '3', '4'],
      priceNum: [
        '501-1000',
        '1001-2000',
        '2001-3000',
        '3001-4000',
        '4001-5000',
        '5000以上'
      ],
      tripType: ['跟团游', '自由行'],
      trip: '',
      startTime: null,
      endTime: null,
      adultNum: 0,
      childNum: 0,
      price: 0,
      addr: ''
    }
  },
  onLoad () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShareAppMessage (res) {
    const _thi = this
    return {
      title: _thi.nickName + '向你分享了小程序',
      path: `pages/appt/main`,
      success () {
        // 转发成功
        api
          .getShareInfo({
            openId: _thi.oid,
            pageName: 'appt'
          })
          .then(res => {
            if (res.state === 'ok') {
              return true
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      fail (res) {
        // 转发失败
      }
    }
  },
  computed: {
    ...mapGetters(['nickName', 'canIUse', 'oid', 'authPhone', 'visible'])
  },

  methods: {
    ...mapMutations({
      setVisible: 'SET_VISIBLE',
      setAuthPhone: 'SET_AUTHPHONE'
    }),
    getPhoneNumber (e) {
      api
        .postPhoneNum({
          encryptedData: e.mp.detail.encryptedData,
          iv: e.mp.detail.iv,
          id: this.oid
        })
        .then(res => {
          console.log(res)
          if (res.state === 'ok') {
            this.setVisible(false)
            this.$mptoast({
              text: '手机号授权成功',
              icon: 'success',
              duration: 3000
            })
            this.setAuthPhone(true) // 把授权状态改为true
          } else {
            this.setAuthPhone(false) // 把授权状态改为true
          }
        })
        .catch(errMsg => {
          console.log(errMsg)
        })
    },
    formSubmit (e) {
      if (this.canIUse) {
        // 如果未授权
        this.$mptoast({
          text: '请到个人中心授权',
          icon: 'error',
          duration: 2000
        })
      } else if (!this.authPhone) {
        this.setVisible(!this.authPhone)
      } else if (
        new Date(this.startTime).getTime() >= new Date(this.endTime).getTime()
      ) {
        this.$mptoast({
          text: '开始日期不能大于等于结束日期',
          icon: 'info',
          duration: 1000
        })
      } else if (this.addr === '') {
        this.$mptoast({
          text: '请输入你想要去的地方',
          icon: 'info',
          duration: 1000
        })
      } else {
        // 如果已经授权
        api
          .postApptData({
            formData: e.mp.detail.value,
            openId: this.oid,
            nickName: this.nickName
          })
          .then(res => {
            if (res.state === 'ok') {
              this.$mptoast({
                text: '预约成功',
                icon: 'success',
                duration: 4000
              })
            }
          })
          .catch(errMsg => {
            console.log(errMsg)
          })
      }
    },
    selectStartDate (v) {
      this.startTime = v
    },
    selectEndDate (v) {
      this.endTime = v
    },
    selectAdult (v) {
      this.adultNum = v
    },
    selectChild (v) {
      this.childNum = v
    },
    selectPrice (v) {
      this.price = v
    },
    selectType (v) {
      this.trip = v
    }
  },
  components: {
    PickerSelect,
    PickerDate,
    Mptoast,
    Modal
  }
}
</script>
<style lang='less' scoped>
.appt-time {
  color: #000;
}
.adult-num {
  float: right;
}
.btn-submit {
  margin-top: 0.6rem;
  width: 6rem;
  text-align: center;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  height: 0.9rem;
  overflow: hidden;
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#ff8e02),
    to(#fb314a)
  );
  background-image: linear-gradient(90deg, #ff8e02, #fb314a);
  border-radius: 0.4rem;

  p {
    line-height: 0.9rem;
    color: #fff;
    font-size: 0.32rem;
  }
  button {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 999;
    top: 0;
    opacity: 0;
  }
}
.bg-step {
  padding: 37.25% 0 0;
  position: relative;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
}
.addr {
  text-align: right;
}
</style>
