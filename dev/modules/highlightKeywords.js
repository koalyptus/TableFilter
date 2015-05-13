define(['exports', '../dom', '../string'], function (exports, _dom, _string) {
    'use strict';

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

    var HighlightKeyword = (function () {

        /**
         * HighlightKeyword, highlight matched keyword
         * @param {Object} tf TableFilter instance
         */

        function HighlightKeyword(tf) {
            _classCallCheck(this, HighlightKeyword);

            var f = tf.config();
            //defines css class for highlighting
            this.highlightCssClass = f.highlight_css_class || 'keyword';
            this.highlightedNodes = [];

            this.tf = tf;
        }

        _createClass(HighlightKeyword, [{
            key: 'highlight',

            /**
             * highlight occurences of searched term in passed node
             * @param  {Node} node
             * @param  {String} word     Searched term
             * @param  {String} cssClass Css class name
             */
            value: function highlight(node, word, cssClass) {
                // Iterate into this nodes childNodes
                if (node.hasChildNodes) {
                    var children = node.childNodes;
                    for (var i = 0; i < children.length; i++) {
                        this.highlight(children[i], word, cssClass);
                    }
                }

                if (node.nodeType === 3) {
                    var tempNodeVal = _string.Str.lower(node.nodeValue);
                    var tempWordVal = _string.Str.lower(word);
                    if (tempNodeVal.indexOf(tempWordVal) != -1) {
                        var pn = node.parentNode;
                        if (pn && pn.className != cssClass) {
                            // word not highlighted yet
                            var nv = node.nodeValue,
                                ni = tempNodeVal.indexOf(tempWordVal),

                            // Create a load of replacement nodes
                            before = _dom.Dom.text(nv.substr(0, ni)),
                                docWordVal = nv.substr(ni, word.length),
                                after = _dom.Dom.text(nv.substr(ni + word.length)),
                                hiwordtext = _dom.Dom.text(docWordVal),
                                hiword = _dom.Dom.create('span');
                            hiword.className = cssClass;
                            hiword.appendChild(hiwordtext);
                            pn.insertBefore(before, node);
                            pn.insertBefore(hiword, node);
                            pn.insertBefore(after, node);
                            pn.removeChild(node);
                            this.highlightedNodes.push(hiword.firstChild);
                        }
                    }
                }
            }
        }, {
            key: 'unhighlight',

            /**
             * Removes highlight to nodes matching passed string
             * @param  {String} word
             * @param  {String} cssClass Css class to remove
             */
            value: function unhighlight(word, cssClass) {
                var arrRemove = [];
                var highlightedNodes = this.highlightedNodes;
                for (var i = 0; i < highlightedNodes.length; i++) {
                    var n = highlightedNodes[i];
                    if (!n) {
                        continue;
                    }
                    var tempNodeVal = _string.Str.lower(n.nodeValue),
                        tempWordVal = _string.Str.lower(word);
                    if (tempNodeVal.indexOf(tempWordVal) !== -1) {
                        var pn = n.parentNode;
                        if (pn && pn.className === cssClass) {
                            var prevSib = pn.previousSibling,
                                nextSib = pn.nextSibling;
                            if (!prevSib || !nextSib) {
                                continue;
                            }
                            nextSib.nodeValue = prevSib.nodeValue + n.nodeValue + nextSib.nodeValue;
                            prevSib.nodeValue = '';
                            n.nodeValue = '';
                            arrRemove.push(i);
                        }
                    }
                }
                for (var k = 0; k < arrRemove.length; k++) {
                    highlightedNodes.splice(arrRemove[k], 1);
                }
            }
        }, {
            key: 'unhighlightAll',

            /**
             * Clear all occurrences of highlighted nodes
             */
            value: function unhighlightAll() {
                if (!this.tf.highlightKeywords || !this.tf.searchArgs) {
                    return;
                }
                for (var y = 0; y < this.tf.searchArgs.length; y++) {
                    this.unhighlight(this.tf.searchArgs[y], this.highlightCssClass);
                }
                this.highlightedNodes = [];
            }
        }]);

        return HighlightKeyword;
    })();

    exports.HighlightKeyword = HighlightKeyword;
});
//# sourceMappingURL=highlightKeywords.js.map