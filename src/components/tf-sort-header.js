/**
 * `<tf-sort-header>` custom element: the keyboard-operable trigger inside
 * a sortable column header.
 *
 * An open shadow root exposing a `<button type="button">` (`part="trigger"`)
 * with the column label (`part="text"`), projected header content through
 * the default slot, and a decorative sort icon (`part="icon"`,
 * `aria-hidden="true"`). The button is the only tab stop and its content is
 * its accessible name.
 *
 * Attributes:
 * - `text` — visible label, rendered as text content when the slot has no
 *   assigned content.
 * - `accessible-label` — `aria-label` on the trigger. Unset keeps the
 *   button's content as its accessible name.
 *
 * The element renders the trigger only; `aria-sort` is set on the
 * surrounding `<th>` column header (#932).
 *
 * Content is projected through the default slot. Styling is left to the
 * theme via `--tf-*` custom properties and `::part()`; no CSS class or
 * presentational style is shipped.
 *
 * Importing this module registers the element. It is not part of the
 * legacy webpack bundle; consumers load it as a module.
 */

const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = `
    <button type="button" part="trigger">
        <slot></slot><span part="text"></span>
        <span part="icon" aria-hidden="true"></span>
    </button>
`;

export class TfSortHeaderElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(TEMPLATE.content.cloneNode(true));
        this._trigger = this.shadowRoot.querySelector('[part="trigger"]');
        this._textEl = this.shadowRoot.querySelector('[part="text"]');
        this._slot = this.shadowRoot.querySelector('slot');
        this._slot.addEventListener('slotchange', () => this._update());
    }

    static get observedAttributes() {
        return ['accessible-label', 'text'];
    }

    connectedCallback() {
        this._update();
    }

    attributeChangedCallback() {
        this._update();
    }

    /**
     * Set the visible label, rendered into the `text` part.
     * @param {*} text Label text
     */
    setText(text) {
        this.setAttribute('text', text == null ? '' : String(text));
    }

    /**
     * Set the trigger's accessible name, rendered as `aria-label`.
     * @param {*} label Accessible name
     */
    setLabel(label) {
        this.setAttribute('accessible-label',
            label == null ? '' : String(label));
    }

    /**
     * Render the label text and the accessible name into the shadow parts.
     */
    _update() {
        this._textEl.textContent = this._hasProjectedContent() ?
            '' : (this.getAttribute('text') || '');

        const label = this.getAttribute('accessible-label');
        if (label) {
            this._trigger.setAttribute('aria-label', label);
        } else {
            this._trigger.removeAttribute('aria-label');
        }
    }

    /**
     * Whether the default slot has assigned content: an element or text
     * that is not whitespace.
     * @return {Boolean} True when content is projected
     */
    _hasProjectedContent() {
        return this._slot.assignedNodes().some((node) =>
            node.nodeType === Node.ELEMENT_NODE ||
            (node.nodeType === Node.TEXT_NODE &&
                node.textContent.trim() !== ''));
    }
}

// The element is registered only when no definition exists.
if (typeof customElements !== 'undefined' &&
    !customElements.get('tf-sort-header')) {
    customElements.define('tf-sort-header', TfSortHeaderElement);
}
