import {Feature} from '../feature';
import {createElm, removeElm, elm, tag} from '../dom';
import {defaultsStr} from '../settings';
import {isUndef} from '../types';

const EVENTS = [
    'initializing-feature',
    'initializing-extension'
];

export const LEFT = 'left';
export const RIGHT = 'right';
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
        super(tf, 'toolbar');

        // Configuration object
        let f = this.config.toolbar || {};

        /**
         * Css class for toolbar's container DOM element
         * @type {String}
         */
        this.infDivCssClass = defaultsStr(f.inf_div_css_class, 'inf');

        /**
         * Css class for left-side inner container DOM element
         * @type {String}
         */
        this.lDivCssClass = defaultsStr(f.left_div_css_class, 'ldiv');

        /**
         * Css class for right-side inner container DOM element
         * @type {String}
         */
        this.rDivCssClass = defaultsStr(f.right_div_css_class, 'rdiv');

        /**
         * Css class for middle inner container DOM element
         * @type {String}
         */
        this.mDivCssClass = defaultsStr(f.middle_div_css_class, 'mdiv');

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
        this.lDiv = null;

        /**
         * Right-side inner container DOM element (reset button,
         * page length selector in toolbar)
         * @type {DOMElement}
         * @private
         */
        this.rDiv = null;

        /**
         * Middle inner container DOM element (paging elements in toolbar)
         * @type {DOMElement}
         * @private
         */
        this.mDiv = null;

        /**
         * Toolbar container ID prefix
         * @private
         */
        this.prfxInfDiv = 'inf_';

        /**
         * Toolbar left element ID prefix
         * @private
         */
        this.prfxLDiv = 'ldiv_';

        /**
         * Toolbar right element ID prefix
         * @private
         */
        this.prfxRDiv = 'rdiv_';

        /**
         * Toolbar middle element ID prefix
         * @private
         */
        this.prfxMDiv = 'mdiv_';

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
        container.className = this.infDivCssClass;

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
        this.lDiv = this.createContainer(container, this.lDivCssClass);

        // right container
        this.rDiv = this.createContainer(container, this.rDivCssClass);

        // middle container
        this.mDiv = this.createContainer(container, this.mDivCssClass);

        this.innerCont = {
            left: this.lDiv,
            center: this.mDiv,
            right: this.rDiv
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
     * @param {DOMElement} elm optional DOM element to be inserter in container
     * @returns {DOMElement}
     */
    container(position = RIGHT, elm) {
        let cont = this.innerCont[position];
        if (elm) {
            cont.appendChild(elm);
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
        [].forEach.call(captions, (elm) => removeElm(elm));

        /** @inherited */
        this.initialized = false;
    }
}
