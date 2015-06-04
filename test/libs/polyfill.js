
// PhantomJS doesn't support bind yet
// https://github.com/ariya/phantomjs/issues/10522

Function.prototype.bind = Function.prototype.bind || function (thisp) {
    var fn = this;
    return function () {
        return fn.apply(thisp, arguments);
    };
};
