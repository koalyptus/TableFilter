define(["exports", "../dom", "../types"], function (exports, _dom, _types) {
  "use strict";

  var _classProps = function (child, staticProps, instanceProps) {
    if (staticProps) Object.defineProperties(child, staticProps);
    if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
  };

  var Dom = _dom.Dom;
  var Types = _types.Types;


  var global = window;

  var Loader = (function () {
    var Loader = function Loader(tf) {
      // TableFilter configuration
      var f = tf.fObj;
      //id of container element
      tf.loaderTgtId = f.loader_target_id || null;
      //div containing loader
      tf.loaderDiv = null;
      //defines loader text
      tf.loaderText = f.loader_text || "Loading...";
      //defines loader innerHtml
      tf.loaderHtml = f.loader_html || null;
      //defines css class for loader div
      tf.loaderCssClass = f.loader_css_class || "loader";
      //delay for hiding loader
      tf.loaderCloseDelay = 200;
      //callback function before loader is displayed
      tf.onShowLoader = Types.isFn(f.on_show_loader) ? f.on_show_loader : null;
      //callback function after loader is closed
      tf.onHideLoader = Types.isFn(f.on_hide_loader) ? f.on_hide_loader : null;

      this.tf = tf;

      var containerDiv = Dom.create("div", ["id", tf.prfxLoader + tf.id]);
      containerDiv.className = tf.loaderCssClass;

      var targetEl = !tf.loaderTgtId ? (tf.gridLayout ? tf.tblCont : tf.tbl.parentNode) : Dom.id(tf.loaderTgtId);
      if (!tf.loaderTgtId) {
        targetEl.insertBefore(containerDiv, tf.tbl);
      } else {
        targetEl.appendChild(containerDiv);
      }
      tf.loaderDiv = Dom.id(tf.prfxLoader + tf.id);
      if (!tf.loaderHtml) {
        tf.loaderDiv.appendChild(Dom.text(tf.loaderText));
      } else {
        tf.loaderDiv.innerHTML = tf.loaderHtml;
      }
    };

    _classProps(Loader, null, {
      show: {
        writable: true,
        value: function (p) {
          if (!this.tf.loader || !this.tf.loaderDiv || this.tf.loaderDiv.style.display === p) {
            return;
          }
          var o = this.tf;

          function displayLoader() {
            if (!o.loaderDiv) {
              return;
            }
            if (o.onShowLoader && p !== "none") {
              o.onShowLoader.call(null, o);
            }
            o.loaderDiv.style.display = p;
            if (o.onHideLoader && p === "none") {
              o.onHideLoader.call(null, o);
            }
          }

          var t = p === "none" ? this.tf.loaderCloseDelay : 1;
          global.setTimeout(displayLoader, t);
        }
      },
      remove: {
        writable: true,
        value: function () {
          if (!this.tf.loaderDiv) {
            return;
          }
          var targetEl = !this.tf.loaderTgtId ? (this.tf.gridLayout ? this.tf.tblCont : this.tf.tbl.parentNode) : Dom.id(this.tf.loaderTgtId);
          targetEl.removeChild(this.tf.loaderDiv);
          this.tf.loaderDiv = null;
        }
      }
    });

    return Loader;
  })();

  exports.Loader = Loader;
});