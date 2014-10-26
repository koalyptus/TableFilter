/**
 * String utilities
 */

define(function () {
    'use strict';

    var Str = {};

    Str.lower = function(text){
        return text.toLowerCase();
    };

    Str.upper = function(text){
        return text.toUpperCase();
    };

    Str.trim = function(text){
        if (text.trim){
            return text.trim();
        }
        return text.replace(/^\s*|\s*$/g, '');
    };

    Str.isEmpty = function(text){
        return this.trim(text) === '';
    };

    Str.rgxEsc = function(text){
        function escape(e){
            var a = new RegExp('\\'+e,'g');
            text = text.replace(a,'\\'+e);
        }

        var chars = ['\\','[','^','$','.','|','?','*','+','(',')'];
        for(var e=0; e<chars.length; e++){
            escape(chars[e]);
        }
        return text;
    };

    Str.matchCase = function(text, mc){
        if(!mc){
            return this.lower(text);
        }
        return text;
    };

    return Str;
});
