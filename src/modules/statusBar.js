define(["exports", "../dom", "../event", "../types", "../helpers"], function (exports, _dom, _event, _types, _helpers) {
    "use strict";

    var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var Dom = _dom.Dom;
    var Event = _event.Event;
    var Types = _types.Types;
    var Helpers = _helpers.Helpers;

    var global = window;

    var StatusBar = exports.StatusBar = (function () {

        /**
         * Status bar UI component
         * @param {Object} tf TableFilter instance
         */

        function StatusBar(tf) {
            _classCallCheck(this, StatusBar);

            // Configuration object
            var f = tf.config();

            //id of custom container element
            this.statusBarTgtId = f.status_bar_target_id || null;
            //element containing status bar label
            this.statusBarDiv = null;
            //status bar
            this.statusBarSpan = null;
            //status bar label
            this.statusBarSpanText = null;
            //defines status bar text
            this.statusBarText = f.status_bar_text || "";
            //defines css class status bar
            this.statusBarCssClass = f.status_bar_css_class || "status";
            //delay for status bar clearing
            this.statusBarCloseDelay = 250;

            //calls function before message is displayed
            this.onBeforeShowMsg = Types.isFn(f.on_before_show_msg) ? f.on_before_show_msg : null;
            //calls function after message is displayed
            this.onAfterShowMsg = Types.isFn(f.on_after_show_msg) ? f.on_after_show_msg : null;

            // status bar div
            this.prfxStatus = "status_";
            // status bar label
            this.prfxStatusSpan = "statusSpan_";
            // text preceding status bar label
            this.prfxStatusTxt = "statusText_";

            this.tf = tf;
        }

        _createClass(StatusBar, {
            init: {
                value: function init() {
                    var tf = this.tf;
                    if (!tf.hasGrid() && !tf.isFirstLoad) {
                        return;
                    }

                    //status bar container
                    var statusDiv = Dom.create("div", ["id", this.prfxStatus + tf.id]);
                    statusDiv.className = this.statusBarCssClass;

                    //status bar label
                    var statusSpan = Dom.create("span", ["id", this.prfxStatusSpan + tf.id]);
                    //preceding text
                    var statusSpanText = Dom.create("span", ["id", this.prfxStatusTxt + tf.id]);
                    statusSpanText.appendChild(Dom.text(this.statusBarText));

                    // target element container
                    if (!this.statusBarTgtId) {
                        tf.setToolbar();
                    }
                    var targetEl = !this.statusBarTgtId ? tf.lDiv : Dom.id(this.statusBarTgtId);

                    // TODO: use alternative to outerHTML
                    if (this.statusBarDiv && Helpers.isIE()) {
                        this.statusBarDiv.outerHTML = "";
                    }

                    //default container: 'lDiv'
                    if (!this.statusBarTgtId) {
                        statusDiv.appendChild(statusSpanText);
                        statusDiv.appendChild(statusSpan);
                        targetEl.appendChild(statusDiv);
                    } else {
                        // custom container, no need to append statusDiv
                        targetEl.appendChild(statusSpanText);
                        targetEl.appendChild(statusSpan);
                    }

                    this.statusBarDiv = statusDiv;
                    this.statusBarSpan = statusSpan;
                    this.statusBarSpanText = statusSpanText;
                }
            },
            message: {
                value: function message() {
                    var _this = this;

                    var t = arguments[0] === undefined ? "" : arguments[0];

                    var tf = this.tf;
                    if (!tf.statusBar || !this.statusBarSpan) {
                        return;
                    }
                    if (this.onBeforeShowMsg) {
                        this.onBeforeShowMsg.call(null, this.tf, t);
                    }

                    var d = t === "" ? this.statusBarCloseDelay : 1;
                    global.setTimeout(function () {
                        _this.statusBarSpan.innerHTML = t;
                        if (_this.onAfterShowMsg) {
                            _this.onAfterShowMsg.call(null, _this.tf, t);
                        }
                    }, d);
                }
            },
            destroy: {
                value: function destroy() {
                    var tf = this.tf;
                    if (!tf.hasGrid() || !this.statusBarDiv) {
                        return;
                    }

                    this.statusBarDiv.innerHTML = "";
                    this.statusBarDiv.parentNode.removeChild(this.statusBarDiv);
                    this.statusBarSpan = null;
                    this.statusBarSpanText = null;
                    this.statusBarDiv = null;
                }
            }
        });

        return StatusBar;
    })();
});
//# sourceMappingURL=statusBar.js.map