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
                filters: el.tf ? el.tf.getFiltersId().length : null,
                tableId: el.table ? el.table.id : null
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
    const result = await mount(
        page,
        '<table-filter>' + VALID_TABLE + '</table-filter>'
    );
    expect(result.initialized).toBe(true);

    // The mounted element stays in the document, so drive it from a
    // second evaluate rather than re-declaring the fixture.
    const validRows = await page.evaluate(() => {
        const el = document.body.querySelector('table-filter');
        el.tf.setFilterValue(0, 'Sydney');
        el.tf.filter();
        return el.tf.getValidRowsNb();
    });
    expect(validRows).toBe(1);
});

test('tf stays null without a table and nothing throws', async ({
    page
}) => {
    await page.goto(FIXTURE);
    // A missing guard throws inside connectedCallback; custom-element
    // reaction exceptions surface as page errors, never as an evaluate
    // rejection, so watch for them explicitly.
    const errors = [];
    page.on('pageerror', (err) => errors.push(err.message));

    const result = await mount(page, '<table-filter></table-filter>');
    expect(result.hasTf).toBe(false);
    expect(errors).toEqual([]);
});

test('tf stays null for an empty table without stamping it', async ({
    page
}) => {
    await page.goto(FIXTURE);
    const result = await mount(
        page,
        '<table-filter><table></table></table-filter>'
    );
    // Without the empty-table guard the constructor stamps the table
    // with a generated id before it throws on the row count.
    expect(result.hasTf).toBe(false);
    expect(result.tableId).toBe('');
});

// Component gate (#902): disconnectedCallback destroys the engine —
// the filter row is removed and tf is nulled, so a later re-connect
// starts a fresh engine and nothing leaks. Fails CI on regression.
//
// TODO(#987): also assert the table has no hidden rows after
// disconnect. Blocked on the engine's validateAllRows() restoring
// trailing filtered rows (see the issue).

test('disconnect destroys the engine and clears tf', async ({ page }) => {
    await page.goto(FIXTURE);
    const result = await page.evaluate(async ({ component }) => {
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
        const first = el.tf;
        const filterRowBefore =
            el.table.querySelectorAll('.fltrow').length;

        host.remove();

        return {
            wasInitialized: first.isInitialized(),
            tfNulled: el.tf === null,
            filterRowBefore,
            filterRowsAfter: el.table.querySelectorAll('.fltrow').length
        };
    }, { component: COMPONENT });

    // destroy() flips initialized off and removes the filter row.
    expect(result.wasInitialized).toBe(false);
    expect(result.tfNulled).toBe(true);
    expect(result.filterRowBefore).toBe(1);
    expect(result.filterRowsAfter).toBe(0);
});

test('disconnect clears engine filter state', async ({ page }) => {
    await page.goto(FIXTURE);
    const result = await page.evaluate(async ({ component }) => {
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
        const first = el.tf;
        const idsBefore = first.getFiltersId().length;

        host.remove();

        return {
            idsBefore,
            // destroy() resets the id registry; lingering ids would
            // collide with a fresh engine on re-connect.
            idsAfter: first.getFiltersId().length
        };
    }, { component: COMPONENT });

    expect(result.idsBefore).toBe(1);
    expect(result.idsAfter).toBe(0);
});

test('reconnect after teardown starts a fresh engine', async ({
    page
}) => {
    await page.goto(FIXTURE);
    const result = await page.evaluate(async ({ component }) => {
        await import(component);
        const host = document.createElement('div');
        host.innerHTML =
            '<table-filter><table><tbody>' +
            '<tr><th>City</th></tr>' +
            '<tr><td>Sydney</td></tr>' +
            '</tbody></table></table-filter>';
        document.body.appendChild(host);
        const el = host.querySelector('table-filter');
        const first = el.tf;

        // Teardown replaced the #900 idempotency guard: disconnect
        // destroys, so re-connect builds a new engine on the table.
        host.remove();
        document.body.appendChild(host);

        return {
            freshInstance: el.tf !== first,
            initialized: el.tf.isInitialized(),
            filterRows: el.table.querySelectorAll('.fltrow').length
        };
    }, { component: COMPONENT });

    expect(result.freshInstance).toBe(true);
    expect(result.initialized).toBe(true);
    expect(result.filterRows).toBe(1);
});

test('disconnect with no engine is safe', async ({ page }) => {
    await page.goto(FIXTURE);
    const errors = [];
    page.on('pageerror', (err) => errors.push(err.message));

    const result = await page.evaluate(async ({ component }) => {
        await import(component);
        const host = document.createElement('div');
        host.innerHTML = '<table-filter><table></table></table-filter>';
        document.body.appendChild(host);
        const el = host.querySelector('table-filter');
        host.remove();
        return { tf: el.tf };
    }, { component: COMPONENT });

    expect(result.tf).toBeNull();
    expect(errors).toEqual([]);
});

// Event bridging (#903): engine emitter events are re-dispatched as
// bubbling DOM CustomEvents with detail { tf, args }. Fails CI on
// regression — e.g. a bridge installed after init() misses
// `initialized`.

test('event bridging: initialized on connect', async ({ page }) => {
    await page.goto(FIXTURE);
    const result = await page.evaluate(async ({ component }) => {
        await import(component);
        const el = document.createElement('table-filter');
        el.innerHTML = '<table><tbody>' +
            '<tr><th>City</th></tr>' +
            '<tr><td>Sydney</td></tr>' +
            '</tbody></table>';
        let onEl = null;
        let onDoc = null;
        // Subscribe before connect: `initialized` fires inside
        // connectedCallback, so the listener must already be attached.
        el.addEventListener('initialized', (e) => { onEl = e; });
        document.addEventListener('initialized', (e) => { onDoc = e; });
        document.body.appendChild(el);
        return {
            elCount: onEl ? 1 : 0,
            docCount: onDoc ? 1 : 0,
            hasTf: Boolean(onEl && onEl.detail && onEl.detail.tf),
            argsIsArray:
                Array.isArray(onEl && onEl.detail && onEl.detail.args)
        };
    }, { component: COMPONENT });
    expect(result.elCount).toBe(1);
    expect(result.docCount).toBe(1); // bubbles
    expect(result.hasTf).toBe(true);
    expect(result.argsIsArray).toBe(true);
});

test('event bridging: before/after-filtering detail', async ({ page }) => {
    await page.goto(FIXTURE);
    const result = await page.evaluate(async ({ component }) => {
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
        let before = null;
        let after = null;
        el.addEventListener('before-filtering', (e) => { before = e.detail; });
        el.addEventListener('after-filtering', (e) => { after = e.detail; });
        el.tf.setFilterValue(0, 'Sydney');
        el.tf.filter();
        return {
            beforeTf: Boolean(before && before.tf),
            afterTf: Boolean(after && after.tf),
            afterArgsIsArray: Array.isArray(after && after.args),
            afterArgsLen: after && after.args && after.args.length
        };
    }, { component: COMPONENT });
    expect(result.beforeTf).toBe(true);
    expect(result.afterTf).toBe(true);
    expect(result.afterArgsIsArray).toBe(true);
    expect(result.afterArgsLen).toBe(1);
});

test('event bridging: destroy on disconnect', async ({ page }) => {
    await page.goto(FIXTURE);
    const result = await page.evaluate(async ({ component }) => {
        await import(component);
        const host = document.createElement('div');
        host.innerHTML =
            '<table-filter><table><tbody>' +
            '<tr><th>City</th></tr>' +
            '<tr><td>Sydney</td></tr>' +
            '</tbody></table></table-filter>';
        document.body.appendChild(host);
        const el = host.querySelector('table-filter');
        const tf = el.tf;
        let detail = null;
        el.addEventListener('destroy', (e) => { detail = e.detail; });
        host.remove();
        return {
            fired: Boolean(detail),
            sameTf: Boolean(detail && detail.tf === tf),
            tfNulled: el.tf === null
        };
    }, { component: COMPONENT });
    expect(result.fired).toBe(true);
    expect(result.sameTf).toBe(true);
    expect(result.tfNulled).toBe(true);
});

test('event bridging: filter-focus / filter-blur', async ({ page }) => {
    await page.goto(FIXTURE);
    const result = await page.evaluate(async ({ component }) => {
        await import(component);
        const host = document.createElement('div');
        host.innerHTML =
            '<table-filter><table><tbody>' +
            '<tr><th>City</th></tr>' +
            '<tr><td>Sydney</td></tr>' +
            '</tbody></table></table-filter>';
        document.body.appendChild(host);
        const el = host.querySelector('table-filter');
        const input = el.tf.getFilterElement(0);
        let focused = false;
        let blurred = false;
        el.addEventListener('filter-focus', () => { focused = true; });
        el.addEventListener('filter-blur', () => { blurred = true; });
        input.focus();
        input.blur();
        return { focused, blurred };
    }, { component: COMPONENT });
    expect(result.focused).toBe(true);
    expect(result.blurred).toBe(true);
});

test('event bridging: re-bridge does not duplicate', async ({ page }) => {
    await page.goto(FIXTURE);
    const result = await page.evaluate(async ({ component }) => {
        await import(component);
        const host = document.createElement('div');
        host.innerHTML =
            '<table-filter><table><tbody>' +
            '<tr><th>City</th></tr>' +
            '<tr><td>Sydney</td></tr>' +
            '</tbody></table></table-filter>';
        document.body.appendChild(host);
        const el = host.querySelector('table-filter');
        const name = 'before-filtering';
        const before = el.tf.emitter.events[name].length;
        el._bridgeEvents();
        const after = el.tf.emitter.events[name].length;
        return { before, after };
    }, { component: COMPONENT });
    expect(result.before).toBe(1);
    expect(result.after).toBe(1);
});

test('engine inits on the table resolved through for', async ({
    page
}) => {
    await page.goto(FIXTURE);
    const result = await mount(
        page,
        '<table-filter for="outer"></table-filter>',
        VALID_TABLE.replace('<table>', '<table id="outer">')
    );
    expect(result.tableId).toBe('outer');
    expect(result.hasTf).toBe(true);
    expect(result.initialized).toBe(true);
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
