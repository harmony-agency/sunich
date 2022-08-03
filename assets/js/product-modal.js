$("#product-carousel-modal a").click(function () {
  const self = this; 
  setTimeout(function () {

    let htmlContent = $(self).data("content");
    let folder = $(self).data("folder");
    $("#productModal .product-content").load(
      "product/" + folder + "/" + htmlContent + ".html"
    );

    $("#productModal").animate({ scrollTop: 0 }, "slow");
  }, 2000);

  $(self).find("img").addClass("rotate");
});

var swiper = new Swiper("#product-carousel-modal", {
  slidesPerView: 1.5,
  spaceBetween: 5,
  slidesPerGroup: 1,
  // loop: true,
  loopFillGroupWithBlank: true,
  // autoplay: {
  //   delay: 2500,
  // },
  navigation: {
    nextEl: ".swiper-next",
    prevEl: ".swiper-prev",
  },
});
