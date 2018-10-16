export function debounce (func, { delay = 0 } = {}) {
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
let nowDate =
  Date.now ||
  function () {
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
      isX =
        res.model === 'iPhone X (GSM+CDMA)<iPhone10,3>' &&
        res.screenWidth === 375 &&
        res.screenHeight === 812
    }
  })
  return isX
}

export function isInArray (arr, value) {
  if (arr.indexOf && typeof arr.indexOf === 'function') {
    var index = arr.indexOf(value)
    if (index >= 0) {
      return true
    }
  }
  return false
}

export function changeDate (val) {
  // 2018/8/16转 2018年8月16日
  let date = new Date(Date.parse(val))
  return `${date.getFullYear()}年${date.getMonth()}月${date.getDate()}日`
}
export function addClass (obj, cls) {
  let objClass = obj.className // 获取 class 内容.
  let blank = objClass !== '' ? ' ' : '' // 判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
  let added = objClass + blank + cls // 组合原来的 class 和需要添加的 class.
  obj.className = added // 替换原来的 class.
}

export function removeClass (obj, cls) {
  let objClass = ' ' + obj.className + ' ' // 获取 class 内容, 并在首尾各加一个空格. ex) 'abc    bcd' -> ' abc    bcd '
  objClass = objClass.replace(/(\s+)/gi, ' ') // 将多余的空字符替换成一个空格. ex) ' abc    bcd ' -> ' abc bcd '
  let removed = objClass.replace(' ' + cls + ' ', ' ') // 在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
  removed = removed.replace(/(^\s+)|(\s+$)/g, '') // 去掉首尾空格. ex) 'bcd ' -> 'bcd'
  obj.className = removed // 替换原来的 class.
}

export function hasClass (obj, cls) {
  let objClass = obj.className // 获取 class 内容.
  let objClassLst = objClass.split(/\s+/) // 通过split空字符将cls转换成数组.
  let x = 0
  for (x in objClassLst) {
    if (objClassLst[x] === cls) {
      // 循环数组, 判断是否包含cls
      return true
    }
  }
  return false
}
