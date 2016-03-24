import Dom from '../dom';
import Str from '../string';
import Types from '../types';

export class HighlightKeyword {

    /**
     * HighlightKeyword, highlight matched keyword
     * @param {Object} tf TableFilter instance
     */
    constructor(tf) {
        let f = tf.config();
        //defines css class for highlighting
        this.highlightCssClass = f.highlight_css_class || 'keyword';

        this.tf = tf;
        this.emitter = tf.emitter;
    }

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
     * highlight occurences of searched term in passed node
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
            let tempNodeVal = Str.lower(node.nodeValue);
            let tempWordVal = Str.lower(word);
            if (tempNodeVal.indexOf(tempWordVal) !== -1) {
                let pn = node.parentNode;
                if (pn && pn.className !== cssClass) {
                    // word not highlighted yet
                    let nv = node.nodeValue,
                        ni = tempNodeVal.indexOf(tempWordVal),
                        // Create a load of replacement nodes
                        before = Dom.text(nv.substr(0, ni)),
                        docWordVal = nv.substr(ni, word.length),
                        after = Dom.text(nv.substr(ni + word.length)),
                        hiwordtext = Dom.text(docWordVal),
                        hiword = Dom.create('span');
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
            let nodeVal = Dom.getText(n),
                tempNodeVal = Str.lower(nodeVal),
                tempWordVal = Str.lower(word);

            if (tempNodeVal.indexOf(tempWordVal) !== -1) {
                n.parentNode.replaceChild(Dom.text(nodeVal), n);
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
            if (Types.isArray(val)) {
                val.forEach((item) =>
                    this.unhighlight(item, this.highlightCssClass));
            } else {
                this.unhighlight(val, this.highlightCssClass);
            }
        });
    }

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
