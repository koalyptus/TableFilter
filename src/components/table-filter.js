import { TableFilter } from '../tablefilter.js';

/**
 * `<table-filter>` custom element: declarative shell around the legacy
 * TableFilter engine (ROADMAP: preliminary-and-milestone-0.8.0-plan.md,
 * "Component 1").
 *
 * Behaviour arrives incrementally: table discovery (#899), engine init
 * (#900), declarative configuration (#901), teardown (#902) and event
 * bridging (#903) are done; runtime attribute observation (#985)
 * follows.
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
 *
 * Events: engine `emitter` events (see `BRIDGED_EVENTS`) are
 * re-dispatched as bubbling DOM `CustomEvent`s on this element, one
 * event per engine event, with `detail: { tf, args }` (`tf` is the
 * engine instance, `args` the array of engine arguments after it).
 * Listeners are registered before `init()` so init-time events are
 * bridged too, and removed on disconnect so nothing leaks (#902).
 * TODO(#985): bridge events emitted by attributes / table changes
 * observed after connect.
 */

// Engine events re-dispatched as DOM CustomEvents. Keep in sync with the
// `emitter.emit()` calls in src/tablefilter.js.
const BRIDGED_EVENTS = [
    'before-filter-init', 'after-filter-init', 'initialized',
    'filters-row-inserted', 'filter-focus', 'filter-blur',
    'before-filtering', 'after-filtering',
    'before-clearing-filters', 'after-clearing-filters', 'destroy'
];

export class TableFilterElement extends HTMLElement {
    connectedCallback() {
        // A descendant light-DOM <table> wins over an external table
        // referenced by id through the `for` attribute; null when
        // neither resolves.
        //
        // Resolution happens at connect time, so a `for` target that is
        // parsed later in the document is not found yet. Re-connecting
        // the element re-resolves it.
        // TODO(#985): observe table/attribute changes and re-init
        // automatically instead of requiring a re-connect.
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
        // retries.
        // TODO(#985): initialise automatically when rows arrive.
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

        // Bridge before init(): `before-filter-init`, `after-filter-init`,
        // `filters-row-inserted` and `initialized` are emitted during
        // init(), so a bridge installed afterwards would miss them.
        this._bridgeEvents();
        this.tf.init();
    }

    /**
     * Release the engine when the element leaves the document: the
     * filter row is removed from the table and `tf` is nulled so a
     * later re-connect starts a fresh engine. Safe to run with no live
     * engine (empty or missing table).
     */
    disconnectedCallback() {
        if (this.tf && this.tf.isInitialized()) {
            this.tf.destroy();
        }
        this._unbridgeEvents();
        this.tf = null;
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
     * configuration. Config keys are read once per connect.
     * TODO(#985): pick up runtime attribute changes.
     * @return {Object} TableFilter configuration object
     */
    _extractConfig() {
        let config = {};
        const SKIPPED = ['for', 'id', 'config', 'class', 'style', 'slot',
            'hidden', 'title', 'lang', 'dir', 'role', 'tabindex'];
        // Names that would reach the config object's own prototype
        // instead of defining an option.
        const FORBIDDEN = ['__proto__', 'constructor', 'prototype'];

        const isSkipped = (name) => SKIPPED.indexOf(name) !== -1 ||
            name.indexOf('data-') === 0 ||
            name.indexOf('aria-') === 0 ||
            FORBIDDEN.indexOf(name) !== -1;

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
            if (isSkipped(attr.name)) {
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
