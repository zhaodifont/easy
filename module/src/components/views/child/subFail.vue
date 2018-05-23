<template>
  <div class="subf">
    <!-- <button type="button" name="button">复制获奖码</button>
    <button type="button" name="button" @click="handshare">分享给好友</button> -->
    <div class="top p-r">
      <img src="./img/subfailbanner.jpg" width="100%" :style="{height:fullScreen}" alt="">
      <div class="wpr p-a">
        <div class="tip">
          <b>很遗憾</b>
          很遗憾，您本次参与并未中奖
        </div>
        <!-- <div class="pcode p-a">
          <div class="pwpr p-a">
            <span>123</span>
          </div>
        </div> -->
      </div>
    </div>
    <div class="cont">
      <div class="intro">
        <div class="btns">
          <button type="button" @click="handshare" class="share">分享给好友</button>
        </div>
        <div>
          <em>1</em>活动时间：<br />2018年5月31日00：00-2018年6月3日23：59
        </div>
        <div>
          <em>2</em>活动分为4天进行，每天会开启新的任务等你参与。
        </div>
        <div>
          <em>3</em>用户在本页面点击”去完成“按钮，拍摄并分享，即可参与当日抽奖。
        </div>
        <div>
          <em>4</em>参与后，再次进入本页面，即可看到领取当日礼物的按钮。
        </div>
        <div>
          <em>5</em>此次活动仅限B612咔叽APP站内参与，其他途径均无法参与本次活动。
        </div>
        <div>
          <em>6</em>在法律规定范围内，本活动解释权归B612咔叽所有。
        </div>
      </div>
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
      fullScreen: '7rem',
      sucState: false,
      failState: false,
      prizeName: ''
    }
  },
  beforeMount () {
    document.querySelector('body').style.backgroundColor = '#fff'
  },
  mounted () {
    this.fullScreen = 'auto'
    let step = this.$route.query.step
    let old = localStorageGet('kjChild')
    console.log('old:', old.eventInfo.process[step].state == 5)
    if (old.eventInfo.process[step].state == 2 || old.eventInfo.process[step].state == 5) {
      if (old.eventInfo.process[step].hasOwnProperty('joined')) {
        old.eventInfo.process[step].joined = true
      }
      ++old.eventInfo.process[step].state
    }
    localStoragePut('kjChild', old)
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 200)
    _hmt.push(['_trackEvent', 'child-pv', 'onload', '失败页'])
  },
  methods: {
    handshare () {
      bridge.$emit('_handshare', 1)
      _hmt.push(['_trackEvent', 'child-share', 'click', '失败页分享'])
    }
  },
  beforeDestroy () {
    bridge.$off('_handshare')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.subf{
.top{
  .wpr{left:0;top:0;bottom:0;width: 100%;}
  .tip{
    margin:auto;text-align: center;font-size: .34rem;line-height: .36rem;color:#fff;
    text-shadow: 0 0 .2rem rgba(0,177,251,.6);
    b{display: block;margin:2.06rem auto .24rem;font-size: .82rem;line-height: .82rem;}
  }
}
.btns{
  font-size: 0;text-align: center;
  button{border:none;background: none;width: 2.8rem;height:.9rem;
    font-size: .4rem;border-radius:2rem;margin:0 .12rem;font-weight: bold;font-family:inherit;
  };
}
.btns .share{
  background:linear-gradient(#ffcf4f,#fe9a36);color:#e76d06;
  box-shadow: 0 0 .15rem 0 rgba(153, 104, 9, .3);
}
.cont{
  background:linear-gradient(#fffedd,#fff);overflow: hidden;
}
.intro{
  width: 80%;margin:auto;font-weight: 340;overflow: hidden;
  background: url('./img/sub_stars.png') center 0.06rem no-repeat;
  background-size: 6.06rem auto;
  font-size: .232rem;line-height: .32rem;color:#a2884f;padding-bottom: 3em;
  &>div{
    margin-top:.1rem;box-sizing: border-box;padding-left: .44rem;position:relative;
  }
  &>div.btns{
    margin:.38rem 0 .58rem;
  }
  em{
    position: absolute;left:0;display: block;width: .3rem;height: .3rem;font-size: .26rem;color: #fff;
    background-color: #a2884f;border-radius: 50%;text-align: center;line-height: .3rem;
  }
  h4{
    text-align: center;color:#a2884f;font-size: .34rem;
  }
}

}
</style>
