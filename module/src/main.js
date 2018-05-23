// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/child'
import VueLazyload from 'vue-lazyload'
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false
Vue.use(VueClipboard)
Vue.use(VueLazyload, {
  loading: '',
  error: '',
  preLoad: 1.2
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
