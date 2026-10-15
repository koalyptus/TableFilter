// Single-file QUnit harness (issue #893): loads one existing QUnit
// HTML suite in headless Chromium and asserts zero failures.
// Override the suite with QUNIT_FILE, e.g.
// QUNIT_FILE=test/test-dropdown.html npx playwright test
const { test, expect } = require('@playwright/test');

const qunitFile =
    process.env.QUNIT_FILE || 'test/test-emitter.html';

test(`QUnit single suite: ${qunitFile}`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', (err) => errors.push(String(err)));

    await page.goto(`/${qunitFile}`);

    // QUnit 1.x renders the summary into #qunit-testresult once done.
    await page.waitForSelector('#qunit-testresult', {
        timeout: 15000
    });
    await page.waitForFunction(
        () => {
            const el =
                document.querySelector('#qunit-testresult');
            return el && /completed/i.test(el.textContent || '');
        },
        { timeout: 15000 }
    );

    const summary = await page.evaluate(() => {
        const el = document.querySelector('#qunit-testresult');
        const count = (cls) => {
            const node = el && el.querySelector(`.${cls}`);
            return node ? Number(node.textContent) : NaN;
        };
        const text = el ?
            el.textContent.trim().replace(/\s+/g, ' ') :
            '';
        return {
            text,
            total: count('total'),
            failed: count('failed'),
            passed: count('passed')
        };
    });

    expect(errors, `page errors: ${errors.join('; ')}`).toEqual([]);
    expect(summary.failed, `QUnit summary: ${summary.text}`).toBe(0);
    expect(summary.total, `no tests ran in ${qunitFile}`)
        .toBeGreaterThan(0);
});
