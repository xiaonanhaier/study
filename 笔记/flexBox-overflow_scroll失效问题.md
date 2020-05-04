### flexBox元素overflow_scroll失效问题
---

#### 问题描述：
使用flex布局时，需要滚动显示全部内容的元素不能滚动，其原因在于overflow失效。



#### 解决办法：
flex项目添加min-height: 0或者min-width: 0;



#### 原因：
flex项目min-height(或者min-width)默认为auto，也就是子元素有多高自身就有多高。当设置为0时，理解会采用flex-basis的值。min-height>flex-basis 用min-height;反之用flex-basis;高度设置为0也可以；

相关文档：
[【理解Flexbox：你需要知道的一切】](https://www.w3cplus.com/css3/understanding-flexbox-everything-you-need-to-know.html)

