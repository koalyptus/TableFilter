/**
 * `<tf-checklist>` custom element: multi-select filter popup.
 *
 * An open shadow root exposing a `<button type="button">` trigger
 * (`part="trigger"`) and a listbox popover (`part="listbox"`), following
 * the WAI-ARIA APG combobox pattern with a multi-select listbox.
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
 * Options are supplied through `setOptions()`. Each entry is either a
 * primitive value or an object with `value`, `text`, `disabled` and
 * `selected`; `text` defaults to the value and `setOptions()` clears the
 * previous selection. Every entry renders as a `role="option"` element
 * (`part="option"`) with `aria-selected`, `aria-disabled` for disabled
 * entries, and a decorative checkbox (`part="option-checkbox"`,
 * `aria-hidden`, non-interactive) followed by its text (`part="option-text"`),
 * rendered as `textContent` (markup shown literally, XSS-safe). The checkbox
 * is a styling hook; selection state is exposed through `aria-selected`
 * and the `option` part tokens (`option-selected` / `option-disabled`).
 *
 * `setSelectedValues()` selects the options matching the given values
 * and `getSelectedValues()` returns the selected values in option order.
 * Clicking an enabled option toggles it. Option text is rendered as
 * `textContent` (markup shown literally, matching legacy behavior).
 *
 * Events:
 * - `open-change` — dispatched when the trigger toggles the popover, with
 *   `detail: {open}`, the expanded state as a boolean. Bubbles and crosses
 *   the shadow boundary.
 * - `selection-change` — dispatched when a click toggles an option, with
 *   `detail: {values}`, the selected values in option order. Bubbles and
 *   crosses the shadow boundary. `setOptions()` and
 *   `setSelectedValues()` do not dispatch it.
 *
 * Content is projected into the trigger through `slot="trigger"`.
 * `setText()`, `setLabel()`, `setListboxLabel()` and `setOpen()` reflect
 * the matching attributes. Styling is left to the theme via `--tf-*`
 * custom properties and `::part()`; no CSS class or presentational style
 * is shipped.
 *
 * Importing this module registers the element. It is not part of the
 * legacy webpack bundle; consumers load it as a module.
 */

// Ids live inside each instance's shadow root, so they are unique per
// component instance. The trigger names the listbox by default.
const TRIGGER_ID = 'trigger';
const LISTBOX_ID = 'listbox';

const OPTION_SELECTOR = '[part~="option"]';

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

/**
 * Normalize an option entry into `{value, text, disabled, selected}`.
 * @param {*} entry Primitive value or `{value, text, disabled, selected}`
 * @returns {Object} Normalized option
 */
function normalizeOption(entry) {
    const isObject = entry !== null && typeof entry === 'object';
    const raw = isObject ? entry.value : entry;
    const value = raw == null ? '' : String(raw);
    const text = isObject && entry.text != null ?
        String(entry.text) : value;
    return {
        value,
        text,
        disabled: Boolean(isObject && entry.disabled),
        selected: Boolean(isObject && entry.selected)
    };
}

export class TfChecklistElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(TEMPLATE.content.cloneNode(true));
        this._trigger = this.shadowRoot.querySelector('button');
        this._triggerText =
            this.shadowRoot.querySelector('[part="trigger-text"]');
        this._listbox = this.shadowRoot.querySelector('[part="listbox"]');
        // Option entries supplied through setOptions(), in render order.
        this._options = [];
        // Rendered option elements, aligned with _options by index.
        this._optionEls = [];
        this._searchString = '';
        this._trigger.addEventListener('click', () => this._toggle());
        this._listbox.addEventListener('click', (evt) =>
            this._onOptionClick(evt));
        this._trigger.addEventListener('keydown', (evt) =>
            this._onTriggerKeydown(evt));
        this._listbox.addEventListener('keydown', (evt) =>
            this._onListboxKeydown(evt));
    }

    static get observedAttributes() {
        return ['trigger-text', 'label', 'listbox-label', 'open',
            'disabled', 'col']; // 'col' reserved for #929 column mapping
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
     * Replace the option list. Entries are primitives or objects with
     * `value`, `text`, `disabled` and `selected`. The previous selection
     * is cleared.
     * @param {Array<*>} options Option entries
     */
    setOptions(options) {
        this._options = (Array.isArray(options) ? options : [])
            .map(normalizeOption);
        this._renderOptions();
    }

    /**
     * Select the options whose value matches an entry in `values`, and
     * clear the selection of the rest.
     * @param {Array<*>} values Selected values
     */
    setSelectedValues(values) {
        const selected = new Set(
            (Array.isArray(values) ? values : []).map((v) => String(v)));
        this._options.forEach((option, index) => {
            this._applySelection(option, index, selected.has(option.value));
        });
    }

    /**
     * Get the values of the selected options, in option order.
     * @returns {Array<String>} Selected values
     */
    getSelectedValues() {
        return this._options
            .filter((option) => option.selected)
            .map((option) => option.value);
    }

    /**
     * Toggle an option on click.
     * @param {Event} evt Click event from inside the listbox
     */
    _onOptionClick(evt) {
        const target = evt.target instanceof Element ? evt.target : null;
        const el = target ? target.closest(OPTION_SELECTOR) : null;
        if (!el) {
            return;
        }

        const index = Number(el.getAttribute('data-index'));
        const option = this._options[index];
        if (!option || option.disabled) {
            return;
        }

        this._applySelection(option, index, !option.selected);
        this.dispatchEvent(new CustomEvent('selection-change', {
            detail: { values: this.getSelectedValues() },
            bubbles: true,
            composed: true
        }));
    }

    /**
     * Render every option entry into the listbox.
     */
    _renderOptions() {
        this._listbox.textContent = '';
        this._optionEls = this._options.map((option, index) => {
            const el = this._createOption(option, index);
            this._listbox.appendChild(el);
            return el;
        });
    }

    /**
     * Build an option element for an entry and apply its selection state.
     * Delegates selection-state updates to `_applySelection()` so the two
     * paths cannot drift.
     * @param {Object} option Normalized option
     * @param {Number} index Position in the option list
     * @returns {Element} Option element
     */
    _createOption(option, index) {
        const el = document.createElement('div');
        el.setAttribute('role', 'option');
        el.setAttribute('tabindex', '-1');
        el.setAttribute('data-index', String(index));
        el.id = `option-${index}`;
        const focusedEl = this.shadowRoot.activeElement;
        const focusedId = focusedEl ? focusedEl.id : '';
        if (focusedId) {
            this._listbox.setAttribute('aria-activedescendant', focusedId);
        } else {
            this._listbox.removeAttribute('aria-activedescendant');
        }
        // TODO(#929): removed — aria-activedescendant uses option ids
        const checkbox = document.createElement('span');
        checkbox.setAttribute('part', 'option-checkbox');
        checkbox.setAttribute('aria-hidden', 'true');

        const text = document.createElement('span');
        text.setAttribute('part', 'option-text');
        text.textContent = option.text;

        el.appendChild(checkbox);
        el.appendChild(text);

        // Build part tokens directly so creation and updates share one logic.
        const partNames = ['option'];
        if (option.selected) {
            partNames.push('option-selected');
        }
        if (option.disabled) {
            partNames.push('option-disabled');
        }
        el.setAttribute('part', partNames.join(' '));
        el.setAttribute('aria-selected', option.selected ? 'true' : 'false');
        if (option.disabled) {
            el.setAttribute('aria-disabled', 'true');
        }

        return el;
    }

    /**
     * Set an option's selection state on the entry and its element.
     * @param {Object} option Normalized option
     * @param {Number} index Position in the option list
     * @param {Boolean} selected Whether the option is selected
     */
    _applySelection(option, index, selected) {
        option.selected = selected;
        const el = this._optionEls[index];
        if (!el) {
            return;
        }
        el.setAttribute('aria-selected', selected ? 'true' : 'false');
        const partNames = ['option'];
        if (selected) {
            partNames.push('option-selected');
        }
        if (option.disabled) {
            partNames.push('option-disabled');
        }
        el.setAttribute('part', partNames.join(' '));
    }

    /**
     * Keyboard navigation on trigger
     */
    _onTriggerKeydown(evt) {
        const open = this.hasAttribute('open');
        if (evt.key === 'ArrowDown' || evt.key === 'ArrowUp' ||
            evt.key === ' ' || evt.key === 'Enter') {
            evt.preventDefault();
            if (!open) {
                this.setOpen(true);
                this._setExpanded(true);
                this.dispatchEvent(new CustomEvent('open-change', {
                    detail: { open: true }, bubbles: true, composed: true
                }));
                const enabled = this._optionEls.filter(
                    el => el.getAttribute('aria-disabled') !== 'true');
                const first = enabled[0] || this._optionEls[0];
                if (first) {
                    first.focus();
                }
            }
        }
        if (evt.key === 'Escape' && open) {
            evt.preventDefault();
            this.setOpen(false);
            this._setExpanded(false);
            this.dispatchEvent(new CustomEvent('open-change', {
                detail: { open: false },
                bubbles: true,
                composed: true
            }));
            this._trigger.focus();
        }
    }

    /**
     * Keyboard navigation inside listbox
     */
    _onListboxKeydown(evt) {
        const options = this._optionEls.filter(
            el => el.getAttribute('aria-disabled') !== 'true');
        const focused = this.shadowRoot.activeElement;
        const index = options.indexOf(focused);
        const k = evt.key;
        switch (k) {
            case 'ArrowDown': {
                evt.preventDefault();
                const next = options[index + 1] || options[0];
                if (next) {
                    next.focus();
                }
                break;
            }
            case 'ArrowUp': {
                evt.preventDefault();
                const prev = options[index - 1] ||
                    options[options.length - 1];
                if (prev) {
                    prev.focus();
                }
                break;
            }
            case 'Home': {
                evt.preventDefault();
                if (options[0]) {
                    options[0].focus();
                }
                break;
            }
            case 'End': {
                evt.preventDefault();
                if (options[options.length - 1]) {
                    options[options.length - 1].focus();
                }
                break;
            }
            case ' ':
            case 'Enter': {
                evt.preventDefault();
                const target = evt.target.closest('[part~="option"]');
                if (target) {
                    const idx = Number(
                        target.getAttribute('data-index'));
                    const option = this._options[idx];
                    if (option && !option.disabled) {
                        this._applySelection(
                            option, idx, !option.selected);
                        this.dispatchEvent(new CustomEvent(
                            'selection-change', {
                                detail: {
                                    values: this.getSelectedValues()
                                },
                                bubbles: true,
                                composed: true
                            }));
                    }
                    if (k === 'Enter' &&
                        this.hasAttribute('open')) {
                        this.setOpen(false);
                        this._setExpanded(false);
                        this.dispatchEvent(new CustomEvent(
                            'open-change', {
                                detail: { open: false },
                                bubbles: true,
                                composed: true
                            }));
                        this._trigger.focus();
                    }
                }
                break;
            }
            case 'Escape': {
                evt.preventDefault();
                this.setOpen(false);
                this._setExpanded(false);
                this.dispatchEvent(new CustomEvent('open-change', {
                    detail: { open: false },
                    bubbles: true,
                    composed: true
                }));
                this._trigger.focus();
                break;
            }
            default: {
                if (evt.key.length === 1 && !evt.ctrlKey &&
                    !evt.metaKey && !evt.altKey) {
                    evt.preventDefault();
                    this._searchString += evt.key.toLowerCase();
                    clearTimeout(this._searchTimeout);
                    this._searchTimeout = setTimeout(
                        () => {
                            this._searchString = '';
                        }, 500);
                    const focused = this.shadowRoot.activeElement;
                    const startIndex = focused &&
                        focused.hasAttribute('data-index') ?
                        Number(focused.getAttribute('data-index')) + 1 : 0;
                    const match = this._optionEls.slice(
                        startIndex).find(el => {
                        if (!el.hasAttribute('data-index')) {
                            return false;
                        }
                        const opt = this._options[
                            Number(el.getAttribute('data-index'))] || {};
                        const text = opt.text || '';
                        return text.toLowerCase().startsWith(
                            this._searchString);
                    }) || this._optionEls.find(el => {
                        if (!el.hasAttribute('data-index')) {
                            return false;
                        }
                        const opt = this._options[
                            Number(el.getAttribute('data-index'))] || {};
                        const text = opt.text || '';
                        return text.toLowerCase().startsWith(
                            this._searchString);
                    });
                    if (match) {
                        match.focus();
                        this._listbox.setAttribute(
                            'aria-activedescendant', match.id);
                    }
                }
                break;
            }
        }
    }
    /**
     * Toggle the popover and announce the new state.
     */
    _toggle() {
        const open = !this.hasAttribute('open');
        this.setOpen(open);
        this.dispatchEvent(new CustomEvent('open-change', {
            detail: { open },
            bubbles: true,
            composed: true
        }));
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
            this._searchString = '';
            clearTimeout(this._searchTimeout);
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
