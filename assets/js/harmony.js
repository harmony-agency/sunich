const username =  localStorage.getItem('username');

if(username){
          $("#step1").hide();
      $("#step3").fadeIn();
}
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

/* =================================== character Swiper  ====================================== */
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

/* =================================== party Swiper  ====================================== */
var pagination_num = ["1", "2", "3", "4", "5", "6"];

const partySwiper = new Swiper(".partySwiper", {
  slidesPerView: 1,
  grabCursor: true,
  centeredSlides: true,
  effect: "fade",
  keyboard: {
    enabled: true,
  },
  // loop: true,
  autoplay: {
    delay: 3000,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    // clickable: true,
    renderBullet: function (index, className) {
      return (
        '<span class="' + className + '">' + pagination_num[index] + "</span>"
      );
    },
  },
});
partySwiper.on("slidePrevTransitionEnd", function () {
  $(".next_level").fadeIn();
  $(".swiper-button-next").fadeIn();
  $(".start_game").css({ left: "37%", right: "unset", margin: "0 auto" });
  $(".swiper-pagination-bullet-active").next().css({ opacity: "0.5" });
});
if (window.matchMedia("(max-width: 768px)").matches) {
  partySwiper.on("slidePrevTransitionEnd", function () {
    $(".next_level").fadeIn();
    $(".swiper-button-next").fadeIn();
    $(".start_game").css({ left: "3%", right: "unset", margin: "0 auto" });
    $(".swiper-pagination-bullet-active").next().css({ opacity: "0.5" });
  });
}
partySwiper.on("slideNextTransitionStart", function () {
  $(".swiper-pagination-bullet-active").prev().css({ opacity: "1" });
});
partySwiper.on("reachEnd", function () {
  $(".next_level").fadeOut();
  $(".swiper-button-next").fadeOut();
  $(".start_game").css({ left: "0", right: "0", margin: "0 auto" });
  /* =================================== selected_elephant  ====================================== */
  lottie.loadAnimation({
    container: document.getElementById("selectedelephant"), // the dom element that will contain the animation
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "assets/anime/selected_char/selected_elephant/data.json", // the path to the animation json
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

  /* =================================== selected_dolphin  ====================================== */
  lottie.loadAnimation({
    container: document.getElementById("selecteddolphin"), // the dom element that will contain the animation
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "assets/anime/selected_char/selected_dolphin/data.json", // the path to the animation json
  });
  /* =================================== selected_happyhip  ====================================== */
  lottie.loadAnimation({
    container: document.getElementById("selectedhappyhip"), // the dom element that will contain the animation
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "assets/anime/selected_char/selected_happyhip/data.json", // the path to the animation json
  });
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
/* =================================== slide2_dolphin  ====================================== */
lottie.loadAnimation({
  container: document.getElementById("slide2_dolphin"), // the dom element that will contain the animation
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "assets/anime/swiper/slide2_dolphin/data.json", // the path to the animation json
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
    mobile: persianToEnglish($("#subscribers #mobile").val()),
  };
  $.ajax({
    type: "POST",
    url: "panel/otp.php",
    data: formDataOtp,
    dataType: "json",
    encode: true,
  }).done(function (data) {
    if (data["success"] == true) {
      $(".errorValidateOtp").hide();
      $("#step1").hide();
      $("#step2").fadeIn();
      $(".enteredPhone").html($("#subscribers #mobile").val());
      console.log("1");
    } else {
      $(".errorValidateOtp").show();
      $(".errorValidateOtp").html(data["message"]);
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
    mobile: persianToEnglish($("#subscribers #mobile").val()),
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
      localStorage.setItem('username', data["username"] );

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
});

/*===================================== submit_character =====================================*/
$(".submit_character").click(() => {
  let characterSelected = $(".characterSwiper .swiper-slide-active").data(
    "character"
  );
  sessionStorage.setItem("character", characterSelected);
  
    if(username){
            window.location.replace("./game/");
    }else{
      $("#steps_form").hide();
      $("#step4").fadeIn();
    
      // selected character motion in last slide
      var charmotion = $(".swiper-slide.swiper-slide-active").data("charmotion");
      $(".selected_char").attr("id", charmotion);
    
      // selected character image in each slide
      var charmini = $(".swiper-slide.swiper-slide-active").data("charmini");
      $(".submit_character_imgmini").attr(
        "src",
        "assets/images/charactersMini/" + charmini + ".png"
      );
      $(".leaderboard_img").attr(
        "src",
        "assets/images/charactersMini/" + charmini + ".png"
      );
      $(".submit_character_imglarge").attr(
        "src",
        "assets/images/characters/" + charmini + ".png"
      );
    }
});

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

/*===================================== clipboard =====================================*/
var clipboard = new ClipboardJS(".clipboard");
clipboard.on("success", function (e) {
  $(".copyMsg").text("لینک کپی شد");

  setTimeout(function () {
    $(".copyMsg").empty()();
  }, 2500);
});
