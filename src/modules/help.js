import {Feature} from '../feature';
import {createElm, createText, elm, removeElm} from '../dom';
import {addEvt, targetEvt, removeEvt} from '../event';
import {NONE} from '../const';
import {root} from '../root';
import {isEmpty, isNull} from '../types';
import {defaultsStr, defaultsNb} from '../settings';
import {sanitizeHtml} from '../sanitize';
import {RIGHT} from './toolbar';

const WIKI_URL = 'https://github.com/koalyptus/TableFilter/wiki/' +
    '4.-Filter-operators';
const WEBSITE_URL = 'https://www.tablefilter.com/';

/**
 * Help UI component
 */
export class Help extends Feature {

    /**
     * Creates an instance of Help
     * @param {TableFilter} tf TableFilter instance
     */
    constructor(tf) {
        super(tf, Help);

        let f = this.config.help_instructions || {};

        /**
         * ID of main custom container element
         * @type {String}
         */
        this.tgtId = defaultsStr(f.target_id, null);

        /**
         * ID of custom container element for instructions
         * @type {String}
         */
        this.contTgtId = defaultsStr(f.container_target_id, null);

        /**
         * Instructions text (accepts HTML)
         * @type {String}
         */
        this.instrText = !isEmpty(f.text) ? f.text :
            'Use the filters above each column to filter and limit table ' +
            'data. Advanced searches can be performed by using the following ' +
            'operators: <br /><b>&lt;</b>, <b>&lt;=</b>, <b>&gt;</b>, ' +
            '<b>&gt;=</b>, <b>=</b>, <b>*</b>, <b>!</b>, <b>{</b>, <b>}</b>, ' +
            '<b>||</b>,<b>&amp;&amp;</b>, <b>[empty]</b>, <b>[nonempty]</b>, ' +
            '<b>rgx:</b><br/><a href="' + WIKI_URL + '" target="_blank">' +
            'Learn more</a><hr/>';

        /**
         * Instructions HTML
         * @type {String}
         */
        this.instrHtml = defaultsStr(f.html, null);

        /**
         * Help button text ('?')
         * @type {String}
         */
        this.btnText = defaultsStr(f.btn_text, '?');

        /**
         * Custom help button HTML
         * @type {String}
         */
        this.btnHtml = defaultsStr(f.btn_html, null);

        /**
         * Accessible name for the help button
         * @type {String}
         */
        this.label = defaultsStr(f.label, null);

        /**
         * Css class for help button
         * @type {String}
         */
        this.btnCssClass = defaultsStr(f.btn_css_class, 'helpBtn');

        /**
         * Css class for help container element
         * @type {String}
         */
        this.contCssClass = defaultsStr(f.container_css_class, 'helpCont');

        /**
         * Button DOM element
         * @type {DOMElement}
         */
        this.btn = null;

        /**
         * Help container DOM element
         * @type {DOMElement}
         */
        this.cont = null;

        /**
         * `<tf-help>` host element
         * @type {DOMElement}
         * @private
         */
        this.el = null;

        /**
         * Adjust container left position when table's horizontal scroll is
         * on, typically when `responsive` option is enabled.
         * @type {Number}
         * @defaultValue 25
         */
        this.contAdjustLeftPosition =
            defaultsNb(f.container_adjust_left_position, 25);

        /**
         * Whether `container_adjust_left_position` is explicitly configured
         * @type {Boolean}
         * @private
         */
        this.hasContAdjustLeftPosition =
            f.container_adjust_left_position != null;

        /**
         * Bound mouseup wrapper
         * @private
         */
        this.boundMouseup = null;

        /**
         * Default HTML appended to instructions text
         * @type {String}
         */
        this.defaultHtml = '<div class="helpFooter"><h4>TableFilter ' +
            'v' + tf.version + '</h4>' + '<a href="' + WEBSITE_URL +
            '" target="_blank">' + WEBSITE_URL + '</a>' +
            '<br/><span>&copy;2015-' + tf.year + ' {AUTHOR}</span>' +
            '<div align="center" style="margin-top:8px;">' +
            '<a href="javascript:void(0);" class="close">Close</a></div></div>';

        /**
         * Default position in toolbar ('left'|'center'|'right')
         * @type {String}
         */
        this.toolbarPosition = defaultsStr(f.toolbar_position, RIGHT);

        this.emitter.on(['init-help'], () => this.init());
    }

    /**
     * Mouse-up event handler handling popup auto-close behaviour
     * @private
     */
    onMouseup(evt) {
        let targetElm = targetEvt(evt);

        while (targetElm && targetElm !== this.cont && targetElm !== this.btn) {
            targetElm = targetElm.parentNode;
        }

        if (targetElm !== this.cont && targetElm !== this.btn) {
            this.toggle();
        }

        return;
    }

    /**
     * Initialise Help instance
     */
    init() {
        if (this.initialized) {
            return;
        }

        this.emitter.emit('initializing-feature', this, !isNull(this.tgtId));

        let tf = this.tf;

        //help button is added to defined element
        let targetEl = !this.tgtId ?
            tf.feature('toolbar').container(this.toolbarPosition) :
            elm(this.tgtId);

        // Bridge to <tf-help> (scaffold #913). `target_id`,
        // `container_target_id` and `container_adjust_left_position` have
        // no element counterpart (help.js:32-38, help.js:101-102), so those
        // configurations use the legacy span/div structure.
        // TODO(#965): restore static import once namespace migration lands.
        if (this.canUseCE()) {
            this.initCE(targetEl);
        } else {
            this.initLegacy(targetEl);
        }

        /** @inherited */
        this.initialized = true;

        this.emitter.emit('feature-initialized', this);
    }

    /**
     * Whether the feature renders through `<tf-help>`.
     * @returns {Boolean} True when the element is registered and the
     * configuration has no custom containers or scroll adjustment
     * @private
     */
    canUseCE() {
        return typeof customElements !== 'undefined' &&
            Boolean(customElements.get('tf-help')) &&
            !this.tgtId && !this.contTgtId &&
            !this.hasContAdjustLeftPosition;
    }

    /**
     * Initialize using the <tf-help> custom element
     * @param {DOMElement} targetEl Target container element
     * @private
     */
    initCE(targetEl) {
        const host = document.createElement('tf-help');
        host.setAttribute('trigger-text', this.btnText);
        host.setAttribute('close-text', 'Close');
        if (this.label) {
            host.setAttribute('label', this.label);
        }

        if (this.btnHtml) {
            const trigger = createElm('span');
            trigger.innerHTML = sanitizeHtml(this.btnHtml);
            while (trigger.firstChild) {
                const node = trigger.firstChild;
                if (node.nodeType === 1) {
                    node.slot = 'trigger';
                    if (this.label && !node.hasAttribute('aria-label')) {
                        node.setAttribute('aria-label', this.label);
                    }
                } else if (node.nodeType === 3 && node.textContent.trim()) {
                    const text = createElm('span');
                    text.slot = 'trigger';
                    text.appendChild(node);
                    host.appendChild(text);
                    continue;
                }
                host.appendChild(node);
            }
        }

        const instructions = createElm('div');
        instructions.slot = 'instructions';
        instructions.innerHTML = sanitizeHtml(
            (this.instrHtml || this.instrText) + this.defaultHtml);
        host.appendChild(instructions);

        // The clear button stays the last control in the toolbar.
        const clearFeature = this.tf.feature('clearButton');
        const clearEl = clearFeature && clearFeature.container;
        if (clearEl && clearEl.parentNode === targetEl) {
            targetEl.insertBefore(host, clearEl);
        } else {
            targetEl.appendChild(host);
        }

        this.el = host;
        this.btn = host;
        this.cont = host;
    }

    /**
     * Initialize using the legacy span/div structure
     * @param {DOMElement} targetEl Target container element
     * @private
     */
    initLegacy(targetEl) {
        let btn = createElm('span');
        let cont = createElm('div');

        this.boundMouseup = this.onMouseup.bind(this);

        targetEl.appendChild(btn);

        let divContainer = !this.contTgtId ? btn : elm(this.contTgtId);

        if (!this.btnHtml) {
            divContainer.appendChild(cont);
            let helplink = createElm('a', ['href', 'javascript:void(0);']);
            helplink.className = this.btnCssClass;
            helplink.appendChild(createText(this.btnText));
            btn.appendChild(helplink);
            addEvt(helplink, 'click', () => this.toggle());
        } else {
            btn.innerHTML = this.btnHtml;
            let helpEl = btn.firstChild;
            addEvt(helpEl, 'click', () => this.toggle());
            divContainer.appendChild(cont);
        }

        if (!this.instrHtml) {
            cont.innerHTML = this.instrText;
            cont.className = this.contCssClass;
        } else {
            if (this.contTgtId) {
                divContainer.appendChild(cont);
            }
            cont.innerHTML = this.instrHtml;
            if (!this.contTgtId) {
                cont.className = this.contCssClass;
            }
        }
        cont.innerHTML += this.defaultHtml;
        addEvt(cont, 'click', () => this.toggle());

        this.cont = cont;
        this.btn = btn;
    }

    /**
     * Toggle help pop-up
     */
    toggle() {
        // check only if explicitily disabled as in this case undefined
        // signifies the help feature is enabled by default
        if (!this.isEnabled()) {
            return;
        }

        if (this.el) {
            this.el.setOpen(!this.el.hasAttribute('open'));
            return;
        }

        // ensure mouseup event handler is removed
        removeEvt(root, 'mouseup', this.boundMouseup);

        let divDisplay = this.cont.style.display;
        if (divDisplay === '' || divDisplay === NONE) {
            this.cont.style.display = 'inline';

            // if table element has an horizontal scrollbar adjust container
            // left position accordingly
            if (this.tf.dom().scrollLeft > 0) {
                this.cont.style.left = `${
                    this.btn.offsetLeft
                    - this.tf.dom().scrollLeft
                    + this.contAdjustLeftPosition
                }px`;
            }

            addEvt(root, 'mouseup', this.boundMouseup);
        } else {
            this.cont.style.display = NONE;
            this.cont.style.left = '';
        }
    }

    /**
     * Remove help UI
     */
    destroy() {
        if (!this.initialized) {
            return;
        }
        removeElm(this.btn);
        this.btn = null;

        if (this.cont !== this.el) {
            removeElm(this.cont);
        }
        this.cont = null;
        this.el = null;

        this.boundMouseup = null;
        this.initialized = false;
    }

}

// TODO: remove as soon as feature name is fixed
Help.meta = {alwaysInstantiate: true};
