<template>
  <div class="stateWpr">
    <!-- 未开始(无触发事件) -->
    <div class="prize" v-if="_proState == 0">
      <img src="./img/base.png" class="base" alt="">
      <div class="thing">
        <img src="./img/towait.png" class="towait" alt="">
      </div>
    </div>
    <!-- 去完成(去体验贴纸) -->
    <div class="prize" v-if="_proState == 1">
      <img src="./img/base.png" class="base" alt="">
      <div class="thing">
        <img src="./img/todo.png" class="todo" @click="tryTicker" alt="">
      </div>
    </div>
    <!-- 大礼包(去第二页领奖) -->
    <div class="prize" v-if="_proState == 2">
      <img src="./img/base.png" class="base" alt="">
      <div class="thing">
        <!-- <span>{{_touchStep}}</span> -->
        <img :src="require('./img/torecive' + _touchStep + '.png')" @click="tryTicker" class="torecive" alt="">
      </div>
    </div>
    <!-- 已领取(无触发事件) -->
    <div class="prize" v-if="_proState == 3">
      <img src="./img/base.png" class="base" alt="">
      <div class="thing">
        <img src="./img/toout.png" class="toout" alt="">
      </div>
    </div>
    <!-- 大奖不可参与 -->
    <div class="prize" v-if="_proState == 4">
      <img src="./img/base4.png" class="base" alt="">
      <div class="thing">
        <!-- <span>{{_touchStep}}</span> -->
        <img :src="require('./img/camera.png')" class="bigPrize" alt="">
      </div>
    </div>
    <!-- 大奖可参与 -->
    <div class="prize" v-if="_proState == 5"  @click="tryTicker">
      <img src="./img/base5.png" class="base" alt="">
      <div class="thing">
        <!-- <span>{{_touchStep}}</span> -->
        <img :src="require('./img/camera.png')" class="torecive bigPrize" alt="">
      </div>
    </div>
    <!-- 大奖已参与 -->
    <div class="prize" v-if="_proState == 6">
      <img src="./img/base6.png" class="base" alt="">
      <div class="thing">
        <!-- <span>{{_touchStep}}</span> -->
        <img :src="require('./img/camera.png')" class="bigPrize" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    proState: Number,
    touchStep: Number
  },
  data () {
    return {
      state: this.proState
    }
  },
  computed: {
    _proState () {
      return this.proState
    },
    _touchStep () {
      return this.touchStep
    }
  },
  methods: {
    tryTicker () {
      if (this.proState == 1) {
        _hmt.push(['_trackEvent', 'child-stateChange', 'click', '去完成'])
      } else if (this.proState == 2) {
        _hmt.push(['_trackEvent', 'child-stateChange', 'click', '去领奖'])
      } else if (this.proState == 5) {
        _hmt.push(['_trackEvent', 'child-stateChange', 'click', '抽大奖'])
      }
      this.$emit('toTryTicker', this.touchStep)
    }
  }
}
</script>

<style lang="scss">
.stateWpr{
  span{border:1px blue solid;}
}
</style>
