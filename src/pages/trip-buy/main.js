import Vue from 'vue'
import tripBuy from './trip-buy'

const app = new Vue(tripBuy)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '订单确认'
  }
}
