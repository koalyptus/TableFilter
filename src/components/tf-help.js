/**
 * `<tf-help>` custom element: help instructions in a native `<dialog>`
 * (ROADMAP: hybrid-migration-strategy.md, "Accessible overlays &
 * instructions" milestone).
 *
 * Scaffold (#913): an open shadow root with a trigger control and a
 * modal dialog. The dialog carries `part="dialog"`, the projected
 * instructions live in `part="instructions"` and the close control is a
 * semantic `<button type="button">` via `part="close"`. Opening goes
 * through `showModal()`, so the browser provides the focus trap, the
 * `Escape` key and the top layer. The focus-return contract is #914 and
 * the Help bridge is #915.
 *
 * Content routes, following the legacy `Help` config
 * (ROADMAP: content-projection-parity.md, inventory row 5):
 * - `help_instructions.html` / light DOM → project through
 *   `slot="instructions"`.
 * - `help_instructions.text` → set `instructions-text`, rendered as text.
 * - `btn_html` / light DOM → project through `slot="trigger"`; a slotted
 *   control is the control and `part="trigger"` is hidden while the slot
 *   has assigned nodes.
 * - `btn_text` → set `trigger-text`, rendered as the button's text.
 *   `label` sets the button's `aria-label`.
 *
 * Every configurable string comes from its attribute; empty or absent
 * attributes render empty and the defaults in `help.js` (`btn_text` at
 * `help.js:63`, `help_instructions.text` at `help.js:44`) are mapped by
 * #915.
 *
 * The host `open` attribute reflects the dialog state: setting it calls
 * `showModal()`, removing it calls `close()`. The trigger controls and
 * the close button toggle it and `open-change` reports the state with
 * `detail: {open}`. `dialog-label` names the dialog; without it the
 * dialog is named from the trigger through `aria-labelledby`.
 * `close-text` sets the close control's text.
 *
 * Styling is left to the theme via `--tf-*` custom properties and
 * `::part()`. The element ships no CSS class and no presentational
 * style.
 *
 * Importing this module registers the element. Like the other leaf
 * components it is not part of the legacy webpack bundle; consumers
 * load it as a module, and shipping it in a bundle belongs with #965.
 */

const TRIGGER_ID = 'trigger';
const DIALOG_ID = 'dialog';

// Cloned into every instance's shadow root. Structure and `part` hooks
// only: no class or presentational style is baked in.
const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = `
    <slot name="trigger" part="trigger-slot"></slot>
    <button type="button" part="trigger" id="${TRIGGER_ID}"
        aria-haspopup="dialog" aria-expanded="false"
        aria-controls="${DIALOG_ID}">
        <span part="trigger-text"></span>
    </button>
    <dialog part="dialog" id="${DIALOG_ID}">
        <div part="instructions">
            <slot name="instructions"></slot>
            <span part="instructions-text"></span>
        </div>
        <button type="button" part="close">
            <span part="close-text"></span>
        </button>
    </dialog>
`;

export class TfHelpElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(TEMPLATE.content.cloneNode(true));
        this._triggerSlot =
            this.shadowRoot.querySelector('slot[name="trigger"]');
        this._trigger = this.shadowRoot.querySelector('[part="trigger"]');
        this._triggerText =
            this.shadowRoot.querySelector('[part="trigger-text"]');
        this._dialog = this.shadowRoot.querySelector('[part="dialog"]');
        this._instructionsSlot =
            this.shadowRoot.querySelector('slot[name="instructions"]');
        this._instructionsText =
            this.shadowRoot.querySelector('[part="instructions-text"]');
        this._close = this.shadowRoot.querySelector('[part="close"]');
        this._closeText =
            this.shadowRoot.querySelector('[part="close-text"]');
        this._reportedOpen = false;

        this._trigger.addEventListener('click', () => this._toggle());
        this._triggerSlot.addEventListener('click', () => this._toggle());
        this._triggerSlot.addEventListener(
            'slotchange', () => this._syncLayout());
        this._instructionsSlot.addEventListener(
            'slotchange', () => this._syncLayout());
        this._close.addEventListener('click', () => this.setOpen(false));
        this._dialog.addEventListener('close', () => this._onClose());
    }

    static get observedAttributes() {
        return ['label', 'trigger-text', 'dialog-label',
            'instructions-text', 'close-text', 'open', 'disabled'];
    }

    connectedCallback() {
        this._update();
        this._applyOpen();
    }

    disconnectedCallback() {
        if (this._dialog.open) {
            this._dialog.close();
        }
    }

    attributeChangedCallback(name) {
        this._update();
        if (name === 'open') {
            this._applyOpen();
        }
    }

    /**
     * Set the trigger button's accessible name, rendered as `aria-label`.
     * @param {*} label Accessible name
     */
    setLabel(label) {
        this.setAttribute('label', label == null ? '' : String(label));
    }

    /**
     * Set the trigger button's text.
     * @param {*} text Button text
     */
    setTriggerText(text) {
        this.setAttribute('trigger-text',
            text == null ? '' : String(text));
    }

    /**
     * Set the dialog's accessible name.
     * @param {*} label Accessible name
     */
    setDialogLabel(label) {
        this.setAttribute('dialog-label',
            label == null ? '' : String(label));
    }

    /**
     * Set the instructions text.
     * @param {*} text Instructions text
     */
    setInstructionsText(text) {
        this.setAttribute('instructions-text',
            text == null ? '' : String(text));
    }

    /**
     * Open or close the dialog.
     * @param {Boolean} open Whether the dialog is open
     */
    setOpen(open) {
        if (open) {
            this.setAttribute('open', '');
        } else {
            this.removeAttribute('open');
        }
    }

    /**
     * Render attributes into the shadow parts.
     */
    _update() {
        if (!this._trigger) {
            return;
        }

        this._setAriaLabel(this._trigger, 'label');
        this._triggerText.textContent =
            this.getAttribute('trigger-text') || '';
        this._instructionsText.textContent =
            this.getAttribute('instructions-text') || '';
        this._closeText.textContent =
            this.getAttribute('close-text') || '';
        this._setDialogName();

        if (this.hasAttribute('disabled')) {
            this._trigger.setAttribute('disabled', '');
        } else {
            this._trigger.removeAttribute('disabled');
        }

        this._syncLayout();
        this._syncExpanded();
    }

    /**
     * Show the element-rendered trigger control only when the trigger
     * slot has no assigned nodes, and the instructions text part only
     * when the instructions slot has none.
     */
    _syncLayout() {
        if (!this._trigger) {
            return;
        }
        this._trigger.hidden = this._triggerSlot
            .assignedNodes({ flatten: true }).length > 0;
        this._instructionsText.hidden = this._instructionsSlot
            .assignedNodes({ flatten: true }).length > 0;
    }

    /**
     * Name the dialog from its own attribute, or from the trigger.
     */
    _setDialogName() {
        const label = this.getAttribute('dialog-label') || '';
        if (label) {
            this._dialog.setAttribute('aria-label', label);
            this._dialog.removeAttribute('aria-labelledby');
        } else {
            this._dialog.removeAttribute('aria-label');
            this._dialog.setAttribute('aria-labelledby', TRIGGER_ID);
        }
    }

    /**
     * Render an attribute as `aria-label` on a shadow element, or remove
     * it when the attribute is absent or empty.
     * @param {Element} el Shadow element to name
     * @param {String} attr Attribute holding the accessible name
     */
    _setAriaLabel(el, attr) {
        const label = this.getAttribute(attr) || '';
        if (label) {
            el.setAttribute('aria-label', label);
        } else {
            el.removeAttribute('aria-label');
        }
    }

    /**
     * Toggle the dialog from the trigger control.
     */
    _toggle() {
        if (this.hasAttribute('disabled')) {
            return;
        }
        this.setOpen(!this._dialog.open);
    }

    /**
     * Apply the host `open` attribute to the dialog.
     */
    _applyOpen() {
        if (!this.isConnected) {
            return;
        }
        const open = this.hasAttribute('open');
        if (open && !this._dialog.open) {
            this._dialog.showModal();
        } else if (!open && this._dialog.open) {
            this._dialog.close();
        }
        this._syncExpanded();
        this._reportOpen();
    }

    /**
     * Keep `aria-expanded` in sync with the dialog state.
     */
    _syncExpanded() {
        this._trigger.setAttribute('aria-expanded',
            String(this._dialog.open));
    }

    /**
     * Dispatch `open-change` when the dialog state changes.
     */
    _reportOpen() {
        const open = this._dialog.open;
        if (open === this._reportedOpen) {
            return;
        }
        this._reportedOpen = open;
        this.dispatchEvent(new CustomEvent('open-change', {
            detail: { open },
            bubbles: true,
            composed: true
        }));
    }

    /**
     * Sync the host attribute when the dialog closes from the platform
     * (`Escape`) or from the close control.
     */
    _onClose() {
        if (this._dialog.open) {
            return;
        }
        if (this.hasAttribute('open')) {
            this.removeAttribute('open');
        }
        this._syncExpanded();
        this._reportOpen();
    }
}

// Register once: loading this module twice (or on a page that already
// defined the element) must not throw.
if (typeof customElements !== 'undefined' &&
    !customElements.get('tf-help')) {
    customElements.define('tf-help', TfHelpElement);
}
