<!-- 首页 -->
<template>
  <div>
    <section class="search-box-wrapper" @click='toSearch()'>
      <div class="search-bg opacity-black">
        <!-- <img src='/static/img/bg/searchBg.png' alt=""> -->
      </div>
      <search-box ref="searchBox" @query="onQueryChange" readOnly="true" placeholder="搜索商家名、产品名或者路线">
        <template slot="left">
          <div class="search-left">
            <div class="addr">
              <span>成都</span>
              <i class="iconfont icon-unfold"></i>
            </div>
          </div>
        </template>
      </search-box>
    </section>
    <section class="slider-wrapper">
      <slide :imgUrls="imgUrls"></slide>
    </section>
    <section class="main-wrapper">

      <tab v-model="tabItem">
        <tab-item selected>自由行</tab-item>
        <tab-item>跟团游</tab-item>
      </tab>

      <swiper class="slider-group tab-context" :style="{'height': height+'px'}" @change="switchItem" :current="tabItem" duration="200" circular="true" skip-hidden-item-layout="true">
        <swiper-item>
          <card v-if="getFreeGo" :lists="freeGo" @loadMore="more"></card>
        </swiper-item>
        <swiper-item>
          <card v-if="getGroupGo" :lists="groupGo" @loadMore="more"></card>
        </swiper-item>
      </swiper>
      <load-more :isHideLoadMore="getHideLoadMore" :isComplete="getComplete"></load-more>
    </section>
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
    <mptoast></mptoast>

  </div>
</template>

<script type='text/ecmascript-6'>
import api from 'api/api'
import SearchBox from 'components/search-box/search-box'
import Tab from 'components/tab/tab'
import TabItem from 'components/tab/tab-item'
import Slide from 'base/slide/slide'
import Card from 'components/card/card'
import { mapGetters, mapMutations } from 'vuex'
import Mptoast from 'mptoast'
import Modal from 'components/modal/modal'
import LoadMore from 'base/load-more/load-more'

export default {
  components: {
    SearchBox,
    Tab,
    TabItem,
    Card,
    Modal,
    Mptoast,
    Slide,
    LoadMore
  },

  data () {
    return {
      tabItem: 0,
      type: '1',
      freeGo: [],
      groupGo: [],
      imgUrls: [],
      freePage: 0, // 自由行页数
      groupPage: 0, // 跟团游页数
      isHideLoadMore: false,
      isComplete: false,
      height: 0,
      disabled:
        typeof navigator !== 'undefined' &&
        /iphone/i.test(navigator.userAgent) &&
        /ucbrowser/i.test(navigator.userAgent)
    }
  },
  onLoad () {
    wx.getSystemInfo({
      // 获取页面可视区域的高度
      success: res => {
        this.height = res.screenHeight
      }
    })
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShareAppMessage () {
    const _thi = this
    return {
      title: _thi.nickName + '向你分享了小程序',
      path: `pages/index/main`,
      success () {
        // 转发成功
        api
          .getShareInfo({
            openId: _thi.oid,
            pageName: 'index'
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
  onPullDownRefresh () {
    // 下拉刷新重新获取数据
    this.freePage = 0 // 自由行页数
    this.groupPage = 0 // 跟团游页数
    wx.showNavigationBarLoading() // 在标题栏中显示加载
    api
      .getIndexData({ type: this.type, page: 0 })
      .then(res => {
        this.imgUrls = res.imgUrls
        this.type === '1'
          ? (this.freeGo = res.lists)
          : (this.groupGo = res.lists)
        // complete
        setTimeout(function () {
          wx.hideNavigationBarLoading() // 完成停止加载
          wx.stopPullDownRefresh() // 停止下拉刷新
        }, 1000)
      })
      .catch(errMsg => {
        console.log(errMsg)
      })
  },
  methods: {
    ...mapMutations({
      setVisible: 'SET_VISIBLE',
      setAuthPhone: 'SET_AUTHPHONE'
    }),
    more () {
      // 上拉加载更多
      if (this.type === '1') {
        this.freePage = this.freePage + 10
        this.getIndex(this.type, this.freePage)
      } else {
        this.groupPage = this.groupPage + 10
        this.getIndex(this.type, this.groupPage)
      }
    },
    toSearch () {
      wx.navigateTo({
        url: '../../pages/search/main'
      })
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
    init () {
      this.getIndex(this.type, this.freePage)
    },
    switchItem (res) {
      let oIndex = res.mp.detail.current
      this.tabItem = oIndex
      this.$nextTick(() => {
        this.onItemClick(oIndex)
      })
    },
    onItemClick (index) {
      this.tabItem = index // 获取选项卡索引
      if (index === 0) {
        this.type = '1'
        if (this.freeGo.length === 0) {
          this.getIndex(this.type, this.freePage)
        }
      } else {
        this.type = '2'
        if (this.groupGo.length === 0) {
          this.getIndex(this.type, this.groupPage)
        }
      }
    },
    async getIndex (type, page) {
      try {
        await api
          .getIndexData({ type: type, page: page })
          .then(res => {
            this.imgUrls = res.imgUrls
            if (type === '1') {
              if (res.lists === null) {
                setTimeout(() => {
                  this.isComplete = true
                }, 800)
              } else {
                const len = res.lists.length
                for (let i = 0; i < len; i++) {
                  this.freeGo.push(res.lists[i])
                }
                this.isComplete = false
              }
            } else if (type === '2') {
              if (res.lists === null) {
                setTimeout(() => {
                  this.isComplete = true
                }, 800)
              } else {
                const len = res.lists.length
                for (let i = 0; i < len; i++) {
                  this.groupGo.push(res.lists[i])
                }
                this.isComplete = false
              }
            }
            this.isHideLoadMore = false
            setTimeout(() => {
              this.isHideLoadMore = true
            }, 800)
          })
          .catch(errMsg => {
            console.log(errMsg)
          })
      } catch (e) {
        console.log(e)
      }
    }
  },
  beforeMount () {
    this.freePage = 0 // 自由行页数
    this.groupPage = 0 // 跟团游页数
    this.freeGo = []
    this.groupGo = []
  },
  mounted () {
    this.init()
    this.setVisible(!this.authPhone)
  },
  computed: {
    ...mapGetters(['visible', 'canIUse', 'oid', 'authPhone', 'nickName']),
    getFreeGo () {
      return this.freeGo.length > 0
    },
    getGroupGo () {
      return this.groupGo.length > 0
    },

    getHideLoadMore () {
      return this.isHideLoadMore
    },
    getComplete () {
      return this.isComplete
    }
  },
  watch: {
    tabItem (val) {
      this.$emit('update:tabItem', val)
    }
  }
}
</script>

<style scoped lang="less">
@import '~common/less/variable';

swiper {
  display: flex;
  height: 100%;
}
swiper-item {
  height: 100%;
  overflow: scroll;
  overflow-x: hidden;
}
.sticky-item {
  height: 44px;
  .i-sticky-title {
    padding: 0;
  }
}
.search-box-wrapper {
  .search-bg {
    position: absolute;
    top: 0;
    height: 1.26rem;
    width: 100%;
    z-index: -1;
    background-color: #ffdc2a;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .search-left {
    color: @color-dialog-background;
    font-size: @font-size-medium-x;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;

    .addr {
      display: flex;
      line-height: 44px;
      color: #000;
      text-align: center;
      span {
        flex: 2;
      }
      i {
        flex: 1;
        text-align: center;
      }
    }
  }
}
.tab-context {
  padding-bottom: 0;
  height: 100%;
  swiper-item {
    width: auto;
    height: 100%;
    border: 1rpx solid #ebebeb;
    box-sizing: border-box;
  }
}
.mod-tabs {
  position: -webkit-sticky;
  position: -moz-sticky;
  position: -ms-sticky;
  position: sticky;
  top: 0;
  height: 45px;
  background: #fff;
  z-index: 1;
}
</style>
