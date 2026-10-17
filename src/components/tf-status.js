/**
 * `<tf-status>` custom element: accessible status indicator
 * (ROADMAP: preliminary-and-milestone-0.8.0-plan.md, "Component 2").
 *
 * Scaffold (#905): an open shadow root exposing the `label` and
 * `message` parts, rendered statically from the `text` and `message`
 * attributes. The ARIA status / live-region behaviour (#906) and the
 * StatusBar bridge (#907) follow.
 *
 * Importing this module registers the element. Like `<table-filter>` it
 * is deliberately not part of the legacy webpack bundle (PhantomJS
 * `_wrapNativeSuper`); consumers load it as a module, and shipping it
 * in a bundle belongs with #965.
 */

// Cloned into every instance's shadow root. The `part` attributes are
// the ::part() styling hooks (:host-level custom properties, e.g.
// --tf-status-color, are inherited into the shadow tree).
const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = `
    <style>
        :host { display: inline-block; }
        .status-text { margin-right: 0.25rem; font-weight: normal; }
        .status-msg {
            font-weight: 600;
            color: var(--tf-status-color, inherit);
        }
    </style>
    <span class="status-text" part="label"></span>
    <span class="status-msg" part="message"></span>
`;

export class TfStatusElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(TEMPLATE.content.cloneNode(true));
        this._labelEl = this.shadowRoot.querySelector('.status-text');
        this._msgEl = this.shadowRoot.querySelector('.status-msg');
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
     * Set the message text, rendered into the `message` part.
     * @param {String} msg Message text
     */
    setMessage(msg) {
        this.setAttribute('message', msg || '');
    }

    /**
     * Render the `text` and `message` attributes into the shadow spans.
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
