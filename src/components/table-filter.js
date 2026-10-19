import { TableFilter } from '../tablefilter.js';

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

// Host attributes that are never mapped onto engine options. Listed
// once so `_extractConfig()` and the attribute observer agree on which
// changes are configuration: element-owned and HTML presentation
// attributes (`for`, `id`, `config`, `class`, `style`, `slot`, `hidden`,
// `title`, `lang`, `dir`, `role`, `tabindex`) never count.
const SKIPPED_ATTRIBUTES = ['for', 'id', 'config', 'class', 'style', 'slot',
    'hidden', 'title', 'lang', 'dir', 'role', 'tabindex'];
// Names that would reach the config object's own prototype instead of
// defining an option.
const FORBIDDEN_KEYS = ['__proto__', 'constructor', 'prototype'];

/**
 * Whether a host attribute is engine configuration. `data-*`, `aria-*`
 * and prototype-reaching names are never configuration either.
 * @param {String} name Attribute name
 * @return {Boolean} True when the attribute does not map to an option
 */
function isSkippedAttribute(name) {
    return SKIPPED_ATTRIBUTES.indexOf(name) !== -1 ||
        name.indexOf('data-') === 0 ||
        name.indexOf('aria-') === 0 ||
        FORBIDDEN_KEYS.indexOf(name) !== -1;
}

export class TableFilterElement extends HTMLElement {
    constructor() {
        super();
        this._connected = false;
        this._tableObserver = null;
        this._forObserver = null;
        this._attrObserver = null;
        this._dataRowCount = 0;
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
     * teardown first, so it is safe to call repeatedly — connect and
     * every observed change (host attribute, table rows, a `for` target
     * appearing) funnel through here (#985).
     */
    _init() {
        this._teardown();
        this.table = this._resolveTable();

        if (!this.table) {
            // A `for` target may still be parsed later; watch for it so
            // it resolves without a manual re-connect. Without a `for`
            // there is nothing to wait for.
            if (this.hasAttribute('for')) {
                this._observeForTarget();
            }
            return;
        }

        // An empty table cannot back a TableFilter instance (its
        // constructor requires at least 1 row). Leave it uninitialised
        // and watch the table so rows arriving later initialise it.
        if (this.table.rows.length === 0) {
            this.tf = null;
            this._observeTable();
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
        // Start observing only after init() so the filter row it inserts
        // into the table is not mistaken for a data-row change, which
        // would re-init in a loop.
        this._observeTable();
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
        this._unobserveTable();
        this._unobserveForTarget();
        if (this.tf && this.tf.isInitialized()) {
            this.tf.destroy();
        }
        this._unbridgeEvents();
        this.tf = null;
    }

    /**
     * Count the engine's data rows, i.e. every row except the filter row
     * it inserts. Used to tell a real row addition/removal from the
     * engine's own churn (say, reordering rows on sort), which must not
     * trigger a re-init.
     * @return {Number} Number of data rows
     */
    _countDataRows() {
        if (!this.table) {
            return 0;
        }
        const fltsRowCssClass =
            (this.tf && this.tf.fltsRowCssClass) || 'fltrow';
        let count = 0;
        Array.prototype.forEach.call(this.table.rows, (row) => {
            if (row.className.indexOf(fltsRowCssClass) === -1) {
                count++;
            }
        });
        return count;
    }

    /**
     * Watch the resolved table for data-row additions/removals and
     * re-init when the row count changes, so rows appended to a
     * placeholder table (or removed from a live one) are reflected
     * without a manual re-connect (#985).
     */
    _observeTable() {
        this._dataRowCount = this._countDataRows();
        this._tableObserver = new MutationObserver(() => {
            if (!this._connected ||
                this._countDataRows() === this._dataRowCount) {
                return;
            }
            this._init();
        });
        this._tableObserver.observe(this.table, {
            childList: true,
            subtree: true
        });
    }

    /**
     * Stop watching the table. Safe when no observer is active.
     */
    _unobserveTable() {
        if (this._tableObserver) {
            this._tableObserver.disconnect();
            this._tableObserver = null;
        }
    }

    /**
     * Watch the document (or the enclosing shadow root) for the `for`
     * target that was not in the DOM yet at connect time, and resolve it
     * as soon as it appears. Only active while the target is unresolved,
     * so the document-wide observer is short-lived (#985).
     */
    _observeForTarget() {
        const root = this.getRootNode();
        if (!root || typeof MutationObserver === 'undefined') {
            return;
        }
        this._forObserver = new MutationObserver(() => {
            if (!this._connected || !this._resolveTable()) {
                return;
            }
            this._unobserveForTarget();
            this._init();
        });
        this._forObserver.observe(root, {
            childList: true,
            subtree: true
        });
    }

    /**
     * Stop watching for the `for` target. Safe when no observer is
     * active.
     */
    _unobserveForTarget() {
        if (this._forObserver) {
            this._forObserver.disconnect();
            this._forObserver = null;
        }
    }

    /**
     * Watch the host's attributes and re-init on any configuration
     * change. Presentation attributes (`class`, `style`, `data-*`,
     * `aria-*`, …) are ignored so restyling the host does not rebuild
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
            // `config` and `for` are skipped for option mapping but are
            // still structural: a new config blob or a new target must
            // be picked up.
            const relevant = records.some((record) => {
                const name = record.attributeName;
                return name === 'config' || name === 'for' ||
                    !isSkippedAttribute(name);
            });
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
     * `caseSensitive`). Element-owned and HTML presentation attributes
     * (`for`, `id`, `config`, `class`, `style`, `slot`, `hidden`,
     * `title`, `lang`, `dir`, `role`, `tabindex`, `data-*`, `aria-*`)
     * are never mapped: a stray `class` must not count as engine
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
            if (isSkippedAttribute(attr.name)) {
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
