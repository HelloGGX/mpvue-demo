<!-- 幻灯片组件 -->
<template>
  <div class="slider" ref="slider">
    <swiper class="slider-group" ref="sliderGroup" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :indicator-active-color="indicatorActiveColor" :circular="circular" :vertical="vertical" :current="indx">
      <block v-for="(item,index) in imgUrls" :index="index" :key="item.id">
        <swiper-item>
          <a class="slider-item" @click="toDetail(item)">
            <image :src="item.src" class="slide-image" lazy-load="true" />
          </a>
        </swiper-item>
      </block>
    </swiper>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'slider',

  props: {
    indx: {
      type: Number,
      default: 0
    },
    imgUrls: {
      // 幻灯片的图片地址
      type: Array,
      default: []
    },
    indicatorDots: {
      // 是否显示面板指示点
      type: Boolean,
      default: true
    },
    vertical: {
      // 是否纵向
      type: Boolean,
      default: false
    },
    autoplay: {
      // 是否自动切换
      type: Boolean,
      default: true
    },
    indicatorActiveColor: {
      type: String,
      default: '#ffffff'
    },
    interval: {
      // 自动切换时间间隔
      type: Number,
      default: 4000
    },
    duration: {
      // 滑动动画时长
      type: Number,
      default: 500
    },
    circular: {
      // 是否采用衔接滑动
      type: Boolean,
      default: true
    },
    skipHiddenItemLayout: {
      // 是否跳过未显示的滑块布局，设为 true 可优化复杂情况下的滑动性能，但会丢失隐藏状态滑块的布局信息
      type: Boolean,
      default: false
    }
  },
  methods: {
    toDetail (v) {
      if (v.type === '0') {
        wx.navigateTo({ url: v.href })
      } else if (v.type === '1') {
        wx.navigateTo({ url: `../web-view/main?src=${v.href}` })
      }
    }
  },
  model: {
    prop: 'indx',
    event: 'change'
  },
  data () {
    return {}
  },
  watch: {
    indx (v) {
      this.$emit('change', v)
    }
  }
}
</script>
<style lang='less'  scoped>
.slider {
  min-height: 1px;
  position: relative;
  width: 100%;
  display: block;
  height: 122px;
  overflow-y: hidden;
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      display: block;
      width: 100%;
      text-decoration: none;
      .slide-image {
        display: block !important;
        width: 100% !important;
        height: 122px !important;
      }
    }
  }
}
</style>
