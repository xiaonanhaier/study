import Vue from 'vue'
import Router from 'vue-router'
import home from '@/containers/home/home'
import list from '@/containers/list/list'
import VueResource from 'vue-resource'
import {goods, ratings, seller} from '@/components'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      redirect: '/goods',
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
    },
    {
      path: '/list',
      name: 'list',
      component: list
    }
  ]
})
