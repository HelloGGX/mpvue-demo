<!--  -->
<template>
  <div>
    <section class="search-box-wrapper">
      <search-box ref="searchBox" @result="searchResult"   placeholder="搜索商家名、产品名或者路线">
      </search-box>
    </section>
    <div class="search-body">
        <scroll-view scroll-y class="scrollview">
          <div class="scroll-inner">
            <div class="search-class">
                <div class="search-title">
                  <span>搜索发现</span>
                </div>
                <div class="class">
                  <img src="../../../static/img/icon/island.png" alt="">
                  <div class="class-container">
                    <div class="class-item">
                      <span>普吉岛</span>
                    </div>
                    <div class="class-item">
                      <span>苏梅岛</span>
                    </div>
                    <div class="class-item">
                      <span>巴厘岛</span>
                    </div>
                    <div class="class-item">
                      <span>斐济岛</span>
                    </div>
                    <div class="class-item">
                      <span>塞班岛</span>
                    </div>
                    <div class="class-item">
                      <span>芽庄</span>
                    </div>
                  </div>
                </div>
                <div class="class">
                  <img src="../../../static/img/icon/jw.png" alt="">
                  <div class="class-container">
                    <div class="class-item">
                      <span>俄罗斯</span>
                    </div>
                    <div class="class-item">
                      <span>檀香山</span>
                    </div>
                    <div class="class-item">
                      <span>沙巴</span>
                    </div>
                    <div class="class-item">
                      <span>日本</span>
                    </div>
                    <div class="class-item">
                      <span>美国</span>
                    </div>
                    <div class="class-item">
                      <span>越南</span>
                    </div>
                  </div>
                </div>
                <div class="class">
                  <img src="../../../static/img/icon/jn.png" alt="">
                  <div class="class-container">
                    <div class="class-item">
                      <span>上海</span>
                    </div>
                     <div class="class-item">
                      <span>北京</span>
                    </div>
                     <div class="class-item">
                      <span>广州</span>
                    </div>
                     <div class="class-item">
                      <span>成都</span>
                    </div>
                    <div class="class-item">
                      <span>杭州</span>
                    </div>
                    <div class="class-item">
                      <span>武汉</span>
                    </div>
                    <div class="class-item">
                      <span>南京</span>
                    </div>
                    <div class="class-item">
                      <span>天津</span>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </scroll-view>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import SearchBox from 'components/search-box/search-box'

export default {
  data () {
    return {
      result: []
    }
  },
  components: {
    SearchBox
  },
  methods: {
    searchResult (val) {
      console.log(1)
    }
  }
}
</script>
<style lang='less' scoped>
@import '~common/less/variable';
.search-box-wrapper {
  .search-right {
    color: @color-dialog-background;
    font-size: @font-size-medium-x;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    .search-btn {
      display: flex;
      line-height: 44px;
      color: #000;
      text-align: center;
      span {
        flex: 2;
      }
      i {
        flex: 1;
        text-align: center;
      }
    }
  }
}
.search-body {
  border: 0px solid black;
  position: absolute;
  box-sizing: border-box;
  display: flex;
  -webkit-box-orient: vertical;
  flex-direction: column;
  align-content: flex-start;
  flex-shrink: 0;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  z-index: 11;
  top: 44px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  width: 375px;
  overflow: hidden;
  background-color: rgb(255, 255, 255);
  height: 623px;
  .scrollview {
    border: 0px solid black;
    position: relative;
    box-sizing: border-box;
    display: flex;
    -webkit-box-orient: vertical;
    flex-direction: column;
    align-content: flex-start;
    flex: 1 1 0%;
    -webkit-box-flex: 1;
    background-color: rgb(255, 255, 255);
    overflow: scroll;
    .scroll-inner {
      border: 0px solid black;
      position: relative;
      box-sizing: border-box;
      display: block;
      -webkit-box-orient: vertical;
      flex-direction: column;
      align-content: flex-start;
      flex-shrink: 0;
      .search-class {
        border: 0px solid black;
        position: relative;
        box-sizing: border-box;
        display: flex;
        -webkit-box-orient: vertical;
        flex-direction: column;
        align-content: flex-start;
        flex-shrink: 0;
        padding: 0px 12px;
        .search-title {
          border: 0px solid black;
          position: relative;
          box-sizing: border-box;
          display: flex;
          -webkit-box-orient: horizontal;
          flex-direction: row;
          place-content: flex-start space-between;
          flex-shrink: 0;
          margin-bottom: -12px;
          -webkit-box-pack: justify;
          -webkit-box-align: center;
          align-items: center;
          height: 41px;
          padding-top: 3px;
          span {
            white-space: pre-wrap;
            border: 0px solid black;
            position: relative;
            box-sizing: border-box;
            display: flex;
            -webkit-box-orient: horizontal;
            flex-direction: row;
            place-content: flex-start space-between;
            flex-shrink: 0;
            font-size: 14px;
            height: 22.5px;
            line-height: 22.5px;
            -webkit-box-pack: justify;
            font-family: PingFangSC;
            color: rgb(153, 153, 153);
          }
        }
        .class {
          border: 0px solid black;
          position: relative;
          box-sizing: border-box;
          display: flex;
          -webkit-box-orient: horizontal;
          flex-flow: row wrap;
          place-content: flex-start;
          flex-shrink: 0;
          -webkit-box-pack: start;
          -webkit-box-align: start;
          align-items: flex-start;
          padding: 3px 0px;
          overflow: hidden;
          max-height: 90px;
          img {
            display: flex;
            width: 16px;
            height: 16px;
            margin-top: 17px;
            margin-right: 9px;
            object-fit: contain;
          }
          .class-container {
            border: 0px solid black;
            position: relative;
            box-sizing: border-box;
            display: flex;
            -webkit-box-orient: horizontal;
            flex-flow: row wrap;
            place-content: center flex-start;
            flex: 1 1 0%;
            -webkit-box-flex: 1;
            width: 325px;
            -webkit-box-pack: start;
            -webkit-box-align: center;
            align-items: center;
            .class-item {
              border: 0px solid black;
              position: relative;
              box-sizing: border-box;
              display: flex;
              -webkit-box-orient: horizontal;
              flex-direction: row;
              place-content: flex-start;
              flex-shrink: 0;
              cursor: pointer;
              -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
              margin-top: 9px;
              margin-right: 9px;
              -webkit-box-pack: start;
              -webkit-box-align: end;
              align-items: flex-end;
              padding: 9.5px 11.5px;
              background-color: rgb(247, 247, 247);
              border-radius: 3px;
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
                font-size: 13px;
                height: 13px;
                line-height: 13px;
                font-family: PingFangSC;
                color: rgb(51, 51, 51);
              }
            }
          }
        }
      }
    }
  }
}
</style>