<script type='text/ecmascript-6'>
import api from 'api/api'
import { mapMutations, mapGetters } from 'vuex'

export default {
  created () {
    if (!this.net) {
      this.network()
    }
  },
  mounted () {
    this.checkLogin()
  },
  computed: {
    ...mapGetters(['canIUse', 'visible', 'oid', 'net'])
  },
  methods: {
    network () {
      // 如果没网
      wx.showModal({
        title: '网络提示',
        content: '目前网络连接较慢，请尝试下拉刷新页面',
        showCancel: false
      })
    },
    authInfo () {
      // 判断是否授权用户信息
      wx.getSetting({
        success: res => {
          api
            // .checkUser({ signature: res.signature, rawData: res.rawData })
            // .then(res => {
            //   // 后台校验数据完整性
            //   console.log(res) // 获取用户业务数据，在这里返回是否已经授权手机号

            // })
            .checkUser({ oid: this.oid })
            .then(res => {
              // 后台校验数据完整性
              if (res.state === 'ok') {
                this.setAuthPhone(res.authPhone)
                this.setVisible(false)
              } else {
                this.setAuthPhone(res.authPhone)
              }
              // 获取用户业务数据，在这里返回是否已经授权手机号
            })
            .catch(errMsg => {
              console.log(errMsg)
            })
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: res => {
                this.setNickName(res.userInfo.nickName)
                this.setAvatarUrl(res.userInfo.avatarUrl)
                wx.setStorage({
                  key: 'userInfo',
                  data: res.userInfo
                })

                this.setCanIUse(false)
              }
            })
          } else {
            // 如果未授权
            this.setCanIUse(true)
          }
        }
      })
    },
    checkLogin () {
      // 检查登陆状态是否过期
      wx.checkSession({
        success: res => {
          console.log('处于登录态')
          this.authInfo() // 授权用户信息
          // this.login() // 调试用
          // this.getUserInfo() // 后台校验获取用户数据
        },
        fail: res => {
          console.log('需要重新登录')
          this.login()
        }
      })
    },
    login () {
      let that = this
      wx.login({
        success: res => {
          if (res.code) {
            api.getSessionId({ code: res.code }).then(res => {
              // wx.setStorage({
              //   key: 'key',
              //   data: res.list[0].openids
              // })
              this.setOid(res.list[0].openid)
              that.authInfo() // 获取用户信息
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '登陆失败,请重试',
              confirmText: '重新登陆',
              success: res => {
                if (res.confirm) {
                  this.login()
                } else if (res.cancel) {
                  this.login()
                }
              }
            })
          }
        }
      })
    },
    ...mapMutations({
      setOid: 'SET_OID',
      setNickName: 'SET_NICKNAME',
      setAvatarUrl: 'SET_AVATARURL',
      setCanIUse: 'SET_CANIUSE',
      setVisible: 'SET_VISIBLE',
      setAuthPhone: 'SET_AUTHPHONE'
    })
  },
  watch: {
    net (newVal) {
      setTimeout(() => {
        if (!newVal) {
          this.network()
        }
      }, 20)
    }
  }
}
</script>
<style lang='less'  scoped>
</style>
