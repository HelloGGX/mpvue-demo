<!-- 空白页 -->
<template>
  <div class="empty-container">
    <img src="/static/img/bg/Artwork@2x.png" style="display: flex; width: 160px; height: 160px;">
    <div class="empty-txt">
      <span>亲，暂无相关订单</span>
    </div>
    <div class="empty-try" @click="tryAgain()">
      <span>再试一次</span>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data () {
    return {}
  },
  methods: {
    tryAgain () {
      this.$emit('tryAgain')
    }
  }
}
</script>
<style lang='less' scoped>
.empty-container {
  border: 0px solid black;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  -webkit-box-orient: vertical;
  flex-direction: column;
  align-content: flex-start;
  flex: 1 1 0%;
  -webkit-box-flex: 1;
  padding: 116px 12px 0px;
  -webkit-box-align: center;
  align-items: center;
  background-color: rgb(244, 244, 244);
  .empty-txt {
    border: 0px solid black;
    position: relative;
    box-sizing: border-box;
    display: flex;
    -webkit-box-orient: vertical;
    flex-direction: column;
    align-content: flex-start;
    flex-shrink: 0;
    margin-top: 18px;
    span {
      white-space: pre-wrap;
      border: 0px solid black;
      position: relative;
      box-sizing: border-box;
      display: block;
      -webkit-box-orient: vertical;
      flex-direction: column;
      align-content: flex-start;
      flex-shrink: 0;
      font-size: 15px;
      color: rgb(153, 153, 153);
      line-height: 21px;
      text-align: center;
    }
  }
  .empty-try {
    border: 2rpx solid #cccccc;
    position: relative;
    box-sizing: border-box;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    height: 72rpx;
    border-radius: 8rpx;
    background-color: #ffffff;
    margin-top: 60rpx;
    width: 240rpx;
    text-align: center;
    span {
      white-space: pre-wrap;
      border: 0px solid black;
      position: relative;
      box-sizing: border-box;
      display: block;
      -webkit-box-orient: vertical;
      flex-direction: column;
      align-content: flex-start;
      flex-shrink: 0;
      font-size: 15px;
      color: rgb(51, 51, 51);
      line-height: 72rpx;
    }
  }
}
</style>