$(function () {
    var lazyImages = $('.lazy-image');
    var inAdvance = 300;

    function lazyLoad() {
        lazyImages.each(function () {
            var image = $(this);
            if (image.offset().top < $(window).innerHeight() + $(window).scrollTop() + inAdvance) {
                image.addClass('loaded');
            }
        });
    }

    lazyLoad();

    window.addEventListener('scroll', _.throttle(lazyLoad, 16));
    window.addEventListener('resize', _.throttle(lazyLoad, 16));

});
