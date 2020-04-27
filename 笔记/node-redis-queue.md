1. 用到的包 [bull](https://github.com/OptimalBits/bull)
2. 使用
```js
const queue = new WaimaiQueue('testQueue', {
    redis: {
        port: 6379, 
        host: "127.0.0.1", 
        password: 'root'
    },
    defaultJobOptions: {
        removeOnFail: true,// 
        removeOnComplete: true
    }
});
```

* 添加处理函数
```js
// 队列A
queue.process('queueA', async function queueAAsync (job, done) {
  await queueAHandlerAsync(job.data).catch(err => {
    log.error(`queueA--err-${JSON.stringify(job.data)}-${err.message}`);
  });

  // 第一次参数是err，第二个参数是result，在completed 事件中可以获取到
  done(null, 'OK');
});

// 美团取消订单回调队列,返回promise时省略done参数
queue.process('queueB', async function queueBAsync (job) {
  return queueBHandlerAsync(job.data).catch(err => {
    log.error(`queueB-err-${err.message}`);
  });
});

// 饿了么订单回调队列，直接返回值时也需要省略done参数
queue.process('queueC', async function queueCAsync (job) {
  return job.data;
});
```



* 事件监听
```js
// 任务执行成功的回调
queue.on('completed', function(job, result) {
  log.info(`Job ${job.name}-${job.id} completed! Result: ${result}`);
  // job.remove();// 执行这个方法可以清楚redis里的job数据
});

// 任务开始执行 可以调用jobPromise.cancel()取消任务
queue.on('active', function(job, jobPromise){
  log.info(`Job ${job.name}-${job.id} active`);
});

// 任务执行失败时的回调
queue.on('failed', function(job, err){
  log.error(`Job  ${job.name}-${job.id}-error-${err.message}-${job.data}`);
});

```