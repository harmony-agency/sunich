$.ajax({
  type: "POST",
  url: "panel/result.php",
  data: { resultScore : 'All'},
  dataType: "json",
  enconfirm: true,
}).done(function (data) {
  if (data["success"] == true) {
    // window.dataLayer = window.dataLayer || [];
    // window.dataLayer.push({ event: "formSubmissionOtp" });
    showWaveResult(data);
      
  } else {

    console.log(data);
  }
});

function showWaveResult(data){

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
  
    $('#Blueberry #percent').html(percentBlueberry + '%');

    const waveBlueberry = document.querySelector(`#Blueberry .wave`);
    waveBlueberry.style.setProperty(`--progress-value`, objData.blueberry);

    $('#Cactus #percent').html(percentCactus + '%');
  
    const waveCactus = document.querySelector(`#Cactus .wave`);
    waveCactusstyle.setProperty(`--progress-value`, objData.cactus);

  
    $('#Pear #percent').html(percentPear + '%');
    $('#Cherries #percent').html(percentCherries + '%');

  
    $('#Apple #percent').html(percentApple + '%');
    $('#Portugal #percent').html(percentPortugal + '%');
  
  
    $('#Fruit #percent').html(percentFruit + '%');
    $('#Grape #percent').html(percentGrape + '%');
  
  
    $('#Mohito #percent').html(percentMohito + '%');
    $('#Lemonade #percent').html(percentLemonade + '%');
  

  }