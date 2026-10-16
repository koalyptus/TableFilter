/**
 * `<table-filter>` custom element: declarative shell around the legacy
 * TableFilter engine (ROADMAP: preliminary-and-milestone-0.8.0-plan.md,
 * "Component 1").
 *
 * Scaffold only: the class and its registration. Behaviour arrives
 * incrementally, e.g. table discovery (#899), engine init (#900),
 * attribute config (#901), teardown (#902) and event bridging (#903).
 *
 * Importing this module registers the element. It is deliberately not
 * imported by src/tablefilter.js yet: that entry feeds the legacy ES5
 * webpack bundle, where Babel rewrites `extends HTMLElement` through
 * `_wrapNativeSuper`, whose `Function.prototype.toString` probe throws
 * in PhantomJS (2.1.1) and aborts the whole bundle. Wiring the element
 * into a shipped entry therefore belongs with the bundling work behind
 * the declarative demo page (#904) and the namespace migration (#965).
 */
export class TableFilterElement extends HTMLElement {
    connectedCallback() {
        // A descendant light-DOM <table> wins over an external table
        // referenced by id through the `for` attribute; null when
        // neither resolves. Engine init (#900) decides what null means.
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
    }
}

// Register once: loading this module twice (or on a page that already
// defined the element) must not throw.
if (typeof customElements !== 'undefined' &&
    !customElements.get('table-filter')) {
    customElements.define('table-filter', TableFilterElement);
}
