import { TableFilter } from '../tablefilter.js';

/**
 * `<table-filter>` custom element: declarative shell around the legacy
 * TableFilter engine (ROADMAP: preliminary-and-milestone-0.8.0-plan.md,
 * "Component 1").
 *
 * Behaviour arrives incrementally: table discovery (#899), engine init
 * (#900) and declarative configuration (#901) are done; teardown
 * (#902) and event bridging (#903) follow.
 *
 * Importing this module registers the element. It is deliberately not
 * imported by src/tablefilter.js yet: that entry feeds the legacy ES5
 * webpack bundle, where Babel rewrites `extends HTMLElement` through
 * `_wrapNativeSuper`, whose `Function.prototype.toString` probe throws
 * in PhantomJS (2.1.1) and aborts the whole bundle. Wiring the element
 * into a shipped entry therefore belongs with the bundling work behind
 * the declarative demo page (#904) and the namespace migration (#965).
 * The reverse direction used here (the element importing the engine)
 * does not pull the element into that bundle.
 */
export class TableFilterElement extends HTMLElement {
    connectedCallback() {
        // TODO(#902): remove this guard once disconnectedCallback
        // owns destroy(). It runs before re-resolving this.table on
        // purpose: re-resolving while an engine is live would point
        // this.table at a table the engine does not filter.
        if (this.tf && this.tf.isInitialized()) {
            return;
        }

        // A descendant light-DOM <table> wins over an external table
        // referenced by id through the `for` attribute; null when
        // neither resolves.
        //
        // Resolution happens at connect time, so a `for` target that is
        // parsed later in the document is not found yet. Re-connecting
        // the element re-resolves it. Later attribute and DOM changes
        // are not observed: config and table are read once per connect.
        this.table = this.querySelector('table') ||
            (this.hasAttribute('for') ?
                document.getElementById(this.getAttribute('for')) :
                null);

        if (!this.table) {
            this.tf = null;
            return;
        }
        // An empty table cannot back a TableFilter instance (its
        // constructor requires at least 1 row). Leave it uninitialised
        // instead of throwing out of the connect; a later re-connect
        // retries. Automatic retry (MutationObserver) is not
        // implemented.
        if (this.table.rows.length === 0) {
            this.tf = null;
            return;
        }
        const config = this._extractConfig();
        // An empty config must not reach the constructor: it flips the
        // engine's `hasConfig` flag and changes which features get
        // instantiated (see instantiateFeatures in src/tablefilter.js).
        this.tf = Object.keys(config).length === 0 ?
            new TableFilter(this.table) :
            new TableFilter(this.table, config);
        this.tf.init();
    }

    /**
     * Build the TableFilter configuration from declarative markup: the
     * optional `config` attribute (a JSON object) merged with every
     * other attribute, kebab-case names mapped onto the engine's
     * snake_case options, values parsed as JSON where possible
     * (`col-types='["string","number"]'`, `case-sensitive="true"`)
     * and kept as plain strings otherwise (`watermark="Search"`).
     * Individual attributes win over the `config` blob; the `for`, `id`
     * and `config` attributes are the element's own and never mapped.
     * Read once per connect — runtime attribute changes are not
     * observed.
     * @return {Object} TableFilter configuration object
     */
    _extractConfig() {
        let config = {};
        const SKIPPED = ['for', 'id', 'config'];

        const raw = this.getAttribute('config');
        if (raw !== null) {
            try {
                const parsed = JSON.parse(raw);
                if (parsed !== null &&
                    typeof parsed === 'object' &&
                    !Array.isArray(parsed)) {
                    config = parsed;
                } else {
                    console.warn('<table-filter>: config attribute must ' +
                        'be a JSON object, ignoring: ' + raw);
                }
            } catch (e) {
                console.warn('<table-filter>: invalid config attribute, ' +
                    'ignoring: ' + raw);
            }
        }

        Array.prototype.forEach.call(this.attributes, (attr) => {
            if (SKIPPED.indexOf(attr.name) !== -1) {
                return;
            }
            let value;
            try {
                value = JSON.parse(attr.value);
            } catch (e) {
                // Not JSON: a plain string option, e.g. watermark="Search"
                value = attr.value;
            }
            config[attr.name.replace(/-/g, '_')] = value;
        });

        return config;
    }
}

// Register once: loading this module twice (or on a page that already
// defined the element) must not throw.
if (typeof customElements !== 'undefined' &&
    !customElements.get('table-filter')) {
    customElements.define('table-filter', TableFilterElement);
}
