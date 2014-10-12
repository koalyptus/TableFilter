/**
 * String utilities
 */

(function(window, TF){
    'use strict';

    TF.Str = {};

    TF.Str.lower = function(text){
        return text.toLowerCase();
    };

    TF.Str.upper = function(text){
        return text.toUpperCase();
    };

    TF.Str.trim = function(text){
        return text.replace(/(^[\s\xA0]*)|([\s\xA0]*$)/g,'');
    };

    TF.Str.isEmpty = function(text){
        return this.trim(text) === '';
    };

    TF.Str.rgxEsc = function(text){
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

    TF.Str.matchCase = function(text, mc){
        if(!mc){
            return this.lower(text);
        }
        return text;
    };

})(this, this.TF || {});