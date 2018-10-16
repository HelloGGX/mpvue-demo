<!--  -->
<template>
    <scroll-view scroll-y  @scrolltolower="loadMore" style="height:100%">
      <div class="card-list-container">
        <section class="card-ct card-cell" v-for="(item,index) in lists" :key="index">
          <div class="com-choice-item card-ct card-div">
            <a class="card-item card-ct card-a" @click="handleClick(item)">
              <div class="card-el card-image item-image" :style="{backgroundImage:'url(' + item.image_url + ')'}"></div>
              <div class="category-tag card-ct card-div">
                <p class="tag-text card-el card-text">{{item.type}}</p>
              </div>
              <div class=" card-ct card-div image-desc">
                <p class="image-text card-el card-text">成都等多地出发</p>
              </div>
              <div class="item-content card-ct card-div">
                <div class="wxc-special-rich-text card-ct card-div">
                  <div class="tag-div card-ct card-div">
                  </div>
                  <p class=" card-el card-text wxc-text ellip-2" :style="{marginBottom:'10rpx'}">{{item.title}}</p>
                </div>
                <div class=" card-ct card-div">
                  <div class="wxc-rich-text card-ct card-div">
                    <div class=" card-ct card-div">
                      <div class="wxc-image card-el card-image"></div>
                    </div>
                    <div class=" card-ct card-div">
                      <div class=" card-ct card-div wxc-tag item-tag" :style="{borderColor: 'rgb(221, 221, 221)'}">
                        <p class=" card-el card-text tag-text " :style="{fontSize: '26rpx', color: 'rgb(153, 153, 153)'}">{{item.long_day}}天{{item.long_night}}晚</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class=" card-ct card-div one-desc">
                  <div class="wxc-rich-text card-ct card-div">
                    <div class=" card-ct card-div">
                      <p class=" card-el card-text wxc-text gray margin-text">班期:{{item.godate}}</p>
                    </div>
                  </div>
                </div>
                <div class=" card-ct card-div">
                  <div class="wxc-rich-text card-ct card-div">
                    <div class=" card-ct card-div">
                      <div class=" card-ct card-div wxc-tag item-tag" :style="{borderColor: 'rgb(68, 219, 94)', backgroundColor: 'rgb(68, 219, 94)', paddingLeft: '0', paddingRight: '0'}">
                        <p class=" card-el card-text tag-text" :style="{fontSize: '28rpx', color: 'rgb(255, 255, 255)'}">游</p>
                      </div>
                    </div>
                    <div class=" card-ct card-div">
                      <p class=" card-el card-text wxc-text margin-text">{{item.tag}}</p>
                    </div>
                  </div>
                </div>
                <div class=" card-ct card-div">
                  <div class="wxc-rich-text card-ct card-div">
                    <div class=" card-ct card-div">
                      <div class=" card-ct card-div wxc-tag item-tag" :style="{borderColor: 'rgb(48, 160, 255)', backgroundColor: 'rgb(48, 160, 255)', paddingLeft: '0', paddingRight: '0'}">
                        <p class=" card-el card-text tag-text" :style="{fontSize: '28rpx', color: 'rgb(255, 255, 255)'}">确</p>
                      </div>
                    </div>
                    <div class=" card-ct card-div">
                      <p class=" card-el card-text wxc-text margin-text">{{item.need_conf.text}}</p>
                    </div>
                  </div>
                </div>
                <div class="item-price card-ct card-div">
                  <div class=" card-ct card-div">
                    <p class="default-text card-el card-text"></p>
                  </div>
                  <div class="price-num card-ct card-div">
                    <span>
                      <p class="price card-el card-text">￥{{item.sale_price}}</p>
                    </span>
                    <span class="market-price">
                      <del>￥{{item.cost_price}}</del>
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </section>
      </div>
    </scroll-view>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    lists: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {}
  },
  methods: {
    handleClick (item) {
      wx.navigateTo({
        url: '../../pages/detail/main?id=' + item.id
      })
    },
    loadMore () {
      this.$emit('loadMore')
    }
  }
}
</script>
<style lang='less'>

  .card-list-container {
      .card-item {
        height: 3rem;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -webkit-flex-direction: row;
        flex-direction: row;
        position: relative;
        .item-image {
          width: 1.98rem;
          height: 1.98rem;
          margin: 0.24rem;
          background-repeat: no-repeat;
          background-position: 50% 50%;
          background-size: cover;
        }
        .category-tag {
          padding-right: 0.16rem;
          padding-left: 0.12rem;
          height: 0.36rem;
          -webkit-box-pack: center;
          -webkit-justify-content: center;
          justify-content: center;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0.24rem;
          background-color: #ffc900;
          position: absolute;
          top: 0.24rem;
          left: 0.24rem;
          .tag-text {
            color: #3d3d3d;
            font-size: 0.22rem;
            line-height: 0.36rem;
          }
        }
        .image-desc {
          position: absolute;
          left: 0.24rem;
          top: 1.86rem;
          width: 1.98rem;
          height: 0.36rem;
          background-color: rgba(0, 0, 0, 0.8);
          -webkit-box-align: center;
          -webkit-align-items: center;
          align-items: center;
          -webkit-box-pack: center;
          -webkit-justify-content: center;
          justify-content: center;
          .image-text {
            font-size: 0.24rem;
            color: #fff;
          }
        }
        .item-content {
          -webkit-box-flex: 1;
          -webkit-flex: 1;
          flex: 1;
          border-bottom-color: #e0e0e0;
          border-bottom-style: solid;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -webkit-flex-direction: column;
          flex-direction: column;
          -webkit-box-pack: justify;
          -webkit-justify-content: space-between;
          justify-content: space-between;
          padding-top: 0.24rem;
          padding-right: 0.24rem;
          padding-bottom: 0.18rem;
          overflow: hidden;
          .wxc-special-rich-text {
            position: relative;
          }
          .tag-div {
            position: absolute;
            top: 0;
            color: #a5a5a5;
            font-size: 0.24rem;
            line-height: 0.3rem;
          }

          .price-num {
            margin-top: 0.1rem;
            .market-price {
              position: relative;
              height: 100%;
              line-height: 0.24rem;
              margin-left: 0.06rem;
              font-size: 0.24rem;
              color: #58595b;
              text-decoration: line-through;
            }
          }
          .item-price {
            -webkit-box-pack: justify;
            -webkit-justify-content: space-between;
            justify-content: space-between;
            height: 0.36rem;
            .yen {
              color: #ff5e00;
              font-size: 0.24rem;
              line-height: 0.26rem;
              margin-right: 0.02rem;
              margin-top: 0.04rem;
            }
            .price {
              color: #ff5e00;
              font-size: 0.36rem;
              line-height: 0.4rem;
            }
          }
          .item-price,
          .price-num {
            -webkit-box-align: center;
            -webkit-align-items: center;
            align-items: center;
            -webkit-box-orient: horizontal;
            -webkit-box-direction: normal;
            -webkit-flex-direction: row;
            flex-direction: row;
          }
        }
      }
}
.card-ct {
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
.card-el {
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
.card-text {
  display: -webkit-box;
  display: -moz-box;
  -webkit-box-orient: vertical;
  position: relative;
  white-space: pre-wrap;
  font-size: 0.32rem;
  word-wrap: break-word;
  overflow: hidden;
}
.card-image {
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 100% 100%;
}
.card-a {
  text-decoration: none;
}
.wxc-rich-text {
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-flex-shrink: 1;
  flex-shrink: 1;
}
.card-root figure {
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
.wxc-image {
  width: 0.9rem;
  height: 0.24rem;
  margin-right: 0.06rem;
  background-image: url('../../../static/img/icon/brand-card.png');
}
.wxc-tag {
  border-color: #3d3d3d;
  border-width: 1px;
  border-radius: 0.04rem;
  margin-right: 0.06rem;
  background-color: transparent;
  padding-left: 0.06rem;
  padding-right: 0.06rem;
  height: 0.24rem;
  padding-bottom: 1px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.one-desc {
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
}
.wxc-rich-text {
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-flex-shrink: 1;
  flex-shrink: 1;
}
.wxc-text {
  font-size: 0.24rem;
  color: #3d3d3d;
}
.gray {
  color: #a5a5a5;
}
.margin-text {
  margin-right: 0.06rem;
}
.card-cell {
  width: 100%;
}
.com-choice-item {
  width: 7.5rem;
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
}
</style>
