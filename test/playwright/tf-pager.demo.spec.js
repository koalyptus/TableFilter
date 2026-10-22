// Paging bridge gate (#926): the demo page mounts Paging on <tf-pager>
// rather than the legacy spans and select. The page lives in
// static/templates/ and is built into the gitignored demos/ by grunt
// build-demos; the Vite dev server that serves the repo root compiles
// the element module it imports.
//
// The gate conditions are all silent-failure paths, so each is asserted
// rather than assumed: the element is absent from both published
// bundles, so the page must import it; a `type="module"` script is
// deferred, so a bare tf.init() races the registration and falls back to
// legacy markup; and the bridge only uses the element when
// `enable_icons` is off and no `btn_*_page_html` is configured
// (src/modules/paging.js, TODO #965). Fails CI on regression.
const { test, expect } = require('@playwright/test');

const DEMO_PAGE = 'demos/tf-pager.html';

test(`paging mounts on <tf-pager>: ${DEMO_PAGE}`, async ({ page }) => {
    const pageErrors = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));

    await page.goto(`/${DEMO_PAGE}`);

    // The element registered, so the deferred module loaded.
    await page.waitForFunction(
        () => Boolean(customElements.get('tf-pager'))
    );

    // The feature routed through the bridge: the host is in the DOM with
    // its open shadow root, not the legacy select and button spans.
    await page.waitForSelector('tf-pager [part="next"]', {
        timeout: 15000
    });

    const result = await page.evaluate(() => {
        const tf = window.tf;
        const paging = tf.feature('paging');
        const host = paging.pagerEl;
        const sr = host.shadowRoot;

        // 1177 rows (countries-table partial) at length 10.
        const totalPages = Number(host.getAttribute('total-pages'));

        // The feature owns the state; the host only reflects it.
        const before = paging.currentPageNb;
        sr.querySelector('[part="next"]').click();
        const afterNext = {
            page: paging.currentPageNb,
            attr: host.getAttribute('page')
        };

        // The shadow `change` is not composed, so the element relays the
        // pick as `page-change` (it reads `selectedIndex`, tf-pager.js).
        const slc = sr.querySelector('[part="page-select"]');
        slc.selectedIndex = 4;
        slc.dispatchEvent(new Event('change', { bubbles: true }));
        const afterSelect = {
            page: paging.currentPageNb,
            attr: host.getAttribute('page')
        };

        // Page 5 holds rows 41-50; the feature hides the rest.
        const visible = Array.from(
            document.querySelectorAll('#demo tbody tr')
        ).filter((row) => row.offsetParent !== null).length;

        // The host carries the legacy paging classes
        // (v1-webcomponents-investigation.md:479), so exclude it: no
        // legacy paging control was rendered beside it.
        const legacyLeftovers = host.parentElement.querySelectorAll(
            '.pgSlc:not(tf-pager), .pgNb:not(tf-pager), ' +
            '.pgInp:not(tf-pager)'
        ).length;

        return {
            routed: Boolean(paging.pagerEl),
            selectorTag: slc.tagName,
            totalPages,
            before,
            afterNext,
            afterSelect,
            visible,
            legacyLeftovers
        };
    });

    expect(result.routed).toBe(true);
    expect(result.selectorTag).toBe('SELECT');
    expect(result.totalPages).toBe(118);
    expect(result.before).toBe(1);
    expect(result.afterNext.page).toBe(2);
    expect(result.afterNext.attr).toBe('2');
    expect(result.afterSelect.page).toBe(5);
    expect(result.afterSelect.attr).toBe('5');
    expect(result.visible).toBe(10);
    expect(result.legacyLeftovers).toBe(0);
    expect(pageErrors).toEqual([]);
});
