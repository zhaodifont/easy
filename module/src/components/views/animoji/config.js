import {getUserAgent} from '@/utils/utils.js'

// real
var TIMEOUT = 1500
var storeUrl = 'https://lnk0.com/easylink/EL0YNBVd'
var b612HomePage = 'https://b612.snowcam.cn/'
var contentPath = 'go?stickerId=84583&categoryId=20011&autoDownload=true'
var b612Scheme = 'b612cn://' + contentPath
var b612UniversalLink = 'https://ul-b612.snowcam.cn/app/' + contentPath + '&storeURL=' + storeUrl

// beta
// var TIMEOUT = 1500
// var storeUrl = 'https://lnk0.com/easylink/ELlwB54s'
// var b612HomePage = 'https://b612.snowcam.cn/'
// var contentPath = 'go?stickerId=84583&categoryId=20111&autoDownload=true'
// var b612Scheme = 'b612cnb://' + contentPath
// var b612UniversalLink = 'https://ul-b612.snowcam.cn/app/' + contentPath + '&storeURL=' + storeUrl

export const cfg = {
  TIMEOUT: TIMEOUT,
  storeUrl: storeUrl,
  b612HomePage: b612HomePage,
  contentPath: contentPath,
  b612Scheme: b612Scheme,
  b612UniversalLink: b612UniversalLink
}

let asyncLoadjs = (url) => {
  var script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = url
  document.getElementsByTagName('body')[0].appendChild(script)
}

let addBridgejs = () => {
  let env = getUserAgent()
  if (env.isIos) {
    // asyncLoadjs('http://qa-b612.snowcam.cn/cdn/event/animoji/bridge/bridge_ios.js')
    asyncLoadjs('https://b612kaji-pstatic.snowcam.cn/static/event/LhBirthday/js/bridge_ios.js')
  } else if (env.isAndroid) {
    asyncLoadjs('https://b612kaji-pstatic.snowcam.cn/static/event/LhBirthday/js/bridge_android.js')
  }
  asyncLoadjs('https://b612kaji-pstatic.snowcam.cn/static/event/LhBirthday/js/bridge_interface.js')
}
export const cfgInit = () => {
  addBridgejs()
}
