// Component gate (#985): runtime re-init. The element observes its own
// attributes and the resolved table, so configuration changes, table row
// changes and a `for` target appearing later re-init the engine without a
// manual re-connect. Presentation attributes and pure row reorders must
// NOT rebuild the engine. Fails CI on regression.
const { test, expect } = require('@playwright/test');

const FIXTURE = '/test/test-emitter.html';
const COMPONENT = '/src/components/table-filter.js';

const VALID_TABLE =
    '<table>' +
    '<thead><tr><th>City</th></tr></thead>' +
    '<tbody>' +
    '<tr><td>Sydney</td></tr>' +
    '<tr><td>Adelaide</td></tr>' +
    '</tbody></table>';

// Mounts a <table-filter> wrapping VALID_TABLE, then exposes the element
// on window so a follow-up evaluate can mutate it while it stays mounted.
async function mount(page, elementAttrs) {
    return page.evaluate(
        async ({ elementAttrs, component, table }) => {
            await import(component);
            const host = document.createElement('div');
            host.innerHTML = '<table-filter' + elementAttrs + '>' +
                table + '</table-filter>';
            document.body.appendChild(host);
            const el = host.querySelector('table-filter');
            window.__tfEl = el;
            return {
                hasTf: Boolean(el.tf),
                initialized: Boolean(el.tf && el.tf.isInitialized()),
                filters: el.tf ? el.tf.getFiltersId().length : null
            };
        },
        { elementAttrs, component: COMPONENT, table: VALID_TABLE }
    );
}

test('empty table that gains rows initialises automatically', async ({
    page
}) => {
    await page.goto(FIXTURE);
    const before = await page.evaluate(async ({ component }) => {
        await import(component);
        const el = document.createElement('table-filter');
        el.innerHTML = '<table></table>';
        document.body.appendChild(el);
        window.__tfEl = el;
        return { hasTf: Boolean(el.tf), tableId: el.table.id };
    }, { component: COMPONENT });
    expect(before.hasTf).toBe(false);

    const after = await page.evaluate(async () => {
        const el = window.__tfEl;
        el.table.innerHTML = '<tbody><tr><th>City</th></tr>' +
            '<tr><td>Sydney</td></tr><tr><td>Adelaide</td></tr></tbody>';
        await new Promise((resolve) => setTimeout(resolve));
        return {
            hasTf: Boolean(el.tf),
            initialized: Boolean(el.tf && el.tf.isInitialized()),
            filters: el.tf ? el.tf.getFiltersId().length : null
        };
    });
    expect(after.hasTf).toBe(true);
    expect(after.initialized).toBe(true);
    expect(after.filters).toBe(1);
});

test('a table appended after connect is resolved automatically', async ({
    page
}) => {
    await page.goto(FIXTURE);
    const before = await page.evaluate(async ({ component }) => {
        await import(component);
        const el = document.createElement('table-filter');
        document.body.appendChild(el);
        window.__tfEl = el;
        return { hasTf: Boolean(el.tf), table: el.table };
    }, { component: COMPONENT });
    expect(before.hasTf).toBe(false);
    expect(before.table).toBeNull();

    const after = await page.evaluate(async () => {
        const el = window.__tfEl;
        const table = document.createElement('table');
        table.innerHTML = '<thead><tr><th>City</th></tr></thead>' +
            '<tbody><tr><td>Sydney</td></tr></tbody>';
        el.appendChild(table);
        await new Promise((resolve) => setTimeout(resolve));
        return {
            hasTf: Boolean(el.tf),
            initialized: Boolean(el.tf && el.tf.isInitialized()),
            tag: el.table ? el.table.tagName : null
        };
    });
    expect(after.hasTf).toBe(true);
    expect(after.initialized).toBe(true);
    expect(after.tag).toBe('TABLE');
});

test('runtime attribute change re-inits with the new config', async ({
    page
}) => {
    await page.goto(FIXTURE);
    const mounted = await mount(page, ' watermark="Before"');
    expect(mounted.initialized).toBe(true);

    const result = await page.evaluate(async () => {
        const el = window.__tfEl;
        const first = el.tf;
        el.setAttribute('watermark', 'After');
        await new Promise((resolve) => setTimeout(resolve));
        return {
            rebuilt: el.tf !== first,
            watermark: el.tf ? el.tf.watermark : null,
            sameTable: el.tf ? el.tf.tbl === el.table : false
        };
    });
    // A fresh engine on the same table carries the new config.
    expect(result.rebuilt).toBe(true);
    expect(result.watermark).toBe('After');
    expect(result.sameTable).toBe(true);
});

test('runtime config JSON change re-inits with the new config', async ({
    page
}) => {
    await page.goto(FIXTURE);
    await mount(page, '');
    const result = await page.evaluate(async () => {
        const el = window.__tfEl;
        const first = el.tf;
        el.setAttribute('config', '{"watermark":"Blob"}');
        await new Promise((resolve) => setTimeout(resolve));
        return {
            rebuilt: el.tf !== first,
            watermark: el.tf ? el.tf.watermark : null
        };
    });
    expect(result.rebuilt).toBe(true);
    expect(result.watermark).toBe('Blob');
});

test('removing a data row re-inits on the reduced table', async ({ page }) => {
    await page.goto(FIXTURE);
    const mounted = await mount(page, '');
    expect(mounted.hasTf).toBe(true);

    const result = await page.evaluate(async () => {
        const el = window.__tfEl;
        const first = el.tf;
        const tbody = el.table.tBodies[0];
        tbody.deleteRow(tbody.rows.length - 1);
        await new Promise((resolve) => setTimeout(resolve));
        return {
            rebuilt: el.tf !== first,
            initialized: Boolean(el.tf && el.tf.isInitialized()),
            filterRows: el.table.querySelectorAll('.fltrow').length
        };
    });
    // The engine is rebuilt on the reduced table without leaving a
    // duplicated filter row behind.
    expect(result.rebuilt).toBe(true);
    expect(result.initialized).toBe(true);
    expect(result.filterRows).toBe(1);
});

test('presentation attribute change does not rebuild the engine', async ({
    page
}) => {
    await page.goto(FIXTURE);
    await mount(page, '');
    const result = await page.evaluate(async () => {
        const el = window.__tfEl;
        const first = el.tf;
        el.setAttribute('class', 'card');
        el.setAttribute('data-x', '1');
        el.setAttribute('aria-label', 'grid');
        await new Promise((resolve) => setTimeout(resolve));
        return { sameInstance: el.tf === first };
    });
    expect(result.sameInstance).toBe(true);
});

test('pure row reorder does not rebuild the engine', async ({ page }) => {
    await page.goto(FIXTURE);
    await mount(page, '');
    const result = await page.evaluate(async () => {
        const el = window.__tfEl;
        const first = el.tf;
        const tbody = el.table.tBodies[0];
        // Move a data row without changing the row count (what sorting
        // does internally): must not re-init.
        const rows = Array.prototype.slice.call(tbody.rows);
        const last = rows[rows.length - 1];
        tbody.insertBefore(last, rows[0]);
        await new Promise((resolve) => setTimeout(resolve));
        return {
            sameInstance: el.tf === first,
            dataRows: tbody.rows.length
        };
    });
    expect(result.sameInstance).toBe(true);
    expect(result.dataRows).toBeGreaterThan(0);
});

test('disconnect stops observing host attributes', async ({ page }) => {
    await page.goto(FIXTURE);
    await mount(page, '');
    const result = await page.evaluate(async () => {
        const el = window.__tfEl;
        el.remove();
        const tfAfterDisconnect = el.tf;
        el.setAttribute('watermark', 'Later');
        await new Promise((resolve) => setTimeout(resolve));
        return {
            tfAfterDisconnect: tfAfterDisconnect,
            tfAfterChange: el.tf
        };
    });
    expect(result.tfAfterDisconnect).toBeNull();
    expect(result.tfAfterChange).toBeNull();
});
