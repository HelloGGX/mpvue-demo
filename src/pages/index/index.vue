<!-- 首页 -->
<template>
   <div>
    <section class="search-box-wrapper" @click='toSearch()'>
      <div class="search-bg opacity-black">
        <img src='/static/img/bg/searchBg.jpg' alt="">
      </div>
      <search-box ref="searchBox" @query="onQueryChange" readOnly="true"  placeholder="搜索商家名、产品名或者路线" >
        <template slot="left">
          <div class="search-left">
          <div class="addr"><span>成都</span><i class="iconfont icon-unfold"></i></div>
          </div>
        </template>
      </search-box>
    </section>
    <section class="main-wrapper">
        <tab  v-model="tabItem">
          <tab-item selected >自由行</tab-item>
          <tab-item >跟团游</tab-item>
        </tab>
        <div :style="{'height': getScrollHeigh+'px'}">
          <swiper  class="slider-group tab-context"  @change="switchItem" :current ="tabItem" duration="200" circular="true" skip-hidden-item-layout="true">
              <swiper-item><card v-if="getFreeGo"  :lists="freeGo"></card></swiper-item>
              <swiper-item><card  v-if="getGroupGo" :lists="groupGo"></card></swiper-item>
          </swiper>
        </div>
    </section>
    <modal v-model="visible" modalTit="绑定手机号" @closeCall="closeCall">
      <div slot="content">
          <div>
            <div class="bind-phone">
              <button class="btn-phone" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"></button>
              <i-button type="success" shape="circle">微信手机号一键绑定</i-button>
            </div>
            <div class="tip-txt"><p>绑定手机号代表同意《用户协议》和《隐私政策》</p></div>
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
import api from 'api/api'
import SearchBox from 'components/search-box/search-box'
import Tab from 'components/tab/tab'
import TabItem from 'components/tab/tab-item'
import Card from 'components/card/card'
import { mapGetters, mapMutations } from 'vuex'
import Modal from 'components/modal/modal'

export default {
  components: {
    SearchBox,
    Tab,
    TabItem,
    Card,
    Modal
  },

  data () {
    return {
      tabItem: 0,
      type: '1',
      freeGo: [],
      groupGo: [],
      disabled:
        typeof navigator !== 'undefined' &&
        /iphone/i.test(navigator.userAgent) &&
        /ucbrowser/i.test(navigator.userAgent)
    }
  },
  methods: {
    ...mapMutations({
      setVisible: 'SET_VISIBLE'
    }),
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
          console.log(res)
          if (res.state === 'ok') {
            console.log('手机号获取成功')
          }
        })
        .catch(errMsg => {
          console.log(errMsg)
        })
    },
    closeCall () {
      this.setVisible(false)
      // this.setVisible(true)
    },
    init () {
      this.getIndex(this.type)
    },
    switchItem (res) {
      let oIndex = res.mp.detail.current
      this.tabItem = oIndex
      this.onItemClick(oIndex)
    },
    onItemClick (index) {
      this.tabItem = index // 获取选项卡索引
      index === 0 ? (this.type = '1') : (this.type = '2')

      this.getIndex(this.type)
    },
    async getIndex (type) {
      try {
        await api
          .getIndexData({ type: type })
          .then(res => {
            type === '1'
              ? (this.freeGo = res.lists)
              : (this.groupGo = res.lists)
          })
          .catch(errMsg => {
            console.log(errMsg)
          })
      } catch (e) {
        console.log(e)
      }
    }
  },
  mounted () {
    this.init()
    this.setVisible(true)
  },
  computed: {
    ...mapGetters(['visible', 'canIUse', 'oid']),
    getFreeGo () {
      return this.freeGo.length > 0
    },
    getGroupGo () {
      return this.groupGo.length > 0
    },
    getScrollHeigh () {
      return this.type === '1'
        ? this.freeGo.length * 150
        : this.groupGo.length * 150
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
.search-box-wrapper {
  .search-bg {
    position: absolute;
    top: 0;
    height: 1.26rem;
    width: 100%;
    z-index: -1;
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
      color: #ffffff;
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
</style>
