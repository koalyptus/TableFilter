define(["exports"], function (exports) {
    "use strict";

    /**
     * Cookie utilities
     */

    var Cookie = {};

    Cookie.write = function (name, value, hours) {
        var expire = "";
        if (hours) {
            expire = new Date(new Date().getTime() + hours * 3600000);
            expire = "; expires=" + expire.toGMTString();
        }
        document.cookie = name + "=" + escape(value) + expire;
    };

    Cookie.read = function (name) {
        var cookieValue = "",
            search = name + "=";
        if (document.cookie.length > 0) {
            var cookie = document.cookie,
                offset = cookie.indexOf(search);
            if (offset !== -1) {
                offset += search.length;
                var end = cookie.indexOf(";", offset);
                if (end === -1) {
                    end = cookie.length;
                }
                cookieValue = unescape(cookie.substring(offset, end));
            }
        }
        return cookieValue;
    };

    Cookie.remove = function (name) {
        this.write(name, "", -1);
    };

    Cookie.valueToArray = function (name, separator) {
        if (!separator) {
            separator = ",";
        }
        //reads the cookie
        var val = this.read(name);
        //creates an array with filters' values
        var arr = val.split(separator);
        return arr;
    };

    Cookie.getValueByIndex = function (name, index, separator) {
        if (!separator) {
            separator = ",";
        }
        //reads the cookie
        var val = this.valueToArray(name, separator);
        return val[index];
    };

    exports.Cookie = Cookie;
});
//# sourceMappingURL=cookie.js.map