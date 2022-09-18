var i = 0;
function preloadMain() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("Bar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        $(".preload").fadeOut();
        $("#steps_form").fadeIn();
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}
document.body.onload = function () {
  preloadMain();
};

$(".otp").click(() => {
  $("#step1").hide();
  $("#step2").fadeIn();
});

$(".otp-validate").click(() => {
  $("#step2").hide();
  $("#step3").fadeIn();
});

/* =================================== characterSwiper  ====================================== */
const characterSwiper = new Swiper(".characterSwiper", {
  slidesPerView: 6,
  grabCursor: true,
  centeredSlides: true,
  // loop: true,
  // autoplay: {
  //   delay: 2000,
  // },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  },
});

$(".submit_character").click(() => {
  $("#steps_form").hide();
  $("#step4").fadeIn();
});

$(".ready_togo").click(() => {
  $("#step4").hide();
  $("#step5").fadeIn();
});

/* =================================== partySwiper  ====================================== */

const partySwiper = new Swiper(".partySwiper", {
  slidesPerView: 1,
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  // autoplay: {
  //   delay: 2000,
  // },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
});

/* =================================== start_party_lottie  ====================================== */
lottie.loadAnimation({
  container: document.getElementById("start_party"), // the dom element that will contain the animation
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "assets/anime/start/data.json", // the path to the animation json
});
/* =================================== toti_talk_lottie  ====================================== */
lottie.loadAnimation({
  container: document.getElementById("toti_talk"), // the dom element that will contain the animation
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "assets/anime/toti_talk/data.json", // the path to the animation json
});
/* =================================== party_lottie  ====================================== */
lottie.loadAnimation({
  container: document.getElementById("party"), // the dom element that will contain the animation
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "assets/anime/party/data.json", // the path to the animation json
});
/* =================================== slider1_lottie  ====================================== */
lottie.loadAnimation({
  container: document.getElementById("slider1_motion"), // the dom element that will contain the animation
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "assets/anime/party/data.json", // the path to the animation json
});
