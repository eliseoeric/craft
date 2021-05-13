jQuery(document).ready(function ($) {
    //Sticky Header
    if ($(".header").length > 0) {
        var scrollPosition = $(document).scrollTop();
        if (scrollPosition > 50) {
            $('.header').addClass('header--fixed');
            $('.header-space').addClass("is-active");
        } else {
            $('.header').removeClass('header--fixed');
            $('.header-space').removeClass("is-active");
        }

        $(window).scroll(function () {
            var scrollPosition = $(document).scrollTop();
            if (scrollPosition > 50) {
                $('.header').addClass('header--fixed');
                $('.header-space').addClass("is-active");
            } else {
                $('.header').removeClass('header--fixed');
                $('.header-space').removeClass("is-active");
            }
        });
    }

    function dynamicSlideWidth() {
        var width = $('.case-study').width();


        if ($(window).width() >= 768) {
            $('.carousel__item').css({
                width: (width * 0.8723404255319149)
            });
        } else {
            $('.carousel__item').css({
                width: width
            });
        }

    }

    dynamicSlideWidth();

    $(window).on('resize', function () {
        dynamicSlideWidth()
    });

    $('.carousel').slick({
        slideToShow: 1,
        dots: false,
        variableWidth: true,
        nextArrow: '<button type="button" class="slick-next"><svg class="icon icon-angle-right"><use xlink:href="#icon-angle-right"></use></svg></button>',
        prevArrow: '<button type="button" class="slick-prev"><svg class="icon icon-angle-left"><use xlink:href="#icon-angle-left"></use></svg></button>'
    })

    $('.carousel__item').on('click', function () {
        $('.carousel').slick('slickNext');
    });


    $('.showcase-block__items').slick({
        variableWidth: true,
        arrows: false,
        dots: false,
        infinite: false,
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: 'unslick'
            }
        ]
    });


    function resizeIframe(iframe) {
        if ($(iframe).length < 0) {
            var width = $(iframe).width();
            $(iframe).css('height', width * 0.7434456928838951);
        }
    }

    resizeIframe('.media-block__video');

    $(window).on('resize', function () {
        dynamicSlideWidth();
        resizeIframe('.media-block__video');
    });

    // var elm = $('.showcase-block__items');
    // var isDown = false;
    // var startX;
    // var scrollLeft;
    //
    //
    // $(elm).mousedown(function (e) {
    //     isDown = true;
    //     $(this).addClass('active');
    //     startX = e.pageX - $(elm).offset().left;
    //     scrollLeft = $(elm).scrollLeft();
    // });
    //
    // $(elm).mouseleave(function (e) {
    //     isDown = false;
    //     $(this).removeClass('active');
    // });
    //
    // $(elm).mouseup(function (e) {
    //     isDown = false;
    //     $(this).removeClass('active');
    // });
    //
    // $(this).mousemove(function (e) {
    //     if (!isDown) {
    //         return;
    //     }
    //     e.preventDefault();
    //     var x = e.pageX - (elm).offset().left;
    //     var walk = (x - startX) * 2;
    //     $(elm).animate({scrollLeft: scrollLeft - walk}, 0)
    // });


    $('.accordion-block__card-title').click(function(j) {

        var dropDown = $(this).closest('.accordion-block__card').find('.accordion-block__card-panel');
        $(this).closest('.accordion-block__list').find('.accordion-block__card-panel').not(dropDown).slideUp();

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).closest('.accordion-block__list').find('.accordion-block__card-title.active').removeClass('active');
            $(this).addClass('active');
        }

        dropDown.stop(false, true).slideToggle();
        j.preventDefault();
    });

    if ($(".accordion-block__card-title").length > 0) {
        $('.accordion-block__list .accordion-block__card:first-child .accordion-block__card-title').click();
    }

    $(".work-block__list li").mouseover(function () {
        $(this).siblings().addClass("fade");
    }).mouseout(function () {
        $(this).siblings().removeClass("fade");
    });

    $(".news-list__item").mouseover(function () {
        $(this).siblings().addClass("fade");
    }).mouseout(function () {
        $(this).siblings().removeClass("fade");
    });

    $(".contact-block__list-item").mouseover(function () {
        $(this).siblings().addClass("fade");
    }).mouseout(function () {
        $(this).siblings().removeClass("fade");
    });

    $('.image-list').slick({
        variableWidth: true,
        arrows: false,
        dots: false,
        infinite: false,
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 768,
                settings: 'unslick'
            }
        ]
    });

    if ($('.marquee-block__text').length > 0) {
        $('.marquee-block__text').marquee({
            duration: 15000,
            gap: 10,
            delayBeforeStart: 0,
            direction: 'left',
            duplicated: true,
            startVisible: true
        });
    }


});


