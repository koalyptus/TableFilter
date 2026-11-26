// Paging bridge gate (#926, #1042): the demo page mounts Paging on
// <tf-pager> and the results-per-page selector on <tf-results-per-page>,
// using the legacy spans and selects nowhere, and Loader on <tf-loader>
// with its `text` configured. The page lives in static/templates/ and is
// built into the gitignored demos/ by grunt build-demos; the Vite dev
// server that serves the repo root compiles the element modules it
// imports.
//
// The gate conditions are silent-failure paths: the elements are absent
// from both published bundles, so the page imports them; a
// `type="module"` script is deferred, so a bare tf.init() races the
// registration and falls back to legacy markup; and the pager bridge only
// uses the element when `enable_icons` is off and no `btn_*_page_html` is
// configured (src/modules/paging.js, TODO #965). Fails CI on regression.
const { test, expect } = require('@playwright/test');

const DEMO_PAGE = 'demos/tf-pager.html';

test(`paging mounts on <tf-pager>: ${DEMO_PAGE}`, async ({ page }) => {
    const pageErrors = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));

    await page.goto(`/${DEMO_PAGE}`);

    // The elements registered, so the deferred modules loaded.
    await page.waitForFunction(
        () => Boolean(customElements.get('tf-pager')) &&
            Boolean(customElements.get('tf-loader')) &&
            Boolean(customElements.get('tf-results-per-page'))
    );

    // The feature routed through the bridge: the host is in the DOM with
    // its open shadow root, not the legacy select and button spans.
    await page.waitForSelector('tf-pager [part="next"]', {
        timeout: 15000
    });

    // Loader mounts hidden (init calls show(NONE) after closeDelay) and
    // carries the configured text in the element's message part.
    await page.waitForFunction(() => {
        const el = document.querySelector('tf-loader');
        return el && getComputedStyle(el).display === 'none';
    }, { timeout: 15000 });

    const loaderAtRest = await page.evaluate(() => {
        const el = document.querySelector('tf-loader');
        const message = el.shadowRoot.querySelector('[part=message]');
        return {
            tag: el.nodeName,
            className: el.className,
            text: el.getAttribute('text'),
            message: message.textContent,
            messageHidden: message.hidden,
            legacyDivs: document.querySelectorAll('div.loader').length
        };
    });

    // The host attributes are driven by the feature (paging.js:698,
    // :898), so the page state is asserted through them.
    const result = await page.evaluate(async () => {
        const host = document.querySelector('tf-pager');
        const sr = host.shadowRoot;
        const resultsHost = document.querySelector('tf-results-per-page');
        const resultsSelect = resultsHost.shadowRoot
            .querySelector('[part="results-select"]');

        const resultsBefore = {
            tag: resultsHost.nodeName,
            className: resultsHost.className,
            label: resultsHost.shadowRoot
                .querySelector('[part="results-text"]').textContent,
            options: Array.from(resultsSelect.options)
                .map((option) => option.value),
            selected: resultsSelect.value,
            attr: resultsHost.getAttribute('page-length')
        };

        // 1177 rows (countries-table partial) at length 10.
        const totalPages = host.getAttribute('total-pages');

        const before = host.getAttribute('page');

        sr.querySelector('[part="next"]').click();
        const afterNext = host.getAttribute('page');

        // The shadow `change` is not composed, so the element relays the
        // pick as `page-change` (it reads `selectedIndex`, tf-pager.js).
        const slc = sr.querySelector('[part="page-select"]');
        slc.selectedIndex = 4;
        slc.dispatchEvent(new Event('change', { bubbles: true }));
        const afterSelect = host.getAttribute('page');

        // Page 5 holds rows 41-50; the feature hides the rest.
        const visible = Array.from(
            document.querySelectorAll('#demo tbody tr')
        ).filter((row) => row.offsetParent !== null).length;

        // The results element relays the shadow `change` as
        // `page-length-change`; the feature rewrites the pager state.
        resultsSelect.selectedIndex = 1;
        resultsSelect.dispatchEvent(new Event('change', { bubbles: true }));
        const afterLength = {
            attr: resultsHost.getAttribute('page-length'),
            totalPages: host.getAttribute('total-pages'),
            page: host.getAttribute('page'),
            visible: Array.from(
                document.querySelectorAll('#demo tbody tr')
            ).filter((row) => row.offsetParent !== null).length
        };

        // The hosts carry the legacy classes
        // (v1-webcomponents-investigation.md:479), so exclude them: no
        // legacy paging or results control was rendered beside them.
        const legacyResultsLeftovers = document.querySelectorAll(
            'select.rspg, span.rspgSpan'
        ).length;
        const legacyLeftovers = host.parentElement.querySelectorAll(
            '.pgSlc:not(tf-pager), .pgNb:not(tf-pager), ' +
            '.pgInp:not(tf-pager)'
        ).length;

        // Loader: a page change fires the before-action events, so the
        // host is visible while the feature runs and hides again after
        // closeDelay (250ms). Read it inside that window.
        const loader = document.querySelector('tf-loader');
        await new Promise((resolve) => setTimeout(resolve, 50));
        const loaderShown = getComputedStyle(loader).display !== 'none';

        return {
            selectorTag: slc.tagName,
            totalPages,
            before,
            afterNext,
            afterSelect,
            visible,
            resultsBefore,
            afterLength,
            legacyResultsLeftovers,
            legacyLeftovers,
            loaderShown
        };
    });

    // The loader hides again once the close delay elapses.
    await page.waitForFunction(() => {
        const el = document.querySelector('tf-loader');
        return el && getComputedStyle(el).display === 'none';
    }, { timeout: 5000 });

    expect(result.selectorTag).toBe('SELECT');
    expect(result.totalPages).toBe('118');
    expect(result.before).toBe('1');
    expect(result.afterNext).toBe('2');
    expect(result.afterSelect).toBe('5');
    expect(result.visible).toBe(10);
    expect(result.resultsBefore).toEqual({
        tag: 'TF-RESULTS-PER-PAGE',
        className: 'rspg rspgSpan',
        label: 'Records: ',
        options: ['10', '25', '50', '100'],
        selected: '10',
        attr: '10'
    });
    expect(result.afterLength).toEqual({
        attr: '25', totalPages: '48', page: '5', visible: 25
    });
    expect(result.legacyResultsLeftovers).toBe(0);
    expect(result.legacyLeftovers).toBe(0);
    expect(result.loaderShown).toBe(true);
    expect(loaderAtRest).toEqual({
        tag: 'TF-LOADER',
        className: 'loader',
        text: 'Loading rows...',
        message: 'Loading rows...',
        messageHidden: false,
        legacyDivs: 0
    });
    expect(pageErrors).toEqual([]);
});
