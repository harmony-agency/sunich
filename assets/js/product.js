var myFullpage = new fullpage("#fullpage", {
  sectionsColor: ["#fff"],
  anchors: ["antioxidan-products", "vitamine-products", "nfc-products"],
  navigation: true,
  menu: "#menu",
  loopTop: true,
  loopBottom: true,
});

$.fn.animateRotate = function (angle, duration, easing, complete) {
  return this.each(function () {
    var $elem = $(this);

    $({ deg: 0 }).animate(
      { deg: angle },
      {
        duration: duration,
        easing: easing,
        step: function (now) {
          $elem.css({
            position: "relative",
            bottom: now,
            transform: "rotate(" + now + "deg)",
          });
        },
        complete: complete || $.noop,
      }
    );
  });
};

// anti-splash
$("#antioxidanProducts .box-item a").hover(
  function () {
    $(this).children(".normal-img").animateRotate(20, 5);
    $(this)
      .children(".normal-img")
      .css("background-image", "url(assets/images/anti-splash.png)");
  },
  function () {
    $(this).children(".normal-img").animateRotate(0);
    $(this).children(".normal-img").css("background-image", "unset");
  }
);
// vitamine-splash
$("#vitamineProducts .box-item a").hover(
  function () {
    $(this).children(".normal-img").animateRotate(20, 5);
    $(this)
      .children(".normal-img")
      .css("background-image", "url(assets/images/vitamin-splash.png)");
  },
  function () {
    $(this).children(".normal-img").animateRotate(0);
    $(this).children(".normal-img").css("background-image", "unset");
  }
);

// nfc-splash
$("#nfcProducts .box-item a").hover(
  function () {
    $(this).children(".normal-img").animateRotate(20, 5);
    $(this)
      .children(".normal-img")
      .css("background-image", "url(assets/images/nfc-splash.png)");
  },
  function () {
    $(this).children(".normal-img").animateRotate(0);
    $(this).children(".normal-img").css("background-image", "unset");
  }
);

var swiper = new Swiper("#product-carousel", {
  slidesPerView: 1.5,
  spaceBetween: 5,
  slidesPerGroup: 1,
  // loop: true,
  loopFillGroupWithBlank: true,
  autoplay: {
    delay: 2500,
  },
  navigation: {
    nextEl: ".swiper-next",
    prevEl: ".swiper-prev",
  },
});
