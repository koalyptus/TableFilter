// All-suites QUnit runner (#894): every test/*.html fixture runs
// headlessly in Chromium and must report zero failures.
const { test, expect } = require('@playwright/test');
const { discoverSuites, runQUnitSuite } = require('./qunitSuite');

for (const qunitFile of discoverSuites()) {
    test(`QUnit suite: ${qunitFile}`, async ({ page }) => {
        await runQUnitSuite(page, expect, qunitFile);
    });
}
