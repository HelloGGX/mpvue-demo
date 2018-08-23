import Vue from 'vue'
import Search from './search'

const app = new Vue(Search)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '搜索'
  }
}
