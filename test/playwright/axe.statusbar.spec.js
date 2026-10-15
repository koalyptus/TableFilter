// Accessibility enforcement (#897): the status bar must report zero
// axe violations, scoped to its own container so unrelated page
// findings (filter inputs/selects, tracked by #948) do not mask a
// real status-bar regression. Fails CI on any violation.
const { test, expect } = require('@playwright/test');
const { scanAccessibility } = require('./axeScan');

const DEMO_PAGE = 'demos/demo.html';
const STATUS_SCOPE = '.status';

// Page load plus the scan outlast the 30s default.
test.setTimeout(60000);

test(`Axe zero-violations: status bar on ${DEMO_PAGE}`, async (
    { page }, testInfo
) => {
    await page.goto(`/${DEMO_PAGE}`);

    // The bar is empty until a message arrives, so it has no height
    // (none at all without the stylesheet): assert attachment, not
    // visibility. Auto-retries, and fails fast with a clear message
    // if the container class ever changes.
    const statusBar = page.locator(STATUS_SCOPE);
    await expect(statusBar, 'status bar container is not attached')
        .toBeAttached({ timeout: 15000 });

    const violations = await scanAccessibility(
        page, testInfo, `status bar on ${DEMO_PAGE}`,
        { include: STATUS_SCOPE }
    );

    expect(
        violations.map((v) => `${v.id}: ${v.nodes.length} node(s)`)
    ).toEqual([]);
});
