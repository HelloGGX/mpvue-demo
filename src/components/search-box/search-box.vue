<template>
  <div>
   <div class="search-head weui-flex">

    <slot name="left" ></slot>
    <div class="search-box">
        <i class="iconfont icon-search"></i>
        <input ref="query" type="text" v-model="query" :disabled="readOnly" class="box"  :placeholder="placeholder"/>
        <i @click="clear" v-show="query" class="iconfont icon-close"></i>
    </div>
    <slot name="right" ></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { debounce } from 'utils/tools'
import api from 'api/api'
export default {
  props: {
    placeholder: {
      type: String,
      default: '搜索产品'
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      query: '',
      result: []
    }
  },
  methods: {
    clear () {
      this.query = ''
    },
    setQuery (query) {
      this.query = query
    },
    blur () {
      this.$refs.query.blur()
    },
    search () {
      api
        .search({
          keyword: this.query
        })
        .then(res => {
          if (res.state === 'ok') {
            this.result = res.result
            this.$emit('result', this.result)
          }
        })
        .catch(errMsg => {
          console.log(errMsg)
        })
    }
  },
  created () {
    this.debouncedGetResult = debounce(this.search, 500)
  },
  watch: {
    query (val, oldVal) {
      this.debouncedGetResult()
    }
  }
}
</script>

<style scoped lang="less">
@import '~common/less/variable';

.search-head {
  padding: 0 0 0.1rem;

  .search-box {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 0.16rem;
    height: 0.68rem;
    background-color: @color-highlight-background;
    border-radius: 1rem;
    margin: 0.12rem;
    -webkit-box-flex: 4;
    -webkit-flex: 4;
    flex: 4;

    .icon-search {
      font-size: 24px;
      color: @color-dialog-background;
    }
    .box {
      flex: 1;
      margin: 0 0.05rem;
      line-height: 0.18rem;
      background: @color-highlight-background;
      color: @color-dialog-background;
      font-size: @font-size-medium;
      &::placeholder {
        color: @color-dialog-background;
      }
    }
    .icon-close {
      font-size: 16px;
      color: @color-dialog-background;
    }
  }
}
</style>
