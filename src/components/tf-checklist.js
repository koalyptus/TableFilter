/**
 * `<tf-checklist>` custom element: multi-select filter popup
 * (ROADMAP: hybrid-migration-strategy.md, Milestone 0.9.0).
 *
 * Scaffold (#927): an open shadow root exposing a `<button type="button">`
 * trigger (`part="trigger"`) and a listbox popover (`part="listbox"`) per
 * the WAI-ARIA APG combobox pattern with a multi-select listbox
 * (ROADMAP v1-webcomponents-investigation.md:247-289). Option rendering and
 * selection (#928), keyboard navigation (#929) and the CheckList bridge
 * (#930) follow as separate tickets.
 *
 * Attributes:
 * - `trigger-text` — visible trigger text, rendered as text content.
 * - `label` — `aria-label` on the trigger. Unset keeps the trigger's text
 *   as its accessible name.
 * - `listbox-label` — `aria-label` on the listbox. Unset names the listbox
 *   from the trigger through `aria-labelledby`.
 * - `open` — whether the popover is expanded. The trigger click toggles
 *   it; `aria-expanded` and the listbox's `hidden` state follow.
 * - `disabled` — disables the trigger.
 *
 * Content is projected into the trigger through `slot="trigger"`.
 * Styling is left to the theme via `--tf-*` custom properties and
 * `::part()`; no CSS class or presentational style is shipped.
 *
 * Importing this module registers the element. It is not part of the
 * legacy webpack bundle; consumers load it as a module.
 */

// Ids live inside each instance's shadow root, so they are unique per
// component instance. The trigger names the listbox by default.
const TRIGGER_ID = 'trigger';
const LISTBOX_ID = 'listbox';

// Cloned into every instance's shadow root. Structure and `part` hooks
// only; no class or presentational style is baked in.
const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = `
    <button type="button" part="trigger" id="${TRIGGER_ID}"
        aria-haspopup="listbox" aria-expanded="false"
        aria-controls="${LISTBOX_ID}">
        <slot name="trigger"></slot><span part="trigger-text"></span>
    </button>
    <div part="listbox" id="${LISTBOX_ID}" role="listbox"
        aria-multiselectable="true" aria-labelledby="${TRIGGER_ID}"
        tabindex="-1" hidden></div>
`;

export class TfChecklistElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(TEMPLATE.content.cloneNode(true));
        this._trigger = this.shadowRoot.querySelector('button');
        this._triggerText =
            this.shadowRoot.querySelector('[part="trigger-text"]');
        this._listbox = this.shadowRoot.querySelector('[part="listbox"]');
        this._trigger.addEventListener(
            'click', () => this.setOpen(!this.hasAttribute('open')));
    }

    static get observedAttributes() {
        return ['trigger-text', 'label', 'listbox-label', 'open', 'disabled'];
    }

    connectedCallback() {
        this._update();
    }

    attributeChangedCallback() {
        this._update();
    }

    /**
     * Set the trigger's accessible name, rendered as `aria-label`.
     * @param {*} label Accessible name
     */
    setLabel(label) {
        this.setAttribute('label', label == null ? '' : String(label));
    }

    /**
     * Set the listbox's accessible name, rendered as `aria-label`.
     * @param {*} label Accessible name
     */
    setListboxLabel(label) {
        this.setAttribute('listbox-label',
            label == null ? '' : String(label));
    }

    /**
     * Set the trigger text, rendered into the `trigger-text` part.
     * @param {*} text Trigger text
     */
    setText(text) {
        this.setAttribute('trigger-text', text == null ? '' : String(text));
    }

    /**
     * Expand or collapse the popover.
     * @param {Boolean} open Whether the popover is expanded
     */
    setOpen(open) {
        if (open) {
            this.setAttribute('open', '');
        } else {
            this.removeAttribute('open');
        }
    }

    /**
     * Render the trigger and listbox attributes and expanded state.
     */
    _update() {
        if (!this._trigger) {
            return;
        }

        this._setAriaLabel(this._trigger, 'label');
        this._triggerText.textContent =
            this.getAttribute('trigger-text') || '';
        this._setListboxName();
        this._setExpanded(this.hasAttribute('open'));

        if (this.hasAttribute('disabled')) {
            this._trigger.setAttribute('disabled', '');
        } else {
            this._trigger.removeAttribute('disabled');
        }
    }

    /**
     * Name the listbox from its own attribute, or from the trigger.
     */
    _setListboxName() {
        const label = this.getAttribute('listbox-label');
        if (label) {
            this._listbox.setAttribute('aria-label', label);
            this._listbox.removeAttribute('aria-labelledby');
        } else {
            this._listbox.removeAttribute('aria-label');
            this._listbox.setAttribute('aria-labelledby', TRIGGER_ID);
        }
    }

    /**
     * Reflect the expanded state on the trigger and the popover.
     * @param {Boolean} open Whether the popover is expanded
     */
    _setExpanded(open) {
        this._trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (open) {
            this._listbox.removeAttribute('hidden');
        } else {
            this._listbox.setAttribute('hidden', '');
        }
    }

    /**
     * Render an attribute as `aria-label` on a shadow element, or remove
     * it when the attribute is absent or empty.
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
    !customElements.get('tf-checklist')) {
    customElements.define('tf-checklist', TfChecklistElement);
}
