/**
 * `<tf-loader>` custom element: accessible activity indicator
 * (ROADMAP: hybrid-migration-strategy.md).
 *
 * Scaffold (#916): an open shadow root exposing the `message-slot` and
 * `message` parts. Consumer content (legacy `loader.html`) renders
 * through the default slot (P2, ROADMAP/content-projection-parity.md);
 * the `text` attribute is the plain-text fallback
 * (P3) and is rendered as text. The host is the live region (#916):
 * connecting it enforces the shared live-region contract
 * (`applyLiveRegion()`) so message changes are announced politely.
 *
 * The configurable loader class (`loader.css_class`, default `loader`)
 * is applied to this host by the Loader bridge (#917), not hardcoded
 * here. TableFilter themes through `--tf-*` custom properties (#892/
 * #945 — inherited into shadow trees) and `::part()` hooks, so the
 * element ships structure and hooks only and leaves the look to the
 * stylesheet/theme.
 *
 * Importing this module registers the element. Like `<table-filter>` it
 * is deliberately not part of the legacy webpack bundle (PhantomJS
 * `_wrapNativeSuper`); consumers load it as a module, and shipping it
 * in a bundle belongs with #965.
 */

import {applyLiveRegion} from './attributes.js';

// Cloned into every instance's shadow root. Structure and `part` hooks
// only: `part` is the stable internal contract (selected by _update()
// and themed via ::part()), and no class or presentational style is
// baked in, so themes and consumers stay in control.
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
        // Live-region contract (#916): the host is the region, so a
        // message change is announced politely.
        applyLiveRegion(this);
        this._update();
        this._syncLayout();
    }

    attributeChangedCallback() {
        this._update();
    }

    /**
     * Set the message text, rendered as text into the `message` part.
     * Values are coerced to strings so a falsy non-string (e.g. 0) is
     * displayed rather than silently dropped.
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
     * has no assigned nodes.
     */
    _syncLayout() {
        if (!this._messageEl) {
            return;
        }
        this._messageEl.hidden = this._messageSlot
            .assignedNodes({ flatten: true }).length > 0;
    }
}

// Register once: loading this module twice (or on a page that already
// defined the element) must not throw.
if (typeof customElements !== 'undefined' &&
    !customElements.get('tf-loader')) {
    customElements.define('tf-loader', TfLoaderElement);
}
