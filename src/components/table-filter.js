import { TableFilter } from '../tablefilter.js';

/**
 * `<table-filter>` custom element: declarative shell around the legacy
 * TableFilter engine (ROADMAP: preliminary-and-milestone-0.8.0-plan.md,
 * "Component 1").
 *
 * Behaviour arrives incrementally: table discovery (#899) and engine
 * init (this issue, #900) are done; attribute config (#901), teardown
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
        // the element re-resolves it. Reacting to later DOM/attribute
        // changes (MutationObserver, observedAttributes) is left to the
        // attribute config (#901) and teardown (#902) work.
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
        // retries, and automatic retry belongs with the MutationObserver
        // work in #901.
        if (this.table.rows.length === 0) {
            this.tf = null;
            return;
        }
        // Declarative config mapping arrives in #901; until then the
        // engine runs on defaults.
        this.tf = new TableFilter(this.table);
        this.tf.init();
    }
}

// Register once: loading this module twice (or on a page that already
// defined the element) must not throw.
if (typeof customElements !== 'undefined' &&
    !customElements.get('table-filter')) {
    customElements.define('table-filter', TableFilterElement);
}
