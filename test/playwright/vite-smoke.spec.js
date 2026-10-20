// Smoke test (#1023): the Vite UMD bundle staged by publishLegacyDist as
// dist/tablefilter/tablefilter.vite.js must load in a browser and expose
// the flat `window.TableFilter` class global. CI runs this right after
// `npm run build:vite`, before the QUnit suites (which validate the
// webpack bundle), so a broken Vite artifact fails fast.
//
// TODO(#965): retarget this spec at tablefilter.js once the Vite bundle
// replaces the legacy webpack path.
const { test, expect } = require('@playwright/test');
const pkg = require('../../package.json');

test('Vite UMD bundle exposes the flat TableFilter global', async (
    { page }
) => {
    const pageErrors = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));

    const response = await page.goto('/test/vite-smoke.html');
    expect(response.status()).toBe(200);

    await page.waitForFunction(
        () => window.__viteSmoke && window.__viteSmoke.ready
    );

    const smoke = await page.evaluate(() => window.__viteSmoke);
    expect(smoke.error).toBeNull();
    expect(smoke.loaded).toBe(true);
    expect(smoke.isClass).toBe(true);
    expect(smoke.instance).toBe(true);
    expect(smoke.flatGlobal).toBe(true);
    expect(smoke.version).toBe(pkg.version);
    expect(pageErrors).toEqual([]);
});
