import Vue from 'vue'
import Router from 'vue-router'
import footer from '@/components/footer'
import headernav from '@/components/headernav'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: App
    },
    {
      path: '/footer',
      name: 'footer',
      component: footer
    },
    {
      path: '/headernav',
      name:'headernav',
      component:headernav
    }
  ]
})
