<template>
  <div id="app">
    <div class="header">
      <v-header :seller="seller"></v-header>
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

<script >
  import {header} from '../../components'
  export default {
    name: 'home',
    data() {
      return {
        seller: {}
      }
    },
    created() {
      this.$http.get('/api/seller').then((response) => {
        if (response.data.errno === 0) {
          this.seller = response.data.data
        }
      })
    },
    components: {
      'v-header': header
    }
  }
</script>

<style>
.tab {
  display: flex;
  height: 0.8rem;
  line-height: 0.8rem;
  border-bottom:0.01rem solid rgba(1,17,27,0.1)
}
.tab-item{
  flex: 1;
  font-size: 0.28rem;
  text-align: center;
  color: rgb(77,85,93)
}
.tab-item a{
  display: block;
}
.router-link-active{
  color: rgb(240,20,20)
}
</style>
