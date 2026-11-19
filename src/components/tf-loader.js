/**
 * `<tf-loader>` custom element: accessible activity indicator.
 *
 * Scaffold: an open shadow root exposing the `message-slot` and
 * `message` parts. Consumer content (legacy `loader.html`) renders
 * through the default slot; the `text` attribute is the plain-text
 * fallback and is rendered as text. `connectedCallback()` applies the
 * shared live-region contract (`applyLiveRegion()`) to the host.
 *
 * The configurable loader class (`loader.css_class`, default `loader`)
 * is applied to this host by the Loader bridge. The element ships
 * structure and `::part()` hooks only; the look is defined by the
 * stylesheet and themes.
 *
 * Importing this module registers the element. It is not part of the
 * legacy webpack bundle (PhantomJS `_wrapNativeSuper`); consumers load
 * it as a module.
 */

import {applyLiveRegion} from './attributes.js';

// Cloned into every instance's shadow root. `part` is the internal
// contract (selected by _update() and themed via ::part()); the clone
// carries no class or stylesheet.
const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = `
    <slot part="message-slot"></slot>
    <span part="message"></span>
`;

export class TfLoaderElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(TEMPLATE.content.cloneNode(true));
        this._messageSlot =
            this.shadowRoot.querySelector('[part="message-slot"]');
        this._messageEl = this.shadowRoot.querySelector('[part="message"]');

        this._messageSlot.addEventListener(
            'slotchange', () => this._syncLayout());
    }

    static get observedAttributes() {
        return ['text'];
    }

    connectedCallback() {
        // Live-region contract: `applyLiveRegion()` sets role=status,
        // aria-live=polite and aria-atomic=true on the host.
        applyLiveRegion(this);
        this._update();
        this._syncLayout();
    }

    attributeChangedCallback() {
        this._update();
    }

    /**
     * Set the message text, rendered as text into the `message` part.
     * Values are coerced to strings (0 renders as '0').
     * @param {String} text Message text
     */
    setText(text) {
        this.setAttribute('text', text == null ? '' : String(text));
    }

    /**
     * Render the `text` attribute as text into the `message` part.
     */
    _update() {
        if (this._messageEl) {
            this._messageEl.textContent =
                this.getAttribute('text') || '';
        }
    }

    /**
     * Show the element-rendered message part only when the default slot
     * carries no element or non-whitespace text nodes.
     */
    _syncLayout() {
        if (!this._messageEl) {
            return;
        }
        this._messageEl.hidden = this._messageSlot
            .assignedNodes({ flatten: true })
            .some((node) => node.nodeType === 1 ||
                (node.nodeType === 3 && node.textContent.trim() !== ''));
    }
}

// Register once: loading this module twice (or on a page that already
// defined the element) must not throw.
if (typeof customElements !== 'undefined' &&
    !customElements.get('tf-loader')) {
    customElements.define('tf-loader', TfLoaderElement);
}
