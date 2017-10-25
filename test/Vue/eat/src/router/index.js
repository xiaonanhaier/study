import Vue from 'vue'
import Router from 'vue-router'
import home from '@/containers/home/home'
import {goods, ratings, seller} from '@/components'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      children: [
        {
          path: 'goods',
          component: goods
        },
        {
          path: 'seller',
          component: seller
        },
        {
          path: 'ratings',
          component: ratings
        }
      ]
    }
  ]
})
