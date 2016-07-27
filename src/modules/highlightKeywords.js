import {createText, createElm, getText} from '../dom';
import {isArray} from '../types';

/**
 * Highlight matched keywords upon filtering
 *
 * @export
 * @class HighlightKeyword
 */
export class HighlightKeyword {

    /**
     * Creates an instance of HighlightKeyword
     * @param {TableFilter} tf TableFilter instance
     */
    constructor(tf) {
        let f = tf.config();

        /**
         * Css class for highlighted term
         * @type {String}
         */
        this.highlightCssClass = f.highlight_css_class || 'keyword';

        /**
         * TableFilter instance
         * @type {TableFilter}
         */
        this.tf = tf;

        /**
         * TableFilter's emitter instance
         * @type {Emitter}
         */
        this.emitter = tf.emitter;
    }

    /**
     * Initializes HighlightKeyword instance
     */
    init() {
        this.emitter.on(
            ['before-filtering', 'destroy'],
            () => this.unhighlightAll()
        );
        this.emitter.on(
            ['highlight-keyword'],
            (tf, cell, word) =>
                this.highlight(cell, word, this.highlightCssClass)
        );
    }

    /**
     * Highlight occurences of searched term in passed node
     * @param  {Node} node
     * @param  {String} word     Searched term
     * @param  {String} cssClass Css class name
     *
     * TODO: refactor this method
     */
    highlight(node, word, cssClass) {
        // Iterate into this nodes childNodes
        if (node.hasChildNodes) {
            let children = node.childNodes;
            for (let i = 0; i < children.length; i++) {
                this.highlight(children[i], word, cssClass);
            }
        }

        if (node.nodeType === 3) {
            let tempNodeVal = node.nodeValue.toLowerCase();
            let tempWordVal = word.toLowerCase();
            if (tempNodeVal.indexOf(tempWordVal) !== -1) {
                let pn = node.parentNode;
                if (pn && pn.className !== cssClass) {
                    // word not highlighted yet
                    let nv = node.nodeValue,
                        ni = tempNodeVal.indexOf(tempWordVal),
                        // Create a load of replacement nodes
                        before = createText(nv.substr(0, ni)),
                        docWordVal = nv.substr(ni, word.length),
                        after = createText(nv.substr(ni + word.length)),
                        hiwordtext = createText(docWordVal),
                        hiword = createElm('span');
                    hiword.className = cssClass;
                    hiword.appendChild(hiwordtext);
                    pn.insertBefore(before, node);
                    pn.insertBefore(hiword, node);
                    pn.insertBefore(after, node);
                    pn.removeChild(node);
                }
            }
        }
    }

    /**
     * Removes highlight to nodes matching passed string
     * @param  {String} word
     * @param  {String} cssClass Css class to remove
     */
    unhighlight(word, cssClass) {
        let highlightedNodes = this.tf.tbl.querySelectorAll(`.${cssClass}`);
        for (let i = 0; i < highlightedNodes.length; i++) {
            let n = highlightedNodes[i];
            let nodeVal = getText(n),
                tempNodeVal = nodeVal.toLowerCase(),
                tempWordVal = word.toLowerCase();

            if (tempNodeVal.indexOf(tempWordVal) !== -1) {
                n.parentNode.replaceChild(createText(nodeVal), n);
            }
        }
    }

    /**
     * Clear all occurrences of highlighted nodes
     */
    unhighlightAll() {
        if (!this.tf.highlightKeywords) {
            return;
        }
        // iterate filters values to unhighlight all values
        this.tf.getFiltersValue().forEach((val) => {
            if (isArray(val)) {
                val.forEach((item) =>
                    this.unhighlight(item, this.highlightCssClass));
            } else {
                this.unhighlight(val, this.highlightCssClass);
            }
        });
    }

    /**
     * Remove feature
     */
    destroy() {
        this.emitter.off(
            ['before-filtering', 'destroy'],
            () => this.unhighlightAll()
        );
        this.emitter.off(
            ['highlight-keyword'],
            (tf, cell, word) =>
                this.highlight(cell, word, this.highlightCssClass)
        );
    }
}
