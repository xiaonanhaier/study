BOM
====  
  1. BOM 浏览器对象模型
    * B browser   浏览器
    * O object    对象
    * M model     模型
    * 简明理解：浏览器提供给开发者的js接口
  2. 核心对象是window
    * 所有的全局变量和全局函数都window上,window对象相当于js的全局变量
    * 通过js访问浏览器的一个借口
#### window对象
  1. window.alert('提示内容')    警告框

  2. window.cofirm('提示内容')   对话框
    * 确认返回 true
    * 取消返回 false
  3. window.prompt('提示内容')     输入框
    * 确认输入
    * 取消返回 null
  4. window.open(pageurl,name,param)
    * pageurl   要打开的网页地址
    * name    窗口的名字
    * param   窗口参数  逗号隔开
      1. width
      2. height
      3. top
      4. left
  5. 常用方法
    * window.onload   页面加载
    * window.onunload   页面卸载
    * window.onscroll   滚动条滚动的时候
#### 滚动距离
  0.  scrollLeft    横向滚动距离
  1.  document.body.scrollTop   //chrome等标准浏览器
  2.  document.documentElement.scrollTop    //ie
  3.  兼容
    * ||
  4.  返回顶部
    * 锚点
      1. <div id='top' ></div>
      按钮：<a href='#top'>返回顶部</a>
    * 动画方式
      1. setInterval
      2. 不断改变scrollTop值 到 0；
  5. 运动原理
    * 匀速运动：   当前值 - 固定的值（speed）
    * 缓冲运动：   当前值 - 不断变化的值（speed）
