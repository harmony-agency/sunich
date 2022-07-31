// Aos animation
AOS.init();

if(window.matchMedia("(max-width: 767px)").matches){


  $.fn.animateImages = function(angle, duration, easing, complete) {
    return this.each(function() {
      var $elem = $(this);
  
      $({deg: 0}).animate({deg: angle}, {
        duration: duration,
        easing: easing,
        step: function(now) {
          $elem.css({
             opacity: 0 + now
           });
        },
        complete: complete || $.noop
      });
    });
  };


  var swiper = new Swiper("#home-carousel", {
    slidesPerView: 2.5,
    spaceBetween: 5,
    slidesPerGroup: 1,
    loop: true,
    loopFillGroupWithBlank: true,
    // autoplay: {
    //   delay: 2500,
    // },
    navigation: {
      nextEl: ".swiper-next",
      prevEl: ".swiper-prev",
    },
  });

  var productSwiper = new Swiper("#product-carousel", {
    slidesPerView: 1.5,
    spaceBetween: 5,
    slidesPerGroup: 1,
    loop: true,
    loopFillGroupWithBlank: true,
    autoplay: {
      delay: 2500,
    },
    navigation: {
      nextEl: ".swiper-next",
      prevEl: ".swiper-prev",
    },
  });


  $("#product-carousel a").click(function(){

    let htmlContent = $(this).data('content');
    let folder = $(this).data('folder');


    $("#productModal .product-content").load('product/'+ folder + '/' +htmlContent+'.html');
    
  });

  

  // $('.card-img img').animateImages(1);

}else{
  

  var antioxidanLottie = bodymovin.loadAnimation({
      // animationData: { /* ... */ },
      container: document.getElementById("antioxidanLottie"), // required
      path: "antioxidanLottie.json", // required
      renderer: "svg", // required
      autoplay: true, // optional
      loop: false, // Optional
  });
  var vitamineLottie = bodymovin.loadAnimation({
      // animationData: { /* ... */ },
      container: document.getElementById("vitamineLottie"), // required
      path: "vitamineLottie.json", // required
      renderer: "svg", // required
      autoplay: true, // optional
      loop: false, // Optional

  });
  var nfcLottie = bodymovin.loadAnimation({
      // animationData: { /* ... */ },
      container: document.getElementById("nfcLottie"), // required
      path: "nfcLottie.json", // required
      renderer: "svg", // required
      autoplay: true, // optional
      loop: false, // Optional
  });


}





  var windowHeight = $(window).height();

  $(document).ready(function () {
    $(".main-box").css("height", $(window).height() - 140);
    $(".box-img").css("height", $(window).height() * 0.5);
  });
  $(window).resize(function () {
    $(".main-box").css("height", $(window).height() - 140);
    $(".box-img").css("height", $(window).height() * 0.5);
  });


$('#backHome').click(function(){

  window.location.href = '/';


});
  