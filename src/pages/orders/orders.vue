<!-- 订单页面 -->
<template>
  <div>
    <section class="main-wrapper">
      <tab v-model.number="tabIndex">
        <tab-item selected>已支付</tab-item>
        <tab-item>待支付</tab-item>
        <tab-item>已预约</tab-item>
      </tab>
      <scroll-view style="height:calc(100vh);" scroll-y="true" scroll-with-animation="true">
        <swiper class="slider-group tab-context" :style="{'height': tabHigh+'px'}" @change="switchItem" :current="tabIndex" duration="200" circular="false" skip-hidden-item-layout="true">
          <swiper-item>
            <card-order type="paid" :lists="paid" v-if="!!paid" @loadMore="more"></card-order>
            <empty v-if="paid.length===0" @tryAgain="tryAgain('paid')"></empty>
          </swiper-item>
          <swiper-item>
            <card-order ref="unpaid" type="unpaid" :lists="unpaid" v-if="!!unpaid" @cancelState="unpaid_cancel" @loadMore="more" @visible="visible"></card-order>
            <empty v-if="unpaid.length===0" @tryAgain="tryAgain('unpaid')"></empty>
          </swiper-item>
          <swiper-item>
            <card-order type="reserved" :lists="reserved" v-if="!!reserved" @loadMore="more"></card-order>
            <empty v-if="reserved.length===0" @tryAgain="tryAgain('reserved')"></empty>
          </swiper-item>
        </swiper>
      </scroll-view>
    </section>
    <i-modal title="提示" :visible="show" @ok="handleOk" @cancel="handleClose">
      <view>确定要删除该订单吗？</view>
    </i-modal>
    <!--底部弹出层-->
    <mptoast></mptoast>
  </div>
</template>

<script type='text/ecmascript-6'>
import Tab from 'components/tab/tab'
import TabItem from 'components/tab/tab-item'
import api from 'api/api'
import cardOrder from 'components/card-order/card-order'
import { mapGetters } from 'vuex'
import Mptoast from 'mptoast'
import Empty from 'components/empty/empty'

export default {
  data () {
    return {
      tabIndex: 0,
      type: 1,
      paid: [], // 已付款
      unpaid: [], // 未付款
      reserved: [], // 预约
      tabHigh: 0,
      show: false
    }
  },
  components: {
    Tab,
    TabItem,
    cardOrder,
    Mptoast,
    Empty
  },
  onLoad () {
    wx.getSystemInfo({
      // 获取页面可视区域的高度
      success: res => {
        this.tabHigh = res.screenHeight
      }
    })
  },
  onPullDownRefresh () {
    // 下拉刷新重新获取数据
    if (this.type === 3) {
      this.getReserved(this.oid)
    } else {
      this.getOrders(this.type, this.oid)
    }
  },
  methods: {
    more () {
      console.log(1)
    },
    init () {
      // this.$nextTick(() => {
      //   this.curIndex = this.$root.$mp.query.type - 1

      // })
      this.getOrders(this.type, this.oid)
    },
    tryAgain (type) {
      switch (type) {
        case 'paid':
          this.getOrders(1, this.oid)
          break
        case 'unpaid':
          this.getOrders(2, this.oid)
          break
        case 'reserved':
          this.getReserved(this.oid)
          break
      }
    },
    switchItem (res) {
      let oIndex = res.mp.detail.current
      this.tabIndex = oIndex
      this.onItemClick(oIndex)
      // this.setTabHigh(oIndex)
    },
    onItemClick (index) {
      this.type = index + 1
      if (index === 2) {
        this.getReserved(this.oid)
      } else {
        this.getOrders(this.type, this.oid)
      }
    },
    getReserved (oid) {
      api
        .getReservedData({ oid: oid })
        .then(res => {
          this.reserved = res.lists || []
        })
        .catch(errMsg => {
          console.log(errMsg)
        })
    },
    getOrders (type, oid) {
      api
        .getOrdersData({ type: type, oid: oid })
        .then(res => {
          if (res.state === 'ok') {
            switch (type) {
              case 1:
                this.paid = res.lists || []
                break
              case 2:
                this.unpaid = res.lists || []
                break
            }
          }
        })
        .catch(errMsg => {
          console.log(errMsg)
        })
    },
    unpaid_cancel (val) {
      if (val) {
        this.$mptoast({
          text: '取消订单成功',
          icon: 'success',
          duration: 2000
        })
        this.getOrders(this.type, this.oid) // 初始化异步数据
        this.show = false
      } else {
        this.$mptoast({
          text: '取消订单失败',
          icon: 'error',
          duration: 2000
        })
      }
    },
    visible (val) {
      // 模态框显示
      this.show = val
    },
    handleClose () {
      // 模态框关闭
      this.show = false
    },
    handleOk () {
      // 模态框点击确定
      this.$refs.unpaid.handleOk()
    }
  },
  mounted () {
    this.init()
  },
  // updated () {
  //   this.setTabHigh(this.tabItem)
  // },
  computed: {
    ...mapGetters(['oid']),
    getTabHigh () {
      return this.tabHigh
    },
    getTabIndex () {
      return this.tabIndex
    }
  }
}
</script>
<style lang='less' scoped>
swiper {
  display: flex;
  height: 100%;
}
swiper-item {
  height: 100%;
  overflow: scroll;
  overflow-x: hidden;
}
</style>
