/**
 * `<tf-rows-counter>` custom element: accessible rows counter
 * (ROADMAP: preliminary-and-milestone-0.8.0-plan.md).
 *
 * Scaffold (#909): an open shadow root exposing the `label` and `count`
 * parts, rendered statically from the `text` and `count` attributes.
 *
 * Styling is deliberately not shipped here. TableFilter themes through
 * the `--tf-*` custom properties (#892/#945 — inherited into shadow
 * trees) and `::part()` hooks, so the element exposes `part="label"` /
 * `part="count"` and leaves the look to the stylesheet/theme. It also
 * hardcodes no CSS class: the counter class is configurable
 * (`rows_counter.css_class`, default `tot`) and #910 applies it to this
 * host.
 *
 * Importing this module registers the element. Like `<tf-status>` it
 * is deliberately not part of the legacy webpack bundle (PhantomJS
 * `_wrapNativeSuper`); consumers load it as a module, and shipping it
 * in a bundle belongs with #965.
 */

const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = `
    <span part="label"></span>
    <span part="count"></span>
`;

export class TfRowsCounterElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(TEMPLATE.content.cloneNode(true));
        this._labelEl = this.shadowRoot.querySelector('[part="label"]');
        this._countEl = this.shadowRoot.querySelector('[part="count"]');
    }

    static get observedAttributes() {
        return ['text', 'count'];
    }

    connectedCallback() {
        // Live-region contract: the counter announces count changes.
        // `role="status"` implies `aria-live="polite"` and
        // `aria-atomic="true"`; set explicitly so the contract is visible
        // to consumers and a wrong consumer value is corrected.
        this.setAttribute('role', 'status');
        this.setAttribute('aria-live', 'polite');
        this.setAttribute('aria-atomic', 'true');
        this._update();
    }

    attributeChangedCallback() {
        this._update();
    }

    /**
     * Set the count text, rendered into the `count` part. Values are
     * coerced to strings so a falsy non-string (e.g. 0) is displayed
     * rather than silently dropped.
     * @param {*} count Count text
     */
    setCount(count) {
        this.setAttribute('count', count == null ? '' : String(count));
    }

    /**
     * Render the `text` and `count` attributes into the shadow parts.
     */
    _update() {
        if (this._labelEl) {
            this._labelEl.textContent = this.getAttribute('text') || '';
        }
        if (this._countEl) {
            this._countEl.textContent = this.getAttribute('count') || '';
        }
    }
}

if (typeof customElements !== 'undefined' &&
    !customElements.get('tf-rows-counter')) {
    customElements.define('tf-rows-counter', TfRowsCounterElement);
}
