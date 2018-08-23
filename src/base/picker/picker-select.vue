<!--  -->
<template>

    <div class="weui-cell weui-cell_select">
          <div class="weui-cell__bd">
            <picker :mode="mode" @change="bindChange" @columnchange="bindColumnChange" :value="index" :range="array">
              <div class="weui-select">{{title}} <span class="result">{{array[index]}}</span></div>
            </picker>
          </div>
        </div>

</template>

<script type='text/ecmascript-6'>
export default {
  data () {
    return {
      index: 0
    }
  },
  props: {
    mode: {
      type: String,
      default: 'selector'
    },
    array: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: '人数'
    }
  },
  components: {},

  computed: {},

  mounted () {
    this.$emit('select', this.array[this.index])
  },

  methods: {
    bindChange (e) {
      this.index = e.mp.detail.value
      this.$emit('select', this.array[this.index])
    },
    bindColumnChange (e) {
      console.log(e.mp.detail)
      this.$emit('columnSelect', e.mp.detail.value)
    }
  }
}
</script>
<style lang='less'>
.result{
float: right;
}
</style>
