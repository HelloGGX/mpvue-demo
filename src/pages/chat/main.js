import Vue from 'vue'
import Chat from './chat'

const app = new Vue(Chat)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '聊天'
  }
}
