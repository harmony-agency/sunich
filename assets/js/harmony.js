// Aos animation
AOS.init();

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

var swiper = new Swiper("#home-carousel", {
    slidesPerView: 2.5,
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

  var windowHeight = $(window).height();

  $(document).ready(function () {
    $(".main-box").css("height", $(window).height() - 140);
    $(".box-img").css("height", $(window).height() * 0.5);
  });
  $(window).resize(function () {
    $(".main-box").css("height", $(window).height() - 140);
    $(".box-img").css("height", $(window).height() * 0.5);
  });