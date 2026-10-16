// Component gate (#899): <table-filter> locates its table in
// connectedCallback — a descendant light-DOM table first, a
// `for`-attribute reference second, null when neither exists. Fails CI
// on regression.
const { test, expect } = require('@playwright/test');

const FIXTURE = '/test/test-emitter.html';
const COMPONENT = '/src/components/table-filter.js';

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
