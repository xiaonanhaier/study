$(document).ready(function(e) {

	
	//首页轮播图
	// var btnPos = parseInt(($(window).width() - 1000)/2);
	// 	$('#btn_prev').css('left', btnPos);
	// 	$('#btn_next').css('right', btnPos);
		
	// $(window).resize(function(){
	// 	if(parseInt($(window).width()) <= 1000){
	// 		$('#btn_prev').css('left', 0);
	// 		$('#btn_next').css('right', 0);
	// 		return false;	
	// 	}
	// 	var btnPos = parseInt(($(window).width() - 1000)/2);
	// 	$('#btn_prev').css('left', btnPos);
	// 	$('#btn_next').css('right', btnPos);
	// });
	
	// $(".slider_wrap").hover(function(){
	// 	$("#btn_prev,#btn_next").fadeIn()
	// 	},function(){
	// 	$("#btn_prev,#btn_next").fadeOut()
	// 	})
        $(".js-slider").after('<div class="num"></div>').cycle({
	 	   //fx: 'blindX,blindY,blindZ,cover,fade,shuffle,toss,uncover,wipe',
	 	   //random: 1,
	 	   fx: 'scrollLeft',
	 	   activePagerClass: 'on',
	 	   speed: 500,
	 	   timeout: 5000,
		  // prev: '#btn_prev',
	 	  // next: '#btn_next',
	 	   pause: 1,
	 	   pager:'.slider_wrap .num',
		   pagerEvent: 'hover',
	 	   pauseOnPagerHover: 1,
		   cleartypeNoBg: true,
	 	   pagerAnchorBuilder: function(idx, slide){
		    idx += 1;
	 		return '<a>' + idx + '</a>';
		   }
   		});

   		$('.num').css('margin-left', -($('.num').width()/2));


   		   $(".js-vi-slider").after('<div class="vi_num"></div>').cycle({
	 	   //fx: 'blindX,blindY,blindZ,cover,fade,shuffle,toss,uncover,wipe',
	 	   //random: 1,
	 	   fx: 'scrollLeft',
	 	   activePagerClass: 'active',
	 	   speed: 500,
	 	   timeout: 5000,
		  // prev: '#btn_prev',
	 	  // next: '#btn_next',
	 	   pause: 1,
	 	   pager:'.vi_wrap .vi_num',
		   pagerEvent: 'hover',
	 	   pauseOnPagerHover: 1,
		   cleartypeNoBg: true,
	 	   pagerAnchorBuilder: function(idx, slide){
		    idx += 1;
	 		return '<a>' + idx + '</a>';
		   }
   		});

   		$('.vi_num').css('margin-top', -($('.vi_num').height()/2));

});   		
		
		
	
    