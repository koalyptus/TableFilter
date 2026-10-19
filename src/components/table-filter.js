import {TableFilter} from '../tablefilter.js';
import {isSkippedAttribute} from './attributes.js';

/**
 * `<table-filter>` custom element: declarative shell around the legacy
 * TableFilter engine (ROADMAP: preliminary-and-milestone-0.8.0-plan.md,
 * "Component 1").
 *
 * Behaviour arrives incrementally: table discovery (#899), engine init
 * (#900), declarative configuration (#901), teardown (#902), event
 * bridging (#903) and runtime re-init on table/attribute changes (#985)
 * are done.
 *
 * Importing this module registers the element. It is deliberately not
 * imported by src/tablefilter.js yet: that entry feeds the legacy ES5
 * webpack bundle, where Babel rewrites `extends HTMLElement` through
 * `_wrapNativeSuper`, whose `Function.prototype.toString` probe throws
 * in PhantomJS (2.1.1) and aborts the whole bundle. The declarative
 * demo page (#904) therefore loads this module through the Vite dev
 * server (`demos/table-filter.html`), and wiring the element into a
 * shipped entry belongs with the namespace migration (#965). The
 * reverse direction used here (the element importing the engine) does
 * not pull the element into that bundle.
 *
 * Events: engine `emitter` events (see `BRIDGED_EVENTS`) are
 * re-dispatched as bubbling DOM `CustomEvent`s on this element, one
 * event per engine event, with `detail: { tf, args }` (`tf` is the
 * engine instance, `args` the array of engine arguments after it).
 * Listeners are registered before `init()` so init-time events are
 * bridged too, and removed on disconnect so nothing leaks (#902).
 * Re-initialising (#985) tears the old listeners down and bridges the
 * fresh engine, so events keep flowing after an observed change.
 */

// Engine events re-dispatched as DOM CustomEvents. Keep in sync with the
// `emitter.emit()` calls in src/tablefilter.js.
// TODO(#989): use the shared event-name constants once the engine
// exposes them, instead of duplicating the literals here.
const BRIDGED_EVENTS = [
    'before-filter-init', 'after-filter-init', 'initialized',
    'filters-row-inserted', 'filter-focus', 'filter-blur',
    'before-filtering', 'after-filtering',
    'before-clearing-filters', 'after-clearing-filters', 'destroy'
];

// `<table-filter>`-owned attributes that name structure (the `for` table
// reference and the `config` JSON blob) rather than an engine option, so
// they never map to config keys.
const STRUCTURAL_ATTRIBUTES = ['for', 'config'];

export class TableFilterElement extends HTMLElement {
    constructor() {
        super();
        this._connected = false;
        this._emptyTableObserver = null;
        this._tableArrivalObserver = null;
        this._attrObserver = null;
        this._hostObserver = null;
    }

    connectedCallback() {
        this._connected = true;
        // Observe the host's attributes so runtime configuration changes
        // (`config`, `watermark`, `for`, …) are picked up (#985).
        // `observedAttributes`/`attributeChangedCallback` only support a
        // fixed list while the engine's option set is open-ended, so the
        // whole attribute surface is watched and non-configuration
        // attributes are filtered out. Started before `_init()` so a
        // change made during init is not missed.
        this._observeAttributes();
        this._init();
    }

    disconnectedCallback() {
        this._connected = false;
        this._teardown();
        if (this._attrObserver) {
            this._attrObserver.disconnect();
            this._attrObserver = null;
        }
    }

    /**
     * (Re)initialise the engine from the current markup: resolve the
     * table, map the configuration and init a fresh engine. Runs the
     * teardown first, so it is safe to call repeatedly — connect, table
     * arrival, and an empty table acquiring rows funnel through here.
     */
    _init() {
        this._teardown();
        this.table = this._resolveTable();

        if (!this.table) {
            // Neither a descendant table nor a `for` target resolved yet.
            // Either may still be parsed/appended later; watch the root
            // so it is picked up without a manual re-connect.
            this._observeTableArrival();
            return;
        }

        // An empty table cannot back a TableFilter instance (its
        // constructor requires at least 1 row). Leave it uninitialised
        // and watch the table so rows arriving later initialise it.
        if (this.table.rows.length === 0) {
            this.tf = null;
            this._observeEmptyTable();
            return;
        }

        const config = this._extractConfig();
        // An empty config must not reach the constructor: it flips the
        // engine's `hasConfig` flag and changes which features get
        // instantiated (see instantiateFeatures in src/tablefilter.js).
        this.tf = Object.keys(config).length === 0 ?
            new TableFilter(this.table) :
            new TableFilter(this.table, config);

        // Bridge before init(): `before-filter-init`, `after-filter-init`,
        // `filters-row-inserted` and `initialized` are emitted during
        // init(), so a bridge installed afterwards would miss them.
        this._bridgeEvents();
        this.tf.init();
    }

    /**
     * Resolve the table backing the engine. A descendant light-DOM
     * `<table>` wins over an external table referenced by id through the
     * `for` attribute; null when neither resolves.
     * @return {HTMLTableElement} Resolved table or null
     */
    _resolveTable() {
        return this.querySelector('table') ||
            (this.hasAttribute('for') ?
                document.getElementById(this.getAttribute('for')) :
                null);
    }

    /**
     * Release the current engine and its table/`for` observers. Owned by
     * teardown (#902) so a re-init or a disconnect never leaves an
     * observer watching a stale table. Safe to run with no live engine
     * (empty or missing table).
     */
    _teardown() {
        this._unobserveEmptyTable();
        this._unobserveTableArrival();
        if (this.tf && this.tf.isInitialized()) {
            this.tf.destroy();
        }
        this._unbridgeEvents();
        this.tf = null;
    }

    /**
     * Watch for rows arriving in an otherwise-empty backing table.
     * Only runs when the table is resolved but has 0 rows; as soon as
     * `rows.length > 0` we init and disconnect so engine churn is not
     * observed (#985, scoped to the empty-table case).
     */
    _observeEmptyTable() {
        if (!this.table || this.table.rows.length > 0) {
            return;
        }
        this._emptyTableObserver = new MutationObserver(() => {
            if (!this._connected || !this.table) {
                return;
            }
            if (this.table.rows.length > 0) {
                this._unobserveEmptyTable();
                this._init();
            }
        });
        this._emptyTableObserver.observe(this.table, {
            childList: true,
            subtree: true
        });
        // Frameworks may replace the table node (remove + append) rather
        // than mutating its rows; observe the host so replacement is
        // picked up even when the table node itself changes (#985).
        this._hostObserver = new MutationObserver(() => {
            if (!this._connected || (this.table && this.table.isConnected)) {
                return;
            }
            this._unobserveEmptyTable();
            this._init();
        });
        this._hostObserver.observe(this, { childList: true });
    }

    _unobserveEmptyTable() {
        if (this._emptyTableObserver) {
            this._emptyTableObserver.disconnect();
            this._emptyTableObserver = null;
        }
        if (this._hostObserver) {
            this._hostObserver.disconnect();
            this._hostObserver = null;
        }
    }

    /**
     * Watch the document (or the enclosing shadow root) for a table that
     * was not resolvable at connect time — a descendant `<table>` or a
     * `for` target — and re-init as soon as it appears. Only active while
     * no table is resolved, so the document-wide observer is
     * short-lived (#985).
     */
    _observeTableArrival() {
        const root = this.getRootNode();
        if (!root || typeof MutationObserver === 'undefined') {
            return;
        }
        this._tableArrivalObserver = new MutationObserver(() => {
            if (!this._connected || !this._resolveTable()) {
                return;
            }
            this._unobserveTableArrival();
            this._init();
        });
        this._tableArrivalObserver.observe(root, {
            childList: true,
            subtree: true
        });
    }

    /**
     * Stop watching for a table to appear. Safe when no observer is
     * active.
     */
    _unobserveTableArrival() {
        if (this._tableArrivalObserver) {
            this._tableArrivalObserver.disconnect();
            this._tableArrivalObserver = null;
        }
    }

    /**
     * Watch the host's attributes and re-init on any configuration
     * change (anything `isSkippedAttribute()` does not skip), so
     * restyling the host with a presentation attribute does not rebuild
     * the engine (#985).
     */
    _observeAttributes() {
        if (this._attrObserver) {
            this._attrObserver.disconnect();
        }
        this._attrObserver = new MutationObserver((records) => {
            if (!this._connected) {
                return;
            }
            // Anything that is not a presentation/noise attribute is a
            // configuration change worth re-initialising for — including
            // the structural `config` and `for` attributes.
            const relevant = records.some((record) =>
                !isSkippedAttribute(record.attributeName));
            if (relevant) {
                this._init();
            }
        });
        this._attrObserver.observe(this, { attributes: true });
    }

    /**
     * Listen to the engine events in `BRIDGED_EVENTS` and re-dispatch
     * each as a bubbling DOM `CustomEvent` of the same name on this
     * element, with `detail: { tf, args }`:
     * - `tf` is the engine instance
     * - `args` is an array of the engine's remaining arguments (the
     *   engine emits `emit(name, this, ...)`, so this is usually `[]`
     *   or a single payload such as the filter input for `filter-focus`
     *   or the values array for `after-filtering`)
     *
     * Re-entrant: bridging an already-bridged element first removes the
     * previous listeners, so a second call cannot orphan handlers.
     */
    _bridgeEvents() {
        this._unbridgeEvents();
        const tf = this.tf;
        this._bridged = {};
        this._bridgedTf = tf;
        BRIDGED_EVENTS.forEach((name) => {
            const handler = (...args) => {
                this.dispatchEvent(new CustomEvent(name, {
                    detail: { tf, args: args.slice(1) },
                    bubbles: true
                }));
            };
            tf.emitter.on([name], handler);
            this._bridged[name] = handler;
        });
    }

    /**
     * Remove all listeners registered by `_bridgeEvents()`. Safe when
     * `_bridgeEvents()` was never run or was already unregistered.
     * Unsubscribes on the engine captured at bridge time, not on
     * `this.tf`, so a handler cannot be left behind if `tf` changed.
     */
    _unbridgeEvents() {
        const tf = this._bridgedTf;
        if (!tf || !this._bridged) {
            return;
        }
        Object.keys(this._bridged).forEach((name) => {
            tf.emitter.off([name], this._bridged[name]);
        });
        this._bridged = null;
        this._bridgedTf = null;
    }

    /**
     * Build the TableFilter configuration from declarative markup: the
     * optional `config` attribute (a JSON object) merged with every
     * other attribute, kebab-case names mapped onto the engine's
     * snake_case options, values parsed as JSON where possible
     * (`col-types='["string"]'`, `case-sensitive="true"`), boolean
     * spellings the JSON parser rejects (`True`/`FALSE`) coerced, and
     * anything else kept as a plain string (`watermark="Search"`).
     * An empty value means presence, per the HTML boolean attribute
     * convention: `<table-filter paging>` enables paging.
     * Individual attributes win over the `config` blob.
     *
     * Attribute names are lowercased by the HTML parser, so options
     * must be written in kebab-case (`case-sensitive`, not
     * `caseSensitive`). Attributes skipped by `isSkippedAttribute()` are
     * never mapped: a stray `class` must not count as engine
     * configuration. Config is re-read on every re-init, including the
     * runtime attribute changes observed by `_observeAttributes()`.
     * @return {Object} TableFilter configuration object
     */
    _extractConfig() {
        let config = {};

        /**
         * Parse an attribute value: JSON when it parses, otherwise the
         * raw string, with the common boolean spellings coerced.
         * @param {String} raw Attribute value
         * @return {*} Parsed value
         */
        const parseValue = (raw) => {
            if (raw === '') {
                return true;
            }
            try {
                return JSON.parse(raw);
            } catch (e) {
                if (/^true$/i.test(raw)) {
                    return true;
                }
                if (/^false$/i.test(raw)) {
                    return false;
                }
                return raw;
            }
        };

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
            if (isSkippedAttribute(attr.name, STRUCTURAL_ATTRIBUTES)) {
                return;
            }
            config[attr.name.replace(/-/g, '_')] = parseValue(attr.value);
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
