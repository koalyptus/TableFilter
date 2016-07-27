import {Feature} from '../feature';
import {createElm, createText, elm, removeElm} from '../dom';
import {addEvt} from '../event';
import {NONE} from '../const';

const WIKI_URL = 'https://github.com/koalyptus/TableFilter/wiki/' +
    '4.-Filter-operators';
const WEBSITE_URL = 'http://koalyptus.github.io/TableFilter/';

/**
 * Help UI component
 */
export class Help extends Feature {

    /**
     * Creates an instance of Help.
     * @param {TableFilter} tf TableFilter instance
     */
    constructor(tf) {
        super(tf, 'help');

        var f = this.config;

        /**
         * ID of main custom container element
         * @type {String}
         */
        this.tgtId = f.help_instructions_target_id || null;

        /**
         * ID of custom container element for instructions
         * @type {String}
         */
        this.contTgtId = f.help_instructions_container_target_id ||
            null;

        /**
         * Instructions text (accepts HTML)
         * @type {String}
         */
        this.instrText = f.help_instructions_text ?
            f.help_instructions_text :
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
        this.instrHtml = f.help_instructions_html || null;

        /**
         * Help button text ('?')
         * @type {String}
         */
        this.btnText = f.help_instructions_btn_text || '?';

        /**
         * Custom help button HTML
         * @type {String}
         */
        this.btnHtml = f.help_instructions_btn_html || null;

        /**
         * Css class for help button
         * @type {String}
         */
        this.btnCssClass = f.help_instructions_btn_css_class || 'helpBtn';

        /**
         * Css class for help container element
         * @type {String}
         */
        this.contCssClass = f.help_instructions_container_css_class ||
            'helpCont';

        /**
         * Stores button DOM element
         * @type {DOMElement}
         */
        this.btn = null;

        /**
         * Stores help container DOM element
         * @type {DOMElement}
         */
        this.cont = null;

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
         * Prefix for help main container ID
         * @type {String}
         * @private
         */
        this.prfxHelpSpan = 'helpSpan_';

        /**
         * Prefix for help instructions container ID
         * @type {String}
         * @private
         */
        this.prfxHelpDiv = 'helpDiv_';

        this.emitter.on(['init-help'], () => this.init());
    }

    /**
     * Initialise Help instance
     */
    init() {
        if (this.initialized) {
            return;
        }

        var tf = this.tf;

        var helpspan = createElm('span', ['id', this.prfxHelpSpan + tf.id]);
        var helpdiv = createElm('div', ['id', this.prfxHelpDiv + tf.id]);

        //help button is added to defined element
        if (!this.tgtId) {
            tf.setToolbar();
        }
        var targetEl = !this.tgtId ? tf.rDiv : elm(this.tgtId);
        targetEl.appendChild(helpspan);

        var divContainer = !this.contTgtId ? helpspan : elm(this.contTgtId);

        if (!this.btnHtml) {
            divContainer.appendChild(helpdiv);
            var helplink = createElm('a', ['href', 'javascript:void(0);']);
            helplink.className = this.btnCssClass;
            helplink.appendChild(createText(this.btnText));
            helpspan.appendChild(helplink);
            addEvt(helplink, 'click', () => this.toggle());
        } else {
            helpspan.innerHTML = this.btnHtml;
            var helpEl = helpspan.firstChild;
            addEvt(helpEl, 'click', () => this.toggle());
            divContainer.appendChild(helpdiv);
        }

        if (!this.instrHtml) {
            helpdiv.innerHTML = this.instrText;
            helpdiv.className = this.contCssClass;
            addEvt(helpdiv, 'dblclick', () => this.toggle());
        } else {
            if (this.contTgtId) {
                divContainer.appendChild(helpdiv);
            }
            helpdiv.innerHTML = this.instrHtml;
            if (!this.contTgtId) {
                helpdiv.className = this.contCssClass;
                addEvt(helpdiv, 'dblclick', () => this.toggle());
            }
        }
        helpdiv.innerHTML += this.defaultHtml;
        addEvt(helpdiv, 'click', () => this.toggle());

        this.cont = helpdiv;
        this.btn = helpspan;
        /**
         * @inherited
         */
        this.initialized = true;
    }

    /**
     * Toggle help pop-up
     */
    toggle() {
        // check only if explicitily set to false as in this case undefined
        // signifies the help feature is enabled by default
        if (this.enabled === false) {
            return;
        }
        var divDisplay = this.cont.style.display;
        if (divDisplay === '' || divDisplay === NONE) {
            this.cont.style.display = 'inline';
        } else {
            this.cont.style.display = NONE;
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
        if (!this.cont) {
            return;
        }
        removeElm(this.cont);
        this.cont = null;
        this.initialized = false;
    }

}
