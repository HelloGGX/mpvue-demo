<template>
  <div>
   <div class="search-head weui-flex" @click='toSearch()'>

    <slot name="left" ></slot>
    <div class="search-box">
        <i class="iconfont icon-search"></i>
        <input ref="query" type="text" v-model="query" class="box"  :placeholder="placeholder"/>
        <i @click="clear" v-show="query" class="iconfont icon-close"></i>
    </div>
    <slot name="right" ></slot>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">

import {debounce} from 'utils/tools'

export default {
  props: {
    placeholder: {
      type: String,
      default: '搜索产品'
    }
  },
  data () {
    return {
      query: ''
    }
  },
  methods: {
    toSearch () {
      wx.navigateTo({
        url: '../../pages/search/main'
      })
    },
    clear () {
      this.query = ''
    },
    setQuery (query) {
      this.query = query
    },
    blur () {
      this.$refs.query.blur()
    }
  },
  created () {
    this.$watch('query', debounce((newQuery) => {
      this.$emit('query', newQuery)
    }, 200))
  }
}
</script>

<style scoped lang="less">
  @import "~common/less/variable";

.search-head{
  padding: 0 0 0.1rem;

 .search-box{
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 0.16rem;
    height: 0.68rem;
    background-color: @color-highlight-background;
    border-radius: 1rem;
    margin:0.12rem;
    -webkit-box-flex:4;
      -webkit-flex:4;
      flex:4;

    .icon-search{
        font-size: 24px;
        color: @color-dialog-background;
    }
    .box{
      flex: 1;
      margin: 0 0.05rem;
      line-height: 0.18rem;
      background: @color-highlight-background;
      color: @color-dialog-background;
      font-size: @font-size-medium;
      &::placeholder{
        color: @color-dialog-background;
      }
    }
    .icon-close{
      font-size: 16px;
      color: @color-dialog-background;
    }
  }

}


</style>
