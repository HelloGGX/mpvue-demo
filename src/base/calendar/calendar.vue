<style scoped lang="less">
@media screen and (min-width: 460px) {
  .wh_item_date:hover {
    background: #71c7a5;
    cursor: pointer;
  }
}
* {
  margin: 0;
  padding: 0;
}

.wh_container {
  max-width: 410px;
  margin: auto;
}

li {
  list-style-type: none;
}
.wh_top_changge {
  display: flex;
}

.wh_top_changge li {
  cursor: pointer;
  display: flex;
  color: #000;
  font-size: 18px;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 47px;
}

.wh_top_changge .wh_content_li {
  cursor: auto;
  flex: 2.5;
}
.wh_content_all {
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC',
    'Helvetica Neue', STHeiti, 'Microsoft Yahei', Tahoma, Simsun, sans-serif;
  background-color: #fff;
  width: 100%;
  overflow: hidden;
  padding-bottom: 8px;
}

.wh_content {
  display: flex;
  flex-wrap: wrap;
  padding: 0 3% 0 3%;
  width: 100%;
}

.wh_content:first-child .wh_content_item_tag,
.wh_content:first-child .wh_content_item {
  color: #ddd;
  font-size: 16px;
}

.wh_content_item,
wh_content_item_tag {
  font-size: 15px;
  width: 13.4%;
  text-align: center;
  color: #000;
  position: relative;
}
.wh_content_item {
  height: 50px;
}

.wh_top_tag {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wh_item_date {
  width: 40px;
  height: 40px;
  line-height: 20px;
  margin: auto;
  justify-content: center;
  align-items: center;
  p {
    width: 100%;
  }
  .wh_item_price {
    font-size: 0.24rem;
    color: #ff5000;
  }
}

.wh_jiantou1 {
  width: 9px;
  height: 9px;
  border-top: 2px solid #999;
  border-left: 2px solid #999;
  transform: rotate(-45deg);
}

.wh_jiantou1:active,
.wh_jiantou2:active {
  border-color: #ddd;
}

.wh_jiantou2 {
  width: 9px;
  height: 9px;
  border-top: 2px solid #999;
  border-right: 2px solid #999;
  transform: rotate(45deg);
}
.wh_content_item > .wh_isMark {
  margin: auto;
  border-radius: 100px;
  background: blue;
  z-index: 2;
}
.wh_content_item .wh_other_dayhide {
  color: #bfbfbf;
}
.wh_content_item .wh_want_dayhide {
  color: #bfbfbf;
}
.wh_content_item .wh_isToday {
  background: #ffce00;
  border-radius: 100px;
}
.wh_content_item .wh_chose_day {
  background: #ff5000;
  border-radius: 10rpx;
  p {
    color: #fff;
  }
}
</style>
<template>
  <section class="wh_container">
    <div class="wh_content_all">
      <div class="wh_top_changge">
        <li @click="PreMonth(myDate,false)">
          <div class="wh_jiantou1"></div>
        </li>
        <li class="wh_content_li">{{dateTop}}</li>
        <li @click="NextMonth(myDate,false)">
          <div class="wh_jiantou2"></div>
        </li>
      </div>
      <div class="wh_content">
        <div class="wh_content_item" v-for="(tag,index) in textTop" :key="index">
          <div class="wh_top_tag">
            {{tag}}
          </div>
        </div>
      </div>
      <div class="wh_content">
        <div class="wh_content_item" v-for="(item,index) in list" v-on:click.stop="clickDay(item,index)" :key="index">
          <div class="wh_item_date" v-bind:class="[{ wh_isMark: item.isMark},{wh_other_dayhide:item.otherMonth!=='nowMonth'},{wh_want_dayhide:item.dayHide},{wh_isToday:item.isToday},{wh_chose_day:item.chooseDay},setClass(item)]">
            <p>{{item.id}}</p>
            <p class="wh_item_price">{{item.price}}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script type='text/ecmascript-6'>
import timeUtil from './calend'
// import { mapState } from 'vuex'

export default {
  data () {
    return {
      textTop: ['一', '二', '三', '四', '五', '六', '日'],
      myDate: [],
      list: [],
      historyChose: [],
      dateTop: ''
    }
  },
  props: {
    markDate: {
      type: Array,
      default: () => []
    },
    prices: {
      type: Array,
      default: () => []
    },
    markDateMore: {
      type: Array,
      default: () => []
    },
    sundayStart: {
      type: Boolean,
      default: () => false
    },
    agoDayHide: { type: String, default: `0` },
    futureDayHide: { type: String, default: `2554387200` }
  },
  created () {
    this.intStart()
    this.myDate = new Date()
  },
  methods: {
    intStart () {
      if (this.sundayStart) {
        this.textTop = ['日', '一', '二', '三', '四', '五', '六']
      } else {
        this.textTop = ['一', '二', '三', '四', '五', '六', '日']
      }
      timeUtil.sundayStart = this.sundayStart
    },
    setClass (data) {
      let obj = {}
      obj[data.markClassName] = data.markClassName
      return obj
    },
    clickDay (item, index) {
      if (item.otherMonth === 'nowMonth' && !item.dayHide) {
        this.getList(this.myDate, item.date)
      }
      if (item.otherMonth !== 'nowMonth') {
        item.otherMonth === 'preMonth'
          ? this.PreMonth(item.date)
          : this.NextMonth(item.date)
      }
    },
    ChoseMonth (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date)
      this.myDate = new Date(date)
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate))
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay)
      } else {
        this.getList(this.myDate)
      }
    },
    PreMonth (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date)
      this.myDate = timeUtil.getOtherMonth(this.myDate, 'preMonth')
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate))
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay)
      } else {
        this.getList(this.myDate)
      }
    },
    NextMonth (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date)
      this.myDate = timeUtil.getOtherMonth(this.myDate, 'nextMonth')
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate))
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay)
      } else {
        this.getList(this.myDate)
      }
    },
    forMatArgs () {
      let markDate = this.markDate
      let markDateMore = this.markDateMore
      markDate = markDate.map(k => {
        return timeUtil.dateFormat(k)
      })
      markDateMore = markDateMore.map(k => {
        k.date = timeUtil.dateFormat(k.date)
        return k
      })
      return [markDate, markDateMore]
    },
    getList (date, chooseDay, isChosedDay = true) {
      const [markDate, markDateMore] = this.forMatArgs()
      this.dateTop = `${date.getFullYear()}年${date.getMonth() + 1}月`
      let arr = timeUtil.getMonthList(this.myDate)

      for (let i = 0; i < arr.length; i++) {
        let markClassName = ''
        let k = arr[i]
        k.chooseDay = false
        k.price = ''
        k.dateId = null
        k.dayHide = true
        const nowTime = k.date
        // const t = new Date(nowTime).getTime() / 1000
        for (let j = 0; j < this.prices.length; j++) {
          if (k.date === timeUtil.dateFormat(this.prices[j].date)) {
            k.price = `￥${this.prices[j].sale_price}`
            k.dateId = this.prices[j].products_date_id
            k.dayHide = false
          }
        }
        // 看每一天的class
        for (const c of markDateMore) {
          if (c.date === nowTime) {
            markClassName = c.className || ''
          }
        }
        // 标记选中某些天 设置class
        k.markClassName = markClassName
        k.isMark = markDate.indexOf(nowTime) > -1
        // 无法选中某天
        // k.dayHide = t < this.agoDayHide || t > this.futureDayHide
        if (k.isToday) {
          this.$emit('isToday', nowTime)
        }
        let flag = !k.dayHide && k.otherMonth === 'nowMonth'
        if (chooseDay && chooseDay === nowTime && flag) {
          this.$emit('choseDay', {
            id: k.dateId,
            time: nowTime,
            price: k.price
          })
          // this.historyChose.push(nowTime)
          k.chooseDay = true
        }
        // else if (this.historyChose[this.historyChose.length - 1] === nowTime && !chooseDay && flag) {
        //   k.chooseDay = true
        // }
      }

      this.list = arr
    }
  },
  mounted () {
    this.getList(this.myDate)
  },
  // computed: {
  //   getlists () {
  //     return this.list
  //   }
  // },
  watch: {
    prices (val, oldVal) {
      this.getList(this.myDate)
    },
    markDate (val, oldVal) {
      this.getList(this.myDate)
    },
    markDateMore (val, oldVal) {
      this.getList(this.myDate)
    },
    agoDayHide (val, oldVal) {
      this.agoDayHide = parseInt(val)
      this.getList(this.myDate)
    },
    futureDayHide (val, oldVal) {
      this.futureDayHide = parseInt(val)
      this.getList(this.myDate)
    },
    sundayStart (val, oldVal) {
      this.intStart()
      this.getList(this.myDate)
    }
  }
}
</script>
