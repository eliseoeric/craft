/*
 * On the head set the plugin's name, version, author details and license
 * for example, for example:
 *
 * ------------------------------------------------------------------------
 *
 * jquery-plugin.js Version 0.1
 * jQuery Plugin Boilerplate code helps creating your custom jQuery plugins.
 *
 * Licensed under MIT license
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright (c) 2013 Antonio Santiago
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

(function ($, window, document, undefined) {

    var namespace = 'e11';

    if (!$[namespace]) {
        $[namespace] = {};
    }

    if (!$[namespace].fn) {
        $[namespace].fn = {};
    }

    $[namespace].fn.pluginGenerator = function (Plugin) {

        $[namespace].fn[Plugin.prototype.name] = function (options) {
            var args = arguments;

            if (options === undefined || typeof options === 'object') {
                // Creates a new plugin instance, for each selected element, and
                // stores a reference withint the element's data
                return this.each(function (i) {
                    if (!$.data(this, namespace + '_' + Plugin.prototype.name)) {
                        $.data(this, namespace + '_' + Plugin.prototype.name, new Plugin(this, i, options));
                    }
                });
            } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
                // Call a public pluguin method (not starting with an underscore) for each
                // selected element.
                if (Array.prototype.slice.call(args, 1).length === 0 && $.inArray(options, $[namespace].fn[Plugin.prototype.name].getters) !== -1) {
                    // If the user does not pass any arguments and the method allows to
                    // work as a getter then break the chainability so we can return a value
                    // instead the element reference.
                    var instance = $.data(this[0], namespace + '_' + Plugin.prototype.name);
                    return instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                } else {
                    // Invoke the speficied method on each selected element
                    return this.each(function () {
                        var instance = $.data(this, namespace + '_' + Plugin.prototype.name);
                        if (instance instanceof Plugin && typeof instance[options] === 'function') {
                            var removeData = function() {
                                instance.$el
                                    .removeData(namespace + '_' + Plugin.prototype.name);
                            };
                            if (options === 'destroy') {
                                if (instance.destroy && typeof instance.destroy === 'function') {
                                    instance.destroy.call(instance, removeData);
                                } else {
                                    removeData();
                                }

                            } else {
                                instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                            }
                        }
                    });
                }
            }
        };

        $[namespace].fn[Plugin.prototype.name].getters = [];

        $.fn[namespace + '_' + Plugin.prototype.name] = function (options) {
            $[namespace].fn[Plugin.prototype.name].apply(this, arguments);
        };

    };

})(jQuery, window, document);
