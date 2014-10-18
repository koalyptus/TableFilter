/**
 * Cookie utilities
 */

(function(window, TF){
    'use strict';

    TF.Cookie = {};

    TF.Cookie.write = function(name, value, hours){
        var expire = '';
        if(hours){
            expire = new Date((new Date()).getTime() + hours * 3600000);
            expire = '; expires=' + expire.toGMTString();
        }
        document.cookie = name + '=' + escape(value) + expire;
    };

    TF.Cookie.read = function(name){
        var cookieValue = '',
            search = name + '=';
        if(document.cookie.length > 0){
            var cookie = document.cookie,
                offset = cookie.indexOf(search);
            if(offset !== -1){
                offset += search.length;
                var end = cookie.indexOf(';', offset);
                if(end === -1){
                    end = cookie.length;
                }
                cookieValue = unescape(cookie.substring(offset, end));
            }
        }
        return cookieValue;
    };

    TF.Cookie.remove = function(name){
        this.write(name,'',-1);
    };

    TF.Cookie.valueToArray = function(name, separator){
        if(!separator){
            separator = ',';
        }
        //reads the cookie
        var val = this.read(name);
        //creates an array with filters' values
        var arr = val.split(separator);
        return arr;
    };

    TF.Cookie.getValueByIndex = function(name, index, separator){
        if(!separator){
            separator = ',';
        }
        //reads the cookie
        var val = this.valueToArray(name, separator);
        return val[index];
    };

})(this, this.TF);