<template>
  <transition :name="transitionName">
    <router-view class="child-view" />
  </transition>
  <!-- <pageView /> -->
</template>

<script>
// import pageView from '@/components/views/zhaomu/index'

export default {
  name: 'App',
  // components: {
  //   pageView
  // }
  data () {
    return {
      transitionName: ''
    }
  },
  watch: {
    '$route' (to, from) {
      console.log('meta.index', to)
      if (to.path == '/') {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
    }
  }
}
</script>

<style lang="scss">
@import './assets/base.css';

body {
  -webkit-tap-highlight-color: rgba(0,0,0,0);margin:0 auto;
  font-size: .24rem;color:#999;line-height:.24rem;-webkit-touch-callout:none;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  background-color:#fff;
}
html,body{
  width:100%;height: 100%;
}
.child-view {
  transition: all .3s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
}
.slide-left-leave-active, .slide-right-enter{
  opacity: 0;
}
</style>
