/**
 * `<tf-no-results>` custom element: polite no-results announcement.
 *
 * An open shadow root exposes the `message-slot` and `message` parts.
 * Consumer markup (`no_results_message.content`,
 * ROADMAP/content-projection-parity.md) renders through the default slot;
 * the `text` attribute is the plain-text fallback rendered as text into
 * `message`, which hides while slotted content is present.
 *
 * `connectedCallback()` applies the shared live-region contract to the host.
 * The NoResults bridge (#919) applies the configurable message class to the
 * host; the look comes from the stylesheet and themes.
 *
 * Importing this module registers the element. It stays out of the legacy
 * webpack bundle (#965); consumers load it as a module.
 */

import {applyLiveRegion} from './attributes.js';

const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = `
    <slot part="message-slot"></slot>
    <span part="message"></span>
`;

export class TfNoResultsElement extends HTMLElement {
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
        applyLiveRegion(this);
        this._update();
        this._syncLayout();
    }

    attributeChangedCallback() {
        this._update();
    }

    /**
     * Set the fallback message text. Values are coerced to strings; 0
     * renders as '0'.
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
            this._messageEl.textContent = this.getAttribute('text') || '';
        }
    }

    /**
     * Hide the message part while the default slot carries an element or a
     * non-whitespace text node.
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

// Register once: loading this module twice, or on a page that already
// defined the element, keeps the existing definition.
if (typeof customElements !== 'undefined' &&
    !customElements.get('tf-no-results')) {
    customElements.define('tf-no-results', TfNoResultsElement);
}
