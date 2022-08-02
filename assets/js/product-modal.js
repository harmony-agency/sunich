
$("#product-carousel-modal a").click(function () {

    let htmlContent = $(this).data("content");
    let folder = $(this).data("folder");
    $("#productModal .product-content").load(
      "product/" + folder + "/" + htmlContent + ".html"
    );

    setTimeout(function () {
        $('#productModal').animate({ scrollTop: 0 }, 'slow');
    }, 2000);



  });

  var swiper = new Swiper("#product-carousel-modal", {
    slidesPerView: 1.5,
    spaceBetween: 5,
    slidesPerGroup: 1,
    loop: true,
    loopFillGroupWithBlank: true,
    autoplay: {
      delay: 2500,
    },
    navigation: {
      nextEl: ".swiper-next",
      prevEl: ".swiper-prev",
    },
  });



