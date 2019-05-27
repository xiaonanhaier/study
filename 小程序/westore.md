- 在store.js中定义变量

  ```javascript
  //store.js文件
  export default {
    data: {
      newEmptyOrder: null,//请求到的订单头存放在这里了
        a:{
            b:[
                {c:{d:''}}
            ]
        }
    },
   //可以添加全局方法
    addGoods: function (value) {
      
    }
    //默认 false，为 true 会无脑更新所有实例
    //updateAll: true
  }
  ```

  

- 在目标页面引入store.js ,引入creat.js


- 通过store.data.变量名 来访问变量(在目标页面中同样需要定义该变量才能使用)
- westore,更新状态的两种方式(例子见下方代码块)

```javascript
//westore支持直接赋值:
this.store.data.a.b[0].c.d  = 'f'
this.update()

//也可以使用类似setdata的方式
this.update({
    name:"格里高利"
    'a.b[1].c.d':'f'
})
```

