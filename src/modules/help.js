define(["exports", "../dom", "../event"], function (exports, _dom, _event) {
  "use strict";

  var _classProps = function (child, staticProps, instanceProps) {
    if (staticProps) Object.defineProperties(child, staticProps);
    if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
  };

  var Dom = _dom.Dom;
  var Event = _event.Event;
  var Help = (function () {
    var Help = function Help(tf) {
      // Configuration object
      var f = tf.config();

      //id of custom container element for instructions
      this.helpInstrTgtId = f.help_instructions_target_id || null;
      //id of custom container element for instructions
      this.helpInstrContTgtId = f.help_instructions_container_target_id || null;
      //defines help text
      this.helpInstrText = f.help_instructions_text ? f.help_instructions_text : "Use the filters above each column to filter and limit table " + "data. Avanced searches can be performed by using the following " + "operators: <br /><b>&lt;</b>, <b>&lt;=</b>, <b>&gt;</b>, " + "<b>&gt;=</b>, <b>=</b>, <b>*</b>, <b>!</b>, <b>{</b>, <b>}</b>, " + "<b>||</b>,<b>&amp;&amp;</b>, <b>[empty]</b>, <b>[nonempty]</b>, " + "<b>rgx:</b><br/> These operators are described here:<br/>" + "<a href=\"http://tablefilter.free.fr/#operators\" " + "target=\"_blank\">http://tablefilter.free.fr/#operators</a><hr/>";
      //defines help innerHtml
      this.helpInstrHtml = f.help_instructions_html || null;
      //defines reset button text
      this.helpInstrBtnText = f.help_instructions_btn_text || "?";
      //defines reset button innerHtml
      this.helpInstrBtnHtml = f.help_instructions_btn_html || null;
      //defines css class for help button
      this.helpInstrBtnCssClass = f.help_instructions_btn_css_class || "helpBtn";
      //defines css class for help container
      this.helpInstrContCssClass = f.help_instructions_container_css_class || "helpCont";
      //help button element
      this.helpInstrBtnEl = null;
      //help content div
      this.helpInstrContEl = null;
      this.helpInstrDefaultHtml = "<div class=\"helpFooter\"><h4>HTML Table " + "Filter Generator v. " + tf.version + "</h4>" + "<a href=\"http://tablefilter.free.fr\" target=\"_blank\">" + "http://tablefilter.free.fr</a><br/>" + "<span>&copy;2009-" + tf.year + " Max Guglielmi.</span>" + "<div align=\"center\" style=\"margin-top:8px;\">" + "<a href=\"javascript:void(0);\">Close</a></div></div>";

      this.tf = tf;
    };

    _classProps(Help, null, {
      init: {
        writable: true,
        value: function () {
          var _this = this;
          if (this.helpInstrBtnEl) {
            return;
          }

          var tf = this.tf;

          var helpspan = Dom.create("span", ["id", tf.prfxHelpSpan + tf.id]);
          var helpdiv = Dom.create("div", ["id", tf.prfxHelpDiv + tf.id]);

          //help button is added to defined element
          if (!this.helpInstrTgtId) {
            tf.setToolbar();
          }
          var targetEl = !this.helpInstrTgtId ? tf.rDiv : Dom.id(this.helpInstrTgtId);
          targetEl.appendChild(helpspan);

          var divContainer = !this.helpInstrContTgtId ? helpspan : Dom.id(this.helpInstrContTgtId);

          if (!this.helpInstrBtnHtml) {
            divContainer.appendChild(helpdiv);
            var helplink = Dom.create("a", ["href", "javascript:void(0);"]);
            helplink.className = this.helpInstrBtnCssClass;
            helplink.appendChild(Dom.text(this.helpInstrBtnText));
            helpspan.appendChild(helplink);
            Event.add(helplink, "click", function () {
              _this.toggle();
            });
          } else {
            helpspan.innerHTML = this.helpInstrBtnHtml;
            var helpEl = helpspan.firstChild;
            Event.add(helpEl, "click", function () {
              _this.toggle();
            });
            divContainer.appendChild(helpdiv);
          }

          if (!this.helpInstrHtml) {
            helpdiv.innerHTML = this.helpInstrText;
            helpdiv.className = this.helpInstrContCssClass;
            Event.add(helpdiv, "dblclick", function () {
              _this.toggle();
            });
          } else {
            if (this.helpInstrContTgtId) {
              divContainer.appendChild(helpdiv);
            }
            helpdiv.innerHTML = this.helpInstrHtml;
            if (!this.helpInstrContTgtId) {
              helpdiv.className = this.helpInstrContCssClass;
              Event.add(helpdiv, "dblclick", function () {
                _this.toggle();
              });
            }
          }
          helpdiv.innerHTML += this.helpInstrDefaultHtml;
          Event.add(helpdiv, "click", function () {
            _this.toggle();
          });

          this.helpInstrContEl = helpdiv;
          this.helpInstrBtnEl = helpspan;
        }
      },
      toggle: {
        writable: true,
        value: function () {
          if (!this.helpInstrContEl) {
            return;
          }
          var divDisplay = this.helpInstrContEl.style.display;
          if (divDisplay === "" || divDisplay === "none") {
            this.helpInstrContEl.style.display = "block";
            // TODO: use CSS instead for element positioning
            var btnLeft = Dom.position(this.helpInstrBtnEl).left;
            if (!this.helpInstrContTgtId) {
              this.helpInstrContEl.style.left = (btnLeft - this.helpInstrContEl.clientWidth + 25) + "px";
            }
          } else {
            this.helpInstrContEl.style.display = "none";
          }
        }
      },
      destroy: {
        writable: true,
        value: function () {
          if (!this.helpInstrBtnEl) {
            return;
          }
          this.helpInstrBtnEl.parentNode.removeChild(this.helpInstrBtnEl);
          this.helpInstrBtnEl = null;
          if (!this.helpInstrContEl) {
            return;
          }
          this.helpInstrContEl.parentNode.removeChild(this.helpInstrContEl);
          this.helpInstrContEl = null;
        }
      }
    });

    return Help;
  })();

  exports.Help = Help;
});