<template lang="html">
  <div class="star" :class="starType">
    <span v-for='itemClass in itemClasses' :class="itemClass" class="star-item"></span>
  </div>
</template>

<script>
const length = 5
const CLS_ON = 'bgimg-on'
const CLS_OFF = 'bgimg-off'
const CLS_HALF = 'bgimg-half'
export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType() {
      console.log(this.size)
      return 'star-' + this.size
    },
    itemClasses() {
      let result = []
      let score = Math.floor(this.score * 2) / 2
      let hasDecimal = score % 1 !== 0
      let integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      console.log(result)
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      while (result.length < length) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>

<style lang="css">
.star{display: inline-block;}
.star-48>span,.star-36>span,.star-24>span{
  background-size: 100% 100%;background-repeat: no-repeat;display: inline-block;
}
.star-48{height: 0.48rem;line-height: 0.24rem;}
.star-48 .star-item{
  height: 0.48rem;width: 0.48rem;margin-right: 0.44rem;
}
.star-48:last-child{margin-right: 0;}

.star-36{height: 0.36rem;line-height: 0.18rem;}
.star-36 .star-item{
  height: 0.36rem;width: 0.36rem;margin-right: 0.12rem;
}
.star-36:last-child{margin-right: 0;}

.star-24{height: 0.24rem;line-height: 0.12rem;}
.star-24 .star-item{
  height: 0.24rem;width: 0.24rem;margin-right: 0.06rem;
}
.star-24:last-child{margin-right: 0;}

.bgimg-on{
  background: url(./star48_on@3x.png);
}
.bgimg-off{
  background-image: url(./star48_off@3x.png);
}
.bgimg-half{
  background-image: url(./star48_half@3x.png);
}
</style>
