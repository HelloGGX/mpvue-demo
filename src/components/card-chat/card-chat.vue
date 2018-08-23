<!-- 聊天卡片组件 -->
<template>
  <div class="chat-item">
      <div class="chat-head-wrap">
        <div class="chat-head">
          <img :src="thumUrl" alt="">
        </div>
      </div>
      <div class="chat-title">
        <h3 class="main-title">{{title}}</h3>
        <p class="subtitle">{{type}}</p>
      </div>
      <div class="chat-btn-wrap">
        <div class="chat-btn">
          <p>开始联系</p>
          <button open-type="contact"></button>
        </div>
      </div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data () {
    return {
    }
  },
  props: {
    title: {
      type: String,
      default: '客服'
    },
    type: {
      type: String,
      default: '海岛'
    },
    thumUrl: {
      type: String,
      default: '/static/img/icon/timg.jpg'
    }
  }
}
</script>

<style lang='less' scoped>
  .chat-item {
    width: 6.86rem;
    height: 1.64rem;
    display: flex;
    margin-top: 0.4rem;
    margin-left: auto;
    margin-right: auto;
    -moz-box-shadow:0px 0px 17px #BDBDBD;
    -webkit-box-shadow:0px 0px 17px #BDBDBD;
    box-shadow:0px 0px 17px #BDBDBD;
    .chat-head-wrap{
       flex: 1;
      .chat-head {
        margin-top:0.2rem;
        margin-left:auto;
        margin-right:auto;
        width:1rem;
        height:1rem;
        overflow:hidden;
        border-radius:50%;
        position: relative;
        padding: 0;
        img {
          width:100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }
    .chat-title{
      flex: 2;
      padding-top:0.2rem;
      .main-title{
        font-size:0.32rem;
        line-height:0.6rem;
      }
      .subtitle{
        font-size:0.28rem;
        line-height:0.5rem;
        color: #acabb1;
      }
    }
    .chat-btn-wrap{
      flex: 2;
      padding-top:0.4rem;
      .chat-btn{
        width:2.5rem;
        height:0.8rem;
        position:relative;
        overflow: hidden;
        background-image: -webkit-gradient(linear,left top,right top,from(#ff8e02),to(#fb314a));
        background-image: linear-gradient(90deg,#ff8e02,#fb314a);
        border-radius: 0.4rem;
        p {
          line-height: 0.8rem;
          font-size: 0.28rem;
          text-align: center;
          color: #fff;
        }
        button {
          width:100%;
          height:100%;
          position:absolute;
          top:0;
          left:0;
          opacity:0;
          z-index: 999;
        }
      }
    }
  }
</style>
