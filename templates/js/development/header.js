$(function () {

    $('.header').e11_MobileNav();

});

(function ($, window, document, undefined) {

    var name = 'MobileNav';

    function MobileNav(element, index, options) {
        this.$el = $(element);
        this.options = $.extend({}, $.e11.fn[name].defaults, options);
        this.init();
    }

    MobileNav.prototype = {

        name: name,

        init: function () {

            var self = this;

            this.$toggle = this.$el.find('.js-nav-toggle');
            this.activeClass = 'nav__visible';

            this.$toggle.on('click', function (e) {
                e.preventDefault();

                self.$el.toggleClass(self.activeClass);
            });
        }
    };

    $.e11.fn.pluginGenerator(MobileNav);

})
(jQuery, window, document);
