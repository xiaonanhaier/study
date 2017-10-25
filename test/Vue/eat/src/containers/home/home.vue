<template>
  <div id="app">
    <div class="header">
      <v-header></v-header>
    </div>
    <div class="tab">
      <div class="tab-item">
         <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import {header} from '../../components'
  export default {
    name: 'home',
    components: {
      'v-header': header
    }
  }
</script>

<style>
.tab {
  display: flex;
  height: 40px;
  line-height: 40px;
}
.tab-item{
  flex: 1;
  font-size: 14px;
  text-align: center;
  color: rgb(77,85,93)
}
</style>
