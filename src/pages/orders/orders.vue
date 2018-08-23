<!-- 订单页面 -->
<template>
  <div>
    <section class="main-wrapper">
        <tab  v-model.number="tabItem">
          <tab-item selected >已支付</tab-item>
          <tab-item >待支付</tab-item>
          <tab-item >已预约</tab-item>
        </tab>
        <scroll-view style="height:calc(100vh);" scroll-y="true" scroll-with-animation="true"  >
        <div :style="{'height': tabHigh +'px'}">
          <swiper  class="slider-group tab-context"  @animationfinish="switchItem" :current ="tabItem" duration="200" circular="true" skip-hidden-item-layout="true">
              <swiper-item >
                <div class="item-container">
                   <card-order type="paid"></card-order>
                </div>
              </swiper-item>
              <swiper-item >
                <div class="item-container">
                   <card-order type="unpaid"></card-order>
                </div>
              </swiper-item>
              <swiper-item>
                <div class="item-container">
                   <card-order type="reserved"></card-order>
                </div>
              </swiper-item>
          </swiper>
        </div>
        </scroll-view>
    </section>
  </div>
</template>

<script type='text/ecmascript-6'>
import Tab from 'components/tab/tab'
import TabItem from 'components/tab/tab-item'
import api from 'api/api'
import cardOrder from 'components/card-order/card-order'

export default {
  components: {
    Tab,
    TabItem,
    cardOrder
  },
  methods: {
    init () {
      this.$nextTick(() => {
        this.tabItem = this.$root.$mp.query.type - 1
      })
      this.getOrders(this.type) // 初始化异步数据
      this.setTabHigh(this.tabItem) // 初始化内容高度
    },
    setTabHigh (index) {
      const _thi = this
      this.$nextTick(function () {
        let query = wx.createSelectorQuery()
        query.selectAll('.item-container').boundingClientRect(function (rects) {
          _thi.tabHigh = rects[index].height
        }).exec()
      })
    },
    switchItem (res) {
      let oIndex = res.mp.detail.current
      this.tabItem = oIndex
      this.onItemClick(oIndex)
      this.setTabHigh(oIndex)
    },
    onItemClick (index) {
      this.tabItem = index// 获取选项卡索引
      this.type = index + 1
      this.getOrders(this.type)
    },
    async getOrders (type) {
      try {
        await api.getOrdersData({type: type})
          .then(res => {
            switch (type) {
              case 1:
                this.paid = res.lists
                break
              case 2:
                this.unpaid = res.lists
                break
              case 3:
                this.reserved = res.lists
            }
          })
          .catch(errMsg => {
            console.log(errMsg)
          })
      } catch (e) {
        console.log(e)
      }
    }
  },
  data () {
    return {
      tabItem: 0,
      type: 1,
      paid: [], // 已付款
      unpaid: [], // 未付款
      reserved: [], // 预约
      tabHigh: 0
    }
  },
  mounted () {
    this.init()
  }
  // watch: {
  //   tabItem (val) {
  //     this.$emit('update:tabItem', val)
  //   }
  // }
}
</script>
<style lang='less' scoped>
</style>
