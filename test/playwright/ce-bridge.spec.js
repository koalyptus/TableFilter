// CE bridge integration (#912): unlike the component specs, which mount
// the custom element directly, these tests load the component into the
// page and then initialise TableFilter, so `customElements.get(...)` is
// truthy and the feature routes through `initCE()` instead of
// `initLegacy()` (see ROADMAP/hybrid-migration-strategy.md). Each test
// asserts the host element, that interaction still reaches TableFilter,
// and that destroy() removes the host. Fails CI on regression.
const { test, expect } = require('@playwright/test');

const FIXTURE = '/test/test-emitter.html';
const TABLE_HTML =
    '<tbody><tr><th>From</th></tr><tr><td>Sydney</td></tr></tbody>';

test('clear button bridge uses tf-clear-button', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (tableHtml) => {
        await import('/src/components/tf-clear-button.js');

        const table = document.createElement('table');
        table.id = 'ce-clear';
        table.innerHTML = tableHtml;
        document.body.appendChild(table);

        const tf = new TableFilter('ce-clear', {
            base_path: '/dist/tablefilter/',
            btn_reset: { text: 'Clear' }
        });
        tf.init();

        const clearButton = tf.feature('clearButton');
        const host = clearButton.container;
        const isCE = !!host && host.nodeName === 'TF-CLEAR-BUTTON';

        let hits = 0;
        tf.clearFilters = () => { hits++; };
        const button = host && host.shadowRoot
            ? host.shadowRoot.querySelector('button') : null;
        if (button) {
            button.click();
        }

        clearButton.destroy();
        return {
            isCE,
            hasButton: !!button,
            hits,
            removed: !host.isConnected
        };
    }, TABLE_HTML);

    expect(result.isCE).toBe(true);
    expect(result.hasButton).toBe(true);
    expect(result.hits).toBe(1);
    expect(result.removed).toBe(true);
});

test('status bar bridge uses tf-status', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (tableHtml) => {
        await import('/src/components/tf-status.js');

        const table = document.createElement('table');
        table.id = 'ce-status';
        table.innerHTML = tableHtml;
        document.body.appendChild(table);

        const tf = new TableFilter('ce-status', {
            base_path: '/dist/tablefilter/',
            status_bar: true
        });
        tf.init();

        const statusBar = tf.feature('statusBar');
        const host = statusBar.container;
        const isCE = !!host && host.nodeName === 'TF-STATUS';

        statusBar.message('hello');
        // message() is applied on a timeout.
        await new Promise((resolve) => setTimeout(resolve, 30));
        const message = statusBar.msgContainer
            ? statusBar.msgContainer.innerHTML : null;

        statusBar.destroy();
        return { isCE, message, removed: !host.isConnected };
    }, TABLE_HTML);

    expect(result.isCE).toBe(true);
    expect(result.message).toBe('hello');
    expect(result.removed).toBe(true);
});

test('rows counter bridge uses tf-rows-counter', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (tableHtml) => {
        await import('/src/components/tf-rows-counter.js');

        const table = document.createElement('table');
        table.id = 'ce-rows';
        table.innerHTML = tableHtml;
        document.body.appendChild(table);

        const tf = new TableFilter('ce-rows', {
            base_path: '/dist/tablefilter/',
            rows_counter: true
        });
        tf.init();

        const rowsCounter = tf.feature('rowsCounter');
        const host = rowsCounter.container;
        const isCE = !!host && host.nodeName === 'TF-ROWS-COUNTER';

        rowsCounter.refresh();
        const label = rowsCounter.label
            ? rowsCounter.label.innerHTML : null;
        const countPart = host.shadowRoot.querySelector('[part="count"]');
        const countText = countPart ? countPart.textContent : null;

        rowsCounter.destroy();
        return { isCE, label, countText, removed: !host.isConnected };
    }, TABLE_HTML);

    expect(result.isCE).toBe(true);
    expect(result.label).toBe('1');
    expect(result.countText).toBe('1');
    expect(result.removed).toBe(true);
});
