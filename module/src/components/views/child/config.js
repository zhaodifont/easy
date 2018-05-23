import {getUserAgent} from '@/utils/utils.js'

var TIMEOUT = 1500
var storeUrl = 'https://lnk0.com/easylink/ELMtMdcg'
var b612HomePage = 'https://b612.snowcam.cn/'
var contentPath = 'inappBrowser?url=http://10.35.44.99:8080'
var b612Scheme = 'b612cnb://' + contentPath
var b612UniversalLink = 'https://ul-b612.snowcam.cn/app/' + contentPath + '&storeURL=' + storeUrl

export const cfg = {
  TIMEOUT: TIMEOUT,
  storeUrl: storeUrl,
  b612HomePage: b612HomePage,
  contentPath: contentPath,
  b612Scheme: b612Scheme,
  b612UniversalLink: b612UniversalLink
}

const apiPrefix = 'http://10.35.46.22:10001'
export const api = {
  getCasePrize: `${apiPrefix}/activity/61/award?awardType=`,
  getBigPrize: `${apiPrefix}/activity/61/bigaward`,
  confirmPrize: `${apiPrefix}/activity/61/bigaward/winner`
}

let _getUserAgent = getUserAgent()

let asyncLoadjs = (url) => {
  var script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = url
  document.getElementsByTagName('body')[0].appendChild(script)
}
// let _gAgent = getUserAgent()
// let b612Bridge = B612Kaji.Native.Interface.getInstance()
// this.isAndApp = (window.B612KajiBridgeInterface != undefined) ? 'ok' : ''
// _gAgent.isIos && b612Bridge.api.appInfo(res => {
//   this.appInfo = res
//   this.inIosApp = 'ok'
//   window.location.href = this.b612Scheme
// })
// this.isAndApp == 'ok' && b612Bridge.api.appInfo(res => {
//   this.appInfo = res
//   window.location.href = this.b612Scheme
// })
// setTimeout(() => {
//   if (this.inIosApp == '' && _gAgent.isIos) {
//     this.isIos = _gAgent.isIos
//     window.location.href = this.b612UniversalLink
//   } else if (this.isAndApp == '' && _gAgent.isAndroid) {
//     this.isAnd = _gAgent.isAndroid
//     launchAndroid(this.b612Scheme, this.storeUrl, this.TIMEOUT)
//   } else {
//     window.location.href = this.storeUrl
//   }
// }, 100)
// export let shareImageByBridge = () => {
//   let base64Image = ''
//   var b612Bridge
//   if (_getUserAgent.isIos) {
//     b612Bridge = B612Kaji.Native.ios.Function.getInstance()
//   } else if (_getUserAgent.isAndroid) {
//     b612Bridge = B612Kaji.Native.android.Function.getInstance()
//   }
//   b612Bridge.shareImageWithCallback(base64Image, function () {}, function () {})
// }

export let openCamera = function (cb, opts) {
  window.cameraApi = B612Kaji.Native.Interface.getInstance()
  return window.cameraApi.eventCamera(
    function (result) {
      cb(result)
    }, opts
  )
}
export let addBridgejs = () => {
  let env = getUserAgent()
  if (env.isIos) {
    // asyncLoadjs('http://b612kaji-static.snowcam.cn/static/event/sky_segmentation/js/bridge_ios.js')
    // asyncLoadjs('https://b612kaji-pstatic.snowcam.cn/static/event/LhBirthday/js/bridge_ios.js')
    asyncLoadjs('http://qa-b612.snowcam.cn/cdn/event/child/bridge/bridge_ios.js')
  } else if (env.isAndroid) {
    asyncLoadjs('http://qa-b612.snowcam.cn/cdn/event/child/bridge/bridge_android.js')
  }
  asyncLoadjs('http://qa-b612.snowcam.cn/cdn/event/child/bridge/bridge_interface.js')
  // window.B612Kaji = bridgeInterface
}

export let myAjax = (opt) => {
  var xhr = new XMLHttpRequest()
  var requestDone = false
  setTimeout(() => {
    requestDone = true
  }, 3000)
  // xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.open(opt.method || 'GET', opt.url, true)
  if (opt.method == 'POST') {
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(opt.data || '')
  } else {
    xhr.send()
  }
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && !requestDone) {
      if (opt.complete) {
        opt.complete(xhr)
      }
    } else if (xhr.readyState != 4 && requestDone) {
      if (opt.timeout) {
        opt.timeout(xhr)
      }
    }
  }
}

export let toHotTopic = (topicId, contId) => {
  let appType = ''
  if (_getUserAgent.isAndroid) {
    appType = 'Android'
  } else if (_getUserAgent.isIos) {
    appType = 'IOS'
  } else {
    appType = 'Others'
  }
  // window.location.href = `https://b612.snowcam.cn/event/weibo_topic/${topicId}/content/${contId}?appVersion=0.0.0&appType=${appType}`
  window.location.href = `http://qa-b612.snowcam.cn/event/weibo_topic/${topicId}/content/${contId}?appVersion=0.0.0&appType=${appType}`
  // var rootElm = document.documentElement;
  // var newFrameElm = document.createElement("IFRAME");
  // newFrameElm.setAttribute("src", `b612cnb://inappBrowser?url=http://10.35.44.99:8080/#/${open}`);
  // rootElm.appendChild(newFrameElm);
}
// export const cfgInit = () => {
//   addBridgejs()
// }
