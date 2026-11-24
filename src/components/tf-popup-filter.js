/**
 * `<tf-popup-filter>`: accessible column filter popup with an open shadow
 * root. The `trigger` slot holds consumer icons; the element renders its own
 * button when it is empty. The default slot projects filter content into a
 * non-modal `role="dialog"` popup.
 *
 * Attributes: `trigger-text`, `accessible-label`, `accessible-popup-label`,
 * `open`, `disabled`. Methods: `setText()`, `setLabel()`, `setPopupLabel()`,
 * `setOpen()`. State changes emit composed `open-change` with
 * `detail: {open}`.
 *
 * Opening focuses the first focusable filter control or the popup. `Escape`
 * and outside pointer presses close it; focus returns to the trigger.
 * Popup state is mirrored onto a slotted trigger. Styling uses `::part()`;
 * importing this module registers the element.
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
        // Assigned trigger attributes before this element applied popup
        // state, keyed by element.
        this._triggerState = new Map();
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
        this._applyOpen(false);
        this.ownerDocument.addEventListener(
            'pointerdown', this._onOutsidePointerDown, true);
    }

    disconnectedCallback() {
        this.ownerDocument.removeEventListener(
            'pointerdown', this._onOutsidePointerDown, true);
    }

    attributeChangedCallback(name) {
        this._update();
        if (name === 'open') {
            this._applyOpen(true);
        }
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
            this.setAttribute('open', '');
        } else {
            this.removeAttribute('open');
        }
    }

    /**
     * Apply the open attribute to the popup, report the state and move
     * focus into or out of the popup.
     * @param {Boolean} moveFocus Whether opening moves focus into the popup
     */
    _applyOpen(moveFocus) {
        if (!this.isConnected) {
            return;
        }
        const open = this.hasAttribute('open');
        const hadFocus = !open && this._containsFocus();
        this._popup.hidden = !open;
        this._syncExpanded();
        this._reportOpen(open);
        if (open && moveFocus && this.hasAttribute('open')) {
            this._focusContent();
        } else if (hadFocus) {
            this._focusTrigger();
        }
    }

    /**
     * Render attributes into the shadow parts.
     */
    _update() {
        // The constructor installs the shadow parts before attribute
        // callbacks run, so the parts exist on every call.
        const label = this.getAttribute('accessible-label') || '';
        if (label) {
            this._trigger.setAttribute('aria-label', label);
        } else {
            this._trigger.removeAttribute('aria-label');
        }
        this._triggerText.textContent =
            this.getAttribute('trigger-text') || '';

        if (this.hasAttribute('disabled')) {
            this._trigger.setAttribute('disabled', '');
        } else {
            this._trigger.removeAttribute('disabled');
        }

        this._syncLayout();
    }

    /**
     * Name the popup from its own attribute, from an assigned trigger
     * control, or from the element button.
     * @param {Array<Element>} assigned Assigned trigger elements
     */
    _setPopupName(assigned) {
        const label = this.getAttribute('accessible-popup-label') || '';
        const triggerName = label || this._assignedTriggerName(assigned);
        if (triggerName) {
            this._popup.setAttribute('aria-label', triggerName);
            this._popup.removeAttribute('aria-labelledby');
        } else {
            this._popup.removeAttribute('aria-label');
            this._popup.setAttribute('aria-labelledby', TRIGGER_ID);
        }
    }

    /**
     * Read the accessible name of the first assigned trigger control.
     * @param {Array<Element>} assigned Assigned trigger elements
     * @returns {String} Trigger name, or an empty string
     */
    _assignedTriggerName(assigned) {
        for (const el of assigned) {
            const label = (el.getAttribute('aria-label') || '').trim();
            if (label) {
                return label;
            }
            const text = (el.textContent || '').trim();
            if (text) {
                return text;
            }
            const image = el.querySelector('img[alt]');
            const alt = image ? (image.getAttribute('alt') || '').trim() : '';
            if (alt) {
                return alt;
            }
        }
        return '';
    }

    /**
     * Show the element-rendered button only when the trigger slot has no
     * assigned nodes, and mirror the popup state onto slotted triggers.
     */
    _syncLayout() {
        const assigned = this._triggerSlot
            .assignedNodes({ flatten: true })
            .filter((node) => node.nodeType === Node.ELEMENT_NODE);
        this._trigger.hidden = this._triggerSlot
            .assignedNodes({ flatten: true }).length > 0;
        this._syncSlottedTrigger(assigned);
        this._setPopupName(assigned);
        this._syncExpanded();
    }

    /**
     * Apply `aria-haspopup` to the assigned trigger controls and restore
     * their previous value when the slot no longer carries them.
     * @param {Array<Element>} assigned Assigned trigger elements
     */
    _syncSlottedTrigger(assigned) {
        const current = new Set(assigned);
        this._triggerState.forEach((previous, el) => {
            if (current.has(el)) {
                return;
            }
            this._restoreAttribute(el, 'aria-haspopup', previous.hasPopup);
            this._restoreAttribute(el, 'aria-expanded', previous.expanded);
            this._triggerState.delete(el);
        });
        assigned.forEach((el) => {
            if (!this._triggerState.has(el)) {
                this._triggerState.set(el, {
                    hasPopup: el.getAttribute('aria-haspopup'),
                    expanded: el.getAttribute('aria-expanded')
                });
            }
            el.setAttribute('aria-haspopup', 'dialog');
        });
    }

    /**
     * Restore an attribute to its previous value, or remove it.
     * @param {Element} el Element to update
     * @param {String} name Attribute name
     * @param {String|null} value Previous value
     */
    _restoreAttribute(el, name, value) {
        if (value === null) {
            el.removeAttribute(name);
        } else {
            el.setAttribute(name, value);
        }
    }

    /**
     * Keep `aria-expanded` in sync with the open attribute on the element
     * button and on assigned trigger controls.
     */
    _syncExpanded() {
        const expanded = String(this.hasAttribute('open'));
        this._trigger.setAttribute('aria-expanded', expanded);
        this._triggerState.forEach((previous, el) => {
            el.setAttribute('aria-expanded', expanded);
        });
    }

    /**
     * Toggle the popup from either trigger control.
     */
    _toggle() {
        if (this.hasAttribute('disabled')) {
            return;
        }
        if (this.hasAttribute('open')) {
            this._close();
        } else {
            this.setOpen(true);
        }
    }

    /**
     * Close the popup.
     */
    _close() {
        this.removeAttribute('open');
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
        this._close();
    }

    /**
     * Close when a pointer press lands outside the host and its slots.
     * @param {PointerEvent} event Pointerdown event
     */
    _handleOutsidePointerDown(event) {
        if (!this.hasAttribute('open')) {
            return;
        }
        if (event.composedPath().indexOf(this) !== -1) {
            return;
        }
        this._close();
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
        return this.shadowRoot.activeElement === this._popup;
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
