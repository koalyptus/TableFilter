define(['exports', '../dom', '../types'], function (exports, _dom, _types) {
    'use strict';

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

    var global = window;

    /**
     * Loading message/spinner
     * @param {Object} tf TableFilter instance
     */

    var Loader = (function () {
        function Loader(tf) {
            _classCallCheck(this, Loader);

            // TableFilter configuration
            var f = tf.config();
            //id of container element
            this.loaderTgtId = f.loader_target_id || null;
            //div containing loader
            this.loaderDiv = null;
            //defines loader text
            this.loaderText = f.loader_text || 'Loading...';
            //defines loader innerHtml
            this.loaderHtml = f.loader_html || null;
            //defines css class for loader div
            this.loaderCssClass = f.loader_css_class || 'loader';
            //delay for hiding loader
            this.loaderCloseDelay = 200;
            //callback function before loader is displayed
            this.onShowLoader = _types.Types.isFn(f.on_show_loader) ? f.on_show_loader : null;
            //callback function after loader is closed
            this.onHideLoader = _types.Types.isFn(f.on_hide_loader) ? f.on_hide_loader : null;
            //loader div
            this.prfxLoader = 'load_';

            this.tf = tf;

            var containerDiv = _dom.Dom.create('div', ['id', this.prfxLoader + tf.id]);
            containerDiv.className = this.loaderCssClass;

            var targetEl = !this.loaderTgtId ? tf.tbl.parentNode : _dom.Dom.id(this.loaderTgtId);
            if (!this.loaderTgtId) {
                targetEl.insertBefore(containerDiv, tf.tbl);
            } else {
                targetEl.appendChild(containerDiv);
            }
            this.loaderDiv = _dom.Dom.id(this.prfxLoader + tf.id);
            if (!this.loaderHtml) {
                this.loaderDiv.appendChild(_dom.Dom.text(this.loaderText));
            } else {
                this.loaderDiv.innerHTML = this.loaderHtml;
            }
        }

        _createClass(Loader, [{
            key: 'show',
            value: function show(p) {
                var _this = this;

                if (!this.tf.loader || !this.loaderDiv || this.loaderDiv.style.display === p) {
                    return;
                }

                var displayLoader = function displayLoader() {
                    if (!_this.loaderDiv) {
                        return;
                    }
                    if (_this.onShowLoader && p !== 'none') {
                        _this.onShowLoader.call(null, _this);
                    }
                    _this.loaderDiv.style.display = p;
                    if (_this.onHideLoader && p === 'none') {
                        _this.onHideLoader.call(null, _this);
                    }
                };

                var t = p === 'none' ? this.loaderCloseDelay : 1;
                global.setTimeout(displayLoader, t);
            }
        }, {
            key: 'remove',
            value: function remove() {
                if (!this.loaderDiv) {
                    return;
                }
                var tf = this.tf,
                    targetEl = !this.loaderTgtId ? tf.gridLayout ? tf.Cpt.gridLayout.tblCont : tf.tbl.parentNode : _dom.Dom.id(this.loaderTgtId);
                targetEl.removeChild(this.loaderDiv);
                this.loaderDiv = null;
            }
        }]);

        return Loader;
    })();

    exports.Loader = Loader;
});
//# sourceMappingURL=loader.js.map