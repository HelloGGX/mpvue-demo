import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#ffdc2a',
    navigationBarTitleText: '酷奇旅行',
    navigationBarTextStyle: 'black',
    usingComponents: {
      'i-button': '../../../static/iview/button/index'
    }
  }
}
