export function debounce (func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
let nowDate = Date.now || function () {
  return new Date().getTime()
}
export function throttle (func, wait, options) {
  var timeout, context, args, result
  var previous = 0
  if (!options) options = {}

  var later = function () {
    previous = options.leading === false ? 0 : nowDate
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }

  var throttled = function () {
    var now = nowDate
    if (!previous && options.leading === false) previous = now
    var remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }

  throttled.cancel = function () {
    clearTimeout(timeout)
    previous = 0
    timeout = context = args = null
  }

  return throttled
}

export function del$ (str) {
  if (str) {
    return str.replace(/^￥\s*/g, '')
  }
}

export function isIphoneX () {
  let isX = null
  wx.getSystemInfo({
    success: function (res) {
      isX = res.model === 'iPhone X (GSM+CDMA)<iPhone10,3>' && res.screenWidth === 375 && res.screenHeight === 812
    }
  })
  return isX
}
export function changeDate (val) { // 2018/8/16转 2018年8月16日
  let date = new Date(Date.parse(val))
  return `${date.getFullYear()}年${date.getMonth()}月${date.getDate()}日`
}
