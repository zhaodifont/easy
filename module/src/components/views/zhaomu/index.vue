<template>
  <div class="container p-r">
    <div :class="{blur:masklayer}">

    <img src="./img/banner.jpg" width="100%" class="banner" alt="">
    <div class="artical">
      <img src="./img/banner_s.jpg" class="banner-s"  alt="">
      <p>
        <img src="./img/start_y.png" class="before" alt="">
        B612咔叽招募社群用户啦！我们邀请可爱的你加入B612咔叽社群，和小伙伴们一起上热门！准确填写微博昵称和QQ号，通过审核的小可爱，10个工作日内会收到小咔的QQ添加请求哦。
        <img src="./img/start_y.png" class="after" alt="">
      </p>
      <div class="form">
        <h4>申请传送门</h4>
        <input type="text" placeholder="微博昵称" v-model.trim="weboName" name="" value="">
        <input type="number" placeholder="QQ号" v-model.trim="qq" @input="testlength" name="" value="">
      </div>
    </div>
    <div class="tip">
      ※QQ号是通知您获得星球着陆资格的唯一方式，请慎重填写
    </div>
    <div class="sub">
      <img src="./img/start_p.png" class="before" alt="">
      <img src="./img/sub_i.jpg" width="100%" alt="">
      <button type="button" @click="handsubmit">提 交</button>
      <img src="./img/start_p.png" class="after" alt="">
    </div>

  </div>
    <transition name="slide-fade">
      <div class="masklayer" @click="handsure" v-show="masklayer">
        <div class="wpr" @click.stop.prevent>
          <img src="./img/start_f.jpg" class="start_f p-a" alt="">
          <img src="./img/start_m1.png" class="start_m1 p-a" alt="">
          <img src="./img/start_m2.png" class="start_m2 p-a" alt="">
          <p>小咔已收到您的申请！<br/>请耐心等待 (๑•ᴗ•๑)&nbsp;&nbsp;
          </p>
          <div class="btn">
            <button type="button" @click="handcomplete">确 定</button>
          </div>
        </div>
      </div>
    </transition>
    <transition  name="fade-time">
      <div class="errMsk" v-show="errMsk">
        <!-- 微博昵称或QQ号不能为空 -->
        {{errMsg}}
      </div>
    </transition>
  </div>

</template>

<script>

export default {
  name: 'recruit',
  data () {
    return {
      masklayer: false,
      errMsk: false,
      errMsg: '',
      weboName: '',
      qq: ''
    }
  },
  mounted () {
  },
  methods: {
    testlength () {
      if (this.qq.length > 15) {
        this.qq = this.qq.slice(0, 15)
      }
    },
    handsure () {
      this.masklayer = false
    },
    handcomplete () {
      this.masklayer = false
      window.location.href = 'http://b612.snowcam.cn/event/weibo_index'
    },
    alertErr (msg) {
      this.errMsg = msg
      this.errMsk = true
      setTimeout(() => {
        this.errMsk = false
      }, 800)
    },
    handsubmit () {
      let _this = this
      if (this.weboName.length === 0 || this.qq.length === 0) {
        this.alertErr('微博昵称和QQ号不能为空')
        return false
      }

      var xhr = new XMLHttpRequest()
      var requestDone = false
      xhr.open('POST', 'https://bird.ioliu.cn/v2?url=http://47.95.45.89/h5EventApi/addUserInfo', true)
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.send(JSON.stringify({wbName: this.weboName, qq: this.qq}))
      setTimeout(() => { requestDone = true }, 2000)
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && !requestDone) {
          if (xhr.status == 200) {
            console.log(xhr.responseText)
            var res = JSON.parse(xhr.responseText)
            if (res.hasOwnProperty('errno')) {
              if (res.errno === 1062) {
                _this.alertErr('微博昵称和QQ号已经存在')
              } else {
                _this.alertErr('服务器端错误')
              }
              return false
            }
            _this.masklayer = true
            _hmt.push(['_trackEvent', '注册', 'click', 'recruit-Submit'])
          } else {
            console.log('失败了')
          }
        } else if (xhr.readyState != 4 && requestDone) {
          _this.alertErr('请求超时')
        }
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
button{border:none;}
.container{min-height: 100%;background-color: #ffdfee;font-family:'Simhei', sans-serif;font-weight: 340;}
.blur{
  filter:blur(3px)
}
.artical{
  border:.04rem #c9b2d6 solid;border-radius: .2rem;margin:0 .4rem;position: relative;box-sizing:border-box;
  background-color:#fff;padding:0 .29rem;
  p{
    color:#a18cb1;font-size: .26rem;margin:1.44rem 0 0;border-radius: .2rem;background-color: #fbf5ff;line-height: .38rem;padding:.18rem .26rem;text-indent: 2em;
    position: relative;
    .before{
      width:.32rem;position: absolute;left:.23rem;top:-.16rem;
    }
    .after{
      width:.52rem;position: absolute;right:.52rem;bottom:-.25rem;
    }
  }
}
.form{
  border-top:.04rem dotted #fbf5ff;margin-top:.32rem;overflow: hidden;
  h4{
    font-weight: bold;line-height: .72rem;text-align: center;color:#a688b7;letter-spacing: .02rem;font-size: .32rem;
  }
  input{
    display: block;width:100%;border:none;background-color: #fbf5ff;border-radius: .2rem;line-height: .4rem;font-size: .3rem;box-sizing: border-box;padding:.2rem .26rem;
    color:#666;font-family: inherit;font-weight: inherit;
  }
  input:nth-last-child(1){
    margin:.12rem 0 .29rem;
  }
  ::-webkit-input-placeholder{ position: relative; color:#c9b2d6;}
}
.banner-s{
  width:5rem;position: absolute;left:50%;transform: translate3d(-50%,0,0);top:-.04rem;
}
.tip{
  color:#a18cb1;text-align: center;margin:.2rem 0 .42rem;
}
.sub{
  background-color: #cafff5;position: relative;padding-bottom: .85rem;
  .before{
    width:.58rem;position: absolute;top:-.12rem;right:.77rem;
  }
  .after{
    width:.35rem;position: absolute;bottom:.85rem;left:1.11rem;transform: rotateZ(45deg);
  }
  button{
    width:3rem;line-height: .8rem;background-color: #c2a3d3;display: block;border-radius: 6rem;display:block;margin:.26rem auto .1rem;
    font-weight: bold;font-size: .4rem;color: #fff;
  }
}
.masklayer{
  filter:blur(0);
  position: fixed;background:rgba(0,0,0,.5);top:0;bottom:0;width:100%;
  .wpr{
    width:67.77%;padding:0 .28rem;text-align: center;background-color: #fff;position:absolute;left:50%;top:50%;transform: translate3d(-50%,-60%,0);border-radius: .2rem;box-sizing: border-box;
    // border:.04rem #c9b2d6 solid;
    box-shadow:0 0 0 .04rem #c9b2d6;
  }
  p{
    font-size: .3rem;color:#a18cb1;line-height: .38rem;margin:.54rem 0 .49rem;
  }
  .btn{
    border-top:.04rem dotted #fbf5ff;
  }
  button{
    width:2.13rem;line-height: .68rem;background-color: #c2a3d3;display: block;border-radius: 6rem;display:block;margin:.23rem auto .25rem;
    font-weight: bold;font-size: .3rem;color: #fff;
  }
  .start_f{
    width:.19rem;left:.61rem;bottom:.23rem;
  }
  .start_m1{
    width:.57rem;left:-.26rem;bottom:.39rem;
  }
  .start_m2{
    width:1.24rem;top:-.42rem;right:-.23rem;
  }
}
.slide-fade-enter-active, .fade-time-enter-active{
  transition: all .1s linear;
}
.slide-fade-leave-active, .fade-time-leave-active {
  transition: all .1s linear;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: scale(1.05);
  opacity: 0;
}

.fade-time-enter, .fade-time-leave-to{
  opacity: 0;
}
.errMsk{
  position: fixed;z-index: 55;background-color: rgba(0,0,0,.5);font-size: .24rem;letter-spacing: .02rem;
  left:50%;top:50%;color:#fff;padding:.2rem .3rem;transform: translate3d(-50%,-50%,0);border-radius: .4rem;
}

</style>
