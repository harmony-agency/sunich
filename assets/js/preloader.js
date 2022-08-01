const currentURL = $(location).attr("href");

if (window.matchMedia("(max-width: 767px)").matches) {
  let address = currentURL.substring(currentURL.lastIndexOf("/") + 1);

  if (address == "antioxidan.html") {
    $("#anti-preload").trigger("play");
    $("#anti-preload").show();
  }
  if (address == "vitamine.html") {
    $("#vitamine-preload").trigger("play");
    $("#vitamine-preload").show();
  }
  if (address == "nfc.html") {
    $("#nfc-preload").trigger("play");
    $("#nfc-preload").show();
  }

  setTimeout(function () {
    $("#preloader").fadeOut();
  }, 2000);
} else {
  // preloader
  let sectionId = currentURL.split("/");
  if (
    sectionId[1] == "antioxidan-part" ||
    sectionId[1] == "antioxidanSection"
  ) {
    $("#anti-preload").trigger("play");
    $("#anti-preload").show();
  }
  if (sectionId[1] == "vitamine-part" || sectionId[1] == "vitamineSection") {
    $("#vitamine-preload").trigger("play");
    $("#vitamine-preload").show();
  }
  if (sectionId[1] == "nfc-part" || sectionId[1] == "nfcSection") {
    $("#nfc-preload").trigger("play");
    $("#nfc-preload").show();
  }

  setTimeout(function () {
    $("#preloader").fadeOut();
  }, 2000);
}
