import Vue from 'vue'
import Router from 'vue-router'
import MA from '@/components/M'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'M',
      component: MA
    }
  ]
})
