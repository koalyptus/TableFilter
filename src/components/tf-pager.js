/**
 * `<tf-pager>` custom element: accessible pagination controls
 * (ROADMAP: hybrid-migration-strategy.md, Milestone 0.9.0).
 *
 * Scaffold (#923): an open shadow root exposing a `nav` landmark that
 * contains four semantic `<button type="button">` elements — first,
 * prev, next and last — each via its own `part` and each with an
 * accessible name. Page-number state and `aria-current` (#924), the
 * results-per-page select (#925) and the Paging bridge (#926) follow as
 * separate tickets; the button order (first, prev, next, last) leaves
 * room for the page indicator between prev and next.
 *
 * Content routes, mirroring the legacy `Paging` config
 * (ROADMAP: content-projection-parity.md §0.9.0):
 * - `btn_*_page_html` → project markup through the named slot
 *   (`slot="first"`, `slot="prev"`, `slot="next"`, `slot="last"`).
 * - `btn_*_page_text` → set the `first-text`/`prev-text`/`next-text`/
 *   `last-text` attribute. Text defaults to empty so slotted markup is
 *   never doubled; the bridge (#926) maps the configured values.
 *
 * Accessible names default to the legacy button `title` strings ('First
 * page', 'Previous page', 'Next page', 'Last page'), so icon-only
 * buttons are named out of the box, and are overridden per button with
 * the `first-label`/`prev-label`/`next-label`/`last-label` attributes.
 * The landmark is named 'Table pagination' by default and is overridden
 * with the `label` attribute.
 *
 * Styling is deliberately not shipped here. TableFilter themes through
 * the `--tf-*` custom properties (#892/#945 — inherited into shadow
 * trees) and `::part()` hooks, so the element exposes `part="nav"` and
 * per-button parts and leaves the look to the stylesheet/theme. It also
 * hardcodes no CSS class: the pager class is configurable
 * (`paging.css_class`, default `defaultbtn`) and #926 applies it to this
 * host.
 *
 * Importing this module registers the element. Like the other leaf
 * components it is deliberately not part of the legacy webpack bundle
 * (PhantomJS `_wrapNativeSuper`); consumers load it as a module, and
 * shipping it in a bundle belongs with #965.
 */

// Button contract: the `part` is the button's stable internal hook and
// its default accessible name, matching the legacy `title` defaults in
// paging.js.
const BUTTONS = [
    { part: 'first', label: 'First page' },
    { part: 'prev', label: 'Previous page' },
    { part: 'next', label: 'Next page' },
    { part: 'last', label: 'Last page' }
];

const NAV_LABEL = 'Table pagination';

// Cloned into every instance's shadow root. Structure and `part` hooks
// only: each button wraps a named slot (for projected button markup) and
// a text span (for the text route), `part` is the stable internal
// contract (selected by _update() and themed via ::part()), and no class
// or presentational style is baked in, so themes and consumers stay in
// control.
const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = `
    <nav part="nav">
        <button type="button" part="first">
            <slot name="first"></slot><span part="first-text"></span>
        </button>
        <button type="button" part="prev">
            <slot name="prev"></slot><span part="prev-text"></span>
        </button>
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
    }

    static get observedAttributes() {
        return ['label', 'disabled']
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
     * Render the landmark and button attributes into the shadow parts.
     */
    _update() {
        if (!this._nav) {
            return;
        }

        this._nav.setAttribute(
            'aria-label', this.getAttribute('label') || NAV_LABEL);

        BUTTONS.forEach((btn, idx) => {
            const button = this._buttons[idx];
            button.setAttribute(
                'aria-label',
                this.getAttribute(`${btn.part}-label`) || btn.label);
            this._texts[idx].textContent =
                this.getAttribute(`${btn.part}-text`) || '';

            if (this.hasAttribute('disabled')) {
                button.setAttribute('disabled', '');
            } else {
                button.removeAttribute('disabled');
            }
        });
    }
}

// Register once: loading this module twice (or on a page that already
// defined the element) must not throw.
if (typeof customElements !== 'undefined' &&
    !customElements.get('tf-pager')) {
    customElements.define('tf-pager', TfPagerElement);
}
