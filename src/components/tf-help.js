/**
 * `<tf-help>` custom element: help instructions in a native `<dialog>`
 * (ROADMAP: hybrid-migration-strategy.md, Milestone 0.8.x).
 *
 * Scaffold (#913): an open shadow root with a trigger button and a modal
 * dialog. The dialog carries `part="dialog"`, the projected instructions
 * live in `part="instructions"` and the close control is a semantic
 * `<button type="button">` via `part="close"`. Opening goes through
 * `showModal()`, so the browser provides the focus trap, the `Escape`
 * key and the top layer. The focus-return contract is #914 and the Help
 * bridge is #915.
 *
 * Content routes, following the legacy `Help` config
 * (ROADMAP: content-projection-parity.md, inventory row 5):
 * - `btn_html` → project markup through `slot="trigger"`.
 * - `btn_text` → set `trigger-text`, rendered as the button's text.
 *   `label` sets the button's `aria-label`.
 * - `help_instructions.html` → project markup through
 *   `slot="instructions"`.
 * - `help_instructions.text` → set `instructions-text`, rendered as text.
 *
 * No value is defaulted here: every configurable string comes from its
 * attribute, so the element renders nothing until the bridge (#915)
 * maps the legacy config, including the defaults in `help.js`
 * (`btn_text` at help.js:59). The same split applies to the legacy
 * `btn_css_class`/`container_css_class` classes, `target_id`,
 * `toolbar_position` and `container_target_id`: they are bridge
 * concerns, as in the other feature bridges (`clearButton.js:129-152`,
 * `statusBar.js:234-260`).
 *
 * The host `open` attribute reflects the dialog state: setting it calls
 * `showModal()`, removing it calls `close()`. The trigger and the close
 * button toggle it and `open-change` reports the state with
 * `detail: {open}`. `dialog-label` names the dialog; without it the
 * dialog is named from the trigger through `aria-labelledby`, as
 * `<tf-checklist>` names its listbox from the trigger. `close-text`
 * sets the close control's text.
 *
 * Styling is left to the theme via `--tf-*` custom properties and
 * `::part()`. The element ships no CSS class and no presentational
 * style.
 *
 * Importing this module registers the element. Like the other leaf
 * components it is not part of the legacy webpack bundle (PhantomJS
 * `_wrapNativeSuper`); consumers load it as a module, and shipping it in
 * a bundle belongs with #965.
 */

import {addEvt} from '../event';
import {defaultsStr} from '../settings';

const TRIGGER_ID = 'trigger';
const DIALOG_ID = 'dialog';

// Cloned into every instance's shadow root. Structure and `part` hooks
// only: no class or presentational style is baked in.
const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = `
    <button type="button" part="trigger" id="${TRIGGER_ID}"
        aria-haspopup="dialog" aria-expanded="false"
        aria-controls="${DIALOG_ID}">
        <slot name="trigger"></slot><span part="trigger-text"></span>
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
        this._trigger = this.shadowRoot.querySelector('[part="trigger"]');
        this._triggerText =
            this.shadowRoot.querySelector('[part="trigger-text"]');
        this._dialog = this.shadowRoot.querySelector('[part="dialog"]');
        this._instructionsText =
            this.shadowRoot.querySelector('[part="instructions-text"]');
        this._close = this.shadowRoot.querySelector('[part="close"]');
        this._closeText =
            this.shadowRoot.querySelector('[part="close-text"]');
        this._reportedOpen = false;

        addEvt(this._trigger, 'click', () => this._toggle());
        addEvt(this._close, 'click', () => this.setOpen(false));
        addEvt(this._dialog, 'close', () => this._onClose());
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
            defaultsStr(this.getAttribute('trigger-text'), '');
        this._instructionsText.textContent =
            defaultsStr(this.getAttribute('instructions-text'), '');
        this._closeText.textContent =
            defaultsStr(this.getAttribute('close-text'), '');
        this._setDialogName();

        if (this.hasAttribute('disabled')) {
            this._trigger.setAttribute('disabled', '');
        } else {
            this._trigger.removeAttribute('disabled');
        }

        this._syncExpanded();
    }

    /**
     * Name the dialog from its own attribute, or from the trigger.
     */
    _setDialogName() {
        const label = defaultsStr(this.getAttribute('dialog-label'), '');
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
        const label = defaultsStr(this.getAttribute(attr), '');
        if (label) {
            el.setAttribute('aria-label', label);
        } else {
            el.removeAttribute('aria-label');
        }
    }

    /**
     * Toggle the dialog from the trigger.
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
