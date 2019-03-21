## JavaScript运行机制和
---

### 一、js是单线程语言

JavaScript的用途主要是操作DOM，如果存在多个线程，两个线程又同时完成了连个截然相反的操作，比如一个线程更新，一个线程删除。虽然HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。

### 二、栈和队列

单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。

所以将所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

**栈和队列是怎么运行的？**

1. 执行栈：所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。

    ![call-stack](/笔记/images/call-stack.gif)
    1. JavaScript执行在单线程上，所有的代码都是 **排队** 执行。
    2. 一开始浏览器执行全局的代码时，首先创建全局的执行上下文，压入执行栈的顶部。
    3. 每当进入一个函数的执行就会创建函数的执行上下文，并且把它压入执行栈的顶部。当前函数执行完成后，当前函数的执行上下文出栈，并等待垃圾回收。
    4. 浏览器的JS执行引擎总是访问栈顶的执行上下文。

2. 任务队列：异步任务有了运行结果，就在"任务队列"之中放置一个事件。
3. 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
4. 主线程不断重复上面的第三步。

### 三、Event lOOP
主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）。

为了更好地理解Event Loop，请看下图（转引自Philip Roberts的演讲[《Help, I'm stuck in an event-loop》](http://vimeo.com/96425312))）。
![event-loop](/笔记/images/event-loop.png)
### 四、异步任务中的Macrotasks和Microtasks



### 相关文章
1. [JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
2. [Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
3. [理解 JavaScript 中的 macrotask 和 microtask](https://juejin.im/entry/58d4df3b5c497d0057eb99ff)
4. [从浏览器多进程到JS单线程，JS运行机制最全面的一次梳理](https://juejin.im/post/5a6547d0f265da3e283a1df7)