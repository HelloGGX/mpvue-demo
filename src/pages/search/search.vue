<!--  -->
<template>
  <div class="page">
    <section class="search-box-wrapper">
      <search-box ref="searchBox" @result="searchResult" @focus="focus" placeholder="搜索商家名、产品名或者路线">
      </search-box>
    </section>
    <div class="search-body">
      <scroll-view scroll-y class="scrollview" @scrolltolower="loadMore">
        <div class="scroll-inner">
          <div class="search-class" v-if="!getResultLists">
            <div class="search-title">
              <span>搜索发现</span>
            </div>
            <div class="class">
              <img src="/static/img/icon/island.png" alt="">
              <div class="class-container">
                <div class="class-item" v-for="(item, index) in island" :key="index" @click="toDetail({'name':item})">
                  <span>{{item}}</span>
                </div>
              </div>
            </div>
            <div class="class">
              <img src="/static/img/icon/jw.png" alt="">
              <div class="class-container">
                <div class="class-item" v-for="(item, index) in abroad" :key="index" @click="toDetail({'name':item})">
                  <span>{{item}}</span>
                </div>
              </div>
            </div>
            <div class="class">
              <img src="/static/img/icon/jn.png" alt="">
              <div class="class-container">
                <div class="class-item" v-for="(item, index) in territory" :key="index" @click="toDetail({'name':item})">
                  <span>{{item}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="search-lists" v-show="getResultLists">
            <div class="weui-cells weui-cells_after-title">
              <a class="weui-cell weui-cell_access" v-for="(item,index) in resultLists" :key="index" @click="toDetail(item)">
                <div class="weui-cell__hd">
                  <img src="/static/img/icon/addr.png" alt="" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;">
                </div>
                <div class="weui-cell__bd search-item">
                  <span>{{item.name}}</span>
                </div>
                <div class="weui-cell__ft weui-cell__ft_in-access"></div>
              </a>
            </div>
          </div>
          <div class="search-detail" v-show="getDetailLists">
            <div class="filter">
              <filter @layer="layer"></filter>
            </div>
            <div class="search-detail-con">
              <card :lists="detailLists"></card>
            </div>
            <load-more :isHideLoadMore="getHideLoadMore" :isComplete="getComplete"></load-more>
          </div>
        </div>
      </scroll-view>

    </div>
    <div class="down">
      <div class="down-wrap" v-if="downState">
        <div class="down-inner">
          <div class="down-mask" style="transition-duration:0.2s;" @click="layer()"></div>
          <div class="down-container" :animation="downAnimationData">
            <div class="down-view">
              <div class="down-view-panel" v-if="classAll">
                <div class="down-item">
                  <div class="down-class">
                    <div class="down-class-item">
                      <span>全部分类</span>
                    </div>
                  </div>
                </div>
                <div class="down-item" v-for="(item,index) in searchClass" :key="index">
                  <div class="down-item-tit">
                    <div class="down-item-tit-inner">
                      <span>{{item.title}}</span>
                    </div>
                  </div>
                  <div class="down-class" v-for="(keyword,i) in item.key" :key="i" @click="classify(keyword.id,keyword.val)">
                    <div :class="[ classIndex ===keyword.id? 'classActive':'','down-class-item']">
                      <span>{{keyword.val}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="down-view-panel" v-else-if="classComprehensive">
                <div class="rank">
                  <div class="rank-item" @click="rankSelect(0)">
                    <div class="rank-wrap">
                      <div class="rank-inner">
                        <span :style="{ color: rankItem===0? 'rgb(238, 153, 0)':''}">综合排序</span>
                        <div class="rank-select" v-if="rankItem===0">
                          <img src="/static/img/icon/rank-select.png">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="rank-item" @click="rankSelect(1)">
                    <div class="rank-wrap">
                      <div class="rank-inner">
                        <span :style="{ color: rankItem===1?'rgb(238, 153, 0)':''}">低价优先</span>
                        <div class="rank-select" v-if="rankItem===1">
                          <img src="/static/img/icon/rank-select.png">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="rank-item" @click="rankSelect(2)">
                    <div class="rank-wrap">
                      <div class="rank-inner">
                        <span :style="{ color: rankItem===2?'rgb(238, 153, 0)':''}">高价优先</span>
                        <div class="rank-select" v-if="rankItem===2">
                          <img src="/static/img/icon/rank-select.png">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="right-wrap" v-if="rightState">
        <div class="right-inner">
          <div class="right-content">
            <div class="right-mask" style="transition-duration:0.2s;" @click="layer('filter')"></div>
            <div class="right-container" :animation="rightAnimationData">
              <div class="right-view">
                <div class="right-view-panel">
                  <div class="price-range">
                    <div class="right-view-tit">
                      <div class="right-view-tit-txt">
                        <span>价格区间</span>
                      </div>
                    </div>
                    <div class="price-range-input">
                      <input type="number" class="range-min" maxlength="8" placeholder="最低价" v-model.number="minPrice">
                      <span>-</span>
                      <input type="number" class="range-max" maxlength="8" placeholder="最高价" v-model.number="maxPrice">
                    </div>
                  </div>
                  <div class="destination" v-for="(item,index) in filterClass" :key="index">
                    <div class="right-view-tit">
                      <div class="right-view-tit-txt">
                        <span>{{item.title}}</span>
                      </div>
                    </div>
                    <div class="dest-item" v-for="(keyword,i) in item.key" :key="i" @click="filter(index,i)">
                      <div ref="dest" :class="[{ classActive: keyword.check }, 'dest-item-inner']">
                        <span>{{keyword.val}}</span>
                        <img v-if="keyword.check" src="/static/img/icon/select.png" alt="">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="right-view-button">
                <div class="right-view-btn-l" @click="reset()">
                  <span>
                    重置
                  </span>
                </div>
                <div class="right-view-btn-r" @click="layer('filter')">
                  <span>
                    完成
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <mptoast></mptoast>

  </div>
</template>

<script type='text/ecmascript-6'>
import SearchBox from 'components/search-box/search-box'
import Card from 'components/card/card'
import Filter from 'components/filter/filter'
import api from 'api/api'
import Mptoast from 'mptoast'
import { debounce } from 'utils/tools'
import LoadMore from 'base/load-more/load-more'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      resultLists: [],
      territory: [], // 境内
      abroad: [], // 境外
      island: [], // 海岛,
      detailLists: [], // 列表
      scrollTop: 44,
      downAnimationData: {},
      rightAnimationData: {},
      animationShowHeight: 100,
      animationShowWidth: 100,
      downState: false,
      rightState: false,
      class: 'all', // 默认所有分类
      rankItem: 0, // 综合排序索引
      classIndex: 0,
      filterIndex: 0,
      searchClass: [], // 搜索中的分类关键字
      filterClass: [], // 筛选中的关键字
      objFilter: {
        // 筛选的搜索结果
        minPrice: 0,
        maxPrice: 0,
        day: [],
        // type: [],
        dest: []
      },
      classVal: '',
      minPrice: '',
      maxPrice: '',
      page: 0,
      isHideLoadMore: false,
      isComplete: false
    }
  },
  components: {
    SearchBox,
    Card,
    Filter,
    Mptoast,
    LoadMore
  },
  mounted () {
    this.debouncedGetResult = debounce(this.priceFilter, 500)
    this.getClass()
    this._getSearchClass()
  },
  onLoad () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShareAppMessage (res) {
    const _thi = this
    return {
      title: _thi.nickName + '向你分享了小程序',
      path: `pages/search/main`,
      success () {
        // 转发成功
        api
          .getShareInfo({
            openId: _thi.oid,
            pageName: 'search'
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
  methods: {
    loadMore () {
      this.page = this.page + 10
      this._postClassify(
        this.classVal,
        this.rankItem,
        this.objFilter,
        this.page
      )
    },
    _getSearchClass () {
      api
        .getSearchClass()
        .then(data => {
          if (data.state === 'ok') {
            this.searchClass = data.list || []
            const filterLen = data.filter.length
            for (let i = 0; i < filterLen; i++) {
              let keyLen = data.filter[i].key.length
              for (let j = 0; j < keyLen; j++) {
                data.filter[i].key[j].check = false
              }
            }
            this.filterClass = data.filter || []
          }
        })
        .catch(errMsg => {
          console.log(errMsg)
        })
    },
    focus (e) {
      this.detailLists = []
    },
    toDetail (key) {
      api
        .getSearchDetail({ key: key })
        .then(res => {
          if (res.state === 'ok') {
            this.detailLists = res.lists || []
            this.$nextTick(() => {
              if (this.resultLists.length === 0) {
                this.$mptoast({
                  text: '暂时还没有相关产品',
                  icon: 'info',
                  duration: 1000
                })
              }
            })
          }
        })
        .catch(errMsg => {
          console.log(errMsg)
        })
    },
    searchResult (val) {
      this.resultLists = val
      if (this.resultLists.length === 0) {
        this.$mptoast({
          text: '搜索的关键字不存在',
          icon: 'info',
          duration: 2000
        })
      }
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
    },
    down () {
      this.downState = !this.downState
      this.$nextTick(() => {
        this.animationShowHeight === 0
          ? (this.animationShowHeight = '-100%')
          : (this.animationShowHeight = 0)
        let animation = wx.createAnimation({
          duration: 200,
          timingFunction: 'linear',
          delay: 100
        })
        this.animation = animation
        animation.translateY(`${this.animationShowHeight}`).step()
        this.downAnimationData = animation.export()
      })
    },
    right () {
      this.rightState = !this.rightState
      this.$nextTick(() => {
        this.animationShowWidth === 0
          ? (this.animationShowWidth = '100%')
          : (this.animationShowWidth = 0)
        let animation = wx.createAnimation({
          duration: 200,
          timingFunction: 'linear',
          delay: 100
        })
        this.animation = animation
        animation.translateX(this.animationShowWidth).step()
        this.rightAnimationData = animation.export()
      })
    },
    layer (val) {
      // 显示遮罩层
      this.class = val
      if (this.class === 'filter') {
        if (this.downState) {
          // 如果有筛选层处于弹出状态
          this.down()
        }
        this.right()
      } else {
        this.down()
      }
    },
    rankSelect (item) {
      // 点击排序
      this.rankItem = item
      this.down()
      this._postClassify(this.classVal, this.rankItem, this.objFilter, 0)
    },
    classify (i, val) {
      // 点击分类
      // 分类搜索
      this.classIndex = i
      this.classVal = val
      this.down()
      this._postClassify(this.classVal, this.rankItem, this.objFilter, 0)
    },
    filter (i, j) {
      // 点击筛选
      // 筛选搜索
      if (!this.filterClass[i].key[j].check) {
        switch (this.filterClass[i].title) {
          case '天数':
            this.objFilter.day.push(
              this.filterClass[i].key[j].val.replace('天', '')
            )
            break
          // case '类型':
          //   this.objFilter.type.push(this.filterClass[i].key[j].val)
          //   break
          case '目的地':
            this.objFilter.dest.push(this.filterClass[i].key[j].val)
            break
        }
      } else {
        switch (this.filterClass[i].title) {
          case '天数':
            this.objFilter.day.splice(
              this.objFilter.day.findIndex(
                item =>
                  item === this.filterClass[i].key[j].val.replace('天', '')
              ),
              1
            )
            break
          // case '类型':
          //   this.objFilter.type.splice(
          //     this.objFilter.type.findIndex(
          //       item => item === this.filterClass[i].key[j].val
          //     ),
          //     1
          //   )
          //   break
          case '目的地':
            this.objFilter.dest.splice(
              this.objFilter.dest.findIndex(
                item => item === this.filterClass[i].key[j].val
              ),
              1
            )
            break
        }
      }
      this.filterClass[i].key[j].check = !this.filterClass[i].key[j].check
      this._postClassify(this.classVal, this.rankItem, this.objFilter, 0)

      // this._postFilter(this.objFilter)
    },
    priceFilter () {
      this._postClassify(this.classVal, this.rankItem, this.objFilter, 0)
      // this._postFilter(this.objFilter)
    },
    _postClassify (key, rank, filter, page) {
      api
        .postClassify({
          key: key,
          rank: rank,
          filter: this.objFilter,
          page: page
        })
        .then(res => {
          if (res.state === 'ok') {
            if (page === 0) {
              // 如果是点击筛选
              this.detailLists = res.lists || []
            } else {
              // 如果是上拉加载
              if (res.lists === null) {
                setTimeout(() => {
                  this.isComplete = true
                }, 800)
              } else {
                const len = res.lists.length
                for (let i = 0; i < len; i++) {
                  this.detailLists.push(res.lists[i])
                }
                this.isComplete = false
              }
              this.isHideLoadMore = false
              setTimeout(() => {
                this.isHideLoadMore = true
              }, 800)
            }
          }
        })
        .catch(errMsg => {
          console.log(errMsg)
        })
    },
    // _postFilter (obj) {
    //   // 发送筛选查询数据到服务器
    //   api
    //     .postFilter(obj)
    //     .then(res => {
    //       if (res.state === 'ok') {
    //         this.detailLists = res.lists || []
    //       }
    //     })
    //     .catch(errMsg => {
    //       console.log(errMsg)
    //     })
    // },
    reset () {
      // 重置
      this.minPrice = ''
      this.maxPrice = ''
      this.objFilter.minPrice = ''
      this.objFilter.maxPrice = ''
      this.objFilter.day = []
      // this.objFilter.type = []
      this.objFilter.dest = []
      const filterLen = this.filterClass.length
      for (let i = 0; i < filterLen; i++) {
        let keyLen = this.filterClass[i].key.length
        for (let j = 0; j < keyLen; j++) {
          this.filterClass[i].key[j].check = false
        }
      }
      this._postClassify(this.classVal, this.rankItem, this.objFilter, 0)
      // this._postFilter(this.objFilter)
    }
  },
  computed: {
    ...mapGetters(['nickName', 'oid']),
    getResultLists () {
      return this.resultLists.length > 0
    },
    getDetailLists () {
      return this.detailLists.length > 0
    },
    classAll () {
      return this.class === 'all'
    },
    classComprehensive () {
      return this.class === 'comprehensive'
    },
    classFilter () {
      return this.class === 'filter'
    },
    getHideLoadMore () {
      return this.isHideLoadMore
    },
    getComplete () {
      return this.isComplete
    }
  },
  watch: {
    minPrice (val, oldVal) {
      this.objFilter.minPrice = val
      this.debouncedGetResult()
    },
    maxPrice (val, oldVal) {
      this.objFilter.maxPrice = val
      this.debouncedGetResult()
    }
  }
}
</script>
<style scoped lang='less'>
@import '~common/less/variable';
.search-box-wrapper {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 40;
  background-color: #fff;
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
      height: 100%;
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
        height: 100%;
        z-index: 2;
        background-color: #fff;

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
          height: auto;
          // max-height: 90px;
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
  .search-detail {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    height: 100%;
    background-color: #fff;
  }
  .filter {
    position: fixed;
    top: 88rpx;
    z-index: 999;
  }
  .search-detail-con {
    padding-top: 88rpx;
  }
}
.down {
  border: 0px solid black;
  position: relative;
  box-sizing: border-box;
  display: flex;
  -webkit-box-orient: vertical;
  flex-direction: column;
  align-content: flex-start;
  flex-shrink: 0;
  height: 300px;
  overflow: hidden;
  .down-wrap {
    border: 0px solid black;
    position: fixed;
    box-sizing: border-box;
    display: flex;
    -webkit-box-orient: vertical;
    flex-direction: column;
    align-content: flex-start;
    flex-shrink: 0;
    top: 80px;
    left: 0px;
    width: 375px;
    bottom: 0px;
    z-index: 30;
    .down-inner {
      border: 0px solid black;
      position: absolute;
      box-sizing: border-box;
      -webkit-box-orient: vertical;
      left: 0px;
      top: 0px;
      right: 0px;
      bottom: 0px;
      z-index: 9999;
      -webkit-box-pack: center;
      -webkit-box-align: center;
      align-items: center;
      overflow: hidden;
      .down-mask {
        border: 0px solid black;
        position: absolute;
        box-sizing: border-box;
        top: 0px;
        right: 0px;
        left: 0px;
        bottom: 0px;
        background-color: rgba(0, 0, 0, 0.6);
      }
      .down-container {
        border: 0px solid black;
        position: absolute;
        box-sizing: border-box;
        display: flex;
        -webkit-box-orient: vertical;
        flex-direction: column;
        align-content: flex-start;
        flex-shrink: 0;
        background-color: rgb(255, 255, 255);
        overflow: auto;
        height: 346.5px;
        left: 0px;
        right: 0px;
        top: 0px;
        transition: all 0.2s linear 0s;
        -webkit-transition: all 0.2s linear 0s;
        transform: translateY(-100%);
        -webkit-transform: translateY(-100%);
        .down-view {
          border: 0px solid black;
          position: relative;
          box-sizing: border-box;
          display: flex;
          -webkit-box-orient: vertical;
          flex-direction: column;
          align-content: flex-start;
          flex: 1 1 0%;
          -webkit-box-flex: 1;
          width: 375px;
          height: 346.5px;
          overflow: scroll;
          .down-view-panel {
            border: 0px solid black;
            position: relative;
            box-sizing: border-box;
            display: block;
            -webkit-box-orient: vertical;
            flex-direction: column;
            align-content: flex-start;
            flex-shrink: 0;
            .down-item {
              border: 0px solid black;
              position: relative;
              box-sizing: border-box;
              display: flex;
              -webkit-box-orient: horizontal;
              flex-flow: row wrap;
              align-content: flex-start;
              flex-shrink: 0;
              padding: 5.25px 10.5px;
              width: 375px;
              .down-item-tit {
                border: 0px solid black;
                position: relative;
                box-sizing: border-box;
                display: flex;
                -webkit-box-orient: horizontal;
                flex-direction: row;
                place-content: flex-start space-between;
                flex-shrink: 0;
                cursor: pointer;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                -webkit-box-pack: justify;
                padding: 4.5px 3px 3px;
                -webkit-box-align: center;
                align-items: center;
                width: 354px;
                .down-item-tit-inner {
                  border: 0px solid black;
                  position: relative;
                  box-sizing: border-box;
                  display: flex;
                  -webkit-box-orient: horizontal;
                  flex-direction: row;
                  align-content: flex-start;
                  flex-shrink: 0;
                  -webkit-box-align: center;
                  align-items: center;
                  img {
                    display: flex;
                    width: 14px;
                    height: 15px;
                    margin-right: 6px;
                  }
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
                    font-size: 14px;
                    color: rgb(153, 153, 153);
                  }
                }
              }
              .down-class {
                border: 0px solid black;
                position: relative;
                box-sizing: border-box;
                display: flex;
                -webkit-box-orient: vertical;
                flex-direction: column;
                align-content: flex-start;
                flex-shrink: 0;
                width: 88.5px;
                .down-class-item {
                  border: 0px solid black;
                  position: relative;
                  box-sizing: border-box;
                  display: flex;
                  -webkit-box-orient: horizontal;
                  flex-direction: row;
                  place-content: flex-start center;
                  flex-shrink: 0;
                  cursor: pointer;
                  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                  margin: 3px;
                  padding: 0px 3px;
                  height: 36px;
                  border-radius: 3px;
                  background-color: rgb(247, 247, 247);
                  -webkit-box-pack: center;
                  -webkit-box-align: center;
                  align-items: center;
                  &.classActive {
                    background-color: rgb(255, 247, 212);
                    color: rgb(252, 165, 0) !important;
                    span {
                      color: rgb(252, 165, 0) !important;
                    }
                  }
                  span {
                    white-space: pre-wrap;
                    border: 0px solid black;
                    position: relative;
                    box-sizing: border-box;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    flex-direction: column;
                    align-content: flex-start;
                    flex-shrink: 0;
                    font-size: 13px;
                    color: rgb(51, 51, 51);
                    text-overflow: ellipsis;
                    vertical-align: middle;
                    text-align: center;
                    width: 76.5px;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                  }
                }
              }
            }
            .rank {
              border: 0px solid black;
              position: relative;
              box-sizing: border-box;
              display: block;
              -webkit-box-orient: vertical;
              flex-direction: column;
              align-content: flex-start;
              flex-shrink: 0;
              padding: 0 20rpx;
              .rank-item {
                border-width: 0px 0px 0.5px;
                border-style: solid;
                border-color: black black rgb(241, 241, 241);
                border-image: initial;
                position: relative;
                box-sizing: border-box;
                display: flex;
                -webkit-box-orient: horizontal;
                flex-direction: row;
                align-content: flex-start;
                flex-shrink: 0;
                padding: 10px 12px 10px 0px;
                min-height: 50px;
                color: rgb(51, 51, 51);
                background-color: rgb(255, 255, 255);
                font-size: 15px;
                .rank-wrap {
                  border: 0px solid black;
                  position: relative;
                  box-sizing: border-box;
                  display: flex;
                  -webkit-box-orient: vertical;
                  flex-direction: column;
                  align-content: flex-start;
                  flex: 1 1 0%;
                  -webkit-box-flex: 1;
                  height: 30px;
                  .rank-inner {
                    border: 0px solid black;
                    position: relative;
                    box-sizing: border-box;
                    display: flex;
                    -webkit-box-orient: horizontal;
                    flex-direction: row;
                    place-content: flex-start space-between;
                    flex: 1 1 0%;
                    cursor: pointer;
                    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                    height: 30px;
                    -webkit-box-pack: justify;
                    background-color: rgb(255, 255, 255);
                    -webkit-box-align: center;
                    align-items: center;
                    -webkit-box-flex: 1;
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
                      font-size: 14px;
                    }
                    .rank-select {
                      border: 0px solid black;
                      position: absolute;
                      right: 0;
                      box-sizing: border-box;
                      display: flex;
                      flex-shrink: 0;
                      cursor: none;
                      width: 22px;
                      height: 22px;
                      margin: 1px;
                      -webkit-box-align: center;
                      align-items: center;
                      -webkit-box-pack: center;
                      justify-content: center;
                      img {
                        display: flex;
                        width: 18px;
                        height: 18px;
                        object-fit: contain;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
.right {
  border: 0px solid black;
  position: relative;
  box-sizing: border-box;
  display: flex;
  -webkit-box-orient: vertical;
  flex-direction: column;
  align-content: flex-start;
  flex-shrink: 0;
  z-index: 99;
  .right-wrap {
    border: 0px solid black;
    position: relative;
    box-sizing: border-box;
    display: flex;
    -webkit-box-orient: vertical;
    flex-direction: column;
    align-content: flex-start;
    flex-shrink: 0;
    .right-inner {
      border: 0px solid black;
      position: relative;
      box-sizing: border-box;
      display: flex;
      -webkit-box-orient: vertical;
      flex-direction: column;
      align-content: flex-start;
      flex-shrink: 0;
      width: 285px;
      z-index: 40;
      .right-content {
        border: 0px solid black;
        position: fixed;
        box-sizing: border-box;
        -webkit-box-orient: vertical;
        left: 0px;
        top: 0px;
        right: 0px;
        bottom: 0px;
        z-index: 9999;
        -webkit-box-pack: center;
        -webkit-box-align: center;
        align-items: center;
        overflow: hidden;
        .right-mask {
          border: 0px solid black;
          position: fixed;
          box-sizing: border-box;
          -webkit-box-orient: vertical;
          cursor: pointer;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          top: 0px;
          right: 0px;
          left: 0px;
          bottom: 0px;
          background-color: rgba(0, 0, 0, 0.6);
          opacity: 1;
        }
        .right-container {
          border: 0px solid black;
          position: absolute;
          box-sizing: border-box;
          display: flex;
          -webkit-box-orient: vertical;
          flex-direction: column;
          align-content: flex-start;
          flex-shrink: 0;
          background-color: rgb(255, 255, 255);
          overflow: auto;
          width: 285px;
          top: 0px;
          bottom: 0px;
          right: 0px;
          transition: all 0.2s linear 0s;
          -webkit-transition: all 0.2s linear 0s;
          transform: translateX(100%);
          -webkit-transform: translateX(100%);
          .right-view {
            border: 0px solid black;
            position: absolute;
            box-sizing: border-box;
            display: flex;
            -webkit-box-orient: vertical;
            flex-direction: column;
            align-content: flex-start;
            flex: 0 0 auto;
            top: 0px;
            bottom: 45px;
            width: 285px;
            padding-top: 0px;
            overflow: scroll;
            .right-view-panel {
              border: 0px solid black;
              position: relative;
              box-sizing: border-box;
              display: block;
              -webkit-box-orient: vertical;
              flex-direction: column;
              align-content: flex-start;
              flex-shrink: 0;
              .price-range {
                border: 0px solid black;
                position: relative;
                box-sizing: border-box;
                display: flex;
                -webkit-box-orient: horizontal;
                flex-flow: row wrap;
                align-content: flex-start;
                flex-shrink: 0;
                padding: 5.25px 10.5px;
                .price-range-input {
                  border: 0px solid black;
                  position: relative;
                  box-sizing: border-box;
                  display: flex;
                  -webkit-box-orient: horizontal;
                  flex-direction: row;
                  place-content: flex-start center;
                  flex-shrink: 0;
                  background-color: rgb(247, 247, 247);
                  -webkit-box-align: center;
                  align-items: center;
                  -webkit-box-pack: center;
                  margin-bottom: 3px;
                  width: 258.72px;
                  margin-left: 2.64px;
                  margin-right: 2.64px;
                  padding: 5.28px;
                  input {
                    background-color: rgb(255, 255, 255);
                    border-color: rgb(221, 221, 221);
                    border-width: 0.5px;
                    box-sizing: border-box;
                    color: rgb(0, 0, 0);
                    padding: 5.28px 5.28px 5.28px 12px;
                    font-size: 12px;
                    line-height: 30px;
                    height: 30px;
                    border-style: solid;
                    border-radius: 3px;
                    width: 108.24px;
                  }
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
                    font-size: 16px;
                    width: 26.4px;
                    text-align: center;
                  }
                }
              }
              .destination {
                border: 0px solid black;
                position: relative;
                box-sizing: border-box;
                display: flex;
                -webkit-box-orient: horizontal;
                flex-flow: row wrap;
                align-content: flex-start;
                flex-shrink: 0;
                padding: 5.25px 10.5px;
                width: 285px;
                .dest-item {
                  border: 0px solid black;
                  position: relative;
                  box-sizing: border-box;
                  display: flex;
                  -webkit-box-orient: vertical;
                  flex-direction: column;
                  align-content: flex-start;
                  flex-shrink: 0;
                  width: 88px;
                  .dest-item-inner {
                    border: 0px solid black;
                    position: relative;
                    box-sizing: border-box;
                    display: flex;
                    -webkit-box-orient: horizontal;
                    flex-direction: row;
                    place-content: flex-start center;
                    flex-shrink: 0;
                    cursor: pointer;
                    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                    margin: 3px;
                    padding: 0px 3px;
                    height: 36px;
                    border-radius: 3px;
                    background-color: rgb(247, 247, 247);
                    -webkit-box-pack: center;
                    -webkit-box-align: center;
                    align-items: center;
                    &.classActive {
                      background-color: rgb(255, 247, 212);
                      color: rgb(252, 165, 0) !important;
                      span {
                        color: rgb(252, 165, 0) !important;
                      }
                    }
                    span {
                      white-space: pre-wrap;
                      border: 0px solid black;
                      position: relative;
                      box-sizing: border-box;
                      display: -webkit-box;
                      -webkit-box-orient: vertical;
                      flex-direction: column;
                      align-content: flex-start;
                      flex-shrink: 0;
                      font-size: 13px;
                      color: rgb(51, 51, 51);
                      text-overflow: ellipsis;
                      vertical-align: middle;
                      text-align: center;
                      width: 76px;
                      -webkit-line-clamp: 2;
                      overflow: hidden;
                    }
                    img {
                      display: flex;
                      width: 17px;
                      height: 17px;
                      position: absolute;
                      right: 0px;
                      bottom: 0px;
                    }
                  }
                }
              }
            }
          }
          .right-view-button {
            border: 0px solid black;
            position: absolute;
            box-sizing: border-box;
            display: flex;
            -webkit-box-orient: horizontal;
            flex-direction: row;
            align-content: flex-start;
            flex-shrink: 0;
            height: 45px;
            width: 285px;
            bottom: 0px;
            .right-view-btn-l {
              border: 0px solid black;
              position: relative;
              box-sizing: border-box;
              display: flex;
              -webkit-box-orient: horizontal;
              flex-direction: row;
              place-content: flex-start center;
              flex: 1 1 0%;
              cursor: pointer;
              -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
              -webkit-box-flex: 1;
              height: 45px;
              -webkit-box-pack: center;
              -webkit-box-align: center;
              align-items: center;
              font-size: 15px;
              color: rgb(252, 165, 0);
              background-color: rgb(255, 253, 245);
              text-align: center;
              justify-content: center;
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
                color: rgb(252, 165, 0);
              }
            }
            .right-view-btn-r {
              border: 0px solid black;
              position: relative;
              box-sizing: border-box;
              display: flex;
              -webkit-box-orient: horizontal;
              flex-direction: row;
              place-content: flex-start center;
              flex: 1 1 0%;
              cursor: pointer;
              -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
              -webkit-box-flex: 1;
              height: 45px;
              -webkit-box-pack: center;
              -webkit-box-align: center;
              align-items: center;
              font-size: 15px;
              color: rgb(51, 51, 51);
              background-image: linear-gradient(
                to right,
                rgb(255, 233, 37),
                rgb(255, 205, 12)
              );
              text-align: center;
              justify-content: center;
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
              }
            }
          }
        }
      }
    }
  }
}
.right-view-tit {
  border: 0px solid black;
  position: relative;
  box-sizing: border-box;
  display: flex;
  -webkit-box-orient: horizontal;
  flex-direction: row;
  place-content: flex-start space-between;
  flex-shrink: 0;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-box-pack: justify;
  padding: 4.5px 3px 3px;
  -webkit-box-align: center;
  align-items: center;
  width: 264px;
  .right-view-tit-txt {
    border: 0px solid black;
    position: relative;
    box-sizing: border-box;
    display: flex;
    -webkit-box-orient: horizontal;
    flex-direction: row;
    align-content: flex-start;
    flex-shrink: 0;
    -webkit-box-align: center;
    align-items: center;
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
      font-size: 14px;
      color: rgb(153, 153, 153);
    }
  }
}
</style>
