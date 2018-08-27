import Vue from 'vue'
import App from './detail'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#ffdc2a',
    navigationBarTextStyle: 'black',
    usingComponents: {
      'i-button': '../../../static/iview/button/index'
    }
  }
}
