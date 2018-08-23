<!-- 日期选择 -->
<template>
   <div class="weui-cell weui-cell_select">
          <div class="weui-cell__bd">
            <picker :mode="mode" :value="startDate" :start="pickerStart" :end="endDate" @change="bindDateChangeStart">
              <div class="weui-select">{{title}} <span class="result">{{selectDate}}</span></div>
            </picker>
          </div>
        </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data () {
    return {
      startDate: this.getToday(),
      endDate: '2100-01-01',
      pickerStart: this.getToday(),
      selectDate: this.getToday()
    }
  },
  props: {
    mode: {
      type: String,
      default: 'date'
    },
    title: {
      type: String,
      default: '日期'
    }
  },
  components: {},

  computed: {},

  mounted () {
    this.$emit('selectDate', this.selectDate)
  },

  methods: {
    getToday () {
      let myDate = new Date()
      let myMonth = myDate.getMonth() + 1
      if (myMonth < 10) {
        myMonth = `0${myMonth}`
      }
      let mydate = myDate.getDate()
      if (myDate.getDate() < 10) {
        mydate = `0${myDate.getDate()}`
      }
      let today = `${myDate.getFullYear()}-${myMonth}-${mydate}`
      return today
    },
    bindDateChangeStart (e) {
      this.selectDate = e.mp.detail.value
      this.$emit('selectDate', this.selectDate)
    }
  }
}
</script>
<style lang='less' scoped>
</style>
