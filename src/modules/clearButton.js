define(["exports", "../dom", "../event"], function (exports, _dom, _event) {
  "use strict";

  var _classProps = function (child, staticProps, instanceProps) {
    if (staticProps) Object.defineProperties(child, staticProps);
    if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
  };

  var Dom = _dom.Dom;
  var Event = _event.Event;
  var ClearButton = (function () {
    var ClearButton = function ClearButton(tf) {
      // Configuration object
      var f = tf.fObj;

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
    };

    _classProps(ClearButton, null, {
      onClick: {
        writable: true,
        value: function () {
          this.tf.ClearFilters();
        }
      },
      init: {
        writable: true,
        value: function () {
          var _this = this;
          var tf = this.tf;

          if (!tf.hasGrid && !tf.isFirstLoad && tf.btnResetEl) {
            return;
          }

          var resetspan = Dom.create("span", ["id", tf.prfxResetSpan + tf.id]);

          // reset button is added to defined element
          if (!this.btnResetTgtId) {
            tf.SetTopDiv();
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
        writable: true,
        value: function () {
          var tf = this.tf;

          if (!tf.hasGrid || !this.btnResetEl) {
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

  exports.ClearButton = ClearButton;
});