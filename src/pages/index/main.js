import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#1b97b9',
    navigationBarTitleText: '说走就走',
    navigationBarTextStyle: 'white',
    usingComponents: {
      'i-button': '../../../static/iview/button/index'
    }
  }
}
