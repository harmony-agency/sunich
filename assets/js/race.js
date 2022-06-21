$(function () {
  //jQuery time
  var current_fs, next_fs, previous_fs; //fieldsets
  var left, opacity, scale; //fieldset properties which we will animate
  var animating; //flag to prevent quick multi-click glitches

  $(".next").click(function () {
    if (animating) return false;
    animating = true;

     current_fs = $(this).parent().parent();
    next_fs = $(this).parent().parent().next();

    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active"); //show the next fieldset
    next_fs.css({ opacity: 1 });
    //hide the current fieldset with style
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now, mx) {
          //as the opacity of current_fs reduces to 0 - stored in "now"
          //1. scale current_fs down to 80%
          // scale = 1 - (1 - now) * 0.2;
          //2. bring next_fs from the right(50%)
          left = now * 50 + "%";
          //3. increase opacity of next_fs to 1 as it moves in
          opacity = 1 - now;
          // current_fs.css({ transform: "scale(" + scale + ")" });
          next_fs.css({ left: left, opacity: opacity });
        },
        duration: 800,
        complete: function () {
          current_fs.hide();
          animating = false;
        },
        //this comes from the custom easing plugin
        // easing: "easeInOutBack",
      }
    );
  });
});
var scoreKaktus = 0;
var scoreBluberry = 0;
var scoreAlbalu = 0;
var scoreGolabi = 0;
var scoreOrange = 0;
var scoreApple = 0;
var scoreAngur = 0;
var scoreGarmsiri = 0;
var scoreLimunad = 0;
var scoreMohito = 0;

$(".step1 .next").click(function () {
  answer = Number($(this).attr("value"));
  if (answer == 1) {
    scoreKaktus += 1;
    scoreBluberry += 0;
  } else {
    scoreKaktus += 0;
    scoreBluberry += 1;
  }
  sessionStorage.setItem("scoreKaktus", scoreKaktus);
  sessionStorage.setItem("scoreBluberry", scoreBluberry);
  sessionStorage.setItem("scoreAlbalu", scoreAlbalu);
  sessionStorage.setItem("scoreGolabi", scoreGolabi);
  sessionStorage.setItem("scoreOrange", scoreOrange);
  sessionStorage.setItem("scoreApple", scoreApple);
  sessionStorage.setItem("scoreAngur", scoreAngur);
  sessionStorage.setItem("scoreGarmsiri", scoreGarmsiri);
  sessionStorage.setItem("scoreLimunad", scoreLimunad);
  sessionStorage.setItem("scoreMohito", scoreMohito);
});

$(".step2 .next").click(function () {
  answer = Number($(this).attr("value"));
  if (answer == 1) {
    scoreAlbalu += 1;
    scoreGolabi += 0;
  } else {
    scoreAlbalu += 0;
    scoreGolabi += 1;
  }
  sessionStorage.setItem("scoreKaktus", scoreKaktus);
  sessionStorage.setItem("scoreBluberry", scoreBluberry);
  sessionStorage.setItem("scoreAlbalu", scoreAlbalu);
  sessionStorage.setItem("scoreGolabi", scoreGolabi);
  sessionStorage.setItem("scoreOrange", scoreOrange);
  sessionStorage.setItem("scoreApple", scoreApple);
  sessionStorage.setItem("scoreAngur", scoreAngur);
  sessionStorage.setItem("scoreGarmsiri", scoreGarmsiri);
  sessionStorage.setItem("scoreLimunad", scoreLimunad);
  sessionStorage.setItem("scoreMohito", scoreMohito);
});

$(".step3 .next").click(function () {
  answer = Number($(this).attr("value"));
  if (answer == 1) {
    scoreApple += 1;
    scoreOrange += 0;
  } else {
    scoreApple += 0;
    scoreOrange += 1;
  }
  sessionStorage.setItem("scoreKaktus", scoreKaktus);
  sessionStorage.setItem("scoreBluberry", scoreBluberry);
  sessionStorage.setItem("scoreAlbalu", scoreAlbalu);
  sessionStorage.setItem("scoreGolabi", scoreGolabi);
  sessionStorage.setItem("scoreOrange", scoreOrange);
  sessionStorage.setItem("scoreApple", scoreApple);
  sessionStorage.setItem("scoreAngur", scoreAngur);
  sessionStorage.setItem("scoreGarmsiri", scoreGarmsiri);
  sessionStorage.setItem("scoreLimunad", scoreLimunad);
  sessionStorage.setItem("scoreMohito", scoreMohito);
});

$(".step4 .next").click(function () {
  answer = Number($(this).attr("value"));
  if (answer == 1) {
    scoreGarmsiri += 1;
    scoreAngur += 0;
  } else {
    scoreGarmsiri += 0;
    scoreAngur += 1;
  }
  sessionStorage.setItem("scoreKaktus", scoreKaktus);
  sessionStorage.setItem("scoreBluberry", scoreBluberry);
  sessionStorage.setItem("scoreAlbalu", scoreAlbalu);
  sessionStorage.setItem("scoreGolabi", scoreGolabi);
  sessionStorage.setItem("scoreOrange", scoreOrange);
  sessionStorage.setItem("scoreApple", scoreApple);
  sessionStorage.setItem("scoreAngur", scoreAngur);
  sessionStorage.setItem("scoreGarmsiri", scoreGarmsiri);
  sessionStorage.setItem("scoreLimunad", scoreLimunad);
  sessionStorage.setItem("scoreMohito", scoreMohito);
});

$(".step5 .next").click(function () {
  answer = Number($(this).attr("value"));
  if (answer == 1) {
    scoreLimunad += 1;
    scoreMohito += 0;
  } else {
    scoreLimunad += 0;
    scoreMohito += 1;
  }
  sessionStorage.setItem("scoreKaktus", scoreKaktus);
  sessionStorage.setItem("scoreBluberry", scoreBluberry);
  sessionStorage.setItem("scoreAlbalu", scoreAlbalu);
  sessionStorage.setItem("scoreGolabi", scoreGolabi);
  sessionStorage.setItem("scoreOrange", scoreOrange);
  sessionStorage.setItem("scoreApple", scoreApple);
  sessionStorage.setItem("scoreAngur", scoreAngur);
  sessionStorage.setItem("scoreGarmsiri", scoreGarmsiri);
  sessionStorage.setItem("scoreLimunad", scoreLimunad);
  sessionStorage.setItem("scoreMohito", scoreMohito);
});

function sendPhone() {
  var formDataPhone = {
    phone: $("#phone").val(),
  };

  sessionStorage.setItem("phone", $("#phone").val());

  $.ajax({
    type: "POST",

    url: "panel/process.php",

    data: formDataPhone,

    dataType: "json",

    encode: true,
  }).done(function (data) {
    if (data["success"] == true) {
      $(".bg-signup .submit").attr("disabled", true);
      $(".bg-signup .submit").text("در حال نمایش نتیجه");
      setTimeout(function () {
        window.location.href = "result.html";
      }, 2000);
    } else {
      $(".error-subscribe").html(data["message"]);
      console.log(data);
    }
  });
}
