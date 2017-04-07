window.onload = function() {
  var imglist = document.getElementById('imglist');
  var listcon = imglist.children;
  var imgt = document.getElementById('imgc');
  var imgs = ['images/iphone.png','images/iMac.png','images/ipad.png'];
  var timeid = null;
  for (var i = 0; i < listcon.length; i++) {
    listcon[i].index = i;
    listcon[i].onmouseover = function() {
      clear();
      imgt.className = 'animated';
      clearTimeout(timeid);
      timeid = setTimeout(function(){
        imgt.className = 'animated fadeInRight';
      },10);
      imgt.setAttribute('src',imgs[this.index]);
      this.style.color = '#fff';
    }
  }
  function clear(){
    for (var i = 0; i < listcon.length; i++) {
      listcon[i].style.color = '#bbb';
    }
  }

}
