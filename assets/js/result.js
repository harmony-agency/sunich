// const progress = document.querySelector('.progress');
  
// progress.addEventListener('input', function() {
//   const value = this.value;
//   this.style.background = `linear-gradient(to right, #692B6F 0%, #692B6F ${value}%, rgba(105, 43, 111, 0.15) ${value}%, rgba(105, 43, 111, 0.15) 100%)`
// })
 

// (A) GET FROM SESSION

$.ajax({
  type: "POST",
  url: "panel/score.php",
  data: { resultScore : 'All'},
  dataType: "json",
  enconfirm: true,
}).done(function (data) {
  if (data["success"] == true) {
    // window.dataLayer = window.dataLayer || [];
    // window.dataLayer.push({ event: "formSubmissionOtp" });
    showResult(data);
      
  } else {

    console.log(data);
  }
});

function showResult(data){


  var JSONData = JSON.stringify(data);


  var objData = jQuery.parseJSON(JSONData);


  $('.line1 .right .percent').html(objData.blueberry);
  $('.line1 .left .percent').html(objData.cactus);

  if(objData.cactus > objData.blueberry){

    $('.line1 .goNextTitle').html('کاکتوس گازدار');

  }else{

    $('.line1 .goNextTitle').html('بلوبری گازدار');
  }


  $('.line2 .right .percent').html(objData.pear);
  $('.line2 .left .percent').html(objData.cherries);

  $('.line3 .right .percent').html(objData.apple);
  $('.line3 .left .percent').html(objData.portugal);

  $('.line4 .right .percent').html(objData.fruit);
  $('.line4 .left .percent').html(objData.grape);


  $('.line5 .right .percent').html(objData.mohito);
  $('.line5 .left .percent').html(objData.lemonade);

}
// if (scoreCactus  > scoreBlueberry) {
//   $(".line1 .goNextTitle").html('کاکتوس گازدار');
// }else{
//   $(".line1 .goNextTitle").html('بلوبری گازدار');
// }

// (B) IT WORKS!
// Manually opening 1b-session.html will not work though
// Session data will perish once tab/window is closed

// (EXTRA) TO CLEAR
// sessionStorage.removeItem("KEY");
// sessionStorage.clear();

