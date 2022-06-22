$(document).ready(function () {

  $.validator.addMethod(
    "regex",
    function(value, element, regexp) {
      var re = new RegExp(regexp);
      return this.optional(element) || re.test(value);
    },
    "لطفا آیدی معتبر وارد کنید"
  );

  
  $("#subscriber").validate({
    // initialize the plugin
    rules: {
      name: {
        required: true,
      },
      mobile: {
        required: true,
        minlength: 11,
        maxlength: 11,
      },
      instagram: {
        required: true,
        regex : /[A-Za-z0-9]./g 
      },
    },
    messages: {
      name: {
        required: "لطفا نام خود را وارد کنید",
      },
      mobile: {
        required: "لطفا شماره همراه خود را وارد کنید",
        minlength: "شماره همراه وارد شده معتبر نیست",
        maxlength: "شماره همراه وارد شده معتبر نیست",
      },
      instagram: {
        required: "لطفا  آیدی اینستاگرام خود را وارد کنید",
      },
    },
    submitHandler: function () {
      form_submit();
    },
  });


  $("#auth").validate({
    // initialize the plugin
    rules: {

      confirm: {
        required: true,
      },

    },
    messages: {
      name: {
        required: "لطفا کد تایید ارسال شده  را وارد کنید",
      },

    },
    submitHandler: function () {
      form_race();
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
      b[p[0]] = deconfirmURIComponent(p[1].replace(/\+/g, " "));
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
  var formDataOtp = {
    mobile: $("#subscriber #mobile").val(),
  };
  $.ajax({
    type: "POST",
    url: "panel/otp.php",
    data: formDataOtp,
    dataType: "json",
    enconfirm: true,
  }).done(function (data) {
    if (data["success"] == true) {
      // window.dataLayer = window.dataLayer || [];
      // window.dataLayer.push({ event: "formSubmissionOtp" });
      $(".step1").hide();
      $(".smsForm").fadeIn();
      timerSendSms();
    } else {

      $(".step1 .errorValidate").html(data["message"]);
    }
  });
}
function form_race() {
  var formDataSubscriber = {
    name: $("#subscriber #name").val(),
    mobile: $("#subscriber #mobile").val(),
    instagram: $("#subscriber #instagram").val(),
    confirm: $("#smsForm #confirm").val(),
    utm_source: sessionStorage.getItem("utm_source"),
    utm_medium: sessionStorage.getItem("utm_medium"),
    utm_campaign: sessionStorage.getItem("utm_campaign"),
    utm_term: sessionStorage.getItem("utm_term"),
    utm_content: sessionStorage.getItem("utm_content"),
    referrer: document.referrer,
  };
  $.ajax({
    type: "POST",
    url: "panel/process.php",
    data: formDataSubscriber,
    dataType: "json",
    enconfirm: true,
  }).done(function (data) {
    if (data["success"] == true) {
      // window.dataLayer = window.dataLayer || [];
      // window.dataLayer.push({ event: "formSubmissionOtp" });
     
     var name = $("#subscriber #name").val();
     sessionStorage.setItem("name", name);
     var mobile = $("#subscriber #mobile").val();
     sessionStorage.setItem("mobile", mobile);

      sessionStorage.setItem("user_id", data["user_id"]);
      
      window.location.href = "race.html";
    } else {

      $(".smsForm .errorValidate").html(data["message"]);
    }
  });
}

function timerSendSms(){
    var timer2 = "2:01";
    $('#smsTimer').show();

    var interval = setInterval(function() {

      var timer = timer2.split(':');
      //by parsing integer, I avoid all extra string processing
      var minutes = parseInt(timer[0], 10);
      var seconds = parseInt(timer[1], 10);
      --seconds;
      minutes = (seconds < 0) ? --minutes : minutes;
      if (minutes < 1) {
        clearInterval(interval);
        $("#smsTimer").hide();
        $("#sendAgain").show();
      }
  
      seconds = (seconds < 0) ? 59 : seconds;
      seconds = (seconds < 10) ? '0' + seconds : seconds;
      //minutes = (minutes < 10) ?  minutes : minutes;
      $('#smsTimer').html(minutes + ':' + seconds);
      timer2 = minutes + ':' + seconds;
    }, 1000);

}
$("#subscriber #mobile").keyup(function (e) {
  $("#subscriber #mobile").val(persianToEnglish($(this).val()));
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


function handleTickInit(tick) {

  // uncomment to set labels to different language
  
  var locale = {
      YEAR_PLURAL: 'Jaren',
      YEAR_SINGULAR: 'Jaar',
      MONTH_PLURAL: 'Maanden',
      MONTH_SINGULAR: 'Maand',
      WEEK_PLURAL: 'Weken',
      WEEK_SINGULAR: 'Week',
      DAY_PLURAL: 'روز',
      DAY_SINGULAR: 'روز',
      HOUR_PLURAL: 'ساعت',
      HOUR_SINGULAR: 'ساعت',
      MINUTE_PLURAL: 'دقیقه',
      MINUTE_SINGULAR: 'دقیقه',
      SECOND_PLURAL: 'ثانیه',
      SECOND_SINGULAR: 'ثانیه',
      MILLISECOND_PLURAL: 'Milliseconden',
      MILLISECOND_SINGULAR: 'Milliseconde'
  };

  for (var key in locale) {
      if (!locale.hasOwnProperty(key)) { continue; }
      tick.setConstant(key, locale[key]);
  }
  

  // format of due date is ISO8601
  // https://en.wikipedia.org/wiki/ISO_8601

  // '2018-01-31T12:00:00'        to count down to the 31st of January 2018 at 12 o'clock
  // '2019'                       to count down to 2019
  // '2018-01-15T10:00:00+01:00'  to count down to the 15th of January 2018 at 10 o'clock in timezone GMT+1

  // create the countdown counter
  var counter = Tick.count.down('2026-06-21T00:00:00+01:00');

  counter.onupdate = function(value) {
    tick.value = value;
  };

  counter.onended = function() {
      // redirect, uncomment the next line
      // window.location = 'my-location.html'

      // hide counter, uncomment the next line
      // tick.root.style.display = 'none';

      // show message, uncomment the next line
      // document.querySelector('.tick-onended-message').style.display = '';
  };
}

// Send Sms Again

$( "#sendAgain" ).click(function() {
  $(this).hide()
  timerSendSms();
});

