define(["exports", "string"], function (exports, _string) {
  /**
   * Sort helpers
   */

  "use strict";

  var Str = _string.Str;

  var Sort = {
    ignoreCase: function ignoreCase(a, b) {
      var x = Str.lower(a);
      var y = Str.lower(b);
      return x < y ? -1 : x > y ? 1 : 0;
    }
  };

  exports.Sort = Sort;
});
//# sourceMappingURL=sort.js.map