// Component gate (#901): declarative configuration — the `config`
// JSON attribute merged with kebab-case attributes mapped onto the
// engine's snake_case options, attributes winning over the blob,
// valueless attributes enabling their flag, and HTML presentation
// attributes staying out of the engine config. Fails CI on regression.

const { test, expect } = require('@playwright/test');

const FIXTURE = '/test/test-emitter.html';
const COMPONENT = '/src/components/table-filter.js';

const VALID_TABLE =
    '<table><tbody>' +
    '<tr><th>City</th></tr>' +
    '<tr><td>Sydney</td></tr>' +
    '<tr><td>Adelaide</td></tr>' +
    '</tbody></table>';

// Mounts a <table-filter> with the given extra markup inside the
// element tag, then reports selected engine state as primitives.
async function mount(page, elementAttrs, body) {
    return page.evaluate(
        async ({ elementAttrs, component, table, body }) => {
            await import(component);
            const host = document.createElement('div');
            host.innerHTML =
                '<table-filter' + elementAttrs + '>' + table +
                '</table-filter>';
            document.body.appendChild(host);
            const el = host.querySelector('table-filter');
            const tf = el.tf;
            const result = {
                hasTf: Boolean(tf),
                initialized: Boolean(tf && tf.isInitialized()),
                watermark: tf && tf.watermark,
                caseSensitive: tf && tf.caseSensitive,
                onSlcChange: tf && tf.onSlcChange,
                paging: tf && tf.paging,
                colTypes: tf && tf.colTypes,
                hasConfig: tf && tf.hasConfig,
                modCount: tf ? Object.keys(tf.Mod).length : null,
                protoIsPlain: tf ?
                    Object.getPrototypeOf(tf.cfg) === Object.prototype :
                    null,
                cfgKeys: tf ? Object.keys(tf.cfg) : null,
                validRows: null,
                filterValue: null,
                basePath: tf && tf.basePath,
                themes: tf && tf.themes,
                fltCssClass: tf && tf.fltCssClass,
                fltsRowCssClass: tf && tf.fltsRowCssClass,
                fltMultiCssClass: tf && tf.fltMultiCssClass,
                fltSmallCssClass: tf && tf.fltSmallCssClass,
                singleFltCssClass: tf && tf.singleFltCssClass,
                btnCssClass: tf && tf.btnCssClass
            };
            if (body === 'filter-lowercase') {
                tf.setFilterValue(0, 'sydney');
                tf.filter();
                result.validRows = tf.getValidRowsNb();
            }
            if (body === 'filter-match') {
                tf.setFilterValue(0, 'Sydney');
                tf.filter();
                result.validRows = tf.getValidRowsNb();
            }
            return result;
        },
        {
            elementAttrs,
            component: COMPONENT,
            table: VALID_TABLE,
            body: body || null
        }
    );
}

test('attributes map onto engine options', async ({ page }) => {
    await page.goto(FIXTURE);
    const result = await mount(
        page,
        ' watermark="Search" case-sensitive="true" ' +
        'col-types=\'["string"]\''
    );
    expect(result.watermark).toBe('Search');
    expect(result.caseSensitive).toBe(true);
    expect(result.colTypes).toEqual(['string']);
    expect(result.initialized).toBe(true);
});

test('config attribute maps a JSON object', async ({ page }) => {
    await page.goto(FIXTURE);
    const result = await mount(
        page,
        ' config=\'{"watermark":"Blob","on_change":false}\''
    );
    expect(result.watermark).toBe('Blob');
    expect(result.onSlcChange).toBe(false);
});

test('attributes win over the config attribute', async ({ page }) => {
    await page.goto(FIXTURE);
    const result = await mount(
        page,
        ' config=\'{"watermark":"Blob"}\' watermark="Explicit"'
    );
    expect(result.watermark).toBe('Explicit');
});

test('for and id are never mapped into the config', async ({ page }) => {
    await page.goto(FIXTURE);
    const result = await mount(page, ' for="demo" id="host-el"');
    expect(result.cfgKeys).not.toContain('for');
    expect(result.cfgKeys).not.toContain('id');
});

test('valueless attributes enable their flag (HTML convention)', async ({
    page
}) => {
    await page.goto(FIXTURE);
    // <table-filter paging> is the roadmap's primary declarative usage:
    // presence must enable paging, not `Boolean('') === false`.
    const result = await mount(page, ' paging');
    expect(result.paging).toBe(true);
    expect(result.initialized).toBe(true);
});

test('presentation attributes are not engine config', async ({ page }) => {
    await page.goto(FIXTURE);
    const result = await mount(
        page,
        ' class="card" style="color:red" data-x="1" aria-label="grid" ' +
        'role="region" title="Cities"'
    );
    // A stray class/style/data/aria attribute must not count as
    // configuration: it would flip hasConfig and cut constructed
    // features down to the config-path subset.
    expect(result.cfgKeys).toEqual([]);
    expect(result.hasConfig).toBe(false);
    expect(result.modCount).toBeGreaterThan(3);
});

test('boolean spellings the JSON parser rejects are coerced', async ({
    page
}) => {
    await page.goto(FIXTURE);
    const result = await mount(
        page,
        ' case-sensitive="False" on-change="FALSE"'
    );
    // Without coercion these stay strings and Boolean('False') is true.
    expect(result.caseSensitive).toBe(false);
    expect(result.onSlcChange).toBe(false);

    const truthy = await mount(page, ' case-sensitive="True"');
    expect(truthy.caseSensitive).toBe(true);
});

test('prototype-reaching attribute names are ignored', async ({ page }) => {
    await page.goto(FIXTURE);
    const result = await mount(
        page,
        ' __proto__=\'{"paging":true}\' constructor="x" prototype="y"'
    );
    // Assigning config['__proto__'] would invoke the Object.prototype
    // setter and swap the config's prototype instead of setting paging.
    expect(result.protoIsPlain).toBe(true);
    expect(result.hasConfig).toBe(false);
    expect(result.paging).toBe(false);
});

test('no config keeps engine defaults and hasConfig false', async ({
    page
}) => {
    await page.goto(FIXTURE);
    const result = await mount(page, '');
    // An empty {} reaching the constructor would flip hasConfig and
    // change feature instantiation; the mapping must omit it.
    expect(result.hasConfig).toBe(false);
    expect(result.watermark).toBe('');
    expect(result.initialized).toBe(true);
});

test('invalid config JSON warns and still inits on defaults', async ({
    page
}) => {
    await page.goto(FIXTURE);
    const warnings = [];
    page.on('console', (msg) => {
        if (msg.type() === 'warning') {
            warnings.push(msg.text());
        }
    });
    const result = await mount(page, ' config="{not json"');
    expect(result.initialized).toBe(true);
    expect(result.watermark).toBe('');
    expect(warnings.join('\n')).toContain('<table-filter>');
});

// Styling configurability lives in the core engine, not only in the
// features (#993): the loader keys (base_path, themes) and the core
// filter class options must reach the engine through the declarative
// surface. NOTE: the `style_path` / `stylesheet` / `themes_path`
// overrides are currently ignored by the engine (#822), so asserting
// them here would encode the bug; that is tracked separately.
test('styling configuration reaches the engine', async ({ page }) => {
    // base_path drives the stylesheet/theme the engine loads on init, and
    // its loader throws from `file.onerror` when a file 404s. Serve the
    // fake path so this test asserts config mapping, not asset
    // availability (otherwise it emits unhandled load errors).
    await page.route('**/assets/tf/**', (route) =>
        route.fulfill({
            status: 200,
            contentType: 'text/css',
            body: ''
        }));
    await page.goto(FIXTURE);
    const result = await mount(
        page,
        ' base-path="/assets/tf/" flt-css-class="my-flt" ' +
        'flts-row-css-class="my-fltrow" btn-css-class="my-btn" ' +
        'single-filter=\'{"css_class":"my-single"}\' ' +
        'config=\'{"themes":[{"name":"skyblue"}],' +
        '"flt_multi_css_class":"my-multi"}\''
    );
    expect(result.initialized).toBe(true);
    // Core stylesheet/theme loader key.
    expect(result.basePath).toBe('/assets/tf/');
    expect(result.themes).toContainEqual({ name: 'skyblue' });
    // Core filter class options.
    expect(result.fltsRowCssClass).toBe('my-fltrow');
    expect(result.fltCssClass).toBe('my-flt');
    expect(result.fltMultiCssClass).toBe('my-multi');
    expect(result.singleFltCssClass).toBe('my-single');
    expect(result.btnCssClass).toBe('my-btn');
});

test('core styling defaults are unchanged when unset', async ({ page }) => {
    await page.goto(FIXTURE);
    const result = await mount(page, '');
    expect(result.basePath).toBe('tablefilter/');
    expect(result.fltsRowCssClass).toBe('fltrow');
    expect(result.fltCssClass).toBe('flt');
    expect(result.fltMultiCssClass).toBe('flt_multi');
    expect(result.fltSmallCssClass).toBe('flt_s');
    expect(result.singleFltCssClass).toBe('single_flt');
});

test('mapped option drives filtering behaviour', async ({ page }) => {
    await page.goto(FIXTURE);
    const match = await mount(page, '', 'filter-match');
    expect(match.validRows).toBe(1);

    const caseSensitive = await mount(
        page,
        ' case-sensitive="true"',
        'filter-lowercase'
    );
    // case_sensitive is on: lowercase 'sydney' must not match 'Sydney'
    expect(caseSensitive.validRows).toBe(0);

    const insensitive = await mount(page, '', 'filter-lowercase');
    // default is case-insensitive: 'sydney' matches
    expect(insensitive.validRows).toBe(1);
});
