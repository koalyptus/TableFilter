/**
 * `<tf-pager>` custom element: accessible pagination controls.
 *
 * An open shadow root exposing a `nav` landmark (`part="nav"`) with four
 * semantic `<button type="button">` elements in first/prev/next/last
 * order — each via its own `part`, a named slot and a text hook — plus a
 * page indicator (`part="page-status"`) carrying `aria-current="page"`.
 *
 * Attributes:
 * - `label` — `aria-label` on the landmark.
 * - `first-label`, `prev-label`, `next-label`, `last-label` — `aria-label`
 *   on each button.
 * - `first-text`, `prev-text`, `next-text`, `last-text` — button text.
 * - `page` — current page number, 1-based.
 * - `total-pages` — page count, rendered as supplied. The host resolves
 *   it from the legacy Paging feature (paging.js:284, :534).
 * - `page-text`, `of-text` — text rendered either side of the selector.
 * - `selector-type` — `select` (default) or `input`.
 * - `selector-label` — `aria-label` on the page selector; defaults to
 *   `Current page`, and an empty value opts out of the name.
 * - `disabled` — disables all four buttons.
 * No accessible name is rendered unless its attribute is set.
 *
 * The select is populated through `setPages()`, which takes `{text,
 * value}` entries from the host — the legacy option model, page number
 * and start row derived from `pageLength` (paging.js:546).
 *
 * Content is projected through the slots (`slot="first"`, `slot="prev"`,
 * `slot="next"`, `slot="last"`). Styling is left to the theme via `--tf-*`
 * custom properties and `::part()`; no CSS class or presentational style
 * is shipped.
 *
 * Importing this module registers the element. It is not part of the
 * legacy webpack bundle; consumers load it as a module.
 */

const BUTTONS = [
    { part: 'first' },
    { part: 'prev' },
    { part: 'next' },
    { part: 'last' }
];

// ROADMAP: v1-webcomponents-investigation.md names the page control
// "Current page". Legacy ships no name at all for it, so there is no
// configured value this could shadow.
const DEFAULT_SELECTOR_LABEL = 'Current page';

// Cloned into every instance's shadow root. Structure and `part` hooks
// only; no class or presentational style is baked in. The indicator sits
// between the prev and next buttons, mirroring the legacy markup order
// (src/modules/paging.js: first, prev, page text, selector, of text,
// total, next, last).
const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = `
    <nav part="nav">
        <button type="button" part="first">
            <slot name="first"></slot><span part="first-text"></span>
        </button>
        <button type="button" part="prev">
            <slot name="prev"></slot><span part="prev-text"></span>
        </button>
        <span part="page-status" aria-current="page">
            <span part="page-text"></span>
            <span part="page-selector"></span>
            <span part="of-text"></span>
            <span part="total-pages"></span>
        </span>
        <button type="button" part="next">
            <slot name="next"></slot><span part="next-text"></span>
        </button>
        <button type="button" part="last">
            <slot name="last"></slot><span part="last-text"></span>
        </button>
    </nav>
`;

export class TfPagerElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(TEMPLATE.content.cloneNode(true));
        this._nav = this.shadowRoot.querySelector('nav');
        this._buttons = BUTTONS.map(
            (btn) => this.shadowRoot.querySelector(`[part="${btn.part}"]`));
        this._texts = BUTTONS.map(
            (btn) =>
                this.shadowRoot.querySelector(`[part="${btn.part}-text"]`));
        this._pageText = this.shadowRoot.querySelector('[part="page-text"]');
        this._pageSelector =
            this.shadowRoot.querySelector('[part="page-selector"]');
        this._ofText = this.shadowRoot.querySelector('[part="of-text"]');
        this._totalPagesEl =
            this.shadowRoot.querySelector('[part="total-pages"]');
        // Page entries supplied through setPages().
        this._pages = [];
    }

    static get observedAttributes() {
        return ['label', 'disabled', 'page', 'total-pages',
            'page-text', 'of-text', 'selector-type', 'selector-label']
            .concat(BUTTONS.map((btn) => `${btn.part}-label`))
            .concat(BUTTONS.map((btn) => `${btn.part}-text`));
    }

    connectedCallback() {
        this._update();
    }

    attributeChangedCallback() {
        this._update();
    }

    /**
     * Set the landmark's accessible name, rendered as `aria-label` on
     * the `nav` part.
     * @param {*} label Accessible name
     */
    setLabel(label) {
        this.setAttribute('label', label == null ? '' : String(label));
    }

    /**
     * Set the current page number.
     * @param {*} page Page number, 1-based
     */
    setPage(page) {
        this.setAttribute('page', page == null ? '' : String(page));
    }

    /**
     * Set the page count, resolved by the host from the legacy Paging
     * feature.
     * @param {*} totalPages Page count
     */
    setTotalPages(totalPages) {
        this.setAttribute('total-pages',
            totalPages == null ? '' : String(totalPages));
    }

    /**
     * Render the landmark, button attributes and page indicator into the
     * shadow parts.
     */
    _update() {
        if (!this._nav) {
            return;
        }

        this._setAriaLabel(this._nav, 'label');

        BUTTONS.forEach((btn, idx) => {
            this._setAriaLabel(this._buttons[idx], `${btn.part}-label`);
            this._texts[idx].textContent =
                this.getAttribute(`${btn.part}-text`) || '';

            if (this.hasAttribute('disabled')) {
                this._buttons[idx].setAttribute('disabled', '');
            } else {
                this._buttons[idx].removeAttribute('disabled');
            }
        });

        this._pageText.textContent = this.getAttribute('page-text') || '';
        this._ofText.textContent = this.getAttribute('of-text') || '';
        this._totalPagesEl.textContent = this._totalPages();

        this._updateSelector(this._syncSelector());
    }

    /**
     * The `total-pages` value supplied by the host, or empty when it has
     * not been set.
     * @return {String} Total pages, or an empty string
     */
    _totalPages() {
        return this.getAttribute('total-pages') || '';
    }

    /**
     * Supply the page list rendered into the select. Each entry is
     * `{text, value}` — the legacy option model, page number as visible
     * text and start row as value (paging.js:546).
     * @param {Array<Object>} pages Page entries
     */
    setPages(pages) {
        this._pages = Array.isArray(pages) ? pages : [];
        this._update();
    }

    /**
     * Ensure the page selector matches `selector-type`, creating it on
     * first use and replacing it when the type changes. Exactly one
     * control exists at a time, so no presentational attribute is needed
     * to hide the other.
     * @return {Element} The page selector control
     */
    _syncSelector() {
        const isInput = this.getAttribute('selector-type') === 'input';
        const part = isInput ? 'page-input' : 'page-select';
        const current = this._pageSelector.firstElementChild;

        if (current && current.getAttribute('part') === part) {
            return current;
        }

        this._pageSelector.textContent = '';
        const el = document.createElement(isInput ? 'input' : 'select');
        el.setAttribute('part', part);
        if (isInput) {
            el.setAttribute('type', 'number');
            el.setAttribute('min', '1');
        }
        this._pageSelector.appendChild(el);
        return el;
    }

    /**
     * Render the host-supplied page entries, page count and accessible
     * name into the selector control; the input variant holds the page
     * number itself (src/modules/paging.js:377,547).
     * @param {Element} el The selector control
     */
    _updateSelector(el) {
        this._setSelectorLabel(el);

        const page = this.getAttribute('page') || '';
        const total = this._totalPages();
        const isInput = el.getAttribute('part') === 'page-input';

        if (isInput) {
            el.value = page;
            if (total !== '') {
                el.setAttribute('max', total);
            } else {
                el.removeAttribute('max');
            }
            return;
        }

        el.textContent = '';
        this._pages.forEach((entry) => {
            const option = document.createElement('option');
            option.value = String(entry.value);
            option.textContent = String(entry.text);
            if (String(entry.text) === page) {
                option.setAttribute('selected', 'true');
            }
            el.appendChild(option);
        });
    }

    /**
     * Name the page selector. Absent `selector-label` renders the
     * ROADMAP default, a non-empty value overrides it, and an explicit
     * empty value removes the name so it can be opted out of.
     * @param {Element} el The selector control
     */
    _setSelectorLabel(el) {
        if (!this.hasAttribute('selector-label')) {
            el.setAttribute('aria-label', DEFAULT_SELECTOR_LABEL);
            return;
        }
        this._setAriaLabel(el, 'selector-label');
    }

    /**
     * Render an attribute as `aria-label` on a shadow element, or remove
     * it when the attribute is absent.
     * @param {Element} el Shadow element to name
     * @param {String} attr Attribute holding the accessible name
     */
    _setAriaLabel(el, attr) {
        const label = this.getAttribute(attr);
        if (label) {
            el.setAttribute('aria-label', label);
        } else {
            el.removeAttribute('aria-label');
        }
    }
}

// Register once: loading this module twice (or on a page that already
// defined the element) must not throw.
if (typeof customElements !== 'undefined' &&
    !customElements.get('tf-pager')) {
    customElements.define('tf-pager', TfPagerElement);
}
