<template>
  <div class= "container p-r" style="opacity:1">
    <!-- android:{{justAnd}}==inAndApp:{{inAndApp}}==<br/>
    <br/>
    isIos:{{isIos}}==inIosApp{{inIosApp}}==appInfo:{{appInfo}} -->
      <img :src="require('./img/pic1.jpg')" style="height:6.8rem" ref="pic1" @load="cancelH('pic1')"  width="100%" alt="">
      <div class="p-r picWpr">
        <img :src="require('./img/pic2.jpg')" style="height:6.96rem" ref="pic2" @load="cancelH('pic2')" width="100%" alt="">
        <div class="wpr p-a picWpr1">
          <img  :src="require('./img/camBtn_press.png')" v-show="pressStatu" @click="handEnd" alt="">
          <img  :src="require('./img/camBtn.png')" v-show="normalStatu" @click="handEnd" alt="">
          <img  :src="require('./img/moreBtn.jpg')" @click="getMore"  alt="">
          <div class="arr_d p-a">
            <div class="arr_dan">
              <img  v-lazy="require('./img/arr_d.png')" width="100%"  alt="">
              <img  v-lazy="require('./img/arr_d.png')" style="margin-top:-.12rem" width="100%"  alt="">
            </div>
          </div>
        </div>
      </div>
    <div class="p-r picWpr">
      <img src='./img/gif1.jpg' width="100%" alt="">
      <div class="wpr p-a">
        <div class="gifWpr" @click="toWbCont(1255)" style="margin-left:.97rem;">
          <img v-lazy="require('./img/1255.gif')" style="width:100%" alt="">
        </div>
      </div>
    </div>

    <div class="p-r picWpr">
      <img v-lazy="require('./img/gif2.jpg')" width="100%" alt="">
      <div class="wpr p-a">
        <div class="gifWpr f-r" @click="toWbCont(1248)" style="margin-right:.87rem;">
          <img v-lazy="require('./img/1248.gif')" style="width:100%" alt="">
        </div>
      </div>
    </div>

    <div class="p-r picWpr">
      <img v-lazy="require('./img/gif3.jpg')" width="100%" alt="">
      <div class="wpr p-a">
        <div class="gifWpr" @click="toWbCont(1253)" style="margin-left:.97rem;">
          <img v-lazy="require('./img/1253.gif')" class="p-r" style="width:100%;top:-1rem" alt="">
        </div>
      </div>
    </div>

    <div class="p-r picWpr">
      <img v-lazy="require('./img/gif4.jpg')" width="100%" alt="">
      <div class="wpr p-a botWpr">
        <div class="gifWpr f-r" @click="toWbCont(1249)" style="margin-right:.87rem;">
          <img v-lazy="require('./img/1249.gif')" class="p-r" style="width:100%;top:-1rem" alt="">
        </div>
        <img  :src="require('./img/camBtn_press.png')" v-show="pressStatu" @click="handEnd" alt="">
        <img  :src="require('./img/camBtn.png')" v-show="normalStatu" @click="handEnd" alt="">
      </div>
    </div>

  </div>
</template>

<script>
import {cfg, cfgInit} from './config'
import {getUserAgent, launchAndroid} from '@/utils/utils'

export default {
  name: 'animoji',
  data () {
    return {
      ...cfg,
      camBtnSty: {
        src: require('./img/camBtn.png')
      },
      pressStatu: false,
      normalStatu: true,
      justAnd: '0',
      inAndApp: '0',
      isIos: '0',
      inIosApp: '0',
      appInfo: '0',
      fullScreen: '13.76rem'
    }
  },
  mounted () {
    cfgInit()
    this.fullScreen = 'auto'
    setInterval(() => {
      this.pressStatu = true
      this.normalStatu = false
      setTimeout(() => {
        this.pressStatu = false
        this.normalStatu = true
      }, 250)
    }, 500)
  },
  methods: {
    cancelH (ref) {
        this.$refs[ref].removeAttribute('style')
    },
    getMore () {
      window.location.href = 'http://b612.snowcam.cn/event/weibo_index'
      // window.location.href = 'https://qa-b612.snowcam.cn/event/weibo_index/'
    },
    toWbCont (contId) {
      let appType = ''
      let _gAgent = getUserAgent()
      if (_gAgent.isAndroid) {
        appType = 'Android'
      } else if (_gAgent.isIos) {
        appType = 'IOS'
      } else {
        appType = 'Others'
      }

      window.location.href = `http://b612.snowcam.cn/event/weibo_topic/250/content/${contId}?appVersion=0.0.0&appType=${appType}`
      // window.location.href = `https://qa-b612.snowcam.cn/event/weibo_topic/256/content/${contId}?appVersion=0.0.0&appType=${appType}`
    },
    handStart () {
    },
    handEnd () {
      let _gAgent = getUserAgent()

      setTimeout(() => {
        let b612Bridge = B612Kaji.Native.Interface.getInstance()
        let inAndApp = _gAgent.isAndroid?!!(window.B612KajiBridgeInterface):false
        _gAgent.isIos && b612Bridge.api.appInfo(res => {
          this.appInfo = res
          window.location.href = this.b612Scheme
          this.inIosApp = 'ok'
          return false
        })
        this.justAnd = _gAgent.isAndroid
        this.isIos = _gAgent.isIos

        if (inAndApp) {
          window.location.href = this.b612Scheme
          return false
        } else if (_gAgent.isIos) {
          window.location.href = this.b612UniversalLink
        } else if (_gAgent.isAndroid) {
          this.inAndApp = 'ok'
          launchAndroid(this.b612Scheme, this.storeUrl, this.TIMEOUT)
        } else {
          window.location.href = this.storeUrl
        }
      }, 100)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.container{
  min-height: 100%;
}

.picWpr .wpr{
  width:100%;top:0;box-sizing: border-box;
  img{display: block;margin:auto;position:relative;z-index: 55}
}
.gifWpr{width:3.4rem;height:4.5rem;background-color: #dbedfc;border-radius: .08rem;overflow:hidden;
box-shadow: 0 0 0 .03rem #6699ff;
}
.picWpr1{
  bottom:0;
  &>img:nth-child(1),&>img:nth-child(2){
   position:absolute;width:2.94rem;top:2.12rem;left:50%;transform:translate(-50%,0);-webkit-transform:translate(-50%,0)
 }
 &>img:nth-child(3){
    width:4.21rem;transform:translate(.2rem,4.6rem);-webkit-transform:translate(.2rem,4.6rem)
  }
}

.arr_d{
  width:.66rem;bottom:.42rem;left:50%;transform:translate(-50%,0);-webkit-transform:translate(-50%,0)
}
.arr_dan{
  animation:r_run .4s ease-in 0s infinite alternate;
  -webkit-animation:r_run .4s ease-in 0s infinite alternate;position:relative;
}
@keyframes r_run{
  0%{top:-.04rem;}
  100%{top:.04rem;}
}
@-webkit-keyframes r_run{
  0%{top:-.04rem;}
  100%{top:.04rem;}
}
.picWpr .botWpr{
  bottom:0;
  & > img{
     position:absolute;width:2.94rem;top:5.7rem;left:50%;transform:translate(-50%,0);-webkit-transform:translate(-50%,0)
   }
}

</style>
