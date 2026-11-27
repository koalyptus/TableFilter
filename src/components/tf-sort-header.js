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
 * - `sort-direction` — `none`, `ascending` or `descending`, reflected as
 *   `aria-sort` on the closest `<th>` column header. Unset removes the state.
 *
 * `setSortDirection()` and `getSortDirection()` write and read the direction.
 * The sort extension bridge is tracked in #933.
 *
 * Content is projected through the default slot. The shadow parts are the
 * styling surface: `--tf-*` custom properties and `::part()`, with no CSS
 * class or presentational style shipped.
 *
 * Importing this module registers the element when `customElements` is
 * available and no definition is present.
 */

const DIRECTIONS = ['none', 'ascending', 'descending'];

/**
 * Normalize a direction to its ARIA value.
 * @param {*} value Candidate direction
 * @return {?String} Valid direction, or null
 */
function normalizeDirection(value) {
    const direction = value == null ? '' : String(value).toLowerCase();
    return DIRECTIONS.indexOf(direction) >= 0 ? direction : null;
}

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
        // Column header carrying `aria-sort` while a direction is set.
        this._sortTarget = null;
        this._previousAriaSort = null;
    }

    static get observedAttributes() {
        return ['accessible-label', 'text', 'sort-direction'];
    }

    connectedCallback() {
        this._update();
    }

    disconnectedCallback() {
        this._restoreSortTarget();
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
     * Set the column's sort direction. Invalid values clear the state.
     * @param {*} direction `none`, `ascending` or `descending`
     */
    setSortDirection(direction) {
        const normalized = normalizeDirection(direction);
        if (normalized === null) {
            this.removeAttribute('sort-direction');
        } else {
            this.setAttribute('sort-direction', normalized);
        }
    }

    /**
     * Get the effective sort direction.
     * @return {?String} `none`, `ascending`, `descending` or null
     */
    getSortDirection() {
        return normalizeDirection(this.getAttribute('sort-direction'));
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

        this._updateSortTarget();
    }

    /**
     * Apply `aria-sort` to the closest `<th>` column header. A header
     * without a direction keeps the value it had before the element
     * applied one.
     */
    _updateSortTarget() {
        const direction = this.getSortDirection();
        const th = this.closest('th');

        if (this._sortTarget && this._sortTarget !== th) {
            this._restoreSortTarget();
        }

        if (!direction || !th) {
            this._restoreSortTarget();
            return;
        }

        if (!this._sortTarget) {
            this._sortTarget = th;
            this._previousAriaSort = th.getAttribute('aria-sort');
        }
        th.setAttribute('aria-sort', direction);
    }

    /**
     * Restore the column header's `aria-sort` value and release it.
     */
    _restoreSortTarget() {
        if (!this._sortTarget) {
            return;
        }
        if (this._previousAriaSort === null) {
            this._sortTarget.removeAttribute('aria-sort');
        } else {
            this._sortTarget.setAttribute('aria-sort',
                this._previousAriaSort);
        }
        this._sortTarget = null;
        this._previousAriaSort = null;
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
