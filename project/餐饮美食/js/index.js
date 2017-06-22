$(document).ready(function(){
  // 写了一个下拉菜单mouseover和mouseout反复触发，求解决方案
  // 怎么有种知乎变成 StackOverflow 的感觉……这是因为鼠标事件多次触发之后，节点的动画队列里堆积了多次 slideDown 和 slideUp，
  // 改成 $('#showPurchase').stop(true).slideDown() 应该就好了。参考链接：.stop() | jQuery API Documentation
  //
  $('.main-nav').mousemove(function() {
    $(this).children('a').css('backgroundColor','rgba(255,171,51,0.7)')
    if($(this).children('div').is(':animated')==false){
          $(this).children('div').slideDown()
    }
  })
  $('.main-nav').mouseleave(function(){
      $(this).children('div').slideUp()
      var aaa = $(this)
      var aa=setTimeout(function() {
        aaa.children('a').css('backgroundColor','rgb(255,255,255)')
      },500)
  })
//setTimeout中this指向window

  $('.eve-nav-list').first().css('display','block')
  $('.eve-nav').children().first().css({
    backgroundColor:'#ff9701',
    color:'#fff',
    borderRadius:'10px',
    boxShadow: '0px 0px 10px #414141'
  })
})
var dh =['fadeIn','rotateIn','slideInLeft','rollIn','hinge']
function getrandom(num1,num2) {
  var ca = num2 - num1 + 1;
  return Math.floor(Math.random()*ca+num1);
}
var timeid = null;
timeid = setInterval(function(){
  var newdh = dh[getrandom(0,dh.length-1)];
  $('.news-img-list').children().eq(2).attr('class','news-img-word animated '+newdh)
},10000)
$('#conlist').cycle({
  prev:'.prave',
  next:'.next'
})
setTimeout(function () {
  $('.eat-imglist').cycle({
    prev:'.eat-pra',
    next:'.eat-nxt'
  })
}, 1500);
$('#news-img').cycle({
  timeout:3000,
  speed:300
})
$('.eve-nav').children('a').mouseover(function(){
  $(this).siblings().css({
    backgroundColor:'#414141',
    color:'#fcd888',
    boxShadow: 'none'
  })
  $(this).css({
    backgroundColor:'#ff9701',
    color:'#fff',
    borderRadius:'10px',
    boxShadow: '0px 0px 10px #414141'
  })
  $('.eve-nav-list').css('display','none')
  $('.eve-nav-list').eq($(this).index()).show();
})
var pice ='';
$('.wel-pice').mouseover(function(){
  pice =  $(this).children('a').html()
  $(this).children().text('')
  $(this).children().html('订购')
  $(this).mouseout(function(){
    $(this).children().text('')
    $(this).children().html(pice)
  })
})
