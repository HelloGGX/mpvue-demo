import Vue from 'vue'
import App from './App'

import mpvueToastRegistry from 'mptoast/registry'
import store from './store/index'
import 'common/less/index.less' // 总样式
import 'vendor/weui/weui.wxss' // 第三方样式
import BusPlugin from 'common/js/bus'

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$store = store // 必须这样写，不然store不起作用，看新版本会不会起作用
mpvueToastRegistry(Vue)

Vue.use(BusPlugin)

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/main'],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#ffdc2a',
      navigationBarTitleText: '酷奇旅行',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: true,
      onReachBottomDistance: 100
    },
    tabBar: {
      color: '#c9c9c9',
      selectedColor: '#ffdc2a',
      backgroundColor: '#3e3e3e',
      list: [
        {
          pagePath: 'pages/index/main',
          iconPath: 'static/img/icon/home.png',
          selectedIconPath: 'static/img/icon/home-fill.png',
          text: '首页'
        },
        {
          pagePath: 'pages/chat/main',
          iconPath: 'static/img/icon/message.png',
          selectedIconPath: 'static/img/icon/message-fill.png',
          text: '聊天'
        },
        {
          pagePath: 'pages/appt/main',
          iconPath: 'static/img/icon/calendar-check.png',
          selectedIconPath: 'static/img/icon/calendar-check-fill.png',
          text: '预约'
        },
        {
          pagePath: 'pages/me/main',
          iconPath: 'static/img/icon/user.png',
          selectedIconPath: 'static/img/icon/user_fill.png',
          text: '个人'
        }
      ]
    }
  }
}
