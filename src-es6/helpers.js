/**
 * Misc helpers
 */

import {Str} from 'string';

var Helpers = {
    isIE(){
        return (/msie|MSIE/).test(navigator.userAgent);
    },

    removeNbFormat(data, format){
        if(!data){
            return;
        }
        if(!format){
            format = 'us';
        }
        var n = data;
        if(Str.lower(format)==='us'){
            n =+ n.replace(/[^\d\.-]/g,'');
        } else {
            n =+ n.replace(/[^\d\,-]/g,'').replace(',','.');
        }
        return n;
    }
};

exports.Helpers = Helpers;
