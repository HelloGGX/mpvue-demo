import Vue from 'vue'
import Orders from './orders'

const app = new Vue(Orders)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '我的订单'
  }
}
