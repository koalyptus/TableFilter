// Accessibility baseline (#896, report-only): scan the flagship
// demo page and attach violations without failing. The whole-page
// findings (filter inputs/selects without labels) are tracked by
// #948; per-component enforcement lives in axe.statusbar.spec.js.
const { test, expect } = require('@playwright/test');
const { scanAccessibility } = require('./axeScan');

const DEMO_PAGE = 'demos/demo.html';

// Axe needs longer than the default 30s on this large fixture.
test.setTimeout(120000);

test(`Axe baseline (report-only): ${DEMO_PAGE}`, async (
    { page }, testInfo
) => {
    await page.goto(`/${DEMO_PAGE}`);
    await page.waitForSelector('#demo');
    // fltrow: default flts_row_css_class (src/tablefilter.js)
    // state: attached — the status bar is empty (zero height) until a
    // message arrives, so a visibility wait would only resolve when
    // the stylesheet happens to give the empty container height.
    await page.waitForSelector('#demo .fltrow, #demo .status', {
        state: 'attached',
        timeout: 15000
    });

    const violations =
        await scanAccessibility(page, testInfo, DEMO_PAGE);

    // Report-only: the scan ran and produced a structured report.
    // TODO(#948): assert zero violations once the whole-page
    // findings (unlabelled filter inputs/selects) are fixed.
    expect(Array.isArray(violations)).toBe(true);
});
