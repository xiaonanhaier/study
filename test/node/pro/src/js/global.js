
$(document).ready(function(e) {
    //tip
    $('.js-qq[title],.js-weibo[title],.js-ali[title]').qtip({
        position: {
             my: 'bottom center',
             at: 'top center',
             adjust: {
                 x: 50,
                 y: 0
               }
        },
        style: {
          classes: 'jastoo_tip'
        }

    });


    $('.js-weixin').qtip({
            position: {
             my: 'bottom center',
             at: 'top center'
             },
         style: {
          classes: 'jastoo_tip2'
        },
        content:'<img src="src/images/qrcode.png" />'
    });

//回到顶部
$('body').append($('<div id="backToTop"><a title=""><img alt="" src="src/images/back_top.jpg"/></a></div>').hide(0));
	$(window).scroll(function(){
        $('#backToTop').show();
        if ($(document).scrollTop() != 0)
            $('#backToTop').fadeIn();
        else
            $('#backToTop').fadeOut();
    });
    $('#backToTop a').click(function(){
        $('html, body').animate({
            scrollTop: 0
        }, 600);
        return false;
    });

 });
