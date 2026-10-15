// Accessibility enforcement (#897): the status bar must report zero
// axe violations, scoped to its own container so unrelated page
// findings (filter inputs/selects, tracked by #948) do not mask a
// real status-bar regression. Fails CI on any violation.
const { test, expect } = require('@playwright/test');
const { scanAccessibility } = require('./axeScan');

const DEMO_PAGE = 'demos/demo.html';
const STATUS_SCOPE = '.status';

test(`Axe zero-violations: status bar on ${DEMO_PAGE}`, async (
    { page }, testInfo
) => {
    await page.goto(`/${DEMO_PAGE}`);
    await page.waitForSelector(`${STATUS_SCOPE}`, { timeout: 15000 });

    // Guard against a vacuous pass if the container class changes.
    expect(await page.locator(STATUS_SCOPE).count()).toBeGreaterThan(0);

    const violations = await scanAccessibility(
        page, testInfo, `status bar on ${DEMO_PAGE}`,
        { include: STATUS_SCOPE }
    );

    expect(
        violations.map((v) => `${v.id}: ${v.nodes.length} node(s)`)
    ).toEqual([]);
});
