/**
 * `<tf-popup-filter>` custom element: accessible column filter popup.
 *
 * An open shadow root exposes a `trigger` slot for consumer icons and an
 * element-rendered `<button part="trigger">` for the no-slotted-content
 * case, following the no-wrapper rule in ROADMAP/content-projection-parity.md.
 * A non-modal `role="dialog"` popup (`part="popup"`) holds the default slot
 * for the legacy filter container; the filter controls stay in light DOM,
 * where the engine queries them.
 *
 * Attributes: `trigger-text` (visible text), `accessible-label` (trigger
 * `aria-label`), `accessible-popup-label` (popup accessible name, falling
 * back to `aria-labelledby` on the trigger), `open` and `disabled`.
 * `setText()`, `setLabel()`, `setPopupLabel()` and `setOpen()` reflect the
 * matching attributes.
 *
 * The trigger toggles the popup and reports state with a composed
 * `open-change` event carrying `detail: {open}`. Opening moves focus to the
 * first focusable projected filter control, or to the popup. `Escape` closes
 * the popup and returns focus to the trigger control. A pointer press outside
 * the element closes it. The host adds no role or tabindex to slotted
 * content: a slotted control owns its semantics.
 *
 * The element ships no CSS class or presentational style; the look comes
 * from the stylesheet and themes through `::part()`. Importing this module
 * registers the element. It is not part of the legacy webpack bundle;
 * consumers load it as a module.
 */

const TRIGGER_ID = 'trigger';
const POPUP_ID = 'popup';

// Controls that take focus, used for the projected filter content and for
// picking the focus target inside slotted trigger markup. Matches
// FOCUSABLE_TRIGGER in modules/help.js.
const FOCUSABLE = 'button:not([disabled]), a[href], ' +
    'input:not([disabled]), select:not([disabled]), ' +
    'textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Cloned into every instance's shadow root. Structure and `part` hooks
// only: no class or presentational style is baked in.
const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = `
    <slot name="trigger" part="trigger-slot"></slot>
    <button type="button" part="trigger" id="${TRIGGER_ID}"
        aria-haspopup="dialog" aria-expanded="false"
        aria-controls="${POPUP_ID}">
        <span part="trigger-text"></span>
    </button>
    <div part="popup" id="${POPUP_ID}" role="dialog"
        aria-labelledby="${TRIGGER_ID}" tabindex="-1" hidden>
        <slot part="content-slot"></slot>
    </div>
`;

export class TfPopupFilterElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(TEMPLATE.content.cloneNode(true));
        this._triggerSlot =
            this.shadowRoot.querySelector('slot[name="trigger"]');
        this._trigger = this.shadowRoot.querySelector('[part="trigger"]');
        this._triggerText =
            this.shadowRoot.querySelector('[part="trigger-text"]');
        this._popup = this.shadowRoot.querySelector('[part="popup"]');
        this._contentSlot =
            this.shadowRoot.querySelector('slot[part="content-slot"]');
        this._reportedOpen = false;
        this._onOutsidePointerDown = (event) => {
            this._handleOutsidePointerDown(event);
        };

        this._trigger.addEventListener('click', () => this._toggle());
        this._triggerSlot.addEventListener('click', () => this._toggle());
        this._triggerSlot.addEventListener(
            'slotchange', () => this._syncLayout());
        this.addEventListener('keydown', (event) => this._onKeydown(event));
    }

    static get observedAttributes() {
        return ['trigger-text', 'accessible-label',
            'accessible-popup-label', 'open', 'disabled'];
    }

    connectedCallback() {
        this._update();
        this._reportedOpen = this.hasAttribute('open');
        this.ownerDocument.addEventListener(
            'pointerdown', this._onOutsidePointerDown, true);
    }

    disconnectedCallback() {
        this.ownerDocument.removeEventListener(
            'pointerdown', this._onOutsidePointerDown, true);
    }

    attributeChangedCallback() {
        this._update();
    }

    /**
     * Set the trigger's visible text.
     * @param {*} text Trigger text
     */
    setText(text) {
        this.setAttribute('trigger-text', text == null ? '' : String(text));
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
     * Set the popup's accessible name.
     * @param {*} label Accessible name
     */
    setPopupLabel(label) {
        this.setAttribute('accessible-popup-label',
            label == null ? '' : String(label));
    }

    /**
     * Open or close the popup. Opening moves focus into the popup; closing
     * restores focus to the trigger when focus is inside the popup.
     * @param {Boolean} open Whether the popup is open
     */
    setOpen(open) {
        if (open) {
            if (this.hasAttribute('open')) {
                return;
            }
            this.setAttribute('open', '');
            this._reportOpen(true);
            if (this.isConnected) {
                this._focusContent();
            }
        } else {
            this._close(false);
        }
    }

    /**
     * Render attributes into the shadow parts.
     */
    _update() {
        if (!this._trigger) {
            return;
        }

        const label = this.getAttribute('accessible-label') || '';
        if (label) {
            this._trigger.setAttribute('aria-label', label);
        } else {
            this._trigger.removeAttribute('aria-label');
        }
        this._triggerText.textContent =
            this.getAttribute('trigger-text') || '';
        this._setPopupName();

        if (this.hasAttribute('disabled')) {
            this._trigger.setAttribute('disabled', '');
        } else {
            this._trigger.removeAttribute('disabled');
        }

        this._syncLayout();
        this._syncExpanded();
        this._popup.hidden = !this.hasAttribute('open');
    }

    /**
     * Name the popup from its own attribute, or from the trigger.
     */
    _setPopupName() {
        const label = this.getAttribute('accessible-popup-label') || '';
        if (label) {
            this._popup.setAttribute('aria-label', label);
            this._popup.removeAttribute('aria-labelledby');
        } else {
            this._popup.removeAttribute('aria-label');
            this._popup.setAttribute('aria-labelledby', TRIGGER_ID);
        }
    }

    /**
     * Show the element-rendered button only when the trigger slot has no
     * assigned nodes.
     */
    _syncLayout() {
        this._trigger.hidden = this._triggerSlot
            .assignedNodes({ flatten: true }).length > 0;
    }

    /**
     * Keep `aria-expanded` in sync with the open attribute.
     */
    _syncExpanded() {
        this._trigger.setAttribute('aria-expanded',
            String(this.hasAttribute('open')));
    }

    /**
     * Toggle the popup from either trigger control.
     */
    _toggle() {
        if (this.hasAttribute('disabled')) {
            return;
        }
        if (this.hasAttribute('open')) {
            this._close(false);
        } else {
            this.setOpen(true);
        }
    }

    /**
     * Close the popup and restore focus to the trigger when requested or
     * when focus is currently inside the popup.
     * @param {Boolean} restoreFocus Always return focus to the trigger
     */
    _close(restoreFocus) {
        if (!this.hasAttribute('open')) {
            return;
        }
        const shouldRestore = restoreFocus || this._containsFocus();
        this.removeAttribute('open');
        this._reportOpen(false);
        if (shouldRestore) {
            this._focusTrigger();
        }
    }

    /**
     * Close on `Escape` and return focus to the trigger.
     * @param {KeyboardEvent} event Keydown event
     */
    _onKeydown(event) {
        if (event.key !== 'Escape' || !this.hasAttribute('open')) {
            return;
        }
        event.preventDefault();
        this._close(true);
    }

    /**
     * Close when a pointer press lands outside the host and its slots.
     * @param {PointerEvent} event Pointerdown event
     */
    _handleOutsidePointerDown(event) {
        if (!this.hasAttribute('open')) {
            return;
        }
        const path = typeof event.composedPath === 'function' ?
            event.composedPath() : [];
        if (path.indexOf(this) !== -1) {
            return;
        }
        this._close(false);
    }

    /**
     * Whether focus is inside the projected content or the popup itself.
     * @returns {Boolean} True when a descendant owns focus
     */
    _containsFocus() {
        const active = this.ownerDocument.activeElement;
        if (active && this.contains(active)) {
            return true;
        }
        const shadowActive = this.shadowRoot.activeElement;
        return Boolean(shadowActive &&
            (shadowActive === this._popup ||
                this._popup.contains(shadowActive)));
    }

    /**
     * Focus the first focusable projected filter control, or the popup.
     */
    _focusContent() {
        const assigned = this._contentSlot.assignedNodes({ flatten: true });
        for (const node of assigned) {
            if (node.nodeType !== Node.ELEMENT_NODE) {
                continue;
            }
            const target = node.matches(FOCUSABLE) ?
                node : node.querySelector(FOCUSABLE);
            if (target) {
                target.focus();
                if (this._containsFocus()) {
                    return;
                }
            }
        }
        this._popup.focus();
    }

    /**
     * Return focus to the slotted trigger control, the element button, or
     * the host when slotted markup hides the button.
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
        if (!this._trigger.hidden) {
            this._trigger.focus();
            return;
        }
        this.tabIndex = -1;
        this.focus();
    }

    /**
     * Dispatch `open-change` when the popup state changes.
     * @param {Boolean} open Current popup state
     */
    _reportOpen(open) {
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
}

// Register once: loading this module twice, or on a page that already
// defined the element, keeps the existing definition.
if (typeof customElements !== 'undefined' &&
    !customElements.get('tf-popup-filter')) {
    customElements.define('tf-popup-filter', TfPopupFilterElement);
}
