import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/views/child/index'
import Sub from '@/components/views/child/sub'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/sub/:state',
      name: 'sub',
      component: Sub
      // component: resolve => require(['@/components/views/child/sub'], resolve)
      // component: r => require.ensure([], () => r(require('@/components/views/child/sub')), 'sub')
    }
  ]
})
