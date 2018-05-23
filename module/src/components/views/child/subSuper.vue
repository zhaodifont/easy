<template>
  <div class="super">
    <div class="top p-r">
      <img src="./img/subbg1.jpg" width="100%" :style="{height:fullScreen}" alt="">
      <div class="wpr p-a">
        <div class="tip">
          <h4>恭喜萌主</h4>
          <small>抽中“拍立得”一台！</small>
          <img src="./img/camera.png" class="camera" alt="">
        </div>
      </div>
    </div>
    <div class="cont p-r">
      <img src="./img/subbg2.jpg" width="100%" alt="">
      <div class="wpr p-a">
        <div class='li'>
          <span>姓&nbsp;&nbsp;名</span><input type="text" v-model.trim="name" style="width:4.78rem" value="">
        </div>
        <div class='li'>
          <span>电&nbsp;&nbsp;话</span><input type="text" v-model.trim.number="tel" style="width:4.78rem" value="">
        </div>
        <div class='li'>
          <span style="width:1.35rem">收货地址</span><input v-model.trim="addr" type="text" name="" style="width:4.42rem" value="">
        </div>
        <div class="sIntro">
          ※ 请于今日在本页面填写收货信息，咔叽的小伙伴会尽快和您联络。<br />
          ※ 海外及港澳台地区暂时不支持邮寄。
        </div>
      </div>
    </div>
    <div class="submit p-r">
      <img v-lazy="require('./img/subbg3.jpg')" data-url="./img/subbg3.jpg" width="100%" alt="">
      <div class="wpr p-a">
        <button type="button" name="button" @click="handSubmit">提 交</button>
      </div>
    </div>
    <div class="toast" v-show="toast">
      {{toastText}}
    </div>
  </div>
</template>

<script>
import {api} from './config'
import {localStoragePut, localStorageGet} from '@/utils/utils'
// import bridge from './bridge.js'

export default {
  data () {
    return {
      fullScreen: '6rem',
      toast: false,
      toastText: '',
      name: '',
      tel: '',
      addr: '',
      prizeCode: ''
    }
  },
  beforeMount () {
    document.querySelector('body').style.backgroundColor = '#fffced'
  },
  mounted () {
    this.fullScreen = 'auto'
    let step = this.$route.query.step
    let old = localStorageGet('kjChild')
    let oldthisStep = old.eventInfo.process[step]
    // console.log(step, oldthisStep.state)
    this.prizeCode = old.prizeCode
    // this.prizeName = this.list[step - 1]
    if (step + 1 == 5 && oldthisStep.state == 5) {
      oldthisStep.state = 6
      oldthisStep.joined = true
    }
    setTimeout(() => {
      localStoragePut('kjChild', old)
      window.scrollTo(0, 0)
    }, 100)
    // this.copyMsg = old.prizeCode
    _hmt.push(['_trackEvent', 'child-pv', 'onload', '大奖领取页'])
  },
  methods: {
    toIndex () {
      this.$router.push({name: 'index'})
    },
    handSubmit () {
      let tel = this.tel
      let _this = this
      // console.log(this.name.length != 0, this.name.length > 2)
      if (this.name.length != 0 && this.name.length > 20) {
        this.showToast('用户名长度不能大于20')
        return
      } if (tel.length == 0) {
        this.showToast('电话号码不能为空')
      } else if (tel.toString().length !== 11 || !Number.isInteger(tel) || !/^1[3|4|5|7|8]\d{9}$/.test(tel)) {
        this.showToast('电话号码格式不正确')
      } else {
        var xhr = new XMLHttpRequest()
        var requestDone = false
        setTimeout(() => {
          requestDone = true
        }, 3000)
        xhr.open('POST', api.confirmPrize, true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(
          {
            awardNo: _this.prizeCode,
            userMobile: _this.tel,
            userAddress: this.addr,
            userName: this.name
          }
        ))
        xhr.onreadystatechange = () => {
          if (xhr.readyState == 4 && !requestDone) {
            var res = JSON.parse(xhr.responseText)
            console.log(xhr)
            if (xhr.status === 200 && res.data) {
              _this.showToast('提交成功')
              _hmt.push(['_trackEvent', 'child-getPrize', 'click', '资料提交成功'])
            } else {
              _this.showToast('提交失败')
              _hmt.push(['_trackEvent', 'child-getPrize', 'click', '资料提交失败'])
            }
          } else if (xhr.readyState != 4 && requestDone) {
            _hmt.push(['_trackEvent', 'child-getPrize', 'click', '请求超时'])
            _this.showToast('请求超时')
          }
        }
      }
    },
    showToast (val) {
      this.toastText = val
      this.toast = true
      setTimeout(() => {
        this.toast = false
      }, 800)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.super{
  .top{
    .wpr{left:0;top:0;bottom:0;width: 100%;}
    .rstar{
      left:.13rem;top:.21rem;width: 1.19rem;z-index:6;
    }
  }
  .tip{
    color:#fff;text-align: center;margin-top: 1.26rem;
    h4{font-size: .82rem;line-height: .82rem;margin-bottom:.21rem;}
    small{
      font-size: .46rem;line-height: .46rem;
    }
    .camera{
      width: 2.48rem;display: block;margin:.45rem auto 0;
    }
  }
  .cont{
    .wpr{left:0;top:0;bottom:0;width: 100%;padding-top:.04rem;}
    input{border:none;height:70%;z-index: 2;font-size: .24rem;box-sizing: border-box;color:#ab7d50;padding:0 .8em;background:none;}
    .li{
      width:6rem;height: .76rem;border-radius: .16rem;background-color: #fdf9af;
      margin:.24rem auto 0;box-shadow: 0 0 .1rem rgba(255,225,83,.3) inset;position: relative;
      display: flex;align-items: center;justify-content: flex-start;
      span{
        padding: 0 0 0 .24rem;width:1.04rem;font-size: .26rem;color: #f5ad39;box-sizing: border-box;
        white-space:nowrap;
      }
      &:before{
        content:'';display: block;position: absolute;left:0;bottom: 0;top:0;width: 100%;z-index: 1;
        box-shadow: 0 0 .1rem 0 rgba(241,213,220,.2);border-radius: .16rem;
      }
    }
    .li:nth-last-child(1) span{
      width:1.36rem;
    }
    .sIntro{
      width:6rem;margin:.28rem auto 0;font-size: .24rem;color: #d1b495;line-height: .34rem;font-weight: 340;
    }
  }
  .toast{
    position: fixed;z-index: 55;background-color: rgba(0,0,0,.5);font-size: .24rem;letter-spacing: .02rem;
    left:50%;top:50%;color:#fff;padding:.2rem .3rem;transform: translate3d(-50%,-50%,0);border-radius: .4rem;
  }
  .submit{
    .wpr{left:0;top:0;bottom:0;width: 100%;}
    button{
      display: block;margin:.39rem auto 0;background: none;border:none;
      width: 3.4rem;height:.9rem;font-size: .4rem;color: #e76d06;
      background:linear-gradient(top,#ffcf4f,#fe9a36);border-radius: 2rem;
      background:-webkit-linear-gradient(top,#ffcf4f,#fe9a36);border-radius: 2rem;
    }
  }
}
</style>
