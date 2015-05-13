define(['exports', './string'], function (exports, _string) {
  'use strict';

  var Sort = {
    ignoreCase: function ignoreCase(a, b) {
      var x = _string.Str.lower(a);
      var y = _string.Str.lower(b);
      return x < y ? -1 : x > y ? 1 : 0;
    }
  };

  exports.Sort = Sort;
});
/**
 * Sort helpers
 */
//# sourceMappingURL=sort.js.map