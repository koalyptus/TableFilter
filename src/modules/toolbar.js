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
        this.toolBarTgtId = defaultsStr(f.toolbar_target_id, null);

        /**
         * Toolbar's container DOM element
         * @type {DOMElement}
         * @private
         */
        this.infDiv = null;

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
        this.cont = {
            left: null,
            center: null,
            right: null
        };

        this.emitter.on(EVENTS,
            (feature, isExternal) => this.init(isExternal));
    }

    init(isExternal) {
        if (this.initialized || isExternal) {
            return;
        }

        let tf = this.tf;

        // default container
        let infDiv = createElm('div');
        infDiv.className = this.infDivCssClass;

        // custom container
        if (this.toolBarTgtId) {
            elm(this.toolBarTgtId).appendChild(infDiv);
        }
        // grid-layout
        else if (tf.gridLayout) {
            let gridLayout = tf.Mod.gridLayout;
            gridLayout.tblMainCont.appendChild(infDiv);
            infDiv.className = gridLayout.infDivCssClass;
        }
        // default location: just above the table
        else {
            let cont = createElm('caption');
            cont.appendChild(infDiv);
            tf.dom().insertBefore(cont, tf.dom().firstChild);
        }
        this.infDiv = infDiv;

        /*** left div containing rows # displayer ***/
        // let lDiv = createElm('div');
        // lDiv.className = this.lDivCssClass;
        // infDiv.appendChild(lDiv);
        this.lDiv = this.createContainer(infDiv, this.lDivCssClass);

        /***    right div containing reset button
                + nb results per page select    ***/
        // let rDiv = createElm('div');
        // rDiv.className = this.rDivCssClass;
        // infDiv.appendChild(rDiv);
        this.rDiv = this.createContainer(infDiv, this.rDivCssClass);

        /*** mid div containing paging elements ***/
        // let mDiv = createElm('div');
        // mDiv.className = this.mDivCssClass;
        // infDiv.appendChild(mDiv);
        this.mDiv = this.createContainer(infDiv, this.mDivCssClass);

        this.cont = {
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

    // left(elm) {
    //     if (elm) {
    //         this.lDiv.appendChild(elm);
    //     }
    //     return this.lDiv;
    // }

    // middle(elm) {
    //     if (elm) {
    //         this.mDiv.appendChild(elm);
    //     }
    //     return this.mDiv;
    // }

    // right(elm) {
    //     if (elm) {
    //         this.rDiv.appendChild(elm);
    //     }
    //     return this.rDiv;
    // }

    container(position = RIGHT, elm) {
        let cont = this.cont[position];
        if (elm) {
            cont.appendChild(elm);
        }
        return cont;
    }

    // insertIn(elm, position = RIGHT) {
    //     let cont = this.container[position];
    //     cont.appendChild(elm);
    //     return cont;
    // }

    createContainer(container, css) {
        let div = createElm('div', ['class', css]);
        container.appendChild(div);
        return div;
    }

    destroy() {
        if (!this.initialized) {
            return;
        }

        let tf = this.tf;

        removeElm(this.infDiv);
        this.infDiv = null;

        let tbl = tf.dom();
        let captions = tag(tbl, 'caption');
        [].forEach.call(captions, (elm) => removeElm(elm));

        /** @inherited */
        this.initialized = false;
    }
}
