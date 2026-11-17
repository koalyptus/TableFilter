/**
 * `<tf-help>`: help instructions in a native modal `<dialog>`.
 *
 * Shadow root: `slot[name="trigger"]` (a slotted control is the
 * control) and `<button part="trigger">` for the element-rendered
 * case; a `<dialog part="dialog">` carrying
 * `<div part="instructions">` with `slot[name="instructions"]` and a
 * `part="instructions-text"` text part; a `<button part="close">` with
 * `part="close-text"`.
 *
 * Attributes: `trigger-text`; `label` (trigger `aria-label`);
 * `instructions-text`; `dialog-label` (dialog accessible name, falling
 * back to `aria-labelledby` on the trigger); `close-text` (close
 * control text and accessible name; the control is unnamed when the
 * attribute is absent); `open` (reflects the dialog state); `disabled`
 * (blocks trigger activation). Empty or absent attributes render
 * empty.
 *
 * The dialog opens with `showModal()`, which traps focus inside it and
 * closes it on `Escape`. A user dismissal (`Escape`, backdrop,
 * close control, trigger toggle) returns focus
 * to the trigger control: the slotted trigger when one is assigned, the
 * element button otherwise, the host when slotted markup hides it. A
 * programmatic close keeps the platform focus restore. Setting `open`
 * opens the dialog, removing it closes the dialog, and `open-change`
 * reports the state with `detail: {open}`.
 *
 * The shadow root carries the trigger's layout contract (the legacy
 * toolbar footprint and hover fill), so the element renders like the
 * legacy markup without page CSS. Looks stay themeable through
 * `::part()` and `--tf-*` custom properties. Importing this module
 * registers the element.
 */

const TRIGGER_ID = 'trigger';
const DIALOG_ID = 'dialog';

// Controls and widgets that take focus; used to pick the focus target
// inside slotted trigger markup. Matches FOCUSABLE_TRIGGER in
// modules/help.js.
const FOCUSABLE = 'button:not([disabled]), a[href], ' +
    'input:not([disabled]), select:not([disabled]), ' +
    'textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Cloned into every instance's shadow root: structure, `part` hooks and
// the trigger layout contract (legacy toolbar footprint: content-box,
// glyph laid out from the top, full-height hover fill).
const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = `
    <style>
        :host {
            display: inline-block;
            vertical-align: top;
        }

        [part="trigger"] {
            box-sizing: content-box;
            display: flex;
            align-items: flex-start;
            height: 27px;
            margin: 0;
            padding: 8px 15px 0 15px;
            border: 0;
            background: transparent;
            color: var(--tf-text, #333);
            font: inherit;
            font-weight: bold;
            cursor: pointer;
        }

        [part="trigger"]:hover {
            background-color: var(--tf-border-light, #F4F4F4);
        }
    </style>
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
        this._userClosed = false;

        this._trigger.addEventListener('click', () => this._toggle());
        this._triggerSlot.addEventListener('click', () => this._toggle());
        this._triggerSlot.addEventListener(
            'slotchange', () => this._syncLayout());
        this._instructionsSlot.addEventListener(
            'slotchange', () => this._syncLayout());
        this._dialog.addEventListener('click', (event) => {
            // A backdrop click lands outside the dialog box; a click on
            // the dialog's border or padding lands on the dialog
            // element but inside the box.
            if (event.target === this._dialog &&
                !this._isInsideDialogBox(event)) {
                this._dismiss();
                return;
            }
            // A slotted element with class `close` dismisses; other
            // content clicks keep the dialog open.
            if (event.composedPath().some((node) =>
                node.nodeType === 1 && node.classList &&
                node.classList.contains('close'))) {
                this._dismiss();
            }
        });
        this._close.addEventListener('click', () => this._dismiss());
        this._dialog.addEventListener(
            'cancel', () => { this._userClosed = true; });
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
     * Set the trigger text, rendered into the trigger button.
     * @param {*} text Trigger text
     */
    setText(text) {
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
        if (this._dialog.open) {
            this._userClosed = true;
        }
        this.setOpen(!this._dialog.open);
    }

    /**
     * Report whether a pointer event's coordinates fall inside the
     * dialog's border box.
     * @param {MouseEvent} event Pointer event
     */
    _isInsideDialogBox(event) {
        const rect = this._dialog.getBoundingClientRect();
        return event.clientX >= rect.left && event.clientX <= rect.right &&
            event.clientY >= rect.top && event.clientY <= rect.bottom;
    }

    /**
     * Close the dialog from a user dismissal.
     */
    _dismiss() {
        this._userClosed = true;
        this.setOpen(false);
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
     * (`Escape`), the backdrop or the instructions container.
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
        const userClosed = this._userClosed;
        this._userClosed = false;
        if (!userClosed) {
            return;
        }
        // The platform restores focus to the element focused at
        // showModal() after the close event; the deferred call runs
        // after that restoration.
        setTimeout(() => this._focusTrigger());
    }

    /**
     * Move focus to the slotted trigger control, to the element button
     * when the slot has none, or to the host when slotted markup hides
     * the button.
     */
    _focusTrigger() {
        if (!this.isConnected) {
            return;
        }
        const assigned = this._triggerSlot
            .assignedNodes({ flatten: true })
            .filter((node) => node.nodeType === Node.ELEMENT_NODE);
        const slotted = assigned
            .map((el) => el.matches(FOCUSABLE) ? el
                : el.querySelector(FOCUSABLE))
            .find(Boolean);
        if (slotted) {
            slotted.focus();
            return;
        }
        if (this._trigger.hidden) {
            this.tabIndex = -1;
            this.focus();
            return;
        }
        this._trigger.focus();
    }
}

// Register once: loading this module twice (or on a page that already
// defined the element) must not throw.
if (typeof customElements !== 'undefined' &&
    !customElements.get('tf-help')) {
    customElements.define('tf-help', TfHelpElement);
}
