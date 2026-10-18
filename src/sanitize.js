/**
 * HTML sanitising for config-supplied markup.
 *
 * TableFilter lets consumers inject markup through config
 * (`btn_reset.html`, `loader.html`, status messages, …); see
 * ROADMAP/content-projection-parity.md. That config is integrator-authored
 * and trusted, but rendering it with `innerHTML` is still an XSS sink waiting
 * for an accidental untrusted value. Every such injection goes through
 * `sanitizeHtml()` so the trust boundary is explicit and enforced once.
 *
 * DOMPurify is the established sanitiser for this. Its default profile keeps
 * ordinary markup — `<b>`, `<i>`, `<a>`, `<span>`, `<br>`, `class`, … — and
 * strips scripts, event-handler attributes and `javascript:` URLs. Config
 * that relied on those was never doing anything safe, so dropping them is
 * intended.
 */
import DOMPurify from 'dompurify';

/**
 * Sanitise an HTML string for injection with `innerHTML`.
 * @param {*} html Markup
 * @returns {String} Sanitised markup
 */
export const sanitizeHtml = (html) =>
    DOMPurify.sanitize(html == null ? '' : String(html));
