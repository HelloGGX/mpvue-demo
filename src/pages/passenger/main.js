import Vue from 'vue'
import Passenger from './passenger'

const app = new Vue(Passenger)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '添加出行人',
    usingComponents: {
      'i-action-sheet': '../../../static/iview/action-sheet/index'
    }
  }
}
