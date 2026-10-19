/**
 * `<tf-status>` custom element: accessible status indicator
 * (ROADMAP: preliminary-and-milestone-0.8.0-plan.md, "Component 2").
 *
 * Scaffold (#905): an open shadow root exposing the `label` and
 * `message` parts, rendered statically from the `text` and `message`
 * attributes. The host is the live region (#906): connecting it enforces
 * the shared live-region contract (`applyLiveRegion()`) so message
 * changes are announced. The StatusBar bridge (#907) follows.
 *
 * `text` is a plain label and is rendered as text. `message` is rendered
 * as HTML, matching legacy `StatusBar` (`msgContainer.innerHTML = t`),
 * so configured messages such as `status_bar.msg_filter` keep working
 * unchanged (#1012). The markup is passed through `sanitizeHtml()`
 * (DOMPurify) before injection: ordinary markup is preserved, scripts
 * and event handlers are stripped.
 *
 * Styling is deliberately not shipped here. TableFilter themes through
 * the `--tf-*` custom properties (#892/#945 — inherited into shadow
 * trees) and `::part()` hooks, so the element exposes `part="label"` /
 * `part="message"` and leaves the look to the stylesheet/theme. It also
 * hardcodes no CSS class: the status class is configurable
 * (`status_bar.css_class`, default `status`) and #907 applies it to
 * this host.
 *
 * Importing this module registers the element. Like `<table-filter>` it
 * is deliberately not part of the legacy webpack bundle (PhantomJS
 * `_wrapNativeSuper`); consumers load it as a module, and shipping it
 * in a bundle belongs with #965.
 */

import {sanitizeHtml} from '../sanitize.js';
import {applyLiveRegion} from './attributes.js';

// Cloned into every instance's shadow root. Structure and `part` hooks
// only: `part` is the stable internal contract (selected by _update()
// and themed via ::part()), and no class or presentational style is
// baked in, so themes and consumers stay in control.
const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = `
    <span part="label"></span>
    <span part="message"></span>
`;

export class TfStatusElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(TEMPLATE.content.cloneNode(true));
        this._labelEl = this.shadowRoot.querySelector('[part="label"]');
        this._msgEl = this.shadowRoot.querySelector('[part="message"]');
    }

    static get observedAttributes() {
        return ['text', 'message'];
    }

    connectedCallback() {
        // Live-region contract (#906): the host is the region, so a
        // message change is announced once, as "label message".
        applyLiveRegion(this);
        this._update();
    }

    attributeChangedCallback() {
        this._update();
    }

    /**
     * Set the message, rendered as sanitised HTML into the `message` part.
     * Values are coerced to strings so a falsy non-string (e.g. 0) is
     * displayed rather than silently dropped. Markup is allowed to stay
     * backward compatible with legacy `StatusBar` messages (#1012); it is
     * sanitised with DOMPurify before injection.
     * @param {String} msg Message text/HTML
     */
    setMessage(msg) {
        this.setAttribute('message', msg == null ? '' : String(msg));
    }

    /**
     * Render the `text` attribute as text and the `message` attribute as
     * sanitised HTML into the shadow parts.
     */
    _update() {
        if (this._labelEl) {
            this._labelEl.textContent = this.getAttribute('text') || '';
        }
        if (this._msgEl) {
            this._msgEl.innerHTML =
                sanitizeHtml(this.getAttribute('message') || '');
        }
    }
}

// Register once: loading this module twice (or on a page that already
// defined the element) must not throw.
if (typeof customElements !== 'undefined' &&
    !customElements.get('tf-status')) {
    customElements.define('tf-status', TfStatusElement);
}
