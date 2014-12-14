define(["exports", "../cookie"], function (exports, _cookie) {
  "use strict";

  var Cookie = _cookie.Cookie;
  var Store = (function () {
    var Store =

    /**
     * Store, persistence manager
     * @param {Object} tf TableFilter instance
     */
    function Store(tf) {
      var f = tf.fObj;

      this.duration = !isNaN(f.set_cookie_duration) ? parseInt(f.set_cookie_duration, 10) : 100000;

      this.tf = tf;
    };

    Store.prototype.saveFilterValues = function (name) {
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
    };

    Store.prototype.getFilterValues = function (name) {
      var flts = Cookie.read(name);
      var rgx = new RegExp(this.tf.separator, "g");
      // filters' values array
      return flts.split(rgx);
    };

    Store.prototype.savePageNb = function (name) {
      Cookie.write(name, this.tf.currentPageNb, this.duration);
    };

    Store.prototype.getPageNb = function (name) {
      return Cookie.read(name);
    };

    Store.prototype.savePageLength = function (name) {
      Cookie.write(name, this.tf.resultsPerPageSlc.selectedIndex, this.duration);
    };

    Store.prototype.getPageLength = function (name) {
      return Cookie.read(name);
    };

    return Store;
  })();

  exports.Store = Store;
});