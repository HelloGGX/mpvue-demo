<!-- 筛选栏 -->
<template>
  <div class="filter-banner">
    <div class="filter-wrap">
      <div class="filter-category" @click="layer('all')">
        <img src="/static/img/icon/down.png" alt="">
        <span>全部分类</span>
      </div>
      <div class="filter-category" @click="layer('comprehensive')">
        <img src="/static/img/icon/down.png" alt="">
        <span>综合排序</span>
      </div>
      <div class="filter-category" @click="layer('filter')">
        <img src="/static/img/icon/filter.png" alt="" class="img-filter">
        <span>筛选</span>
      </div>
    </div>
    <!-- <div class="down-wrap">
          <slot></slot>
    </div>
      <div style="transition-duration:0.2s;" class="overlay" v-show="upState"></div> -->
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data () {
    return {}
  },
  methods: {
    layer (val) {
      this.$emit('layer', val)
    }
  }
}
</script>
<style lang='less' scoped>
.filter-banner {
  border: 0px solid black;
  position: relative;
  box-sizing: border-box;
  display: flex;
  -webkit-box-orient: vertical;
  flex-direction: column;
  align-content: flex-start;
  flex-shrink: 0;
  .filter-wrap {
    border-width: 0px 0px 0.498667px;
    border-style: solid;
    border-color: black black rgb(242, 243, 244);
    border-image: initial;
    position: relative;
    box-sizing: border-box;
    display: flex;
    -webkit-box-orient: horizontal;
    flex-direction: row;
    place-content: flex-start space-between;
    flex: 1 1 0%;
    -webkit-box-flex: 1;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    background-color: rgb(255, 255, 255);
    width: 374px;
    height: 39.8933px;
    .filter-category {
      border: 0px solid black;
      position: relative;
      box-sizing: border-box;
      display: flex;
      flex-direction: row-reverse;
      place-content: flex-start center;
      flex: 1 1 0%;
      cursor: pointer;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      -webkit-box-flex: 1;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      height: 39.8933px;
      padding: 0px 5.984px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      justify-content: center;
      img {
        display: flex;
        width: 7.97867px;
        height: 3.98933px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-left: 5.984px;
        transform: rotate(0deg);
      }
      span {
        white-space: nowrap;
        border: 0px solid black;
        position: relative;
        box-sizing: border-box;
        display: block;
        -webkit-box-orient: vertical;
        flex-direction: column;
        align-content: flex-start;
        flex-shrink: 0;
        font-size: 13.9627px;
        max-width: 74.8px;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: right;
      }
    }
  }
}
.img-filter {
  display: flex !important;
  width: 12.4667px !important;
  height: 12.9653px !important;
  margin-left: 5.984px !important;
}
.down-wrap {
  width: 100%;
  left: 0;
  right: 0;
  overflow: hidden;
  position: fixed;
  z-index: 9000;
  background: #f2f3f4;
  transition: all 0.2s linear 0s;
  -webkit-transition: all 0.2s linear 0s;
  transform: translate(0);
  -webkit-transform: translate(0);
  color: #333;
  padding-bottom: 1rem;
}
.overlay {
  position: fixed;
  z-index: 8999;
  top: -100px;
  left: 0;
  bottom: -100px;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
