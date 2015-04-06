define(["exports", "../dom", "../event"], function (exports, _dom, _event) {
    "use strict";

    var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var Dom = _dom.Dom;
    var Event = _event.Event;

    var ClearButton = exports.ClearButton = (function () {

        /**
         * Clear button component
         * @param {Object} tf TableFilter instance
         */

        function ClearButton(tf) {
            _classCallCheck(this, ClearButton);

            // Configuration object
            var f = tf.config();

            //id of container element
            this.btnResetTgtId = f.btn_reset_target_id || null;
            //reset button element
            this.btnResetEl = null;
            //defines reset text
            this.btnResetText = f.btn_reset_text || "Reset";
            //defines reset button tooltip
            this.btnResetTooltip = f.btn_reset_tooltip || "Clear filters";
            //defines reset button innerHtml
            this.btnResetHtml = f.btn_reset_html || (!tf.enableIcons ? null : "<input type=\"button\" value=\"\" class=\"" + tf.btnResetCssClass + "\" " + "title=\"" + this.btnResetTooltip + "\" />");

            this.tf = tf;
        }

        _createClass(ClearButton, {
            onClick: {
                value: function onClick() {
                    this.tf.clearFilters();
                }
            },
            init: {

                /**
                 * Build DOM elements
                 */

                value: function init() {
                    var _this = this;

                    var tf = this.tf;

                    if (!tf.hasGrid() && !tf.isFirstLoad && tf.btnResetEl) {
                        return;
                    }

                    var resetspan = Dom.create("span", ["id", tf.prfxResetSpan + tf.id]);

                    // reset button is added to defined element
                    if (!this.btnResetTgtId) {
                        tf.setToolbar();
                    }
                    var targetEl = !this.btnResetTgtId ? tf.rDiv : Dom.id(this.btnResetTgtId);
                    targetEl.appendChild(resetspan);

                    if (!this.btnResetHtml) {
                        var fltreset = Dom.create("a", ["href", "javascript:void(0);"]);
                        fltreset.className = tf.btnResetCssClass;
                        fltreset.appendChild(Dom.text(this.btnResetText));
                        resetspan.appendChild(fltreset);
                        // fltreset.onclick = this.Evt._Clear;
                        Event.add(fltreset, "click", function () {
                            _this.onClick();
                        });
                    } else {
                        resetspan.innerHTML = this.btnResetHtml;
                        var resetEl = resetspan.firstChild;
                        // resetEl.onclick = this.Evt._Clear;
                        Event.add(resetEl, "click", function () {
                            _this.onClick();
                        });
                    }
                    this.btnResetEl = resetspan.firstChild;
                }
            },
            destroy: {

                /**
                 * Remove clear button UI
                 */

                value: function destroy() {
                    var tf = this.tf;

                    if (!tf.hasGrid() || !this.btnResetEl) {
                        return;
                    }

                    var resetspan = Dom.id(tf.prfxResetSpan + tf.id);
                    if (resetspan) {
                        resetspan.parentNode.removeChild(resetspan);
                    }
                    this.btnResetEl = null;
                }
            }
        });

        return ClearButton;
    })();
});
//# sourceMappingURL=clearButton.js.map