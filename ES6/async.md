### 关于async/await的测试

```
async function f() {
  throw new Error('出错了');
}
······································
1.
async function f1() {
    let a = await f().catch((err)=>{
      console.log(err.message);
      return 3435;
    }).then(res=>{
      console.log(res);
      throw new Error(55555);
    });
    console.log(6666666);
}

执行：

f1().then((res) => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  });

输出：

  出错了
  3435
  Error: 55555
      at <anonymous>:2:110
      at async f1 (<anonymous>:2:13)
  Promise {<resolved>: undefined}

注意：
  console.log(6666666); 没有执行

··········································
2.
async function f1() {
    return await f().catch((err)=>{
      console.log(err.message);
      return 3435;
    });
}

执行：
f1().then((res) => {
    console.log(res, 123);
  }).catch(err => {
    console.log(err);
  });

输出：

  出错了
  3435 123
  Promise {<resolved>: undefined}

与
async function f1() {
    let a = await f().catch((err)=>{
      console.log(err.message);
      return 3435;
    });
    return a;
}
相同

```


以上测试可得：
>await 会等待后边的 **所有** 异步函数执行完毕，并得到最后的return值。如果后面的异步函数rejected则返回错误结果，后边的代码将不会执行；
