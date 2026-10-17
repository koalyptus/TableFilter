/**
 * `<tf-clear-button>` custom element: accessible clear button
 * (ROADMAP: preliminary-and-milestone-0.8.0-plan.md).
 *
 * Scaffold (#911): an open shadow root exposing a semantic `<button>`
 * via the `button` part, with an accessible name and native keyboard
 * activation. Content may be projected through the default slot, or set
 * through the `text`/`label` attributes.
 *
 * Styling is deliberately not shipped here. TableFilter themes through
 * the `--tf-*` custom properties (#892/#945 — inherited into shadow
 * trees) and `::part()` hooks, so the element exposes `part="button"`
 * and leaves the look to the stylesheet/theme. It also hardcodes no
 * CSS class: the button class is configurable
 * (`btn_reset.css_class`, default `reset`) and #912 applies it to this
 * host.
 *
 * Importing this module registers the element. Like the other leaf
 * components it is deliberately not part of the legacy webpack bundle
 * (PhantomJS `_wrapNativeSuper`); consumers load it as a module, and
 * shipping it in a bundle belongs with #965.
 */

const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = `
    <button type="button" part="button">
        <slot></slot>
    </button>
`;

export class TfClearButtonElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(TEMPLATE.content.cloneNode(true));
        this._button = this.shadowRoot.querySelector('button');
    }

    static get observedAttributes() {
        return ['label', 'text', 'disabled'];
    }

    connectedCallback() {
        this._update();
    }

    attributeChangedCallback() {
        this._update();
    }

    /**
     * Set the accessible label, rendered as `aria-label`.
     * @param {*} label Accessible name
     */
    setLabel(label) {
        this.setAttribute('label', label == null ? '' : String(label));
    }

    /**
     * Set the button text, rendered into the button.
     * @param {*} text Button text
     */
    setText(text) {
        this.setAttribute('text', text == null ? '' : String(text));
    }

    /**
     * Render attributes into the button.
     */
    _update() {
        if (!this._button) {
            return;
        }
        const label = this.getAttribute('label');
        if (label) {
            this._button.setAttribute('aria-label', label);
        } else {
            this._button.removeAttribute('aria-label');
        }

        const text = this.getAttribute('text');
        this._button.textContent = text || '';

        if (this.hasAttribute('disabled')) {
            this._button.setAttribute('disabled', '');
        } else {
            this._button.removeAttribute('disabled');
        }
    }
}

if (typeof customElements !== 'undefined' &&
    !customElements.get('tf-clear-button')) {
    customElements.define('tf-clear-button', TfClearButtonElement);
}
