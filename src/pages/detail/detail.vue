<!-- 详情页 -->
<template>
  <scroll-view style="height:calc(100vh);" @scroll="scroll" :scroll-into-view="toView" scroll-y="true" scroll-with-animation="true">
    <div class="goods-container">
      <div id="banner" class="goods-banner" :style="{ height:bannerHeight+'rpx', backgroundImage:'url(' + goodInfo.image_url + ')'}" :data-src="goodInfo.image_url" @click="previewImage"></div>
      <div class="good-list">
        <div class="goods-wrapper">
          <div class="mod-price">
            <div class="price-area main-price-area">
              <span class="price-str">
                <span class="yen">￥</span>
                <span class="price-int">{{getShowPrice}}</span>
              </span>
              <span class="extra">
                <span class="orange-tag">超值优惠</span>
              </span>
            </div>
            <div class="price-area">
              <span class="preprice-text">价格</span>
              <span class="price-str">
                <span class="yen">￥</span>
                <span class="price-int">{{goodInfo.cost_price}}</span>
              </span>
            </div>
          </div>
          <div class="mod-title">
            <div class="title">{{goodInfo.title}}</div>
            <div class="share-wrap J_Share">
              <div class="left"></div>
              <div class="right">
                <i class="iconfont icon-share"></i>
                <button class="text" open-type="share">分享</button>
              </div>
            </div>
          </div>
          <div class="mod-sold">
            <div class="content">阅读量{{goodInfo.page_view}}</div>
          </div>
          <div class="mod-brand">
            <div class="brand-box cell-arrow">
              <img class="brand-icon" src="/static/img/icon/brand-icon.png">
              <div class="services-wrap">
                <div class="service-wrap">
                  <img class="icon" src="/static/img/icon/check-icon.png">
                  <span class="tag-title" style="color:#666666;">行程透明</span>
                </div>
                <div class="service-wrap">
                  <img class="icon" src="/static/img/icon/check-icon.png">
                  <span class="tag-title" style="color:#666666;">保障出行</span>
                </div>
                <div class="service-wrap">
                  <img class="icon" src="/static/img/icon/check-icon.png">
                  <span class="tag-title" style="color:#666666;">优质服务</span>
                </div>
              </div>
            </div>
          </div>
          <div class="mod-infocell-container">
            <div class="mod-multiinfocell">
              <div class="label">服务</div>
              <div class="infos-container">
                <div class="info">
                  <img class="item-icon" :src="getConfirmIcon">
                </div>
                <div class="info">
                  <div class="item-text">{{getGoodType}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="mod-selectsku">
            <div class="w-title">
              <div class="wt-title">出发时间:</div>
              <div class="wt-subtitle">{{selectDay}}</div>
            </div>
            <calendar :prices="getprice" v-on:choseDay="clickDay"></calendar>
          </div>

          <tab v-model="tabItem">
            <tab-item selected @on-item-click="onItemClick">商品详情</tab-item>
            <tab-item @on-item-click="onItemClick">费用说明</tab-item>
            <tab-item @on-item-click="onItemClick">线路详情</tab-item>
          </tab>

          <div class="tabs-container">
            <div class="mod-tuwen">
              <div class="w-title md-tit" id="tuwen">
                <div class="wt-title">图文介绍</div>
              </div>
              <div class="w-content">
                <div v-for="(item,index) in getImgArr" :key="index" class="item-img">
                  <img mode='widthFix' :src="[item.show==='true'? item.src : '/static/img/bg/default.png']" :class="[item.show==='true'? 'img-active' : '','img-lazy']">
                </div>
              </div>
            </div>
            <div class="mod-productdetail">
              <div class="w-title md-tit" id="prod">
                <div class="wt-title">费用说明</div>
              </div>
              <div class="w-content">
                <div style="z-index:8;top:45px;" class="sticky-bar sticky">
                  <div class="product-type">
                    <div class="bar-tabview">
                      <div class="tabview-tabs">
                        <ul class="tabview-tabs-wrap">
                          <li class="tabview-tab tabview-selected">
                            <div class="tabview-tab-title">
                              <!-- <div class="product-item active">
                                <span>成都直飞</span>
                              </div> -->
                              <div class="product-item active" @click="toHotel(goodInfo.hotel)">
                                <span>查看酒店</span>
                              </div>
                              <!-- <div class="product-item active" @click="downloadFile(goodInfo.pdf)">
                                <span>点击下载word行程</span>
                              </div> -->
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mod-feeinclude">
                  <div class="w-title">
                    <div class="wt-title">费用包含</div>
                  </div>
                  <div class="cnt">
                    <div class="content">
                      <div class="item-wrap ">
                        <div class="item ">
                          <div class="item-cnt">
                            <p v-for="(item,index) in goodInfo.price_include" :key="index">
                              {{item}}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mod-feeinclude">
                  <div class="w-title">
                    <div class="wt-title">
                      费用不含
                    </div>
                  </div>
                  <div class="cnt">
                    <div class="content">
                      <div class="item-wrap ">
                        <div class="item ">
                          <div class="item-cnt">
                            <p v-for="(item,index) in goodInfo.price_exclude" :key="index">
                              {{item}}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mod-feeinclude">
                  <div class="w-title">
                    <div class="wt-title">
                      自费项目
                    </div>
                  </div>
                  <div class="cnt">
                    <div class="content">
                      <div class="item-wrap ">
                        <div class="item ">
                          <div class="item-cnt">
                            <p v-for="(item,index) in goodInfo.self_expense" :key="index">
                              {{item}}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mod-notice">
                  <div class="w-title">
                    <div class="wt-title">
                      预定须知
                    </div>
                  </div>
                  <div class="cnt">
                    <div class="content" :style="{maxHeight: getMore}">
                      <div class="item">
                        <div class="item-cnt">
                          <p v-for="(item,index) in goodInfo.notice" :key="index">
                            {{item}}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="see-more" @click="seeMore()">
                      <div class="text">
                        查看更多
                      </div>
                      <div class="iconfont icon-enter"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mod-insurance">
              <div class="w-title">
                <div class="wt-title">
                  保险说明
                </div>
              </div>
              <div class="cnt">
                <div>
                  <div class="cell">
                    <!-- <div class="title">
                      江泰保险
                    </div> -->
                    <ul class="content-wrap">
                      <li class="content" v-for="(item,index) in goodInfo.insurance" :key="index">
                        {{item}}
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="note-wrap">
                  温馨提示：以上为商家赠送保险的基础保障信息，您可以在出行前查看保单详情，如需增加保额和内容，可在下单页选择定制保险购买。
                </div>
              </div>
            </div>
            <div class="mod-pdf">
              <div class="w-title md-tit" id="pdf">
                <div class="wt-title">线路详情</div>
              </div>
              <div class="w-content">
                <p v-if="goodInfo.hotel==='' && goodInfo.pdf===''" style="text-align:center">无相关资源</p>
                <i-button type="success" shape="circle" v-if="goodInfo.hotel!==''" @click="toHotel(goodInfo.hotel)">点击查看酒店详情</i-button>
                <i-button type="success" shape="circle" v-if="goodInfo.pdf!==''" @click="downloadFile(goodInfo.pdf)">点击下载PDF行程</i-button>
              </div>
            </div>
          </div>
          <div class="mod-buybanner-wrap">
            <div class="mod-buybanner" :style="jugeX">
              <div class="cnt">
                <div class="action-wrap">
                  <div class="wx-wrap">
                    <div class="wx">
                      <button open-type="contact" session-from="userMsg" />
                      <i class="iconfont icon-interactive"></i>
                      <div class="text">客服</div>
                    </div>
                  </div>
                  <div class="shop-wrap">
                    <div class="shop" @click="phoneCall()">
                      <i class="iconfont icon-mobilephone_fill"></i>
                      <div class="text">电话</div>
                    </div>
                  </div>
                  <div class="collect-wrap">
                    <div class="collect" @click="toHome()">
                      <i class="iconfont icon-homepage"></i>
                      <div class="text">首页</div>
                    </div>
                  </div>
                  <div class="buy normal" @click="buy()">立即购买
                    <span>{{price}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ActSheet v-model="bottomVisible" :info="goodInfo" @confirm="buyConfirm">
    </ActSheet>
    <!--底部弹出层-->
    <mptoast></mptoast>
    <scroll-top v-model="offsetTop" @scrollToTop="scrollToTop"></scroll-top>
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

  </scroll-view>

</template>
<script type='text/ecmascript-6'>
import api from 'api/api'
import Calendar from 'base/calendar/calendar.vue'
import Tab from 'components/tab/tab'
import TabItem from 'components/tab/tab-item'
import ScrollTop from 'base/scroll-top/scroll-top'
import { debounce, throttle, isIphoneX, changeDate, del$ } from 'utils/tools'
import { mapGetters, mapMutations } from 'vuex'
import Mptoast from 'mptoast'
import Modal from 'components/modal/modal'
import ActSheet from 'components/actSheet/actSheet'

export default {
  data () {
    return {
      height: '', // 获取当前页面的可视高度
      bannerH: 0,
      goodid: '',
      goodInfo: {},
      imgGroup: [],
      allPrice: [],
      dateId: '',
      tabItem: 0,
      toView: '',
      offsetTop: 0,
      price: '', // 成人价
      selectDay: '',
      more: false, // 费用须知查看更多状态
      bottomVisible: false, // 底部弹出层显示与否
      good_type: '1',
      good_text: ''
    }
  },
  components: {
    Calendar,
    Tab,
    TabItem,
    ScrollTop,
    Mptoast,
    ActSheet,
    Modal
  },
  onShareAppMessage: function (res) {
    const _thi = this
    return {
      title: _thi.goodInfo.title,
      path: `pages/detail/main?id=${_thi.goodInfo.id}`,
      success (res) {
        // 转发成功
        api
          .getShareInfo({
            openId: _thi.oid,
            pageName: 'detail',
            goodId: _thi.goodInfo.id
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
      fail: function (res) {
        // 转发失败
      }
    }
  },

  onLoad (options) {
    wx.getSystemInfo({
      // 获取页面可视区域的高度
      success: res => {
        this.height = res.screenHeight
      }
    })
    this.toView = ''
    this.goodid = this.$root.$mp.query.id
    this.selectDay = ''
    this._getDetail()
  },
  mounted () {
    setTimeout(() => {
      this.getBannerHeight()
    }, 20)
  },
  onShow () {
    this.showImg()
  },
  methods: {
    ...mapMutations({
      setVisible: 'SET_VISIBLE',
      setAuthPhone: 'SET_AUTHPHONE'
    }),
    async _getDetail () {
      // 异步获取该页所有数据
      let _thi = this
      try {
        await api
          .getDetailData({
            id: this.goodid
          })
          .then(res => {
            this.goodInfo = res.lists[0]
            this.price = `￥${this.goodInfo.sale_price}`
            _thi.allPrice = res.lists2
            this.good_type = this.goodInfo.need_conf.good_type
            this.good_text = this.goodInfo.need_conf.text
            // this.setAsyncData(res.lists2)
            wx.setNavigationBarTitle({
              title: this.goodInfo.title
            })
          })
          .catch(errMsg => {
            console.log(errMsg)
          })
      } catch (e) {
        console.log(e)
      }
    },
    toHotel (v) {
      wx.navigateTo({ url: `../web-view/main?src=${v}` })
    },
    toHome () {
      wx.reLaunch({ url: '../index/main' })
    },
    downloadFile (v) {
      wx.downloadFile({
        url: v,
        success (res) {
          if (res.statusCode === 200) {
            const filePath = res.tempFilePath
            wx.openDocument({
              filePath: filePath,
              success: res => {
                this.$mptoast({
                  text: '打开文档成功',
                  icon: 'success',
                  duration: 1000
                })
              },
              fail: err => {
                console.log(err)
              }
            })
          }
        },
        fail (err) {
          console.log(err)
        }
      })
    },
    seeMore () {
      // 预订须知查看更多
      this.more = !this.more
    },
    showImg () {
      // 判断高度是否需要加载
      wx
        .createSelectorQuery()
        .selectAll('.item-img')
        .boundingClientRect(ret => {
          this.imgGroup = this.goodInfo.image_arr
          const height = this.height
          ret.forEach((item, index) => {
            if (item.top < height) {
              this.imgGroup[index].show = 'true'
            }
          })
        })
        .exec()
    },
    getPhoneNumber (e) {
      api
        .postPhoneNum({
          encryptedData: e.mp.detail.encryptedData,
          iv: e.mp.detail.iv,
          id: this.oid
        })
        .then(res => {
          if (res.state === 'ok') {
            this.setVisible(false)
            this.$mptoast({
              text: '手机号授权成功',
              icon: 'success',
              duration: 3000
            })
            this.setAuthPhone(true) // 把授权状态改为true
          }
        })
        .catch(errMsg => {
          console.log(errMsg)
        })
    },
    previewImage (e) {
      // 点击页头预览大图
      this.$nextTick(() => {
        let current = e.target.dataset.src
        let imgArr = []
        for (let item of this.goodInfo.image_arr) {
          imgArr.push(item.src)
        }
        imgArr.unshift(current)
        wx.previewImage({
          current: current,
          urls: imgArr
        })
      })
    },
    buyConfirm (v) {
      // 点击购买确认按钮并跳转页面
      this.bottomVisible = false
      wx.navigateTo({
        url: `../trip-buy/main?id=${v.id}&title=${v.title}&adultNum=${
          v.adultNum
        }&childNum=${v.childNum}&adultPrice=${v.adultPrice}&childPrice=${
          v.childPrice
        }&totalPrice=${v}&date=${this.selectDay}&dateId=${this.dateId}`
      })
    },
    buy () {
      if (this.price === '') {
        this.$mptoast({
          text: '请选择有价格的日期',
          icon: 'error',
          duration: 2000
        })
      } else if (this.selectDay === '') {
        this.$mptoast({
          text: '请选择出行日期',
          icon: 'error',
          duration: 2000
        })
      } else if (!this.authPhone) {
        this.setVisible(!this.authPhone)
      } else {
        this.bottomVisible = true
      }
    },
    phoneCall () {
      wx.makePhoneCall({
        phoneNumber: '18000570544'
      })
    },
    jugeTab () {
      // 判断锚点距顶部的距离
      let _thi = this
      let query = wx.createSelectorQuery()
      query
        .selectAll('.md-tit')
        .boundingClientRect(function (rects) {
          for (let i = 0; i < rects.length; i++) {
            if (rects[i].top > 0 && rects[i].top <= 88) {
              _thi.tabItem = i
            }
          }
        })
        .exec()
    },
    scrollToTop () {
      // 回到顶部
      this.toView = 'banner'
    },
    scroll (e) {
      // 滚动回调
      this.offsetTop = e.mp.detail.scrollTop
      this.toView = ''
      debounce(this.showImg())
      throttle(this.jugeTab(), 0)
    },
    onItemClick (i) {
      // 锚点切换
      if (i === 0) {
        this.toView = 'tuwen'
      } else if (i === 1) {
        this.toView = 'prod'
      } else {
        this.toView = 'pdf'
      }
    },
    switchItem (res) {
      // 点击选项卡的回调
      let oIndex = res.mp.detail.current
      this.tabItem = oIndex
    },
    clickDay (data) {
      // 日历选中某天的回调
      if (data.id) {
        api
          .postGoodId({ id: data.id })
          .then(res => {
            if (res.state === 'ok') {
              this.goodInfo.child_price = res.lists[0].et_price
            }
          })
          .catch(errMsg => {
            this.$mptoast({
              text: errMsg,
              icon: 'error',
              duration: 2000
            })
          })
        this.dateId = data.id
        this.price = data.price
        this.goodInfo.sale_price = del$(data.price)
      }
      this.selectDay = changeDate(data.time)
    },
    getBannerHeight () {
      // 根据页面宽度设置banner高度
      wx
        .createSelectorQuery()
        .select('#banner')
        .boundingClientRect(rect => {
          this.bannerHeight = rect.width
        })
        .exec()
    }
  },
  computed: {
    ...mapGetters(['visible', 'authPhone', 'oid']),
    getShowPrice () {
      return this.goodInfo.sale_price
    },
    jugeX () {
      // 判断是否为iphoneX
      return isIphoneX() ? 'padding-bottom:20px' : ''
    },
    bannerHeight: {
      get: function () {
        return this.bannerH * 2
      },
      set: function (v) {
        this.bannerH = v
      }
    },
    getprice () {
      return this.allPrice
    },
    getImgArr () {
      return this.imgGroup
    },
    getMore () {
      return this.more ? '100%' : '308rpx'
    },
    getConfirmIcon () {
      return `/static/img/icon/confirm-ico${this.good_type}.png`
    },
    getGoodType () {
      return this.good_text
    }
  },
  watch: {
    offsetTop (val, oldVal) {
      if (val === 0) {
        this.toView = ''
      }
    }
  }
}
</script>

<style lang='less' scoped>
.goods-container {
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 640px;
  min-height: 100%;
  margin: 0 auto;
  padding: 0;
  background-color: #f4f4f4;
  .goods-banner {
    width: 100%;
    position: relative;
    background-size: cover;
  }
  .bg-layer {
    position: relative;
    height: 100%;
  }
  .good-list {
    background-color: #f2f2f2;
  }
}

.mod-price {
  padding: 0.3rem 0.24rem 0.15rem;
  background: #fff;
  .price-area.main-price-area {
    margin-top: 0;
    color: #999;
    .price-str {
      color: #ff5000;
      font-size: 0.36rem;
      margin-right: 0.12rem;
      text-decoration: none;
      .price-int {
        font-size: 0.48rem;
      }
    }
    .extra {
      position: relative;
      top: -0.04rem;
      .orange-tag {
        position: relative;
        color: #ff5000;
        font-size: 0.2rem;
        padding: 0 3px;
        &:after {
          position: absolute;
          content: '';
          top: 0;
          left: 0;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          border: 1px solid #ff5000;
          pointer-events: none;
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
          border-radius: 2px;
        }
      }
    }
  }
  .price-area {
    margin-top: 0;
    .preprice-text {
      color: #999;
      font-size: 0.24rem;
      margin-right: 0.02rem;
    }
    .price-str {
      color: #999;
      font-size: 0.24rem;
      margin-right: 0.12rem;
      text-decoration: line-through;
    }
  }
}

.mod-title {
  background: #fff;
  padding: 0.09rem 0.24rem;
  padding-right: 0;
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
  .title {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -moz-box-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    flex: 1;
    color: #3d3d3d;
    font-size: 0.3rem;
    line-height: 0.42rem;
    font-weight: 600;
    padding-right: 0.24rem;
  }
  .share-wrap {
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
    padding-right: 0.24rem;
    .left {
      z-index: 1;
      position: relative;
      height: 0.56rem;
      margin-right: 0.24rem;
      &::before {
        pointer-events: none;
        position: absolute;
        content: '';
        width: 1px;
        background: #f2f3f4;
        top: 0;
        bottom: 0;
        left: 0;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
      }
    }
    .right {
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
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      -moz-align-items: center;
      align-items: center;
      color: #999;
      .iconfont {
        font-size: 0.5rem;
        line-height: 0.4rem;
      }
      .text {
        margin-bottom: 0.09rem;
        font-size: 0.24rem;
        &:after {
          border: none;
        }
      }
    }
  }
}

.mod-sold {
  background-color: #fff;
  color: #999;
  font-size: 0.24rem;
  padding: 0.15rem 0.24rem;
}

.mod-brand {
  color: #333;
  line-height: 1.2;
  font-size: 0.28rem;
  padding: 0.15rem 0 0.3rem 0.24rem;
  background-color: #fff;
  .brand-box {
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
  .brand-icon,
  .brand-text {
    margin-right: 0.2rem;
  }
  .brand-icon {
    height: 0.28rem;
    display: block;
    width: 1rem;
  }
  .services-wrap {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -moz-box-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    flex: 1;
    margin-right: 0.44rem;
    overflow: hidden;
    .service-wrap {
      -webkit-flex-shrink: 0;
      -moz-flex-shrink: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
      font-size: 0.24rem;
      margin-right: 0.22rem;
      .icon {
        display: block;
        margin-right: 0.06rem;
        max-height: 12px;
        width: 0.24rem;
        height: 0.24rem;
      }
      .tag-title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 1.4;
        max-width: 6em;
      }
    }
  }
  .services-wrap,
  .services-wrap .service-wrap {
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
}

.mod-multiinfocell {
  margin-top: 0.18rem;
  background: #fff;
  padding: 0.3rem 0.24rem 0.12rem;
  color: #3d3d3d;
  font-size: 0.24rem;
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
  .label {
    font-size: 13px;
    color: #999;
    white-space: nowrap;
  }
  .infos-container {
    margin-left: 0.24rem;
    .info {
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
      margin-bottom: 0.18rem;
      .item-icon {
        height: 0.26rem;
        width: 1.34rem;
        margin-right: 0.08rem;
      }
      .item-text {
        font-size: 13px;
        line-height: 1.2;
        color: #333;
      }
    }
  }
}

.mod-selectsku {
  background: #fff;
  margin-top: 0.24rem;
}

.w-title {
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
  padding: 0 0.24rem;
  height: 0.9rem;
  .wt-title {
    font-size: 0.3rem;
    font-weight: 700;
    line-height: 0.36rem;
    color: #ff5000;
  }
  .wt-subtitle {
    -webkit-box-flex: 2;
    -webkit-flex: 2;
    -moz-box-flex: 2;
    -moz-flex: 2;
    -ms-flex: 2;
    flex: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0.06rem 0 0 0.08rem;
    font-size: 0.28rem;
    color: #ff5000;
  }
}

.mod-tabs {
  margin-top: 0.18rem;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: -ms-sticky;
  position: sticky;
  top: 0;
  height: 45px;
  background: #fff;
  z-index: 1;
}

.tabs-container {
  height: 100%;
}

.mod-tuwen {
  width: 100%;
  overflow: hidden;
  background: #fff;
  font-size: 0.28rem;
  line-height: 0.32rem;
  margin-top: 0.18rem;
  .w-content {
    overflow: hidden;
    position: relative;
    padding: 0 0.24rem 0.24rem;
  }
  img {
    max-width: 100%;
    display: block;
  }
}

.w-title {
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
  padding: 0 0.24rem;
  height: 0.9rem;
  .wt-title {
    font-size: 0.3rem;
    font-weight: 700;
    line-height: 0.36rem;
    color: #333;
  }
}

.w-content {
  background-color: #f1f1f1;
}

.mod-productdetail {
  width: 100%;
  font-size: 0.28rem;
  line-height: 0.32rem;
  margin-top: 0.18rem;
  background: #fff;
  .sticky-bar {
    height: 50px;
    background-color: #fafafa;
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
    .product-type {
      width: 100%;
      .tabview-tabs {
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flexbox;
        display: flex;
      }
      .tabview-tabs-wrap {
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        -webkit-justify-content: flex-start;
        -moz-justify-content: flex-start;
        justify-content: flex-start;
      }
      .product-item {
        display: inline-block;
        box-sizing: border-box;
        height: 32px;
        padding-left: 5px;
        padding-right: 5px;
        font-size: 12px;
        color: #3d3d3d;
        background-color: #fff;
        border-radius: 3px;
        border: 1px solid #e0e0e0;
        margin-left: 12px;
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
        font-weight: 400;
        flex: 1;
        &.active {
          background-image: linear-gradient(90deg, #fce41d, #ffc503);
          border: none;
        }
        span {
          white-space: normal;
        }
      }
    }
  }
}

.bar-tabview {
  .tabview-tabs {
    color: #3d3d3d;
    position: relative;
    width: 100%;
    overflow-x: hidden;
    white-space: nowrap;
    font-size: 0;
  }
  .tabview-tabs-wrap {
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -moz-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -ms-flex-pack: distribute;
    -webkit-justify-content: space-around;
    -moz-justify-content: space-around;
    justify-content: space-around;
    min-width: 100%;
    min-height: 1.17333rem;
    position: relative;
  }
  .tabview-tab {
    display: inline-block;
    text-align: center;
    min-width: 1.14rem;
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -moz-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-direction: normal;
    -webkit-box-orient: vertical;
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
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
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  .tabview-tab-title {
    position: relative;
    text-align: center;
    display: flex;
    font-size: 0.28rem;
  }
}

.mod-buybanner-wrap {
  .mod-buybanner {
    position: fixed;
    z-index: 99;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    background: #fff;
    .cnt {
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
    }
    .action-wrap {
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
      .collect-wrap,
      .shop-wrap,
      .wx-wrap {
        height: 100%;
      }
      .collect,
      .shop,
      .wx {
        position: relative;
        width: 0.96rem;
        height: 100%;
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
        color: #666;
        font-size: 0.2rem;
        .iconfont {
          font-size: 0.4rem;
          line-height: 0.45rem;
        }
        button {
          position: absolute;
          width: 100%;
          height: 100%;
          border: none;
          opacity: 0;
        }
      }
      .buy {
        margin-right: 0.18rem;
        background-image: -webkit-gradient(
          linear,
          left top,
          right top,
          from(#ff8e02),
          to(#fb314a)
        );
        background-image: linear-gradient(90deg, #ff8e02, #fb314a);
        border-radius: 0.4rem;
      }
      .buy {
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
    }
  }
}

.mod-feeinclude {
  margin-top: 0.18rem;
  background: #fff;
  padding-bottom: 0.24rem;
  color: #666;
  font-size: 0.24rem;
  .cnt {
    padding-left: 0.24rem;
    padding-right: 0.24rem;
  }
  .content {
    max-height: 176px;
    overflow: hidden;
    .item-wrap {
      .item {
        position: relative;
        font-size: 14px;
        &:last-child {
          margin-bottom: 0;
        }
        .item-cnt p {
          line-height: 22px;
          word-break: break-all;
        }
      }
    }
  }
}

.mod-notice {
  margin-top: 0.18rem;
  background: #fff;
  color: #3d3d3d;
  font-size: 14px;
  line-height: 22px;
  padding-bottom: 0.24rem;
  .cnt {
    padding-left: 0.24rem;
    padding-right: 0.24rem;
  }
  .content {
    max-height: 154px;
    overflow: hidden;
    color: #666;
  }
  .item-cnt > p {
    word-break: break-all;
  }
  .see-more {
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
    font-size: 12px;
    color: #a5a5a5;
  }
}

.mod-insurance {
  background: #fff;
  padding-bottom: 0.24rem;
  margin-top: 0.18rem;
  word-break: break-all;
  .cnt {
    padding-left: 0.24rem;
    padding-right: 0.24rem;
  }
  .note-wrap {
    font-size: 0.24rem;
    color: #3d3d3d;
    line-height: 0.44rem;
  }
  .cell {
    padding-bottom: 0.24rem;
    .title {
      font-size: 0.28rem;
      color: #3d3d3d;
      line-height: 0.44rem;
      margin-bottom: 0.12rem;
    }
    .content-wrap {
      background: #fbfbfb;
      color: #666;
      font-size: 0.28rem;
      line-height: 0.44rem;
      padding: 0.12rem 0 0.12rem 0.5rem;
    }
    .content {
      list-style-type: disc;
    }
  }
}
.mod-pdf {
  padding-bottom: 1.76rem;
}
</style>
