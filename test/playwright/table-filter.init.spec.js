// init() requires the backing table to be attached to the document.
// A detached table is rejected with a descriptive error before any
// feature runs.
const { test, expect } = require('@playwright/test');

const FIXTURE = '/test/test-emitter.html';
// getRowsNb() counts the <thead> row while the tbody rows are
// unreachable through the document query.
const TABLE_HTML =
    '<thead><tr><th>From</th></tr></thead>' +
    '<tbody><tr><td>Sydney</td></tr></tbody>';

async function loadEngine(page) {
    await page.evaluate(async () => {
        const mod = await import('/src/tablefilter.js');
        window.SourceTableFilter = mod.TableFilter;
    });
}

test('init() rejects a table that is detached throughout',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await loadEngine(page);

        const result = await page.evaluate((html) => {
            const table = document.createElement('table');
            table.innerHTML = html;
            const tf = new window.SourceTableFilter(table, { loader: true });
            let error = null;
            try {
                tf.init();
            } catch (err) {
                error = { name: err.name, message: err.message };
            }
            return {
                error,
                initialized: tf.isInitialized(),
                loaderHosts: document.querySelectorAll('tf-loader').length,
                loaderDivs: document.querySelectorAll('.loader').length
            };
        }, TABLE_HTML);

        expect(result.error).not.toBeNull();
        expect(result.error.name).toBe('Error');
        expect(result.error.message)
            .toContain('not attached to the document');
        expect(result.error.message).not.toContain('insertBefore');
        expect(result.initialized).toBe(false);
        expect(result.loaderHosts).toBe(0);
        expect(result.loaderDivs).toBe(0);
    });

test('init() rejects a table inside a detached container',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await loadEngine(page);

        const result = await page.evaluate((html) => {
            const container = document.createElement('div');
            const table = document.createElement('table');
            table.innerHTML = html;
            container.appendChild(table);
            const tf = new window.SourceTableFilter(table, { loader: true });
            let error = null;
            try {
                tf.init();
            } catch (err) {
                error = err.message;
            }
            return { error, initialized: tf.isInitialized() };
        }, TABLE_HTML);

        expect(result.error).toContain('not attached to the document');
        expect(result.initialized).toBe(false);
    });

test('init() rejects a table detached after construction',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await loadEngine(page);

        const result = await page.evaluate((html) => {
            const table = document.createElement('table');
            table.id = 'detached-after-construction';
            table.innerHTML = html;
            document.body.appendChild(table);
            const tf = new window.SourceTableFilter(table, { loader: true });
            table.remove();
            let error = null;
            try {
                tf.init();
            } catch (err) {
                error = err.message;
            }
            return { error, initialized: tf.isInitialized() };
        }, TABLE_HTML);

        expect(result.error).toContain('not attached to the document');
        expect(result.initialized).toBe(false);
    });

test('init() succeeds once the detached table is attached',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await loadEngine(page);

        const result = await page.evaluate((html) => {
            const table = document.createElement('table');
            table.id = 'attached-later';
            table.innerHTML = html;
            const tf = new window.SourceTableFilter(table, { loader: true });
            document.body.appendChild(table);
            tf.init();
            const state = {
                initialized: tf.isInitialized(),
                hasLoader: Boolean(tf.feature('loader'))
            };
            tf.destroy();
            return state;
        }, TABLE_HTML);

        expect(result.initialized).toBe(true);
        expect(result.hasLoader).toBe(true);
    });

test('init() rejects a detached table on the <tf-loader> path too',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.evaluate(async () => {
            await import('/src/components/tf-loader.js');
            const mod = await import('/src/tablefilter.js');
            window.SourceTableFilter = mod.TableFilter;
        });

        const result = await page.evaluate((html) => {
            const table = document.createElement('table');
            table.innerHTML = html;
            const tf = new window.SourceTableFilter(table, { loader: true });
            let error = null;
            try {
                tf.init();
            } catch (err) {
                error = err.message;
            }
            return {
                registered: Boolean(customElements.get('tf-loader')),
                error,
                hosts: document.querySelectorAll('tf-loader').length
            };
        }, TABLE_HTML);

        expect(result.registered).toBe(true);
        expect(result.error).toContain('not attached to the document');
        expect(result.hosts).toBe(0);
    });
