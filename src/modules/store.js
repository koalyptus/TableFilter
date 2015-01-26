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
          var fltValues = [];
          //store filters' values
          for (var i = 0; i < tf.fltIds.length; i++) {
            var value = tf.GetFilterValue(i);
            if (value === "") {
              value = " ";
            }
            fltValues.push(value);
          }
          //adds array size
          fltValues.push(tf.fltIds.length);

          //writes cookie
          Cookie.write(name, fltValues.join(tf.separator), this.duration);
        }
      },
      getFilterValues: {
        writable: true,
        value: function (name) {
          var flts = Cookie.read(name);
          var rgx = new RegExp(this.tf.separator, "g");
          // filters' values array
          return flts.split(rgx);
        }
      },
      savePageNb: {
        writable: true,
        value: function (name) {
          Cookie.write(name, this.tf.Cpt.paging.currentPageNb, this.duration);
        }
      },
      getPageNb: {
        writable: true,
        value: function (name) {
          return Cookie.read(name);
        }
      },
      savePageLength: {
        writable: true,
        value: function (name) {
          Cookie.write(name, this.tf.Cpt.paging.resultsPerPageSlc.selectedIndex, this.duration);
        }
      },
      getPageLength: {
        writable: true,
        value: function (name) {
          return Cookie.read(name);
        }
      }
    });

    return Store;
  })();

  exports.Store = Store;
});