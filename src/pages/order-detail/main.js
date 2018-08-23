import Vue from 'vue'
import orderDetail from './order-detail.vue'

const app = new Vue(orderDetail)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '订单详情'
  }
}
