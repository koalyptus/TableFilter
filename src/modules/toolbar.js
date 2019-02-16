import {Feature} from '../feature';
import {createElm, removeElm, elm, tag} from '../dom';
import {defaultsStr} from '../settings';
import {isUndef} from '../types';

const EVENTS = [
    'initializing-feature',
    'initializing-extension'
];

/** Left position in toolbar */
export const LEFT = 'left';
/** Right position in toolbar */
export const RIGHT = 'right';
/** Center position in toolbar */
export const CENTER = 'center';

/**
 * Toolbar UI component
 * @export
 * @class Toolbar
 * @extends {Feature}
 */
export class Toolbar extends Feature {

    /**
     * Create an instance of Toolbar
     * @param {TableFilter} tf TableFilter instance
     * @memberof Toolbar
     */
    constructor(tf) {
        super(tf, Toolbar);

        // Configuration object
        let f = this.config.toolbar || {};

        /**
         * Css class for toolbar's container DOM element
         * @type {String}
         */
        this.contCssClass = defaultsStr(f.container_css_class, 'inf');

        /**
         * Css class for left-side inner container DOM element
         * @type {String}
         */
        this.lContCssClass = defaultsStr(f.left_cont_css_class, 'ldiv');

        /**
         * Css class for right-side inner container DOM element
         * @type {String}
         */
        this.rContCssClass = defaultsStr(f.right_cont_css_class, 'rdiv');

        /**
         * Css class for middle inner container DOM element
         * @type {String}
         */
        this.cContCssClass = defaultsStr(f.center_cont_css_class, 'mdiv');

        /**
         * Toolbar's custom container ID
         * @type {String}
         */
        this.tgtId = defaultsStr(f.target_id, null);

        /**
         * Toolbar's container DOM element
         * @type {DOMElement}
         * @private
         */
        this.cont = null;

        /**
         * Left-side inner container DOM element (rows counter in toolbar)
         * @type {DOMElement}
         * @private
         */
        this.lCont = null;

        /**
         * Right-side inner container DOM element (reset button,
         * page length selector in toolbar)
         * @type {DOMElement}
         * @private
         */
        this.rCont = null;

        /**
         * Middle inner container DOM element (paging elements in toolbar)
         * @type {DOMElement}
         * @private
         */
        this.cCont = null;

        /**
         * Container elements inside toolbar
         * @private
         */
        this.innerCont = {
            left: null,
            center: null,
            right: null
        };

        this.emitter.on(EVENTS,
            (feature, isExternal) => this.init(isExternal));

        /** @inherited */
        this.enabled = true;
    }

    /**
     * Initialize toolbar components
     * @param {Boolean} isExternal initialize only if component belongs
     * to toolbar
     */
    init(isExternal) {
        if (this.initialized || isExternal) {
            return;
        }

        let tf = this.tf;

        // default container
        let container = createElm('div');
        container.className = this.contCssClass;

        // custom container
        if (this.tgtId) {
            elm(this.tgtId).appendChild(container);
        }
        // grid-layout
        else if (tf.gridLayout) {
            let gridLayout = tf.Mod.gridLayout;
            gridLayout.tblMainCont.appendChild(container);
            container.className = gridLayout.infDivCssClass;
        }
        // default location: just above the table
        else {
            let cont = createElm('caption');
            cont.appendChild(container);
            tf.dom().insertBefore(cont, tf.dom().firstChild);
        }
        this.cont = container;

        // left container
        this.lCont = this.createContainer(container, this.lContCssClass);

        // right container
        this.rCont = this.createContainer(container, this.rContCssClass);

        // middle container
        this.cCont = this.createContainer(container, this.cContCssClass);

        this.innerCont = {
            left: this.lCont,
            center: this.cCont,
            right: this.rCont
        };

        /** @inherited */
        this.initialized = true;

        // emit help initialisation only if undefined
        if (isUndef(tf.help)) {
            // explicitily enable help to initialise feature by
            // default, only if setting is undefined
            tf.Mod.help.enable();
            this.emitter.emit('init-help', tf);
        }
    }

    /**
     * Return the container based on requested position inside the toolbar
     * @param {String} [position=RIGHT] 3 possible positions: 'left', 'center',
     * 'right'
     * @param {DOMElement} el optional DOM element to be inserter in container
     * @returns {DOMElement}
     */
    container(position = RIGHT, el) {
        let cont = this.innerCont[position];
        if (el) {
            cont.appendChild(el);
        }
        return cont;
    }

    /**
     * Create DOM element inside passed container
     * @param {DOMElement} container
     * @param {String} css
     * @private
     */
    createContainer(container, css) {
        let div = createElm('div', ['class', css]);
        container.appendChild(div);
        return div;
    }

    /**
     * Destroy Toolbar instance
     */
    destroy() {
        if (!this.initialized) {
            return;
        }

        let tf = this.tf;

        removeElm(this.cont);
        this.cont = null;

        let tbl = tf.dom();
        let captions = tag(tbl, 'caption');
        [].forEach.call(captions, (el) => removeElm(el));

        /** @inherited */
        this.initialized = false;
    }
}

// TODO: remove as soon as feature name is fixed
Toolbar.meta = {alwaysInstantiate: true};
