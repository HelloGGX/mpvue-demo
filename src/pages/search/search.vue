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
            <div class="search-class" v-if="!getResultLists">
                <div class="search-title">
                  <span>搜索发现</span>
                </div>
                <div class="class">
                  <img src="/static/img/icon/island.png" alt="">
                  <div class="class-container">
                    <div class="class-item" v-for="(item, index) in island" :key="index">
                      <span>{{item}}</span>
                    </div>
                  </div>
                </div>
                <div class="class">
                  <img src="/static/img/icon/jw.png" alt="">
                  <div class="class-container">
                   <div class="class-item" v-for="(item, index) in abroad" :key="index">
                      <span>{{item}}</span>
                    </div>
                  </div>
                </div>
                <div class="class">
                  <img src="/static/img/icon/jn.png" alt="">
                  <div class="class-container">
                    <div class="class-item" v-for="(item, index) in territory" :key="index">
                      <span>{{item}}</span>
                    </div>
                  </div>
                </div>
            </div>
            <div class="search-lists" v-show="getResultLists">
              <div class="weui-cells weui-cells_after-title">
                <a class="weui-cell weui-cell_access" v-for="(item,index) in resultLists" :key="index">
                  <div class="weui-cell__hd">
                    <img src="/static/img/icon/addr.png" alt="" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;">
                  </div>
                  <div class="weui-cell__bd search-item"><span>{{item.name}}</span></div>
                  <div class="weui-cell__ft weui-cell__ft_in-access"></div>
                </a>
              </div>
            </div>
            <div class="search-detail">

            </div>
          </div>
        </scroll-view>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import SearchBox from 'components/search-box/search-box'
import api from 'api/api'
export default {
  data () {
    return {
      resultLists: [],
      territory: [], // 境内
      abroad: [], // 境外
      island: [] // 海岛
    }
  },
  components: {
    SearchBox
  },
  mounted () {
    this.getClass()
  },
  methods: {
    searchResult (val) {
      this.resultLists = val
    },
    getClass () {
      api
        .getClass()
        .then(res => {
          if (res.state === 'ok') {
            this.territory = res.terri
            this.abroad = res.abroad
            this.island = res.island
          }
        })
        .catch(errMsg => {
          console.log(errMsg)
        })
    }
  },
  computed: {
    getResultLists () {
      console.log(this.resultLists)
      return this.resultLists.length > 0
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
  .search-lists {
    .search-item {
      span {
        font-size: 0.28rem;
      }
    }
  }
}
</style>