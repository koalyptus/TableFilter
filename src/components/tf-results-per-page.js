/**
 * `<tf-results-per-page>` custom element: the labelled select that picks
 * how many rows a page holds.
 *
 * An open shadow root exposing a `<label>` (`part="results-label"`)
 * wrapping the label text (`part="results-text"`) and a native `<select>`
 * (`part="results-select"`). Because the select is that label's control,
 * the rendered text is its accessible name and activating the text
 * focuses the select. Legacy keeps the text in a sibling `<span>` and
 * names the select nowhere (src/modules/paging.js:662-669).
 *
 * Attributes:
 * - `results-text` — label text, rendered as text content.
 * - `page-length` — the selected page length. The matching option is
 *   selected, or the first option when the attribute is empty or matches
 *   none.
 *
 * The option list is never built here: `setPageLengths()` takes the page
 * lengths from the host, and each entry becomes an option whose value and
 * text are both that entry (legacy `new Option(v, v)`, paging.js:681).
 * Paging arithmetic — resolving `pageLength`, the start row and the page
 * count — stays with the host (paging.js:762-796).
 *
 * Styling is left to the theme via `--tf-*` custom properties and
 * `::part()`; the legacy `results_slc_css_class` and
 * `results_span_css_class` keys are `::part()` hooks, and no CSS class or
 * presentational style is shipped.
 *
 * Importing this module registers the element. It is not part of the
 * legacy webpack bundle; consumers load it as a module.
 */

const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = `
    <label part="results-label">
        <span part="results-text"></span><select part="results-select"></select>
    </label>
`;

export class TfResultsPerPageElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(TEMPLATE.content.cloneNode(true));
        this._textEl =
            this.shadowRoot.querySelector('[part="results-text"]');
        this._select =
            this.shadowRoot.querySelector('[part="results-select"]');
        // Page lengths supplied through setPageLengths().
        this._lengths = [];
        // A change inside the shadow root does not reach the host: the
        // native `change` event is not composed, so it is relayed as a
        // composed CustomEvent carrying the chosen value.
        this._select.addEventListener('change', () => {
            this.dispatchEvent(new CustomEvent('page-length-change', {
                detail: { pageLength: this._select.value },
                bubbles: true,
                composed: true
            }));
        });
    }

    static get observedAttributes() {
        return ['results-text', 'page-length'];
    }

    connectedCallback() {
        this._update();
    }

    attributeChangedCallback() {
        this._update();
    }

    /**
     * Set the label text, rendered into the `results-text` part.
     * @param {*} text Label text
     */
    setText(text) {
        this.setAttribute('results-text', text == null ? '' : String(text));
    }

    /**
     * Set the selected page length.
     * @param {*} pageLength Page length
     */
    setPageLength(pageLength) {
        this.setAttribute('page-length',
            pageLength == null ? '' : String(pageLength));
    }

    /**
     * Supply the option list. Each entry becomes an option whose value
     * and text are both the entry (src/modules/paging.js:681).
     * @param {Array<*>} lengths Page lengths
     */
    setPageLengths(lengths) {
        this._lengths = Array.isArray(lengths) ? lengths : [];
        this._updateOptions();
    }

    /**
     * Render the label text and select the option matching `page-length`.
     */
    _update() {
        this._textEl.textContent = this.getAttribute('results-text') || '';
        this._selectOptions();
    }

    /**
     * Rebuild the option list from the supplied page lengths.
     */
    _updateOptions() {
        this._select.textContent = '';
        this._lengths.forEach((length) => {
            this._select.add(new Option(length, length, false, false));
        });
        this._selectOptions();
    }

    /**
     * Select the option whose value matches `page-length`, or the first
     * option when the attribute is empty or matches none.
     */
    _selectOptions() {
        const options = this._select.options;
        if (options.length === 0) {
            return;
        }
        const pageLength = this.getAttribute('page-length') || '';
        let index = -1;
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === pageLength) {
                index = i;
                break;
            }
        }
        options[index === -1 ? 0 : index].selected = true;
    }
}

// Register once: loading this module twice (or on a page that already
// defined the element) must not throw.
if (typeof customElements !== 'undefined' &&
    !customElements.get('tf-results-per-page')) {
    customElements.define('tf-results-per-page', TfResultsPerPageElement);
}
