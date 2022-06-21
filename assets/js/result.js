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



  var percentBlueberry = objData.blueberry/100 ;
  var percentCactus= objData.cactus/100 ;
  var percentPear= objData.pear/100 ;
  var percentCherries = objData.cherries/100 ;
  var percentApple = objData.apple/100 ;
  var percentPortugal= objData.portugal/100 ;
  var percentFruit = objData.fruit/100 ;
  var percentGrape = objData.grape/100 ;
  var percentMohito = objData.mohito/100 ;
  var percentLemonade = objData.lemonade/100 ;

  $('.line1 .right .percent').html(percentBlueberry + '%');
  $('.line1 .left .percent').html(percentCactus + '%');



  showRangeResult('progress',0,percentBlueberry) ;
  showRangeResult('progress',1,percentCactus)



  if(percentCactus > percentBlueberry){

    $('.line1 .goNextTitle').html('کاکتوس گازدار');


  }else{

    $('.line1 .goNextTitle').html('بلوبری گازدار');
  }




  $('.line2 .right .percent').html(percentPear + '%');
  $('.line2 .left .percent').html(percentCherries + '%');


  showRangeResult('progress',2,percentPear);
  showRangeResult('progress',3,percentCherries)



  if(percentCherries > percentPear){

    $('.line2 .goNextTitle').html('آلبالو گازدار');

  }else{

    $('.line2 .goNextTitle').html('گلابی گازدار');
  }

  $('.line3 .right .percent').html(percentApple + '%');
  $('.line3 .left .percent').html(percentPortugal + '%');


  showRangeResult('progress',4,percentApple);
  showRangeResult('progress',5,percentPortugal)




  if(percentPortugal > percentApple){

    $('.line3 .goNextTitle').html('پرتغال گازدار');

  }else{

    $('.line3 .goNextTitle').html('سیب گازدار');
  }


  $('.line4 .right .percent').html(percentFruit + '%');
  $('.line4 .left .percent').html(percentGrape + '%');


  showRangeResult('progress',6,percentFruit);
  showRangeResult('progress',7,percentGrape)


  if(percentGrape > percentFruit){

    $('.line4 .goNextTitle').html('انگور گازدار');

  }else{

    $('.line4 .goNextTitle').html('میوه گرمسیری گازدار');
  }


  $('.line5 .right .percent').html(percentMohito + '%');
  $('.line5 .left .percent').html(percentLemonade + '%');


  showRangeResult('progress',8,percentMohito);
  showRangeResult('progress',9,percentLemonade)


  if(percentLemonade > percentMohito){

    $('.line5 .goNextTitle').html('لیموناد گازدار');

  }else{

    $('.line5 .goNextTitle').html(' موهیتو گازدار');
  }


}


function showRangeResult(element,number,value){

   let inputRange = document.getElementsByClassName(element);
   inputRange[number].style.background = `linear-gradient(to right, #692B6F 0%, #692B6F ${value}%, rgba(105, 43, 111, 0.15) ${value}%, rgba(105, 43, 111, 0.15) 100%)`

}

// (B) IT WORKS!
// Manually opening 1b-session.html will not work though
// Session data will perish once tab/window is closed

// (EXTRA) TO CLEAR
// sessionStorage.removeItem("KEY");
// sessionStorage.clear();

