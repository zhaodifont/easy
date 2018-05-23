<template>
  <div class="subs">
    <!-- <button type="button" name="button">复制获奖码</button>
    <button type="button" name="button" @click="handshare">分享给好友</button> -->
    <div class="top p-r" :style="{height:fullScreen}">
      <img :src="require('./img/subsucimg' + imgIndex + '.jpg')" width="100%" alt="">
      <div class="wpr p-a">
        <div class="pcode p-a">
          <span>{{ copyMsg }}</span>
        </div>
      </div>
    </div>
    <div class="cont">
      <div class="wpr p-r">
        <img :src="require('./img/subsucimg' + imgIndex + 'a.jpg')" width="100%" alt="">
        <div class="btns">
          <button type="button"
            v-clipboard:copy="copyMsg"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError" class="copy">点击复制</button>
          <button type="button" @click="handshare" class="share">分享给好友</button>
        </div>
      </div>
    </div>
      <div class="toast" v-show="sucState || failState">
        <span v-show='sucState'>复制成功</span>
        <span v-show='failState'>复制失败, 请手动长按复制</span>
      </div>
  </div>
</template>

<script>
// import {} from './config'
import {localStoragePut, localStorageGet} from '@/utils/utils'
import bridge from './bridge.js'

export default {
  data () {
    return {
      copyMsg: 'XXXXX-XXXXX',
      sucState: false,
      failState: false,
      imgIndex: 0,
      fullScreen: '7.29rem'
    }
  },
  beforeMount () {
    document.querySelector('body').style.backgroundColor = '#fff'
    let _route = this.$route
    this.imgIndex = parseInt(_route.query.step) + 1
  },
  mounted () {
    console.log('window.scrollTo(0, 0) son')
    window.scrollTo(0, 0)
    this.fullScreen = 'auto'
    let step = this.$route.query.step
    let old = localStorageGet('kjChild')
    old.eventInfo.process[step].state = 3
    localStoragePut('kjChild', old)
    this.copyMsg = old.prizeCode
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 200)

    _hmt.push(['_trackEvent', 'child-pv', 'onload', '小奖成功页'])
  },
  methods: {
    onCopy () {
      this.sucState = true
      setTimeout(() => {
        this.sucState = false
      }, 800)
      _hmt.push(['_trackEvent', 'child-copy', 'click', '复制成功'])
    },
    onError () {
      this.failState = true
      setTimeout(() => {
        this.failState = false
      }, 800)
      _hmt.push(['_trackEvent', 'child-copy', 'click', '复制失败'])
    },
    handshare () {
      bridge.$emit('_handshare')
      _hmt.push(['_trackEvent', 'child-share', 'click', '成功页分享'])
    }
  },
  beforeDestroy () {
    bridge.$off('_handshare')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.subs{

.top{
  .wpr{
    left:0;top:0;bottom:0;width: 100%;
  }
  .pcode{
    width:5.68rem;bottom:.82rem;left:50%;transform: translate3d(-50%, 0, 0);font-size: .26rem;color: #333;
    text-align: center;
  }
}
.btns{
  font-size: 0;text-align: center;margin-top:.95rem;position: absolute;top:0;left:0;width: 100%;
  button{border:none;background: none;width: 2.8rem;height:.9rem;
    font-size: .4rem;border-radius:2rem;margin:0 .12rem;font-weight: bold;font-family:inherit;
  };
}
.btns .copy{
  background:linear-gradient(#ffcf4f,#fe9a36);color:#e76d06;
}
.btns .share{
  background:linear-gradient(#ace9ff,#58d3ff);color:#0b96c8;
}
.toast{
  position: fixed;z-index: 55;background-color: rgba(0,0,0,.5);font-size: .24rem;letter-spacing: .02rem;
  left:50%;top:50%;color:#fff;padding:.2rem .3rem;transform: translate3d(-50%,-50%,0);border-radius: .4rem;
}

}
</style>
