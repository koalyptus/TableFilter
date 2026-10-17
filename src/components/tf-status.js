/**
 * `<tf-status>` custom element: accessible status indicator
 * (ROADMAP: preliminary-and-milestone-0.8.0-plan.md, "Component 2").
 *
 * Scaffold (#905): an open shadow root exposing the `label` and
 * `message` parts, rendered statically from the `text` and `message`
 * attributes. The ARIA status / live-region behaviour (#906) and the
 * StatusBar bridge (#907) follow.
 *
 * The element hardcodes no CSS class. The status class is configurable
 * in TableFilter (`status_bar.css_class`, default `status`), so the
 * StatusBar feature applies it to this host (#907); `::part(label)` /
 * `::part(message)` are the styling hooks, and internal nodes are
 * addressed by `part` rather than by an invented class.
 *
 * Importing this module registers the element. Like `<table-filter>` it
 * is deliberately not part of the legacy webpack bundle (PhantomJS
 * `_wrapNativeSuper`); consumers load it as a module, and shipping it
 * in a bundle belongs with #965.
 */

// Cloned into every instance's shadow root. No class names here: `part`
// is the stable contract (and the ::part() hook), while the container
// class comes from the TableFilter config via the host (#907). Custom
// properties such as --tf-status-color inherit into the shadow tree.
const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = `
    <style>
        :host { display: inline-block; }
        [part='label'] { margin-right: 0.25rem; font-weight: normal; }
        [part='message'] {
            font-weight: 600;
            color: var(--tf-status-color, inherit);
        }
    </style>
    <span part="label"></span>
    <span part="message"></span>
`;

export class TfStatusElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(TEMPLATE.content.cloneNode(true));
        this._labelEl = this.shadowRoot.querySelector('[part="label"]');
        this._msgEl = this.shadowRoot.querySelector('[part="message"]');
    }

    static get observedAttributes() {
        return ['text', 'message'];
    }

    connectedCallback() {
        this._update();
    }

    attributeChangedCallback() {
        this._update();
    }

    /**
     * Set the message text, rendered into the `message` part. Values are
     * coerced to strings so a falsy non-string (e.g. 0) is displayed
     * rather than silently dropped.
     * @param {String} msg Message text
     */
    setMessage(msg) {
        this.setAttribute('message', msg == null ? '' : String(msg));
    }

    /**
     * Render the `text` and `message` attributes into the shadow parts.
     */
    _update() {
        if (this._labelEl) {
            this._labelEl.textContent = this.getAttribute('text') || '';
        }
        if (this._msgEl) {
            this._msgEl.textContent = this.getAttribute('message') || '';
        }
    }
}

// Register once: loading this module twice (or on a page that already
// defined the element) must not throw.
if (typeof customElements !== 'undefined' &&
    !customElements.get('tf-status')) {
    customElements.define('tf-status', TfStatusElement);
}
