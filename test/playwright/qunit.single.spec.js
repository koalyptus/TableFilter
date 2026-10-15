// Single-file QUnit harness (#893): loads one existing QUnit HTML
// suite in headless Chromium and asserts zero failures. Override
// the suite with QUNIT_FILE, e.g.
// QUNIT_FILE=test/test-dropdown.html npx playwright test
// test/playwright/qunit.single.spec.js
const { test, expect } = require('@playwright/test');
const { runQUnitSuite } = require('./qunitSuite');

const qunitFile =
    process.env.QUNIT_FILE || 'test/test-emitter.html';

test(`QUnit single suite: ${qunitFile}`, async ({ page }) => {
    await runQUnitSuite(page, expect, qunitFile);
});
