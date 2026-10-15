// Shared QUnit page driver: loads one existing QUnit HTML suite in a
// Playwright page and asserts zero failures. Used by the single-suite
// spec (#893) and the all-suites spec (#894).
const { readdirSync } = require('fs');
const { join } = require('path');

// All QUnit fixtures live directly in test/*.html.
function discoverSuites() {
    return readdirSync(join(__dirname, '..'))
        .filter((file) => file.endsWith('.html'))
        .sort()
        .map((file) => `test/${file}`);
}

async function runQUnitSuite(page, expect, qunitFile) {
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
}

module.exports = { discoverSuites, runQUnitSuite };
