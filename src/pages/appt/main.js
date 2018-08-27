import Vue from 'vue'
import Appt from './appt'

const app = new Vue(Appt)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '预约',
    usingComponents: {
      'i-button': '../../../static/iview/button/index'
    }
  }
}
