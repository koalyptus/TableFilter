/**
 * Misc helpers
 */

define(function (require) {
    'use strict';

    var Helpers = {
        isIE: function(){
            return (/msie|MSIE/).test(navigator.userAgent);
        }
    };

    return Helpers;
});
