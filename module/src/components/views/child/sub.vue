<template>
  <div>
    <subToSuc v-if="subSuc" />
    <subToFail v-if="subFail" />
    <subToSuper v-if="subSuper" />
    <reIndex />
  </div>
</template>

<script>
// import {} from './config'
// import suc from './subSuc'
import reIndex from './subSucs/reIndex'

export default {
  components: {
    'subToSuc': resolve => resolve(require('./subSuc.vue')),
    'subToSuper': resolve => resolve(require('./subSuper.vue')),
    'subToFail': resolve => resolve(require('./subFail.vue')),
    reIndex
  },
  data () {
    return {
      subSuc: false,
      subFail: false,
      subSuper: false
    }
  },
  mounted () {
    let _route = this.$route
    console.log('route:', _route.params.state)
    if (_route.params.state == 'suc') {
      this.subSuc = true
    } else if (_route.params.state == 'super') {
      this.subSuper = true
    } else if (_route.params.state == 'fail') {
      this.subFail = true
    }
    console.log('window.scrollTo(0, 0) fa')
  }
}
</script>
