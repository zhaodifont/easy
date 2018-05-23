export let getQueryString = (name) => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURIComponent(r[2])
  return null
}

export let getUserAgent = () => {
  let userAgent = navigator.userAgent.toLowerCase()
  return {
    isAndroid: /android/.test(userAgent),
    isIos: /ipad|iphone|ipod/.test(userAgent),
    isWechat: /micromessenger/.test(userAgent),
    isQQ: /qq/.test(userAgent),
    isWeibo: /weibo/.test(userAgent),
    isQZone: /qzone/.test(userAgent)
  }
}

export let launchAndroid = (scheme, storeUrl, timeout) => {
  var iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = scheme
  document.body.appendChild(iframe)
  window.setTimeout(function () {
    document.body.removeChild(iframe)
  }, 0)
  window.setTimeout(function () {
    window.location = storeUrl
  }, timeout)
}

export let addcookie = (name, value, expireHours) => {
  var cookieString = name + '=' + escape(value) + '; path=/'
  // 判断是否设置过期时间
  if (expireHours > 0) {
    var date = new Date()
    date.setTime(date.getTime + expireHours * 3600 * 1000)
    cookieString = cookieString + '; expire=' + date.toGMTString()
  }
  document.cookie = cookieString
}

export let getcookie = (name) => {
  var strcookie = document.cookie
  var arrcookie = strcookie.split('; ')
  for (var i = 0; i < arrcookie.length; i++) {
    var arr = arrcookie[i].split('=')
    if (arr[0] == name) return decodeURIComponent(arr[1])// 增加对特殊字符的解析
  }
  return ''
}

// 删除cookie
export let delCookie = (name) => {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getcookie(name)
  if (cval != null) document.cookie = name + '=' + cval + '; path=/;expires=' + exp.toGMTString()
}

// 将对象转化成json字符串，存入sessionStorage
export let localStoragePut = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}
// 从sessionStorage中取出json字符串，然后将json字符串转化成对象,并返回.
export let localStorageGet = (key, isRemove) => {
  var result = JSON.parse(localStorage.getItem(key))
  if (isRemove) {
    localStorage.removeItem(key)
  }
  return result
}
