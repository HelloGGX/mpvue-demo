<!-- 加减input组件 -->
<template>
  <div class="sku-selector">
    <div class="sku-selector-reduce" @click="reduce()">
        <img src="/static/img/icon/reduce.png" >
    </div>
    <input id="sku-input" class="sku-selector-input" disabled="true" type="number" :maxlength="maxNum" v-model.number="num">
    <div class="sku-selector-increase">
        <img src="/static/img/icon/increase.png" @click="increase()">
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data () {
    return {}
  },
  model: {
    prop: 'num',
    event: 'change'
  },
  props: {
    maxNum: {
      type: Number,
      default: 4
    },
    num: {
      type: Number,
      default: 0
    }
  },
  methods: {
    reduce () {
      if (this.num > 0) {
        this.num--
      }
      this.$emit('reduce', this.num)
    },
    increase () {
      this.num++
      this.$emit('increase', this.num)
    }
  },
  watch: {
    num (val) {
      this.$emit('change', val)
    }
  }
}
</script>
<style lang='less' scoped>
.sku-selector {
  position: relative;
}
.sku-selector-number {
  position: relative;
  width: 100%;
  height: 1.12rem;
  margin-bottom: 0;
  line-height: 1.12rem;
  font-size: 0;
}
.sku-selector-number span {
  display: inline-block;
  font-size: 0.26rem;
  color: #151516;
}
.sku-selector-reduce {
  text-align: center;
  position: absolute;
  height: 0.5rem;
  width: 0.62rem;
  right: 1.88rem;
  top: 0;
  border-radius: 0.04rem;
  background-color: #e0e0e0;
}
.sku-selector-reduce img {
  width: 30rpx;
  height: 3px;
  margin: 0 auto;
  margin-top: 20rpx;
}
.sku-selector-increase,
.sku-selector-input {
  height: 0.5rem;
  top: 0;
  position: absolute;
  border-radius: 0.04rem;
}
.sku-selector-input,
.sku-selector-reduce-disable {
  background-color: #f2f2f2;
}
.sku-selector-reduce-disable::before {
  background-position: -1.88rem -1.3rem;
}
.sku-selector-input {
  width: 0.94rem;
  right: 0.88rem;
  line-height: normal;
  font-size: 0.24rem;
  margin: 0;
  padding: 0.06px 0;
  color: #151516;
  text-align: center;
}
.sku-selector-increase {
  text-align: center;
  width: 0.62rem;
  right: 20rpx;
  background-color: #e0e0e0;
}
.sku-selector-increase img {
  width: 30rpx;
  height: 30rpx;
  margin-top: 10rpx;
}
.sku-selector-increase-disable {
  background-color: #f2f2f2;
}
.sku-selector-increase-disable::before {
  background-position: -1.88rem -0.8rem;
}
</style>
