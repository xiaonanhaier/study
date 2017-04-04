  window.onload = function () {
    var bign = document.getElementById('img');
    bign.style.background ='url(images/long.png) center center no-repeat'
    console.log(bign.style);
    fade(bign,0);
    var timeid = setInterval(function() {
      fade(bign,0);
      if (bign.style.background == 'url("images/long.png") 50% 50% no-repeat') {
        bign.style.background ='url(images/long1.png) 50% 50% no-repeat';
      }else {
        bign.style.background = 'url(images/long.png) 50% 50% no-repeat';
      }
    },3000)
  }
  function getStyle(obj, attr){
    if(obj.currentStyle){ //ie8
      return obj.currentStyle[attr];
    }else{ //chrome等标准
      return getComputedStyle(obj, false)[attr];
    }
  }
  function fade(obj, nNum){
    clearInterval(obj.timeId);
    var speed = 0;
    //通过speed 正负控制方向
    // console.log(getStyle(obj, 'opacity'));
    if(getStyle(obj, 'opacity') > nNum){
      speed = -0.01;  //向左
    }else{
      speed = 0.01; //向右
    }
    // console.log(speed);
    obj.timeId = setInterval(function(){
      var opacity = getStyle(obj, 'opacity');
      obj.style.opacity = Number(opacity) + speed;
          var result = nNum - getStyle(obj, 'opacity');
          // console.log(result);
      if(Math.abs(result) <= 0.01){
          clearInterval(obj.timeId);
          fade(obj,getStyle(obj, 'opacity'))
          // obj.style.opacity  = nNum;
      }
    }, 30);
  }
