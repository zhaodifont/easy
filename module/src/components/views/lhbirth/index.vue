<template>
  <div class= "container p-r" style="opacity:1">
    <div id="wpr">
      <img src="./img/pic1.jpg?v=1723" width="100%" alt="">
      <img src="./img/pic2.jpg" width="100%" alt="">
    </div>
    <div class="btn_wpr">
      <a id="toJoin" href="javascript:void(0)" @touchend="openKaji"><img src="./img/arr-l.png" alt="">点击拍照<img src="./img/arr-r.png" alt=""></a>
    </div>
  </div>
</template>

<script>
import {cfg, cfgInit} from './config'

export default {
  name: 'lhbirth',
  data () {
    return {
      TIMEOUT: cfg.TIMEOUT,
      storeUrl: cfg.storeUrl,
      b612HomePage: cfg.b612HomePage,
      contentPath: cfg.contentPath,
      b612Scheme: cfg.b612Scheme,
      b612UniversalLink: cfg.b612UniversalLink
    }
  },
  mounted () {
    cfgInit()
  },
  methods: {
    openKaji () {
      console.log(this.b612Scheme)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.container{min-height: 100%;}
.btn_wpr{position: absolute;bottom:4.14rem;width:100%;box-sizing: border-box;}
.btn_wpr a{width:40.2%;display: block;margin:auto;line-height:.82rem;text-align: center;border:1px #fff solid;font-size: .34rem;color:#fff;}
.btn_wpr img{width:.36rem;vertical-align: sub;margin:0 .12rem;position:relative;top:-.02rem;position:relative;}
.btn_wpr a img:nth-child(1){
          animation:l_run .6s ease-in 0s infinite alternate;
}
.btn_wpr a img:nth-child(2){
          animation:r_run .6s ease-in 0s infinite alternate;
}
@keyframes l_run {
  0%{
    left:0;
    opacity:0.4;
  }
  100%{
    left:-.1rem;
    opacity:1;
  }
}
@keyframes r_run {
  0%{
    left:0;
    opacity:0.4;
  }
  100%{
    left:.1rem;
    opacity:1;
  }
}
.container{transition: all .5s;-webkit-transition: all .5s;min-height: 100%;
  width:100%;max-width: 750px;margin:auto;}
</style>
