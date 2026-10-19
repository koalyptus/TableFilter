// TEMPORARY diagnostic spec (not part of the PR) — dumps what the CI
// dev server actually returns for the legacy bundle and what the page
// sees. Delete before finalising.
const { test } = require('@playwright/test');

test('DIAG bundle serving', async ({ page, request }) => {
    const responses = [];
    page.on('response', (res) => {
        if (res.url().includes('/dist/')) {
            responses.push({
                url: res.url(),
                status: res.status(),
                ct: res.headers()['content-type'],
                cl: res.headers()['content-length']
            });
        }
    });
    const errs = [];
    page.on('pageerror', (e) => errs.push(String(e)));
    const consoleMsgs = [];
    page.on('console', (m) => consoleMsgs.push(m.type() + ': ' + m.text()));

    await page.goto('/test/test-emitter.html');
    await page.waitForTimeout(2500);

    const state = await page.evaluate(() => ({
        tf: typeof window.TableFilter,
        tfName: (window.TableFilter && window.TableFilter.name) || null,
        keys: window.TableFilter ? Object.keys(window.TableFilter) : null,
        srcs: Array.from(document.querySelectorAll('script[src]'))
            .map((s) => s.getAttribute('src'))
    }));

    const r = await request.get('/dist/tablefilter/tablefilter.js');
    const body = await r.text();

    console.log('DIAG_STATE ' + JSON.stringify(state));
    console.log('DIAG_ERRS ' + JSON.stringify(errs));
    console.log('DIAG_RESP ' + JSON.stringify(responses));
    console.log('DIAG_CONSOLE ' + JSON.stringify(consoleMsgs.slice(0, 6)));
    console.log('DIAG_FETCH status=' + r.status() +
        ' ct=' + r.headers()['content-type'] +
        ' len=' + body.length +
        ' head=' + JSON.stringify(body.slice(0, 90)) +
        ' tail=' + JSON.stringify(body.slice(-90)));
});
