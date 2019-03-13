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
              <img src="./decrease_1@2x.png" alt="">
            </span>
            <span class="text">{{seller.supports[0].description}}</span>
            <span class="num">{{seller.supports.length}}个 <i class="icon-keyboard_arrow_right"></i></span>
          </div>
        </div>
      </div>
      <div class="header-gk" @click="showDetail">
        <span class="gk-icon"><img src="./bulletin@3x.png" alt=""></span>
        <span class="gk-word">{{seller.bulletin}}</span>
        <span class="gk-more">></span>
      </div>
    </div>
    <transition name="ctc">
      <div v-show="detailshow"  class="detail">
        <div class="detail-con">
          <div class="detail-main">
            <h1 class="detail-name">{{seller.name}}</h1>
            <v-star :size='48' :score='seller.score'></v-star>
          </div>

        </div>
        <div class="detail-icon">
          <i class="icon-close" @click="hideDetail"></i>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import star from '../star/star'
export default {
  name: 'header',
  data() {
    return {
      detailshow: false
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  methods: {
    showDetail() {
      this.detailshow = true
    },
    hideDetail() {
      this.detailshow = false
    }
  },
  components: {
    'v-star': star
  }
}
</script>

<style lang="css">
@import "../../assets/sell-icon/style.css";
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
.supports{font-size: 0.2rem;margin-top: 0.2rem;line-height: 0.24rem;display: flex;}
.icon>img{width: 0.24rem;margin-right: 0.08rem;}
.text{flex: 1;}
.num{padding: 0.14rem 0.16rem;margin-top: -0.14rem;margin-bottom: -0.14rem;
  background: rgba(0,0,0,0.2);margin-right: 0.24rem;border-radius: 0.24rem;}
.avatar img{margin-left: 0.48rem;margin-right: 0.32rem;
  display: block;width: 1.28rem;height: 1.28rem;border-radius:0.04rem;}
.header-gk{height: 0.56rem;line-height: 0.56rem;font-size: 0.2rem;
  margin-top: 0.36rem;display: flex;width: 100%;background: rgba(7,17,27,0.2)}
.gk-icon>img{width: 0.55rem;display: block;margin-left: 0.24rem;margin-top: 0.11rem;}
.gk-word{flex: 1;margin: 0 0.08rem;white-space: nowrap;overflow: hidden;text-overflow:ellipsis;}
.gk-more{margin-right: 0.24rem;}

.detail{position: fixed;top:0;width: 100%;overflow: auto;
  height: 100%;background: rgba(7,17,27,0.8);}
/*动画*/
.ctc-enter-active, .ctc-leave-active{transition: all 0.5s;}
.ctc-enter,.ctc-leave-to{
  top: 100%;
}
.ctc-enter-to, .ctc-leave{
  top: 0;
}

.detail-con{width: 100%;min-height: 100%;overflow: hidden;}
.detail-main{padding-bottom: 1.28rem;margin-top: 1.28rem;text-align: center;
  clear: both;padding: 0 0.72rem;line-height: 0.24rem;}
.detail-icon{margin-top: -1.28rem;font-size: 0.64rem;text-align: center;}
.detail-name{font-size: 0.32rem;line-height: 0.32rem;text-align: center;margin-bottom: 0.36rem;}
</style>
