// Accessibility baseline (#896, report-only): scan the flagship
// demo page and attach violations without failing. Per-component
// enforcement follows separately (e.g. #897 for the status bar).
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
    await page.waitForSelector('#demo .fltsRow, #demo .status', {
        timeout: 15000
    });

    const violations =
        await scanAccessibility(page, testInfo, DEMO_PAGE);

    // Report-only: the scan ran and produced a structured report.
    expect(Array.isArray(violations)).toBe(true);
});
