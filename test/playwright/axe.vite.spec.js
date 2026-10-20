// Accessibility enforcement (#1024): the Vite UMD demo loads
// dist/tablefilter/tablefilter.vite.js instead of the webpack bundle,
// so Vite-specific regressions in the generated filter UI (extension
// shims, flat global, globalThis gating) fail CI instead of waiting
// for the v1.0.0 pipeline retirement.
//
// TODO(#965): once Vite publishes at tablefilter.js, delete this spec
// along with demos/vite.html (or promote the page to demo.html).
//
// Unlike the report-only baseline (#896/#948), this page labels its
// generated filter controls, so it can gate at zero violations.
const { test, expect } = require('@playwright/test');
const { scanAccessibility } = require('./axeScan');

const DEMO_PAGE = 'demos/vite.html';
const VITE_BUNDLE = 'tablefilter.vite.js';

// Page load plus the scan outlast the 30s default.
test.setTimeout(120000);

test(`Axe zero-violations: Vite UMD demo ${DEMO_PAGE}`, async (
    { page }, testInfo
) => {
    await page.goto(`/${DEMO_PAGE}`);

    // The engine initialised: filter row and status bar are attached.
    await page.waitForSelector('#demo .fltrow', { timeout: 15000 });
    await expect(page.locator('#demo .status'))
        .toBeAttached({ timeout: 15000 });

    // Guard the point of the page: it must exercise the Vite artifact,
    // not silently fall back to the webpack bundle at the legacy path.
    const scriptSrc = await page.locator('script[src]').evaluateAll(
        (scripts) => scripts.map((script) => script.getAttribute('src'))
    );
    expect(scriptSrc.some((src) => src && src.endsWith(VITE_BUNDLE)))
        .toBe(true);

    const violations = await scanAccessibility(
        page, testInfo, `Vite UMD demo ${DEMO_PAGE}`
    );

    expect(
        violations.map((v) => `${v.id}: ${v.nodes.length} node(s)`)
    ).toEqual([]);
});
