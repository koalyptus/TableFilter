define(['exports', '../dom', '../event'], function (exports, _dom, _event) {
    'use strict';

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

    var Help = (function () {

        /**
         * Help UI component
         * @param {Object} tf TableFilter instance
         */

        function Help(tf) {
            _classCallCheck(this, Help);

            // Configuration object
            var f = tf.config();

            //id of custom container element for instructions
            this.helpInstrTgtId = f.help_instructions_target_id || null;
            //id of custom container element for instructions
            this.helpInstrContTgtId = f.help_instructions_container_target_id || null;
            //defines help text
            this.helpInstrText = f.help_instructions_text ? f.help_instructions_text : 'Use the filters above each column to filter and limit table ' + 'data. Avanced searches can be performed by using the following ' + 'operators: <br /><b>&lt;</b>, <b>&lt;=</b>, <b>&gt;</b>, ' + '<b>&gt;=</b>, <b>=</b>, <b>*</b>, <b>!</b>, <b>{</b>, <b>}</b>, ' + '<b>||</b>,<b>&amp;&amp;</b>, <b>[empty]</b>, <b>[nonempty]</b>, ' + '<b>rgx:</b><br/> These operators are described here:<br/>' + '<a href="http://tablefilter.free.fr/#operators" ' + 'target="_blank">http://tablefilter.free.fr/#operators</a><hr/>';
            //defines help innerHtml
            this.helpInstrHtml = f.help_instructions_html || null;
            //defines reset button text
            this.helpInstrBtnText = f.help_instructions_btn_text || '?';
            //defines reset button innerHtml
            this.helpInstrBtnHtml = f.help_instructions_btn_html || null;
            //defines css class for help button
            this.helpInstrBtnCssClass = f.help_instructions_btn_css_class || 'helpBtn';
            //defines css class for help container
            this.helpInstrContCssClass = f.help_instructions_container_css_class || 'helpCont';
            //help button element
            this.helpInstrBtnEl = null;
            //help content div
            this.helpInstrContEl = null;
            this.helpInstrDefaultHtml = '<div class="helpFooter"><h4>HTML Table ' + 'Filter Generator v. ' + tf.version + '</h4>' + '<a href="http://tablefilter.free.fr" target="_blank">' + 'http://tablefilter.free.fr</a><br/>' + '<span>&copy;2009-' + tf.year + ' Max Guglielmi.</span>' + '<div align="center" style="margin-top:8px;">' + '<a href="javascript:void(0);">Close</a></div></div>';

            //id prefix for help elements
            this.prfxHelpSpan = 'helpSpan_';
            //id prefix for help elements
            this.prfxHelpDiv = 'helpDiv_';

            this.tf = tf;
        }

        _createClass(Help, [{
            key: 'init',
            value: function init() {
                var _this = this;

                if (this.helpInstrBtnEl) {
                    return;
                }

                var tf = this.tf;

                var helpspan = _dom.Dom.create('span', ['id', this.prfxHelpSpan + tf.id]);
                var helpdiv = _dom.Dom.create('div', ['id', this.prfxHelpDiv + tf.id]);

                //help button is added to defined element
                if (!this.helpInstrTgtId) {
                    tf.setToolbar();
                }
                var targetEl = !this.helpInstrTgtId ? tf.rDiv : _dom.Dom.id(this.helpInstrTgtId);
                targetEl.appendChild(helpspan);

                var divContainer = !this.helpInstrContTgtId ? helpspan : _dom.Dom.id(this.helpInstrContTgtId);

                if (!this.helpInstrBtnHtml) {
                    divContainer.appendChild(helpdiv);
                    var helplink = _dom.Dom.create('a', ['href', 'javascript:void(0);']);
                    helplink.className = this.helpInstrBtnCssClass;
                    helplink.appendChild(_dom.Dom.text(this.helpInstrBtnText));
                    helpspan.appendChild(helplink);
                    _event.Event.add(helplink, 'click', function () {
                        _this.toggle();
                    });
                } else {
                    helpspan.innerHTML = this.helpInstrBtnHtml;
                    var helpEl = helpspan.firstChild;
                    _event.Event.add(helpEl, 'click', function () {
                        _this.toggle();
                    });
                    divContainer.appendChild(helpdiv);
                }

                if (!this.helpInstrHtml) {
                    helpdiv.innerHTML = this.helpInstrText;
                    helpdiv.className = this.helpInstrContCssClass;
                    _event.Event.add(helpdiv, 'dblclick', function () {
                        _this.toggle();
                    });
                } else {
                    if (this.helpInstrContTgtId) {
                        divContainer.appendChild(helpdiv);
                    }
                    helpdiv.innerHTML = this.helpInstrHtml;
                    if (!this.helpInstrContTgtId) {
                        helpdiv.className = this.helpInstrContCssClass;
                        _event.Event.add(helpdiv, 'dblclick', function () {
                            _this.toggle();
                        });
                    }
                }
                helpdiv.innerHTML += this.helpInstrDefaultHtml;
                _event.Event.add(helpdiv, 'click', function () {
                    _this.toggle();
                });

                this.helpInstrContEl = helpdiv;
                this.helpInstrBtnEl = helpspan;
            }
        }, {
            key: 'toggle',

            /**
             * Toggle help pop-up
             */
            value: function toggle() {
                if (!this.helpInstrContEl) {
                    return;
                }
                var divDisplay = this.helpInstrContEl.style.display;
                if (divDisplay === '' || divDisplay === 'none') {
                    this.helpInstrContEl.style.display = 'block';
                    // TODO: use CSS instead for element positioning
                    var btnLeft = _dom.Dom.position(this.helpInstrBtnEl).left;
                    if (!this.helpInstrContTgtId) {
                        this.helpInstrContEl.style.left = btnLeft - this.helpInstrContEl.clientWidth + 25 + 'px';
                    }
                } else {
                    this.helpInstrContEl.style.display = 'none';
                }
            }
        }, {
            key: 'destroy',

            /**
             * Remove help UI
             */
            value: function destroy() {
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
        }]);

        return Help;
    })();

    exports.Help = Help;
});
//# sourceMappingURL=help.js.map