/**
 * Shared host-attribute conventions for the custom elements
 * (ROADMAP/hybrid-migration-strategy.md), kept in one place so the
 * components share a source instead of copy-pasting the same lists and
 * contracts:
 *
 * - the skip rule for the `<table-filter>` attribute -> config
 *   normalization (`PRESENTATION_ATTRIBUTES`, `FORBIDDEN_KEYS`,
 *   `isSkippedAttribute()`), and
 * - the live-region contract the announcing components enforce
 *   (`LIVE_REGION_ATTRIBUTES`, `applyLiveRegion()`).
 */

// HTML presentation attributes that are never component configuration.
export const PRESENTATION_ATTRIBUTES = ['id', 'class', 'style', 'slot',
    'hidden', 'title', 'lang', 'dir', 'role', 'tabindex', 'part',
    'exportparts'];

// Keys that would reach a config object's own prototype instead of
// defining an option.
export const FORBIDDEN_KEYS = ['__proto__', 'constructor', 'prototype'];

/**
 * Whether a host attribute must be skipped as component configuration: a
 * presentation attribute, the `data-*`/`aria-*` namespaces, a
 * prototype-reaching key in `FORBIDDEN_KEYS`, or a component-specific
 * name passed in `extraSkips`.
 * @param {String} name Attribute name
 * @param {Array<String>} [extraSkips] Component-owned attributes to skip
 * @return {Boolean} True when the attribute must not become config
 */
export function isSkippedAttribute(name, extraSkips) {
    return PRESENTATION_ATTRIBUTES.indexOf(name) !== -1 ||
        (extraSkips !== undefined && extraSkips.indexOf(name) !== -1) ||
        name.indexOf('data-') === 0 ||
        name.indexOf('aria-') === 0 ||
        FORBIDDEN_KEYS.indexOf(name) !== -1;
}

// Live-region contract for components that announce updates. `role`
// `status` already implies polite and atomic, but they are set (not
// merely defaulted) on connect so a wrong consumer value is corrected;
// the host is the region and the shadow parts stay ARIA-free so an
// update is announced once, not twice.
export const LIVE_REGION_ATTRIBUTES = {
    role: 'status',
    'aria-live': 'polite',
    'aria-atomic': 'true'
};

/**
 * Enforce the live-region contract on a host element.
 * @param {HTMLElement} el Host element to turn into a live region
 */
export function applyLiveRegion(el) {
    Object.keys(LIVE_REGION_ATTRIBUTES).forEach((name) => {
        el.setAttribute(name, LIVE_REGION_ATTRIBUTES[name]);
    });
}
