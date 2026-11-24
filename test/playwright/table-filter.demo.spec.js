// Component gate (#904): the declarative demo page mounts and filters,
// which is the Milestone 0.8.0 acceptance gate for <table-filter>
// (ROADMAP/preliminary-and-milestone-0.8.0-plan.md, step 1.5). The
// page lives in static/templates/ and is built into the gitignored
// demos/ by grunt build-demos; the Vite dev server that serves the
// repo root compiles the element module it imports. Fails CI on
// regression.
const { test, expect } = require('@playwright/test');

const DEMO_PAGE = 'demos/table-filter.html';

test(`declarative <table-filter> mounts and filters: ${DEMO_PAGE}`, async ({
    page
}) => {
    await page.goto(`/${DEMO_PAGE}`);

    // The module registered the custom element.
    await page.waitForFunction(
        () => Boolean(customElements.get('table-filter'))
    );

    // The engine initialised on connect, so it inserted its filter row
    // into the wrapped table (#demo, from the countries-table partial).
    await page.waitForSelector('table-filter #demo .fltrow', {
        timeout: 15000
    });

    const result = await page.evaluate(async () => {
        const el = document.querySelector('table-filter');
        const tf = el.tf;
        // Cache-free baseline: getFilteredData() reads a validRowsIndex
        // cache that init() only fills as a side effect of a feature
        // such as alternate_rows, so deriving `before` from it made the
        // gate depend on that styling option.
        const before = tf.getFilterableRowsNb();
        // col-1="select" is applied from the declarative attribute.
        const isoTag = tf.getFilterElement(1).tagName;

        tf.setFilterValue(1, 'AGO');
        tf.filter();
        const filtered = tf.getFilteredData().length;

        await tf.clearFilters();
        const restored = tf.getFilteredData().length;

        const noResults = tf.feature('noResults');
        const host = noResults && noResults.cont;
        const noResultsText = host && host.shadowRoot
            .querySelector('[part="message-slot"]')
            .assignedNodes({ flatten: true })
            .map((node) => node.textContent || '').join('');
        const noResultsHidden = host && host.style.display;

        tf.setFilterValue(3, 'ZZZ');
        tf.filter();
        const noResultsShown = host && host.style.display;
        await tf.clearFilters();
        const noResultsRestored = host && host.style.display;

        return {
            initialized: tf.isInitialized(),
            hasSortExt: !!tf.extension('sort'),
            isoTag,
            loaderTag: tf.feature('loader') &&
                tf.feature('loader').cont.nodeName,
            loaderInHost: Boolean(
                document.querySelector('table-filter tf-loader')),
            noResultsTag: host && host.nodeName,
            noResultsInHost: Boolean(
                document.querySelector('table-filter tf-no-results')),
            noResultsText,
            noResultsHidden,
            noResultsShown,
            noResultsRestored,
            legacyDivs: document.querySelectorAll(
                'table-filter div.no-results').length,
            before,
            filtered,
            restored
        };
    });

    expect(result.initialized).toBe(true);
    expect(result.hasSortExt).toBe(true);
    expect(result.isoTag).toBe('SELECT');
    expect(result.loaderTag).toBe('TF-LOADER');
    expect(result.loaderInHost).toBe(true);
    expect(result.noResultsTag).toBe('TF-NO-RESULTS');
    expect(result.noResultsInHost).toBe(true);
    expect(result.noResultsText).toContain('No results');
    expect(result.noResultsHidden).toBe('none');
    expect(result.noResultsShown).toBe('block');
    expect(result.noResultsRestored).toBe('none');
    expect(result.legacyDivs).toBe(0);
    expect(result.filtered).toBeGreaterThan(0);
    expect(result.filtered).toBeLessThan(result.before);
    expect(result.restored).toBe(result.before);
});
