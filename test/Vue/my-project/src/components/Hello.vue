<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2><input v-model="inp" type="text" @keyup.enter='aa()'></h2>
    <ol>
      <li v-for="item in items" v-text="item.name"  :class="['co',{'aa':item.bg}]" v-on:click="tan(item)"></li>
    </ol>
  </div>
</template>
<script>
import Stors from '../stors'
export default {
  name: 'hello',
  data () {
    return {
      inp:'',
      msg: 'Welcome to Your Vue.js App',
      items:Stors.fetch()
    }
  },
  methods:{
    tan:function(aa) {
      alert(aa.name);
    },
    aa:function() {
      this.items.splice(0,0,{
        'name':this.inp,
        'age':24,
        'bg':true
      })
      this.inp = ''
    }
  },
  watch:{
    items:{
      handler:function() {
        Stors.save(this.items);
      },
      deep:true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

/*ul {
  list-style-type: none;
  padding: 0;
}*/

li {
  margin: 0 10px;
  width: 30%;
  margin: 0 auto;
  text-align: center;
}
.co{
  color: red;
}
.aa{
  color: #42b983;
}
</style>
