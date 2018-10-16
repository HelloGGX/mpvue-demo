<!--  -->
<template>
  <div class="chat-box">
    <div class="chat-wrap">
      <card-chat v-for="(item, index) in items" :key="index" :phone="item.tel" :title="item.title" :type="item.type" :thumUrl="item.thumUrl"></card-chat>
    </div>
    <div class="line"></div>
    <section class="sec-application">
      <div class="journey-title weex-ct weex-div">
        <div class="journey-title-icon weex-ct"></div>
        <p class="journey-title-text weex-el weex-text margin">
          扫描下方二维码
        </p>
      </div>
    </section>
    <div class="code" :style="{backgroundImage:'url( ' + code + ') '}" :data-src="code" @click="previewImage">
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import CardChat from 'components/card-chat/card-chat'
import api from 'api/api'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      items: [],
      code: ''
    }
  },
  components: {
    CardChat
  },
  onLoad (opt) {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShareAppMessage (res) {
    const _thi = this
    return {
      title: _thi.nickName + '向你分享了小程序',
      path: `pages/chat/main`,
      success () {
        // 转发成功
        api
          .getShareInfo({
            openId: _thi.oid,
            pageName: 'chat'
          })
          .then(res => {
            if (res.state === 'ok') {
              return true
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      fail (res) {
        // 转发失败
      }
    }
  },
  mounted () {
    this.getChat()
  },
  methods: {
    previewImage (e) {
      // 点击页头预览大图
      this.$nextTick(() => {
        let current = e.target.dataset.src
        let imgArr = []
        imgArr.push(current)
        wx.previewImage({
          current: current,
          urls: imgArr
        })
      })
    },
    getChat () {
      api
        .getChatData()
        .then(res => {
          console.log(res)
          if (res.state === 'ok') {
            this.items = res.lists
            this.code = res.code
          }
        })
        .catch(errMsg => {
          console.log(errMsg)
        })
    }
  },
  computed: {
    ...mapGetters(['oid', 'nickName'])
  }
}
</script>
<style lang='less' scoped>
.sec-application {
  background-color: #fff;
}
.weex-ct {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  position: relative;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
  -webkit-flex-shrink: 0;
  flex-shrink: 0;
  -webkit-box-flex: 0;
  -webkit-flex-grow: 0;
  flex-grow: 0;
  -webkit-flex-basis: auto;
  flex-basis: auto;
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
  align-items: stretch;
  -webkit-align-content: flex-start;
  align-content: flex-start;
  border: 0 solid black;
  margin: 0;
  padding: 0;
  min-width: 0;
}
.journey-title {
  height: 0.9rem;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  padding: 0 0.3rem;
  border-bottom: 1px solid #f2f2f2;
}
.journey-title-icon {
  width: 0.08rem;
  height: 0.4rem;
  border-radius: 0.02rem;
  background-color: #ffc900;
  margin-right: 0.2rem;
}
.weex-el {
  display: block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
  -webkit-flex-shrink: 0;
  flex-shrink: 0;
  -webkit-box-flex: 0;
  -webkit-flex-grow: 0;
  flex-grow: 0;
  -webkit-flex-basis: auto;
  flex-basis: auto;
  border: 0 solid black;
  margin: 0;
  padding: 0;
  min-width: 0;
}
.weex-text {
  display: -webkit-box;
  display: -moz-box;
  -webkit-box-orient: vertical;
  position: relative;
  // white-space: pre-wrap;
  font-size: 0.24rem;
  word-wrap: break-word;
  overflow: hidden;
}
.journey-title-text {
  color: #3d3d3d;
  font-size: 0.34rem;
  font-weight: 700;
}
.code {
  overflow: hidden;
  height: 200px;
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: cover;
  width: 200px;
  margin: 0 auto;
}
</style>
