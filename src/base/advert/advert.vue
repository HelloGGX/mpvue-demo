<!--  -->
<template>
  <div class="new" ref="new">
    <div class="new-tit">
        <img src="/static/img/new-tit@2x.png" alt="">
    </div>
    <swiper class="new-group" ref="newsGroup"
    :indicator-dots="indicatorDots"
    :autoplay="autoplay"
    :interval="interval"
    :duration="duration"
    :indicator-active-color="indicatorActiveColor"
    :circular="circular"
    :vertical="vertical"
    >
      <block v-for="(item,index) in adver" :index="index" :key="item.id">
        <swiper-item>
            <a :href="item.href" class="new-item">
              <div class="headline-link">
                  <p class="headline-tag">
                      <strong>精选</strong>
                      <span>{{item.choice}}</span>
                  </p>
                   <p class="headline-tag">
                      <strong>围观</strong>
                      <span>{{item.watch}}</span>
                  </p>
              </div>
              <div class="headline-subimg">
                  <image :src="item.src" class="new-image" />
                  <div class="headline-img-modal"></div>
              </div>
            </a>
        </swiper-item>
      </block>
    </swiper>
  </div>
</template>

<script type='text/ecmascript-6'>

export default {
  name: 'adver', // 新闻轮播组件
  props: {
    adver: {// 新闻数据
      type: Array,
      default: []
    },
    indicatorDots: {// 是否显示面板指示点
      type: Boolean,
      default: false
    },
    vertical: {// 是否纵向
      type: Boolean,
      default: true
    },
    autoplay: {// 是否自动切换
      type: Boolean,
      default: true
    },
    indicatorActiveColor: {
      type: String,
      default: '#ffffff'
    },
    interval: {// 自动切换时间间隔
      type: Number,
      default: 4000
    },
    duration: {// 滑动动画时长
      type: Number,
      default: 100
    },
    circular: {// 是否采用衔接滑动
      type: Boolean,
      default: true
    },
    skipHiddenItemLayout: {// 是否跳过未显示的滑块布局，设为 true 可优化复杂情况下的滑动性能，但会丢失隐藏状态滑块的布局信息
      type: Boolean,
      default: false
    }

  },
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>
<style lang='less'  scoped>
@import "~common/less/variable";

.new{
  display: -webkit-box;
    -webkit-box-align: center;
.new-tit{
    overflow: hidden;
    padding:0.1rem;
    img{
    width: 1.08rem;
    height: 1.08rem;
    }
}
  .new-group{
        height: 1.08rem;
        padding-left: 0.1rem;
        -webkit-box-flex: 1;
        overflow: hidden;
      .new-item{
        display: -webkit-box;
        overflow: hidden;
        .headline-link{
            color: #333;
            width: 4.8rem;
            line-height: 0.54rem;
            height: 1.08rem;
            font-size: @font-size-medium;
            p{
            width: 4.8rem;
             &.headline-tag{
                padding-left: 0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                line-height: .54rem;
                position: relative;
                 strong{
                    display: inline-block;
                    vertical-align: middle;
                    color: #ff5038;
                    font-weight: 400;
                    font-size: @font-size-small ;
                    line-height:  @font-size-small;
                    border-radius: .05333rem;
                    border: 1px solid #ff5038;
                    margin-right: .08rem;
                    padding: .02667rem .04rem;
                 }
                 span{
                    display: inline;
                    line-height: 0.54rem;
                    height: 0.54rem;
                    width: 5.56rem;
                    vertical-align: bottom;
                 }
             }
             &:first-child{
                 margin-top: 0;
             }
            }
        }
        .headline-subimg{
            position: relative;
            width: 1.44rem;
            background: 50% no-repeat;
            height: 1.08rem;
            .new-image{
                position: absolute;
                height: 100%;
                width: 98%;
                background-repeat: no-repeat;
                background-position: 50%;
                background-size: cover;
                right: 0;
            }
            .headline-img-modal{
                top: 0;
                position: absolute;
                background-color: transparent;
                background: -webkit-linear-gradient(left,#fff,hsla(0,0%,100%,0) 50%);
                width: 100%;
                height: 100%;
            }
        }
    }
  }
}

</style>