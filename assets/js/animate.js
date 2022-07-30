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
  autoplay: false, // optional
  loop: false, // Optional
});
var nfcLottie = bodymovin.loadAnimation({
  // animationData: { /* ... */ },
  container: document.getElementById("nfcLottie"), // required
  path: "nfcLottie.json", // required
  renderer: "svg", // required
  autoplay: false, // optional
  loop: false, // Optional
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

const mobileScreen = window.matchMedia("(max-width: 990px )");
$(document).ready(function () {
  $(".dashboard-nav-dropdown-toggle").click(function () {
    $(this)
      .closest(".dashboard-nav-dropdown")
      .toggleClass("show")
      .find(".dashboard-nav-dropdown")
      .removeClass("show");
    $(this).parent().siblings().removeClass("show");
  });
  $(".menu-toggle").click(function () {
    if (mobileScreen.matches) {
      $(".dashboard-nav").toggleClass("mobile-show");
    } else {
      $(".dashboard").toggleClass("dashboard-compact");
    }
  });
});
{
  /* <!------- product-carousel ---------> */
}
var swiper = new Swiper("#product-carousel", {
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

var myFullpage = new fullpage("#fullpage", {
  sectionsColor: ["#fff"],
  anchors: ["antioxidanSection", "vitamineSection", "nfcSection"],
  navigation: true,
  menu: "#menu",
  loopTop: true,
  loopBottom: true,
  afterRender: function (anchors, index) {
    var currentURL = $(location).attr("href");
    var sectionId = currentURL.split("#");

    if ((sectionId = "vitamineSection")) {
      document.querySelectorAll("#vitamine-part .aos-init").forEach((el) => {
        el.classList.add("aos-animate");
      });
      vitamineLottie.play();
    }
    if ((sectionId = "nfcSection")) {
      document.querySelectorAll("#nfc-part .aos-init").forEach((el) => {
        el.classList.add("aos-animate");
      });
      nfcLottie.play();
    }
  },
  beforeLeave: function (anchors, index) {
    var currentURL = $(location).attr("href");
    var sectionId = currentURL.split("#");

    if (anchors.index == 0 || (sectionId = "vitamineSection")) {
      document.querySelectorAll("#vitamine-part .aos-init").forEach((el) => {
        el.classList.add("aos-animate");
      });
      vitamineLottie.play();
    }

    if (anchors.index == 1 || (sectionId = "nfcSection")) {
      document.querySelectorAll("#nfc-part .aos-init").forEach((el) => {
        el.classList.add("aos-animate");
      });
      nfcLottie.play();
    }
  },
});

// preloader
var currentURL = $(location).attr("href");
var sectionId = currentURL.split("#");
if (sectionId[1] == "antioxidan-part") {
  console.log(sectionId);
  $("#anti-preload").trigger("play");
  $('#anti-preload').show();
}
if (sectionId[1] == "vitamine-part") {
  console.log(sectionId);
  $("#vitamine-preload").trigger("play");
  $('#vitamine-preload').show();
}
if (sectionId[1] == "nfc-part") {
  console.log(sectionId);
  $("#nfc-preload").trigger("play");
  $('#nfc-preload').show();
}

setTimeout(function () {
  $("#preloader").fadeOut("slow");
}, 2000);
