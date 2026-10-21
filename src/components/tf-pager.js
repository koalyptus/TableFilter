/**
 * `<tf-pager>` custom element: accessible pagination controls.
 *
 * An open shadow root exposing a `nav` landmark (`part="nav"`) with four
 * semantic `<button type="button">` elements in first/prev/next/last
 * order, each via its own `part`, a named slot and a text hook.
 *
 * Attributes:
 * - `label` — `aria-label` on the landmark.
 * - `first-label`, `prev-label`, `next-label`, `last-label` — `aria-label`
 *   on each button.
 * - `first-text`, `prev-text`, `next-text`, `last-text` — button text.
 * - `disabled` — disables all four buttons.
 * No accessible name is rendered unless its attribute is set.
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

// Cloned into every instance's shadow root. Structure and `part` hooks
// only; no class or presentational style is baked in.
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
