// Aos animation
AOS.init();

<<<<<<< HEAD
var antioxidanLottie = bodymovin.loadAnimation({
    // animationData: { /* ... */ },
    container: document.getElementById("antioxidanLottie"), // required
    path: "antioxidanLottie.json", // required
    renderer: "svg", // required
    autoplay: true, // optional
    loop: false, // Optional
});
var vitamineLottie = bodymovin.loadAnimation({
    // animationData: { /* ... */ },
    container: document.getElementById("vitamineLottie"), // required
    path: "vitamineLottie.json", // required
    renderer: "svg", // required
    autoplay: true, // optional
    loop: false, // Optional

});
var nfcLottie = bodymovin.loadAnimation({
    // animationData: { /* ... */ },
    container: document.getElementById("nfcLottie"), // required
    path: "nfcLottie.json", // required
    renderer: "svg", // required
    autoplay: true, // optional
    loop: false, // Optional
});

var swiper = new Swiper("#home-carousel", {
    slidesPerView: 2.5,
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

  var windowHeight = $(window).height();

  $(document).ready(function () {
    $(".main-box").css("height", $(window).height() - 140);
    $(".box-img").css("height", $(window).height() * 0.5);
  });
  $(window).resize(function () {
    $(".main-box").css("height", $(window).height() - 140);
    $(".box-img").css("height", $(window).height() * 0.5);
  });
=======
jQuery(".next").click(function () {
    if (animating) return false;
    animating = true;

    current_fs = jQuery(this).parent();
    next_fs = jQuery(this).parent().next();

    //activate next step on progressbar using the index of next_fs
    jQuery("#progressbar li").eq(jQuery("fieldset").index(next_fs)).addClass("active");

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({
        opacity: 0
    }, {
        step: function (now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale current_fs down to 80%
            scale = 1 - (1 - now) * 0.2;
            //2. bring next_fs from the right(50%)
            left = (now * 50) + "%";
            //3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
                'transform': 'scale(' + scale + ')',
                'position': 'absolute'
            });
            next_fs.css({
                'left': left,
                'opacity': opacity
            });
        },
        duration: 800,
        complete: function () {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
});

jQuery(".previous").click(function () {
    if (animating) return false;
    animating = true;

    current_fs = jQuery(this).parent();
    previous_fs = jQuery(this).parent().prev();

    //de-activate current step on progressbar
    jQuery("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

    //show the previous fieldset
    previous_fs.show();
    //hide the current fieldset with style
    current_fs.animate({
        opacity: 0
    }, {
        step: function (now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale previous_fs from 80% to 100%
            scale = 0.8 + (1 - now) * 0.2;
            //2. take current_fs to the right(50%) - from 0%
            left = ((1 - now) * 50) + "%";
            //3. increase opacity of previous_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
                'left': left
            });
            previous_fs.css({
                'transform': 'scale(' + scale + ')',
                'opacity': opacity
            });
        },
        duration: 800,
        complete: function () {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
});

jQuery(".submit").click(function (e) {
    e.preventDefault();
    form_submit();
    //return false;
})

jQuery(".submit2").click(function (e) {
    e.preventDefault();
    package_submit();
    //return false;
})
jQuery(".reg-package").click(function () {
    jQuery('.package').val(jQuery(this).data('package'));
    jQuery('.modal-subtitle').html(jQuery(this).data('name'));
});

function form_submit() {

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

    var mobile = jQuery("#msform #mobile").val();
    if (mobile == '') {
        jQuery("#msform .error-mobile").html('شماره تماس را وارد کنید');
    }

    var phone = jQuery("#msform #phone").val();
    if (phone == '') {
        jQuery("#msform .error-phone").html('شماره تلفن را وارد کنید');
    }

    if (mobile != "" && phone != "") {
        var formDataSubscriber = {
            fullname: jQuery("#msform #fullname").val(),
            mobile: jQuery("#msform #mobile").val(),
            phone: jQuery("#msform #phone").val(),
            volume: jQuery("#msform #volume").val(),
            speed: jQuery("#msform #speed").val(),
            duration: jQuery("#msform input[name=duration]:checked").val(),
            utm_source: sessionStorage.getItem("utm_source"),
            utm_medium: sessionStorage.getItem("utm_medium"),
            utm_campaign: sessionStorage.getItem("utm_campaign"),
            utm_term: sessionStorage.getItem("utm_term"),
            utm_content: sessionStorage.getItem("utm_content"),
        };
        jQuery.ajax({
            type: "POST",
            url: "panel/process.php",
            data: formDataSubscriber,
            dataType: "json",
            success: function (data) {
                // console.log(data);
                if (data["success"] == true) {
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                        'event': 'formSubmission'
                    });
                    jQuery("#form .error-mobile").hide();
                    jQuery("#form .error-phone").hide();
                    jQuery("#msform").hide();
                    jQuery("#form .result").html(
                        '<div class="success-submit">' + data["message"] + "</div>"
                    );
                } else {
                    jQuery("#form .error-mobile").show();
                    jQuery("#form .error-mobile").html(data["message"]);
                    jQuery("#form .error-phone").show();
                    jQuery("#form .error-phone").html(data["message"]);
                }
            },
            error: function (log) {
                console.log(log);
            }
        });
    }

}


function package_submit() {
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

    var mobile = jQuery(".package-form #p_mobile").val();
    if (mobile == '') {
        jQuery(".package-form .error-mobile").html('شماره تماس را وارد کنید');
    }

    var phone = jQuery(".package-form #p_phone").val();
    if (phone == '') {
        jQuery(".package-form .error-phone").html('شماره تلفن را وارد کنید');
    }

    if (mobile != "" && phone != "") {
        var formDataSubscriber = {
            p_fullname: jQuery(".package-form #p_fullname").val(),
            p_mobile: jQuery(".package-form #p_mobile").val(),
            p_phone: jQuery(".package-form #p_phone").val(),
            package: jQuery('.package').val(),
            utm_source: sessionStorage.getItem("utm_source"),
            utm_medium: sessionStorage.getItem("utm_medium"),
            utm_campaign: sessionStorage.getItem("utm_campaign"),
            utm_term: sessionStorage.getItem("utm_term"),
            utm_content: sessionStorage.getItem("utm_content"),
        };
        jQuery.ajax({
            type: "POST",
            url: "panel/process.php",
            data: formDataSubscriber,
            dataType: "json",
            success: function (data) {
                // console.log(data);
                if (data["success"] == true) {
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                        'event': 'formSubmission'
                    });
                    jQuery(".package-modal .error-mobile").hide();
                    jQuery(".package-modal .error-phone").hide();
                    jQuery(".package-form").hide();
                    jQuery(".modal-header").hide();
                    jQuery(".package-modal .result").html(
                        '<div class="success-submit">' + data["message"] + "</div>"
                    );
                } else {
                    jQuery(".package-modal .error-mobile").show();
                    jQuery(".package-modal .error-mobile").html(data["message"]);
                    jQuery(".package-modal .error-phone").show();
                    jQuery(".package-modal .error-phone").html(data["message"]);
                }
            },
            error: function (log) {
                console.log(log);
            }
        });
    }

}

// Aos animation
AOS.init();


var animation = bodymovin.loadAnimation({
    // animationData: { /* ... */ },
    container: document.getElementById("antioxidanLottie"), // required
    path: "antioxidanLottie.json", // required
    renderer: "svg", // required
    autoplay: true, // optional
    name: "Demo Animation", // optional
});
var animation = bodymovin.loadAnimation({
    // animationData: { /* ... */ },
    container: document.getElementById("vitamineLottie"), // required
    path: "vitamineLottie.json", // required
    renderer: "svg", // required
    autoplay: true, // optional
    name: "Demo Animation", // optional
});
var animation = bodymovin.loadAnimation({
    // animationData: { /* ... */ },
    container: document.getElementById("nfcLottie"), // required
    path: "nfcLottie.json", // required
    renderer: "svg", // required
    autoplay: true, // optional
    name: "Demo Animation", // optional
});
>>>>>>> 7915a7b56aff93255f85e5a51b5f4e4eb60ee7b7
