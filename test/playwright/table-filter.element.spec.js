// Component gates (#899 table discovery, #900 engine init):
// connectedCallback locates the table, instantiates the legacy
// TableFilter engine on it and init()s it, so a declarative
// <table-filter> mounts and filters. Null/empty tables leave tf null
// instead of throwing. Fails CI on regression.
const { test, expect } = require('@playwright/test');

const FIXTURE = '/test/test-emitter.html';
const COMPONENT = '/src/components/table-filter.js';

const VALID_TABLE =
    '<table><tbody>' +
    '<tr><th>City</th></tr>' +
    '<tr><td>Sydney</td></tr>' +
    '<tr><td>Adelaide</td></tr>' +
    '</tbody></table>';

// Mounts the markup, connects the <table-filter>, and reports the
// engine state as primitives (DOM nodes cannot cross evaluate).
async function mount(page, wrapperHtml, externalHtml) {
    return page.evaluate(
        async ({ wrapperHtml, externalHtml, component }) => {
            await import(component);
            const host = document.createElement('div');
            host.innerHTML = (externalHtml || '') + wrapperHtml;
            document.body.appendChild(host);
            const el = host.querySelector('table-filter');
            const result = {
                hasTf: Boolean(el.tf),
                initialized: Boolean(el.tf && el.tf.isInitialized()),
                filterId: el.tf ? el.tf.getFilterId(0) : null,
                filters: el.tf ? el.tf.getFiltersId().length : null
            };
            return result;
        },
        { wrapperHtml, externalHtml, component: COMPONENT }
    );
}

test('connectedCallback instantiates and inits TableFilter', async ({
    page
}) => {
    await page.goto(FIXTURE);
    const result = await mount(
        page,
        '<table-filter>' + VALID_TABLE + '</table-filter>'
    );
    expect(result.hasTf).toBe(true);
    expect(result.initialized).toBe(true);
    expect(result.filters).toBe(1);
    expect(typeof result.filterId).toBe('string');
});

test('declarative table filters rows', async ({ page }) => {
    await page.goto(FIXTURE);
    const validRows = await page.evaluate(async ({ component }) => {
        await import(component);
        const host = document.createElement('div');
        host.innerHTML =
            '<table-filter><table><tbody>' +
            '<tr><th>City</th></tr>' +
            '<tr><td>Sydney</td></tr>' +
            '<tr><td>Adelaide</td></tr>' +
            '</tbody></table></table-filter>';
        document.body.appendChild(host);
        const el = host.querySelector('table-filter');
        el.tf.setFilterValue(0, 'Sydney');
        el.tf.filter();
        const count = el.tf.getValidRowsNb();
        return count;
    }, { component: COMPONENT });
    expect(validRows).toBe(1);
});

test('tf stays null without a table', async ({ page }) => {
    await page.goto(FIXTURE);
    const result = await mount(page, '<table-filter></table-filter>');
    expect(result.hasTf).toBe(false);
});

test('tf stays null for an empty table', async ({ page }) => {
    await page.goto(FIXTURE);
    const result = await mount(
        page,
        '<table-filter><table id="empty"></table></table-filter>'
    );
    expect(result.hasTf).toBe(false);
});

// Renders the given markup on a throwaway host, connects the
// <table-filter>, and reports what connectedCallback found.
async function locate(page, wrapperHtml, externalHtml) {
    return page.evaluate(
        async ({ wrapperHtml, externalHtml, component }) => {
            await import(component);
            const host = document.createElement('div');
            host.innerHTML = (externalHtml || '') + wrapperHtml;
            document.body.appendChild(host);
            const table = host.querySelector('table-filter').table;
            const result = {
                registered:
                    typeof customElements.get('table-filter'),
                tag: table && table.tagName,
                id: table && table.id
            };
            host.remove();
            return result;
        },
        { wrapperHtml, externalHtml, component: COMPONENT }
    );
}

test('<table-filter> registers on import', async ({ page }) => {
    await page.goto(FIXTURE);
    const result = await locate(page, '<table-filter></table-filter>');
    expect(result.registered).toBe('function');
});

test('connectedCallback locates the slotted table', async ({ page }) => {
    await page.goto(FIXTURE);
    const result = await locate(
        page,
        '<table-filter><table id="inner"></table></table-filter>'
    );
    expect(result.tag).toBe('TABLE');
    expect(result.id).toBe('inner');
});

test('connectedCallback follows the for attribute', async ({ page }) => {
    await page.goto(FIXTURE);
    const result = await locate(
        page,
        '<table-filter for="outer"></table-filter>',
        '<table id="outer"></table>'
    );
    expect(result.tag).toBe('TABLE');
    expect(result.id).toBe('outer');
});

test('connectedCallback leaves table null when absent', async ({ page }) => {
    await page.goto(FIXTURE);
    const result = await locate(page, '<table-filter></table-filter>');
    expect(result.tag).toBeNull();
    expect(result.id).toBeNull();
});

test('slotted table wins over the for attribute', async ({ page }) => {
    await page.goto(FIXTURE);
    const result = await locate(
        page,
        '<table-filter for="outer"><table id="inner"></table>' +
            '</table-filter>',
        '<table id="outer"></table>'
    );
    expect(result.tag).toBe('TABLE');
    expect(result.id).toBe('inner');
});

test('a for target that appears later is not resolved until reconnect',
    async ({ page }) => {
        await page.goto(FIXTURE);
        const result = await page.evaluate(async ({ component }) => {
            await import(component);
            // Connects before its `for` target exists.
            const el = document.createElement('table-filter');
            el.setAttribute('for', 'late');
            document.body.appendChild(el);
            const before = el.table;

            // Target is parsed later; reconnect re-resolves it.
            const table = document.createElement('table');
            table.id = 'late';
            document.body.appendChild(table);
            document.body.removeChild(el);
            document.body.appendChild(el);
            const after = el.table;

            el.remove();
            table.remove();
            return { before: before, after: after && after.id };
        }, { component: COMPONENT });

        expect(result.before).toBeNull();
        expect(result.after).toBe('late');
    });
