/**
 * `<tf-pager>` custom element: accessible pagination controls
 * (ROADMAP: hybrid-migration-strategy.md, Milestone 0.9.0).
 *
 * Scaffold (#923): an open shadow root exposing a `nav` landmark that
 * contains four semantic `<button type="button">` elements — first,
 * prev, next and last — each via its own `part` and each wrapping a
 * named slot and a text hook. Page-number state and `aria-current`
 * (#924), the results-per-page select (#925) and the Paging bridge
 * (#926) follow as separate tickets; the button order (first, prev,
 * next, last) leaves room for the page indicator between prev and next.
 *
 * No accessible name is invented here. The legacy `Paging` labels are
 * configurable — `btn_*_page_html` carries a `title`, `btn_*_page_text`
 * carries the button text (src/modules/paging.js) — and differ per
 * rendering path, so there is no single default to bake in. The element
 * renders `aria-label` only when the matching attribute is set
 * (`first-label`, `prev-label`, `next-label`, `last-label` per button,
 * `label` for the landmark) and removes it otherwise, mirroring
 * `<tf-clear-button>`; the bridge (#926) maps the configured values.
 *
 * Content routes, mirroring the legacy `Paging` config
 * (ROADMAP: content-projection-parity.md §0.9.0):
 * - `btn_*_page_html` → project markup through the named slot
 *   (`slot="first"`, `slot="prev"`, `slot="next"`, `slot="last"`).
 * - `btn_*_page_text` → set the `first-text`/`prev-text`/`next-text`/
 *   `last-text` attribute. Text defaults to empty so slotted markup is
 *   never doubled; the bridge (#926) maps the configured values.
 * - `btns: false` → no buttons rendered by the legacy feature; the
 *   scaffold instead exposes `disabled` (#926 decides whether to hide
 *   or disable, and per-button disabled state arrives with #924).
 *
 * The `paging` config has 25 options; this scaffold owns only the nine
 * that govern the four buttons (the four `btn_*_page_text`, the four
 * `btn_*_page_html` and `btns`). The rest are explicitly deferred by the
 * milestone's issue split and are not dropped: the page indicator
 * (`page_text`, `of_text`, `page_selector_type`, `length`,
 * `nb_pages_css_class`, `slc_css_class`, `inp_css_class`) is #924, the
 * results-per-page select (`results_per_page`,
 * `results_per_page_target_id`, `results_slc_css_class`,
 * `results_span_css_class`) is #925, and placement and behaviour
 * (`btn_css_class`, `target_id`, `toolbar_position`,
 * `on_before_change_page`, `on_after_change_page`) are #926.
 *
 * Styling is deliberately not shipped here. TableFilter themes through
 * the `--tf-*` custom properties (#892/#945 — inherited into shadow
 * trees) and `::part()` hooks, so the element exposes `part="nav"` and
 * per-button parts and leaves the look to the stylesheet/theme. It also
 * hardcodes no CSS class: the paging button class is configurable
 * (`paging.btn_css_class`, default `pgInp`, paging.js:33) and #926 maps
 * it onto this host's parts.
 *
 * Importing this module registers the element. Like the other leaf
 * components it is deliberately not part of the legacy webpack bundle
 * (PhantomJS `_wrapNativeSuper`); consumers load it as a module, and
 * shipping it in a bundle belongs with #965.
 */

// Button contract: the `part` is the button's stable internal hook and
// the prefix for its `-label` (accessible name) and `-text` (button
// text) attributes. No default label is baked in: the legacy titles come
// from config (paging.js), so the bridge (#926) sets them.
const BUTTONS = [
    { part: 'first' },
    { part: 'prev' },
    { part: 'next' },
    { part: 'last' }
];

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
    }

    /**
     * Render an attribute as `aria-label` on a shadow element, or remove
     * it when the attribute is absent. Accessible names are never
     * invented: they are configurable in the legacy `Paging` feature and
     * mapped by the bridge (#926), mirroring `<tf-clear-button>`.
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
