
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

var scoreCactus = 0;
var scoreBlueberry = 0;
var scoreCherries = 0;
var scorePear = 0;
var scorePortugal = 0;
var scoreApple = 0;
var scoreGrape = 0;
var scoreFruit = 0;
var scoreLemonade = 0;
var scoreMohito = 0;


$("#Cactus").click(function () {
  scoreCactus += Number($(this).attr("value"));
  sessionStorage.setItem("scoreCactus", scoreCactus);
});

$("#Blueberry").click(function () {
  scoreBlueberry += Number($(this).attr("value"));
  sessionStorage.setItem("scoreBlueberry", scoreBlueberry);
});

$("#Cherries").click(function () {
  scoreCherries += Number($(this).attr("value"));
  sessionStorage.setItem("scoreCherries", scoreCherries);
});

$("#Pear").click(function () {
  scorePear += Number($(this).attr("value"));
  sessionStorage.setItem("scorePear", scorePear);
});

$("#Portugal").click(function () {
  scorePortugal += Number($(this).attr("value"));
  sessionStorage.setItem("scorePortugal", scorePortugal);
});

$("#Apple").click(function () {
  scoreApple += Number($(this).attr("value"));
  sessionStorage.setItem("scoreApple", scoreApple);
});

$("#Grape").click(function () {
  scoreGrape += Number($(this).attr("value"));
  sessionStorage.setItem("scoreGrape", scoreGrape);
});

$("#Fruit").click(function () {
  scoreFruit += Number($(this).attr("value"));
  sessionStorage.setItem("scoreFruit", scoreFruit);
});

$("#Lemonade").click(function () {
  scoreLemonade += Number($(this).attr("value"));
  sessionStorage.setItem("scoreLemonade", scoreLemonade);
});

$("#Mohito").click(function () {
  scoreMohito += Number($(this).attr("value"));
  sessionStorage.setItem("scoreMohito", scoreMohito);
});

$("fieldset:last button").click(function () {
  submitScores() ;

});


function submitScores() {
  var formDataScores = {
    user_id: sessionStorage.getItem("user_id"),
    cactus: sessionStorage.getItem("scoreCactus"),
    blueberry: sessionStorage.getItem("scoreBlueberry"),
    cherries: sessionStorage.getItem("scoreCherries"),
    pear: sessionStorage.getItem("scorePear"),
    portugal: sessionStorage.getItem("scorePortugal"),
    apple: sessionStorage.getItem("scoreApple"),
    grape: sessionStorage.getItem("scoreGrape"),
    fruit: sessionStorage.getItem("scoreFruit"),
    lemonade: sessionStorage.getItem("scoreLemonade"),
    mohito: sessionStorage.getItem("scoreMohito"),
  };
  $.ajax({
    type: "POST",
    url: "panel/score.php",
    data: formDataScores,
    dataType: "json",
    enconfirm: true,
  }).done(function (data) {
    if (data["success"] == true) {
      // window.dataLayer = window.dataLayer || [];
      // window.dataLayer.push({ event: "formSubmissionOtp" });
        console.log(data);
    } else {

      console.log(data);
    }
  });
}