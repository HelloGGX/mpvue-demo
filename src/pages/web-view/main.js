import Vue from 'vue'
import webView from './web-view'

const app = new Vue(webView)
app.$mount()

export default {
  config: {
    navigationBarTitleText: 'PDF'
  }
}
