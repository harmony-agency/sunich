
$.fn.animateRotate = function(angle, duration, easing, complete) {
  return this.each(function() {
    var $elem = $(this);

    $({deg: 0}).animate({deg: angle}, {
      duration: duration,
      easing: easing,
      step: function(now) {
        $elem.css({
          position: 'relative',
          bottom: now,
           transform: 'rotate(' + now + 'deg)'
         });
      },
      complete: complete || $.noop
    });
  });
};


$(".box-item a").hover(function(){
    $(this).children('.normal-img').animateRotate(20,5);
    $(this).children('.normal-img').css('background-image', 'url(assets/images/product-splash.png)');

    }, function(){
      $(this).children('.normal-img').animateRotate(0);
      $(this).children('.normal-img').css('background-image', 'unset');

    });

