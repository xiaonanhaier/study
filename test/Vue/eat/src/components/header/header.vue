<template lang="html">
  <div class="header">
    <img :src="seller.avatar" alt="">
    <div class="header-con">
      <div class="header-wrapper">
        <div class="avatar">
          <img :src="seller.avatar" alt="">
        </div>
        <div class="avacon">
          <div class="title">
            <span class="band">
              <img src="./brand@3x.png" alt="">
            </span>
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="description">
            {{seller.description}}/{{seller.deliveryTime}}分钟送达
          </div>
          <div v-if="seller.supports" class="supports">
            <span class="icon">

            </span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>
      </div>
      <div class="header-gk">
        <span class="gk-icon"><img src="./bulletin@3x.png" alt=""></span>
        <span class="gk-word">{{seller.bulletin}}</span>
        <span class="gk-more">></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header',
  props: {
    seller: {
      type: Object
    }
  }
}
</script>

<style lang="css">
.header{color: #fff;position: relative;overflow: hidden;height: 2.68rem;}
.header>img{width: 100%;}
.header-con{padding-top: 0.48rem;width: 100%;
  background: rgba(7,17,26,0.5);position: absolute;top: 0;}
.header-wrapper{display: flex;}
.avacon{flex: 1;}
.title{line-height: 0.4rem;font-size: 0.32rem;display: flex;}
.band>img{height: 0.4rem;margin-right: 0.12rem;}
.name{flex: 1;white-space: nowrap;overflow: hidden;text-overflow:ellipsis;}
.description{font-size: 0.24rem;margin-top: 0.16rem;line-height: 0.24rem;}
.supports{font-size: 0.2rem;margin-top: 0.2rem;line-height: 0.24rem;}
.avatar img{margin-left: 0.48rem;margin-right: 0.32rem;
  display: block;width: 1.28rem;height: 1.28rem;border-radius:0.04rem;}
.header-gk{height: 0.56rem;line-height: 0.56rem;font-size: 0.2rem;
  margin-top: 0.36rem;display: flex;width: 100%;background: rgba(7,17,27,0.2)}
.gk-icon>img{width: 0.55rem;display: block;margin-left: 0.24rem;margin-top: 0.11rem;}
.gk-word{flex: 1;margin: 0 0.08rem;white-space: nowrap;overflow: hidden;text-overflow:ellipsis;}
.gk-more{margin-right: 0.24rem;}
</style>
