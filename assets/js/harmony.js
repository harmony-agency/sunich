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
$(".ready_togo").click(() => {
  $("#step4").hide();
  $("#step5").fadeIn();
});

/* =================================== partySwiper  ====================================== */
var pagination_num = ["1", "2", "3", "4", "5", "6"];

const partySwiper = new Swiper(".partySwiper", {
  slidesPerView: 1,
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
    clickable: true,
    renderBullet: function (index, className) {
      return (
        '<span class="' + className + '">' + pagination_num[index] + "</span>"
      );
    },
  },
});
partySwiper.on("slidePrevTransitionEnd", function () {
  $(".next_level").fadeIn();
});
partySwiper.on("reachEnd", function () {
  $(".next_level").fadeOut();
});
$(".next_level").click(() => {
  partySwiper.slideNext();
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
/* =================================== slide1_elephant  ====================================== */
lottie.loadAnimation({
  container: document.getElementById("slide1_elephant"), // the dom element that will contain the animation
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "assets/anime/swiper/slide1_elephant/data.json", // the path to the animation json
});
/* =================================== slide2_dolfin  ====================================== */
lottie.loadAnimation({
  container: document.getElementById("slide2_dolfin"), // the dom element that will contain the animation
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "assets/anime/swiper/slide2_dolfin/data.json", // the path to the animation json
});
/* =================================== slide3_happyhip  ====================================== */
lottie.loadAnimation({
  container: document.getElementById("slide3_happyhip"), // the dom element that will contain the animation
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "assets/anime/swiper/slide3_happyhip/data.json", // the path to the animation json
});
/* =================================== slide4_jutu  ====================================== */
lottie.loadAnimation({
  container: document.getElementById("slide4_jutu"), // the dom element that will contain the animation
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "assets/anime/swiper/slide4_jutu/data.json", // the path to the animation json
});
/* =================================== slide5_tutu  ====================================== */
lottie.loadAnimation({
  container: document.getElementById("slide5_tutu"), // the dom element that will contain the animation
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "assets/anime/swiper/slide5_tutu/data.json", // the path to the animation json
});

$(".submit_character").click(() => {
  $("#steps_form").hide();
  $("#step4").fadeIn();

  // selected character motion in last slide
  var charmotion = $(".swiper-slide.swiper-slide-active").data("charmotion");
  $(".selected_char").attr("id", charmotion);

  // selected character image in each slide
  var charmini = $(".swiper-slide.swiper-slide-active").data("charmini");
  $(".submit_character_imgmini").attr(
    "src",
    "assets/images/characters/" + charmini + ".png"
  );
  $(".submit_character_imglarge").attr(
    "src",
    "assets/images/characters/" + charmini + ".png"
  );

  // for test
  // console.log(charmotion);
  // alert(charmini);
});

/* =================================== selected_tutu  ====================================== */
lottie.loadAnimation({
  container: document.getElementById("selectedtutu"), // the dom element that will contain the animation
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "assets/anime/selected_char/selected_tutu/data.json", // the path to the animation json
});
/* =================================== selected_jutu  ====================================== */
lottie.loadAnimation({
  container: document.getElementById("selectedjutu"), // the dom element that will contain the animation
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "assets/anime/selected_char/selected_jutu/data.json", // the path to the animation json
});
/* =================================== selected_elephant  ====================================== */
lottie.loadAnimation({
  container: document.getElementById("selectedelephant"), // the dom element that will contain the animation
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "assets/anime/selected_char/selected_elephant/data.json", // the path to the animation json
});
/* =================================== selected_dolfin  ====================================== */
lottie.loadAnimation({
  container: document.getElementById("selecteddolfin"), // the dom element that will contain the animation
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "assets/anime/selected_char/selected_dolfin/data.json", // the path to the animation json
});
/* =================================== selected_happyhip  ====================================== */
lottie.loadAnimation({
  container: document.getElementById("selectedhappyhip"), // the dom element that will contain the animation
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "assets/anime/selected_char/selected_happyhip/data.json", // the path to the animation json
});

/*===================================== subscribers validation =====================================*/
$(document).ready(function () {
  $("#subscribers").validate({
    // initialize the plugin
    rules: {
      phone: {
        required: true,
        minlength: 11,
        maxlength: 11,
      },
    },
    messages: {
      phone: {
        required: "لطفا شماره تماس خود را وارد کنید",
        minlength: "شماره تماس وارد شده معتبر نیست",
        maxlength: "شماره تماس وارد شده معتبر نیست",
      },
    },
    submitHandler: function () {
      form_otp();
      timerSendSms();
    },
  });
  $("#subscribers_confirm").validate({
    // initialize the plugin
    rules: {
      confirm: {
        required: true,
        minlength: 3,
        maxlength: 4,
      },
    },
    messages: {
      confirm: {
        required: "لطفا  کد ارسال شده  را وارد کنید",
        minlength: " کد وارد شده معتبر نیست",
        maxlength: " کد وارد شده معتبر نیست",
      },
    },
    submitHandler: function () {
      form_submit();
    },
  });
});

/*===================================== form_otp =====================================*/
function form_otp() {
  var formDataOtp = {
    phone: persianToEnglish($("#subscribers #phone").val()),
  };
  $.ajax({
    type: "POST",
    url: "panel/otp.php",
    data: formDataOtp,
    dataType: "json",
    encode: true,
  }).done(function (data) {
    if (data["success"] == true) {
      $(".errorValidate").hide();
      $("#step1").hide();
      $("#step2").fadeIn();
      $(".enteredPhone").html($("#subscribers #phone").val());
    } else {
      $(".errorValidate").show();
      $(".errorValidate").html(data["message"]);
    }
  });
}

/*===================================== timerSendSms =====================================*/
function timerSendSms() {
  $("#sendAgain").hide();
  var timer2 = "2:01";
  $("#smsTimer").show();

  var interval = setInterval(function () {
    var timer = timer2.split(":");
    //by parsing integer, I avoid all extra string processing
    var minutes = parseInt(timer[0], 10);
    var seconds = parseInt(timer[1], 10);
    --seconds;
    minutes = seconds < 0 ? --minutes : minutes;
    if (minutes < 1) {
      clearInterval(interval);
      $("#smsTimer").hide();
      $("#sendAgain").show();
      clearInterval(interval);
      $("#editMobile").show();
    }

    seconds = seconds < 0 ? 59 : seconds;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    //minutes = (minutes < 10) ?  minutes : minutes;
    $("#smsTimer").html(minutes + ":" + seconds);
    timer2 = minutes + ":" + seconds;
  }, 1000);
}

/*===================================== form_submit =====================================*/
function form_submit() {
  var formDataSubscriber = {
    phone: persianToEnglish($("#subscribers #phone").val()),
    confirm: persianToEnglish($("#subscribers_confirm #confirm").val()),
    utm_source: sessionStorage.getItem("utm_source"),
    utm_campaign: sessionStorage.getItem("utm_medium"),
    utm_medium: sessionStorage.getItem("utm_campaign"),
    utm_term: sessionStorage.getItem("utm_term"),
    utm_content: sessionStorage.getItem("utm_content"),
    referrer: document.referrer,
  };
  $.ajax({
    type: "POST",
    url: "panel/process.php",
    data: formDataSubscriber,
    dataType: "json",
    encode: true,
  }).done(function (data) {
    if (data["success"] == true) {
      $(".errorValidate").hide();
      $("#step2").fadeOut();
      $("#step3").fadeIn();
    } else {
      $(".errorValidate").show();
      $(".errorValidate").html(data["message"]);
    }
  });
}
/*===================================== Send Sms Again =====================================*/
$("#sendAgain").click(function () {
  form_otp();
  timerSendSms();
});

/*===================================== edit phone number =====================================*/
$("#editMobile").click(function () {
  $("#step2").hide();
  $("#step1").fadeIn();
  // $("#mobile").focus();
});

var utm_source = jQuery.QueryString["utm_source"];
var utm_medium = jQuery.QueryString["utm_medium"];
var utm_campaign = jQuery.QueryString["utm_campaign"];
var utm_term = jQuery.QueryString["utm_term"];
var utm_content = jQuery.QueryString["utm_content"];
if (location.search != "") {
  // query string exists
  sessionStorage.setItem("utm_source", utm_source);
  sessionStorage.setItem("utm_medium", utm_medium);
  sessionStorage.setItem("utm_campaign", utm_campaign);
  sessionStorage.setItem("utm_term", utm_term);
  sessionStorage.setItem("utm_content", utm_content);
}
/*===================================== persianNumbers =====================================*/
var persianNumbers = [
    /۰/g,
    /۱/g,
    /۲/g,
    /۳/g,
    /۴/g,
    /۵/g,
    /۶/g,
    /۷/g,
    /۸/g,
    /۹/g,
  ],
  arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
  persianToEnglish = function (str) {
    if (typeof str === "string") {
      for (var i = 0; i < 10; i++) {
        str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
      }
    }
    return str;
  };
