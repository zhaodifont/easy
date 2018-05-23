<template>
  <div class="subs">
    <!-- <button type="button" name="button">复制获奖码</button>
    <button type="button" name="button" @click="handshare">分享给好友</button> -->
    <div class="top p-r">
      <img src="../img/sub_banner.jpg" width="100%" alt="">
      <div class="wpr p-a">
        <div class="tip">
          <b>恭喜您</b>
          获得{{ prizeName }}
        </div>
        <div class="pcode p-a">
          <div class="pwpr p-a">
            <span>{{ copyMsg }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="cont">
      <div class="btns">
        <button type="button"
          v-clipboard:copy="copyMsg"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError" class="copy">点击复制</button>
        <button type="button" @click="handshare" class="share">分享给好友</button>
      </div>
      <div class="intro">
        <h4>活动说明</h4>
        <div>
          <em>1</em>活动时间：<br />2018年5月31日00：00-2018年6月3日23：59
        </div>
        <div>
          <em>2</em>活动分为4天进行，每天会开启新的任务等你参与。
        </div>
        <div>
          <em>3</em>用户在活动页面点击“去完成”即可参与当日活动
        </div>
        <div>
          <em>4</em>参与活动后，分享页面后再活动主页点击领取奖品，即可领取当日的豪华大礼
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
import bridge from '../bridge.js'

export default {
  data () {
    return {
      copyMsg: 'XXXXX-XXXXX',
      sucState: false,
      failState: false,
      list: ['优惠半年优惠券一张', '爱奇艺会员半年', '腾讯连连看', '网易云音乐会员3个月'],
      prizeName: ''
    }
  },
  beforeMount () {
    document.querySelector('body').style.backgroundColor = '#fff'
  },
  mounted () {
    let step = this.$route.query.step
    let old = localStorageGet('kjChild')
    this.prizeName = this.list[step - 1]
    old.eventInfo.process[step].state = 3
    localStoragePut('kjChild', old)
    this.copyMsg = old.prizeCode
  },
  methods: {
    onCopy () {
      this.sucState = true
      setTimeout(() => {
        this.sucState = false
      }, 800)
    },
    onError () {
      this.failState = true
      setTimeout(() => {
        this.failState = false
      }, 800)
    },
    handshare () {
      bridge.$emit('_handshare')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.subs{

.top{
  .wpr{left:0;top:0;bottom:0;width: 100%;}
  .tip{
    margin:auto;text-align: center;font-size: .36rem;line-height: .36rem;color:#fff;
    text-shadow: 0 0 .2rem rgba(0,177,251,.6);
    b{display: block;margin:2.06rem auto .24rem;font-size: .82rem;line-height: .82rem;}
  }
  .pcode{
    width:5.68rem;height:1.88rem;bottom:-.15rem;left:50%;transform: translate3d(-50%, 0, 0);
    background:linear-gradient(135deg, #85dcfc 25%,#fff5a4 0,#fff5a4 50%,#85dcfc 0,#85dcfc 75%,#fff5a4 0);
    background-size: .46rem .46rem;border-radius: .2rem;
    box-shadow: 0 .08rem .25rem 0 rgba(49,49,49,.15);
  }
  .pwpr{
    left:.14rem;top:.14rem;bottom:.14rem;right:.14rem;background-color: #fff;border-radius: .2rem;
    display: flex;align-items: center;justify-content: center;font-size: .26rem;color: #333;
  }
}
.btns{
  font-size: 0;text-align: center;margin-top:.95rem;
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
.cont{
  background:linear-gradient(#fffedd,#fff);overflow: hidden;
}
.intro{
  width: 80%;margin:auto;padding-top: .82rem;font-weight: 340;
  background: url('../img/sub_stars.png') center .48rem no-repeat;
  background-size: 4.6rem auto;
  font-size: .24rem;line-height: .32rem;color:#a2884f;padding-bottom: 3em;
  &>div{
    margin-top:.1rem;box-sizing: border-box;padding-left: .44rem;position:relative;
  }
  em{
    position: absolute;left:0;display: block;width: .3rem;height: .3rem;font-size: .26rem;color: #fff;
    background-color: #a2884f;border-radius: 50%;text-align: center;line-height: .3rem;
  }
  h4{
    text-align: center;color:#a2884f;font-size: .34rem;
  }
}
.toast{
  position: fixed;z-index: 55;background-color: rgba(0,0,0,.5);font-size: .24rem;letter-spacing: .02rem;
  left:50%;top:50%;color:#fff;padding:.2rem .3rem;transform: translate3d(-50%,-50%,0);border-radius: .4rem;
}

}
</style>
