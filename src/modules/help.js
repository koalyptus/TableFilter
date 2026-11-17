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

// Default instructions markup, used when neither `text` nor `html` is
// configured (ROADMAP/content-projection-parity.md P3).
const DEFAULT_INSTR_HTML = 'Use the filters above each column to filter ' +
    'and limit table data. Advanced searches can be performed by using ' +
    'the following operators: <br /><b>&lt;</b>, <b>&lt;=</b>, <b>&gt;</b>, ' +
    '<b>&gt;=</b>, <b>=</b>, <b>*</b>, <b>!</b>, <b>{</b>, <b>}</b>, ' +
    '<b>||</b>,<b>&amp;&amp;</b>, <b>[empty]</b>, <b>[nonempty]</b>, ' +
    '<b>rgx:</b><br/><a href="' + WIKI_URL + '" target="_blank">' +
    'Learn more</a><hr/>';

// Focusable trigger controls; slotted trigger markup without one is
// wrapped in a button. Matches FOCUSABLE in components/tf-help.js.
const FOCUSABLE_TRIGGER = 'button:not([disabled]), a[href], ' +
    'input:not([disabled]), select:not([disabled]), ' +
    'textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

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
         * Instructions text, rendered with textContent
         * @type {String}
         */
        this.instrText = !isEmpty(f.text) ? f.text : null;

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

        // Bridge to <tf-help> (scaffold #913): `target_id`,
        // `container_target_id` and an explicit
        // `container_adjust_left_position` keep the legacy span/div
        // structure.
        // TODO(#965): remove once the legacy webpack pipeline is retired.
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
     * configuration has no custom containers, scroll adjustment or CSS
     * classes
     * @private
     */
    canUseCE() {
        return typeof customElements !== 'undefined' &&
            Boolean(customElements.get('tf-help')) &&
            !this.tgtId && !this.contTgtId &&
            !this.hasContAdjustLeftPosition &&
            this.btnCssClass === 'helpBtn' &&
            this.contCssClass === 'helpCont';
    }

    /**
     * Footer markup appended after the instructions
     * @param {Boolean} withCloseLink Whether to include the legacy
     * close link
     * @returns {String} Footer HTML
     * @private
     */
    footerMarkup(withCloseLink) {
        return '<div class="helpFooter"><h4>TableFilter v' +
            this.tf.version + '</h4>' + '<a href="' + WEBSITE_URL +
            '" target="_blank">' + WEBSITE_URL + '</a>' +
            '<br/><span>&copy;2015-' + this.tf.year + ' {AUTHOR}</span>' +
            (withCloseLink ?
                '<div align="center" style="margin-top:8px;">' +
                '<a href="javascript:void(0);" class="close">Close</a>' +
                '</div>' :
                '') +
            '</div>';
    }

    /**
     * Append markup nodes to the target element
     * @param {DOMElement} target Node to append the markup to
     * @param {String} markup Markup; passed through `sanitizeHtml()`
     * @private
     */
    appendMarkup(target, markup) {
        const wrapper = createElm('div');
        wrapper.innerHTML = sanitizeHtml(markup);
        while (wrapper.firstChild) {
            target.appendChild(wrapper.firstChild);
        }
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
            if (!trigger.firstChild) {
                // Fallback when btn_html is empty after sanitisation
                // (e.g. script-only markup). tf-help renders its own
                // default trigger, so skip assigning a custom trigger to
                // avoid null‑ref crashes elsewhere in the bridge.
            } else if (trigger.querySelector(FOCUSABLE_TRIGGER)) {
                while (trigger.firstChild) {
                    const node = trigger.firstChild;
                    if (node.nodeType === 1) {
                        node.slot = 'trigger';
                        this.applyTriggerLabel(node);
                    } else if (node.nodeType === 3 &&
                        node.textContent.trim()) {
                        const text = createElm('span');
                        text.slot = 'trigger';
                        text.appendChild(node);
                        host.appendChild(text);
                        continue;
                    }
                    host.appendChild(node);
                }
            } else {
                // The element hides its own trigger while the slot has
                // nodes; non-focusable markup is wrapped in a button so
                // the trigger stays keyboard-activatable.
                const button = createElm('button');
                button.type = 'button';
                button.slot = 'trigger';
                this.applyTriggerLabel(button);
                while (trigger.firstChild) {
                    button.appendChild(trigger.firstChild);
                }
                host.appendChild(button);
            }
        }

        const instructions = createElm('div');
        instructions.slot = 'instructions';
        if (this.instrHtml) {
            instructions.innerHTML = sanitizeHtml(this.instrHtml);
        } else if (this.instrText) {
            instructions.appendChild(createText(this.instrText));
        } else {
            instructions.innerHTML = sanitizeHtml(DEFAULT_INSTR_HTML);
        }

        // TODO(#1083): the projected footer keeps no close link; the
        // element renders its own close control.
        this.appendMarkup(instructions, this.footerMarkup(false));
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
     * Apply the configured label to a trigger element, preferring the
     * focusable control in its subtree and preserving an existing
     * `aria-label`.
     * @param {DOMElement} node Trigger element
     * @private
     */
    applyTriggerLabel(node) {
        if (!this.label) {
            return;
        }
        const target = node.matches(FOCUSABLE_TRIGGER) ?
            node : node.querySelector(FOCUSABLE_TRIGGER) || node;
        if (!target.hasAttribute('aria-label')) {
            target.setAttribute('aria-label', this.label);
        }
    }

    /**
     * Append the default help anchor to the legacy button container
     * @param {DOMElement} btn Button container
     * @param {DOMElement} divContainer Container receiving the pop-up
     * @param {DOMElement} cont Help pop-up container
     * @private
     */
    appendDefaultTrigger(btn, divContainer, cont) {
        divContainer.appendChild(cont);
        let helplink = createElm('a', ['href', 'javascript:void(0);']);
        helplink.className = this.btnCssClass;
        helplink.appendChild(createText(this.btnText));
        this.applyTriggerLabel(helplink);
        btn.appendChild(helplink);
        addEvt(helplink, 'click', () => this.toggle());
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
            this.appendDefaultTrigger(btn, divContainer, cont);
        } else {
            btn.innerHTML = sanitizeHtml(this.btnHtml);
            if (!btn.firstChild) {
                this.appendDefaultTrigger(btn, divContainer, cont);
            } else {
                let helpEl = btn.firstChild;
                if (helpEl.nodeType === 1) {
                    this.applyTriggerLabel(helpEl);
                }
                addEvt(helpEl, 'click', () => this.toggle());
                divContainer.appendChild(cont);
            }
        }

        if (!this.instrHtml) {
            if (this.instrText) {
                cont.appendChild(createText(this.instrText));
            } else {
                cont.innerHTML = sanitizeHtml(DEFAULT_INSTR_HTML);
            }
            cont.className = this.contCssClass;
        } else {
            if (this.contTgtId) {
                divContainer.appendChild(cont);
            }
            cont.innerHTML = sanitizeHtml(this.instrHtml);
            if (!this.contTgtId) {
                cont.className = this.contCssClass;
            }
        }
        this.appendMarkup(cont, this.footerMarkup(true));
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
     * Disable help and reflect the state on the `<tf-help>` host
     */
    disable() {
        super.disable();
        if (this.el) {
            this.el.setAttribute('disabled', '');
        }
    }

    /**
     * Enable help and reflect the state on the `<tf-help>` host
     */
    enable() {
        super.enable();
        if (this.el) {
            this.el.removeAttribute('disabled');
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
