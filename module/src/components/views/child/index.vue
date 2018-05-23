<template>
  <div class="container ind p-r" @touchstart.capture.once='testInApp'>
    <!-- {{inApp}}<br />
    isAnd:{{isAnd}};+++ isAndApp:{{isAndApp}};<br/>
    isIos:{{isIos}}+++inIosApp:{{inIosApp}}<br/>
    appInfo:{{appInfo}}<br/> -->

    <canvas id="myCanvas" ref='myCanvas' style="position:fixed;z-index:66;left:-999rem;top:0;border:1px red solid;" width="300" height="300"></canvas>
    <div style="background-color:#fff;position:fixed;right:0;top:0;z-index:666;padding:.2rem;">
      设置活动开始第: <input type="text" v-model="setDay" style="width:.6rem;border:1px orange solid" name="" value="">天<br  />
      <div style="height:.3rem"></div>
      <button type="button" name="button" style="border:1px orange solid" @click="deleteCookie">删除Cookie</button>
      <button type="button" style="border:1px orange solid;margin-left:.2rem;" onclick="window.location.reload()" name="button">刷新</button>
    </div>

    <!-- <button type="button" name="button" style="border:1px red solid" onclick="window.location.href='b612cnb://go?stickerId=84576&categoryId=20052&autoDownload=true'">贴纸测试</button> -->
    <div class="banner p-r">
      <img src="./img/bannerbg.jpg" width="100%" :style="{height:fullScreen}" alt="">
      <div class="wpr">
        <img src="./img/shareBtns.png" class="shareBtn" @click="img_share" alt="">
      </div>
    </div>
    <div class="step1 p-r">
      <img  src="./img/step1bga.jpg" data-url="./img/step1bg.jpg" width="100%" alt="">
      <img  src="./img/step1-lit.png" class="litPrize" data-url="./img/step1bg.jpg" width="100%" alt="">
      <div class="wpr">
        <div class="lwpr">
          <var>重返童年变身儿时动画人物，留住小美好。</var>
          <div class="imgs">
            <img src="./img/toTopic1-1.gif" @click="toHotTopic(287,1371)" alt="">
            <img src="./img/test.jpg" @click="toHotTopic(287,1371)" alt="">
          </div>
        </div>
        <temp-statue :touchStep="1" :pro-state="process[0].state" @toTryTicker="testTicker" />
      </div>
    </div>
    <div class="step2 p-r">
      <img v-lazy="require('./img/step2bga.jpg')" data-url="./img/step2bg.jpg" width="100%" alt="">
      <img  v-lazy="require('./img/step2-lit.png')" class="litPrize" data-url="./imgstep2-lit.png" width="100%" alt="">
      <div class="wpr">
        <div class="rwpr lwpr">
          <var>没错这是一台时光机，萌三岁就是你吧?</var>
          <div class="imgs">
            <img src="https://dummyimage.com/150x200/b293a4/fff&text=%E5%91%B5" @click="toHotTopic(287,1372)" alt="">
            <img src="https://dummyimage.com/150x200/b293a4/fff&text=ui" @click="toHotTopic(287,1372)" alt="">
          </div>
        </div>
        <temp-statue :touchStep="2" :pro-state="process[1].state" @toTryTicker="testTicker" />
      </div>
    </div>
    <div class="step3 p-r">
      <img v-lazy="require('./img/step3bga.jpg')" data-url="./img/step3bg.jpg" width="100%" alt="">
      <img  v-lazy="require('./img/step3-lit.png')" class="litPrize" data-url="./imgstep3-lit.png" width="100%" alt="">
      <div class="wpr">
        <div class="lwpr">
          <var>animoji霸占朋友圈新玩法，黑科技等你get</var>
          <div class="imgs">
            <img src="https://dummyimage.com/150x200/b293a4/fff&text=%E5%91%B5" @click="toHotTopic(287,1373)" alt="">
            <img src="https://dummyimage.com/150x200/b293a4/fff&text=pm" @click="toHotTopic(287,1373)" alt="">
          </div>
        </div>
        <temp-statue :touchStep="3" :pro-state="process[2].state" @toTryTicker="testTicker" />
      </div>
    </div>
    <div class="step4 p-r">
      <img v-lazy="require('./img/step4bga.jpg')" data-url="./img/step4bg.jpg" width="100%" alt="">
      <img  v-lazy="require('./img/step4-lit.png')" class="litPrize" data-url="./imgstep4-lit.png" width="100%" alt="">
      <div class="wpr">
        <div class="lwpr rwpr">
          <var>没错这是一台时光机，萌三岁就是你吧?</var>
          <div class="imgs">
            <img src="https://dummyimage.com/150x200/b293a4/fff&text=%E5%91%B5" @click="toHotTopic(287,1374)" alt="">
            <img src="https://dummyimage.com/150x200/b293a4/orange&text=taotao" @click="toHotTopic(287,1374)" alt="">
          </div>
        </div>
        <temp-statue :touchStep="4" :pro-state="process[3].state" @toTryTicker="testTicker" />
      </div>
    </div>

    <div class="step5 p-r">
      <img v-lazy="require('./img/step5bga.jpg')" data-url="./img/step5bg.jpg" width="100%" alt="">
      <div class="wpr">
        <temp-statue :touchStep="5" :pro-state="process[4].state" @toTryTicker="testTicker" />
      </div>
    </div>
    <div class="desc p-r">
      <img v-lazy="require('./img/description.jpg')" data-url="./img/description.jpg" width="100%" alt="">
    </div>
    <div class="toast" v-show="toast">
      {{toastText}}
    </div>
  </div>
</template>

<script>
import {localStoragePut, localStorageGet, getUserAgent, launchAndroid} from '@/utils/utils'
import {addBridgejs, cfg, api, myAjax, toHotTopic} from './config'
import Statue from './statue'
import bridge from './bridge.js'

export default {
  components: {
    'temp-statue': Statue
  },
  data () {
    return {
      kjChild: {
        eventInfo: {
          process: [
            {
              state: 0, // 0 未开始 1 去完成 2 待领奖 3 已参与
              categoryId: 'categoryId=20111',
              stickerId: 'stickerId=84583'
            },
            {
              state: 0,
              categoryId: 'categoryId=20111',
              stickerId: 'stickerId=84642'
            },
            {
              state: 0,
              categoryId: 'categoryId=20111',
              stickerId: 'stickerId=84671'
            },
            {
              state: 0,
              categoryId: 'musiccategoryId=18',
              stickerId: 'musicId=459'
            },
            {
              state: 4, // 4不可领取  5可领取 6已领取
              joined: false
            }
          ]
        },
        prizeCode: ''
      },
      name: 'zd',
      ...cfg,
      scheme: 'b612cnb://go?',
      startTime: '2018/05/31 00:00:00',
      isAnd: '',
      isAndApp: '',
      isIos: '',
      inIosApp: '',
      appInfo: '...',
      inApp: false,
      fullScreen: '7.15rem',
      toast: false,
      toastText: '',
      setDay: 0,
      mycanva: '',
      base64Image: ''
    }
  },
  beforeMount () {
    // localStorageGet('kjChild', true) _hmt.push(['_trackEvent', '注册', 'click', 'recruit-Submit'])
    console.log('before:', localStorageGet('kjChild'))
    // 判断缓存中是否已经有参与信息 变动信息
    if (localStorageGet('kjChild')) {
      this.kjChild = localStorageGet('kjChild')
      console.log('update kjChild data')
    } else {
      localStoragePut('kjChild', this.kjChild)
      console.log('storage kjChild data')
    }

    // 获取时间差
    let interval = (new Date().getTime() - new Date(this.startTime).getTime()) / (1000 * 60 * 60 * 24)
    let intervalDay = Math.ceil(interval)
    console.log('interval', interval, intervalDay)
    this.setDay = intervalDay

    setTimeout(() => {
      console.log('this.allTook', this.allTook, this.process[4].joined == false)
      //  初始化的时候 判断用户是否可以抽大奖
      if (this.allTook && this.process[4].joined == false) {
        this.process[4].state = 5
      }
    }, 100)
  },
  mounted () {
    this.fullScreen = 'auto'
    addBridgejs()
    bridge.$on('_handshare', (type) => {
      if (type) {
        this.imgShare('i')
      } else {
        this.imgShare()
      }
    })

    this.mycanva = this.$refs.myCanvas
    this.mycanva.setAttribute('width', '640')
    this.mycanva.setAttribute('height', '960')
  },
  methods: {
    testRoute () {
      this.$router.push({name: 'super'})
    },
    deleteCookie () {
      localStorageGet('kjChild', true)
    },
    testInApp () {
      let _gAgent = getUserAgent()
      this.isAnd = _gAgent.isAndroid
      this.isIos = _gAgent.isIos
      let b612Bridge = B612Kaji.Native.Interface.getInstance()
      this.isAndApp = (window.B612KajiBridgeInterface != undefined) ? 'ok' : ''
      if (this.isAndApp == 'ok') {
        this.inApp = true
      }
      _gAgent.isIos && b612Bridge.appInfo(res => {
        this.appInfo = res
        this.inIosApp = 'ok'
        this.inApp = true
      })
    },
    tryToScheme (cb) {
      if (!this.inApp) {
        let _gAgent = getUserAgent()
        setTimeout(() => {
          if (this.inIosApp == '' && _gAgent.isIos) {
            window.location.href = this.b612UniversalLink
          } else if (this.isAndApp == '' && _gAgent.isAndroid) {
            launchAndroid(this.b612Scheme, this.storeUrl, this.TIMEOUT)
          } else {
            window.location.href = this.storeUrl
          }
        }, 100)
      } else {
        cb()
      }
    },
    testTicker (tStep) {
      let _this = this
      let steps = this.process[tStep - 1]
      this.tryToScheme(() => {
        if (steps.state == 1) {
          // 体验贴纸
          // openCamera(function (res) {
          //   _this.process[tStep - 1].state = 2
          // }, {type: 'imageCamera', categoryId: steps.categoryId, stickerId: steps.stickerId, autoDownload: 'true'})
          setTimeout(() => {
            _this.process[tStep - 1].state = 2
          }, 0)
          window.location.href = `${this.scheme}${steps.stickerId}&${steps.categoryId}&autoDownload=true`
        } else if (steps.state == 2) {
          //  去抽取小奖
          myAjax({
            method: 'GET',
            url: `${api.getCasePrize}${tStep}`,
            complete: (xhr) => {
              var res = JSON.parse(xhr.responseText)
              if (xhr.status === 200 && res.data.length != 0) {
                _this.kjChild.prizeCode = res.data
                _hmt.push(['_trackEvent', 'child-getPrize', 'click', '小奖领取成功'])
                setTimeout(() => {
                  _this.$router.push({path: 'sub/suc', query: {step: tStep - 1}})
                }, 20)
              } else {
                _hmt.push(['_trackEvent', 'child-getPrize', 'click', '小奖领取失败'])
                setTimeout(() => {
                  _this.$router.push({path: 'sub/fail', query: {step: tStep - 1}})
                }, 20)
              }
            },
            timeout: () => {
              _hmt.push(['_trackEvent', 'child-getPrize', 'click', '请求超时'])
              _this.showToast('请求超时')
            }
          })
        } else if (steps.state == 5) {
          //  抽取大奖 待领取 - 已领取
          myAjax({
            method: 'GET',
            url: `${api.getBigPrize}`,
            complete: (xhr) => {
              console.log(xhr)
              var res = JSON.parse(xhr.responseText)
              if (xhr.status === 200 && res.data.length != 0) {
                _this.kjChild.prizeCode = res.data
                _hmt.push(['_trackEvent', 'child-getPrize', 'click', '大奖抽取成功'])
                setTimeout(() => {
                  _this.$router.push({path: 'sub/super', query: {step: tStep - 1}})
                }, 20)
              } else {
                _hmt.push(['_trackEvent', 'child-getPrize', 'click', '大奖抽取失败'])
                setTimeout(() => {
                  _this.$router.push({path: 'sub/fail', query: {step: tStep - 1}})
                }, 20)
              }
            },
            timeout: () => {
              _hmt.push(['_trackEvent', 'child-getPrize', 'click', '请求超时'])
              _this.showToast('请求超时')
            }
          })
        }
      })
    },
    img_share () {
      this.imgShare('i')
      _hmt.push(['_trackEvent', 'child-share', 'click', '首页分享'])
    },
    imgShare (arg) {
      this.tryToScheme(() => {
        var b612Bridge
        var shareImg
        let _gAgent = getUserAgent()
        if (_gAgent.isIos) {
          b612Bridge = B612Kaji.Native.ios.Function.getInstance()
        } else if (_gAgent.isAndroid) {
          b612Bridge = B612Kaji.Native.android.Function.getInstance()
        }
        if (arg) {
          shareImg = require('./img/sharea.jpg')
        } else {
          shareImg = require('./img/shareb.jpg')
        }
        let img = new Image()
        let convasDom = this.mycanva
        // img.src = 'https://b612kaji-pstatic.snowcam.cn/contents/weibo/content/1433/thumbnail-1433_1526366408617.jpg'
        img.src = shareImg
        img.onload = function () {
          let canvasCtx = convasDom.getContext('2d')
          canvasCtx.drawImage(this, 0, 0, 640, 960)
          setTimeout(() => {
            b612Bridge.shareImageWithCallback(convasDom.toDataURL('image/jpeg', 1.0), function () {}, function () {})
          }, 260)
        }
      })
    },
    showToast (val) {
      this.toastText = val
      this.toast = true
      setTimeout(() => {
        this.toast = false
      }, 800)
    },
    toHotTopic (a, b) {
      toHotTopic(a, b)
    }
  },
  computed: {
    process () {
      return this.kjChild.eventInfo.process
    },
    allTook () {
      return this.process.slice(0, 4).every((item, index, arr) => {
        return item.state >= 2
      })
    }
  },
  watch: {
    kjChild: {
      handler (newval, oldval) {
        localStoragePut('kjChild', this.kjChild)
        console.log('kjChild storage change')
      },
      deep: true
    },
    allTook () {
      if (this.allTook && this.process[4].joined == false) {
        this.process[4].state = 5
        this.process[4].joined = true
      }
    },
    setDay () {
      // 判断这一天 未参加的用户 解锁活动
      if (this.setDay > 4) {
        this.setDay = 4
      }
      if (Math.ceil(this.setDay) > 0) {
        this.process.forEach((item, index, arr) => {
          if (index < this.setDay && item.state == 0) {
            item.state = 1
          }
        })
        // this.process[this.setDay - 1].state = 1
      }
    }
  }
}
</script>

<style lang="scss">
.container{min-height: 100%;
}
.ind{

.wpr{
  position: absolute;left:0;top:0;bottom:0;width:100%;z-index:2;overflow: hidden;
}
.shareBtn{
  position: absolute;z-index:3;top:1.3rem;right:0;width:1.08rem;
  transform-origin: 100% 100%;
  animation:route 1s ease-in-out 0s infinite alternate;
}

@keyframes route{
  0%{transform: rotate(3deg);}
  100%{transform: rotate(-3deg);}
}
.lwpr{
  width:63.6%;box-sizing: border-box;position:absolute;left:4%;top:1.03rem;
  var{
    -webkit-text-size-adjust:100%;
    display:block;font-size: .2rem;color: #cc6699;line-height: .2rem;margin-left:.32rem;
  }
}
.rwpr.lwpr{
  left:auto;right:4.66%;
}

.imgs {
  text-align: center;margin-top:.15rem;font-size: 0;
  img{
    width:2.12rem;border:.04rem #ff9dcc solid;border-radius: .15rem;margin:0 .05rem;
  }
}
.prize{
  position:absolute;
  .base{
    width:2.02rem;
  }
  .thing{
    position: absolute;bottom:1.18rem;
    img{position: relative;}
  }
}
.todo{width:1.09rem;left:.31rem;
  animation:ld-bounce-px 1s ease-in-out 0s infinite alternate;
}
.towait{width:1.09rem;left:.31rem;}
.torecive{
  animation:rubber .5s linear 0s infinite alternate;
}
.toout{width:1.11rem;left:.28rem}
@keyframes rubber{
  0%{top:-.03rem;}
  100%{top:.05rem;}
}
@keyframes ld-bounce-px{
  0%,90%{animation-timing-function:linear}
  10%{animation-timing-function:cubic-bezier(0,.4,.6,1);-webkit-transform:translate(0,.05rem) scaleY(1);transform:translate(0,.05rem) scaleY(1)}
  50%{animation-timing-function:cubic-bezier(.4,0,1,.6);-webkit-transform:translate(0,-.2rem) scaleY(1);transform:translate(0,-.2rem) scaleY(1)}
  0%,to{-webkit-transform:translate(0,.14rem) scaleY(.9);transform:translate(0,.14rem) scaleY(.9)}
  90%{-webkit-transform:translate(0,.05rem) scaleY(1);transform:translate(0,.05rem) scaleY(1)}
}
.litPrize{
  position:absolute;z-index:1;
}
.step1{
  .lwpr{
    top:1.3rem;
  }
  .prize{
    right:.01rem;top:3.27rem;
  }
  .torecive{
    width: 1.29rem;left:.08rem;
  }
  .litPrize{
    width:1rem;top:.55rem;right: 1.15rem;
  }
}
.step2{
  .prize{
    right:auto;left:.29rem;top:3.1rem;
  }
  img{
    border-color: #40c5f4;
  }
  .torecive{
    width: 1.26rem;left:.1rem;
  }
  .litPrize{
    width:1.05rem;top:.32rem;left: .72rem;
  }
}
.step3{
  var{margin-left:.23rem}
  .prize{
    right:0;top:2.97rem;
  }
  .torecive{
    width: 1.26rem;left:.1rem;
  }
  .litPrize{
    width:1.05rem;top:.32rem;right: .2rem;
  }
  img{
    border-color: #ff972c;
  }
}
.step4{
  img{
    border-color: #a97bf0;
  }
  .prize{
    left:.32rem;top:3.11rem;
  }
  .litPrize{
    width:1.05rem;top:.31rem;left: .43rem;
  }
  .torecive{
    width: 1.38rem;left:.1rem;
  }
}
.step5{
  .base{
    width:3.89rem;
  }
  .prize{
    right:.74rem;top:2.42rem;
  }
  .thing{
    bottom:1.72rem;
  }
  .bigPrize{
    width:2.03rem;left:.88rem;
  }
}
}
img[data-src]{
  transition: all .3s;
  opacity: 0;
}
img[lazy=loaded]{
  opacity: 1;
}
</style>
