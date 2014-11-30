define(["exports", "../cookie"], function (exports, _cookie) {
  "use strict";

  var _classProps = function (child, staticProps, instanceProps) {
    if (staticProps) Object.defineProperties(child, staticProps);
    if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
  };

  var Cookie = _cookie.Cookie;
  var Store = (function () {
    var Store = function Store(tf) {
      var f = tf.fObj;

      this.duration = !isNaN(f.set_cookie_duration) ? parseInt(f.set_cookie_duration, 10) : 100000;

      this.tf = tf;
    };

    _classProps(Store, null, {
      saveFilterValues: {
        writable: true,
        value: function (name) {
          var tf = this.tf;
          var flt_values = [];
          //store filters' values
          for (var i = 0; i < tf.fltIds.length; i++) {
            var value = tf.GetFilterValue(i);
            if (value === "") {
              value = " ";
            }
            flt_values.push(value);
          }
          //adds array size
          flt_values.push(tf.fltIds.length);
          //writes cookie
          Cookie.write(name, flt_values.join(tf.separator), this.duration);
        }
      }
    });

    return Store;
  })();

  exports.Store = Store;
});