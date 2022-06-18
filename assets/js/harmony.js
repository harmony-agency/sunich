$(document).ready(function () {
  $("#subscriber").validate({
    // initialize the plugin
    rules: {
      name: {
        required: true,
      },
      phone: {
        required: true,
        minlength: 11,
        maxlength: 11,
      },
    },
    messages: {
      name: {
        required: "لطفا نام خود را وارد کنید",
      },
      phone: {
        required: "لطفا شماره تماس خود را وارد کنید",
        minlength: "شماره تماس وارد شده معتبر نیست",
        maxlength: "شماره تماس وارد شده معتبر نیست",
      },
    },
    submitHandler: function () {
      form_submit();
    },
  });

  // hover package
  $(".middleBox").hover(
    function () {
      $(this).css("transform", "scale(1.1)");
      $(this).css("transition", "1s");
    },
    function () {
      $(this).css("transform", "scale(1)");
      $(this).css("transition", "1s");
      $(this).removeClass("zoom");
    }
  );
});


(function ($) {
  $.QueryString = (function (a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
      var p = a[i].split("=");
      if (p.length != 2) continue;
      b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
  })(window.location.search.substr(1).split("&"));
})(jQuery);

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

function form_submit() {
  var formDataSubscriber = {
    name: $("#subscriber #name").val(),
    phone: $("#subscriber #phone").val(),
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
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "formSubmission" });
      $("#register .error-submit").hide();
      $("#subscriber").hide();
      $("#register .result").html(
        '<div class="success-submit">' + data["message"] + "</div>"
      );
    } else {
      $("#register .error-submit").show();
      $("#register .error-submit").html(data["message"]);
    }
  });
}

$("#subscriber #phone").keyup(function (e) {
  $("#subscriber #phone").val(persianToEnglish($(this).val()));
});

function persianToEnglish(input) {
  var inputstring = input;
  var persian = ["١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "٠"];
  var english = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  for (var i = 0; i < 10; i++) {
    var regex = new RegExp(persian[i], "g");
    inputstring = inputstring.toString().replace(regex, english[i]);
  }
  return inputstring;
}

// hover for copy right
$(".copyright a").hover(
  function () {
    let logo = $(".copyright .hover-company");
    logo.addClass("active");
  },
  function () {
    let logo = $(".copyright .hover-company");
    logo.removeClass("active");
  }
);

// stickyButton
jQuery(function ($) {
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 100 && $(this).scrollTop() < 500) {
      $(".box").addClass("stickyButton");
    } else {
      $(".box").removeClass("stickyButton");
    }
  });
});

// Aos animation
// AOS.init();

//  counter
// $(".counter").counterUp({
//   delay: 5,
//   time: 1000,
// });

//  testimonial carousels
// var swiper = new Swiper(".mySwiper", {
//   autoplay: {
//     delay: 6000,
//     disableOnInteraction: false,
//   },
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
//   pagination: {
//     el: ".swiper-pagination",
//   },
// });
