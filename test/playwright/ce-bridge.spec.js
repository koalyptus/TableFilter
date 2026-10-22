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

test('icon markup stays on the legacy path when the element is loaded',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (tableHtml) => {
            await import('/src/components/tf-clear-button.js');

            const table = document.createElement('table');
            table.id = 'ce-clear-icon';
            table.innerHTML = tableHtml;
            document.body.appendChild(table);

            // Icons on (the default): this.html is <input class="reset">,
            // the element the themes paint the eraser icon on. The element
            // renders a bare <button>, so this must stay on the legacy path.
            const tf = new TableFilter('ce-clear-icon', {
                base_path: '/dist/tablefilter/',
                btn_reset: true
            });
            tf.init();

            const clearButton = tf.feature('clearButton');
            const host = clearButton.container;
            const icon = host ? host.querySelector('input.reset') : null;

            clearButton.destroy();
            return {
                registered: Boolean(customElements.get('tf-clear-button')),
                tag: host ? host.nodeName : null,
                hasIcon: !!icon
            };
        }, TABLE_HTML);

        expect(result.registered).toBe(true);
        expect(result.tag).toBe('SPAN');
        expect(result.hasIcon).toBe(true);
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

// Paging bridge (#926): the feature routes through <tf-pager> and the
// legacy paging config reaches it — the button captions, the text
// either side of the selector, `btns: false`, and the four legacy
// paging classes applied to the host
// (v1-webcomponents-investigation.md:479).
const PAGER_TABLE_HTML = '<tbody><tr><th>From</th></tr>' +
    Array.from({ length: 12 }, (v, i) => `<tr><td>City ${i}</td></tr>`)
        .join('') + '</tbody>';

test('paging bridge uses tf-pager with the legacy config',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (tableHtml) => {
            await import('/src/components/tf-pager.js');

            const table = document.createElement('table');
            table.id = 'ce-pager';
            table.innerHTML = tableHtml;
            document.body.appendChild(table);

            const tf = new TableFilter('ce-pager', {
                base_path: '/dist/tablefilter/',
                enable_icons: false,
                paging: {
                    length: 5,
                    btn_first_page_text: 'Start',
                    btn_prev_page_text: 'Prev',
                    btn_next_page_text: 'Forward',
                    btn_last_page_text: 'End',
                    page_text: 'Page #',
                    of_text: ' total ',
                    btns: false,
                    btn_css_class: 'myBtns',
                    slc_css_class: 'mySlc',
                    inp_css_class: 'myInp',
                    nb_pages_css_class: 'myNb'
                }
            });
            tf.init();

            const paging = tf.feature('paging');
            const host = paging.pagerEl;
            const sr = host.shadowRoot;
            const part = (name) => sr.querySelector(`[part="${name}"]`);

            const state = {
                className: host.className,
                firstText: part('first-text').textContent,
                prevText: part('prev-text').textContent,
                nextText: part('next-text').textContent,
                lastText: part('last-text').textContent,
                pageText: part('page-text').textContent,
                ofText: part('of-text').textContent,
                totalPages: part('total-pages').textContent,
                options: Array.from(part('page-select').options)
                    .map((o) => `${o.textContent}:${o.value}`),
                hiddenButtons: Array.from(sr.querySelectorAll('button'))
                    .every((b) => b.hasAttribute('hidden')),
                visibleRows: Array.from(table.rows)
                    .filter((r) => r.style.display !== 'none' &&
                        /^City /.test(r.textContent)).length
            };

            paging.destroy();
            return {
                isCE: host.nodeName === 'TF-PAGER',
                state,
                removed: !host.isConnected
            };
        }, PAGER_TABLE_HTML);

        expect(result.isCE).toBe(true);
        expect(result.removed).toBe(true);
        expect(result.state.className).toBe('myBtns mySlc myInp myNb');
        expect(result.state.firstText).toBe('Start');
        expect(result.state.prevText).toBe('Prev');
        expect(result.state.nextText).toBe('Forward');
        expect(result.state.lastText).toBe('End');
        expect(result.state.pageText).toBe('Page #');
        expect(result.state.ofText).toBe(' total ');
        expect(result.state.totalPages).toBe('3');
        expect(result.state.options).toEqual(['1:0', '2:5', '3:10']);
        expect(result.state.hiddenButtons).toBe(true);
        expect(result.state.visibleRows).toBe(5);
    });

// With `enableIcons` on, legacy renders its icon input titled for the
// button (paging.js:152-182) and ignores the caption text. The bridge
// names the semantic button from that title and leaves the text empty.
test('paging bridge names icon buttons from their legacy titles',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (tableHtml) => {
            await import('/src/components/tf-pager.js');

            const table = document.createElement('table');
            table.id = 'ce-pager-icons';
            table.innerHTML = tableHtml;
            document.body.appendChild(table);

            const tf = new TableFilter('ce-pager-icons', {
                base_path: '/dist/tablefilter/',
                paging: { length: 5, btn_next_page_text: 'Forward' }
            });
            tf.init();

            const paging = tf.feature('paging');
            const sr = paging.pagerEl.shadowRoot;
            const state = {
                nextLabel: sr.querySelector('[part="next"]')
                    .getAttribute('aria-label'),
                nextText: sr.querySelector('[part="next-text"]')
                    .textContent,
                nested: Array.from(sr.querySelectorAll('button'))
                    .some((b) => b.querySelector('input, button, a'))
            };

            paging.destroy();
            return state;
        }, PAGER_TABLE_HTML);

        expect(result.nextLabel).toBe('Next page');
        expect(result.nextText).toBe('');
        expect(result.nested).toBe(false);
    });

// A configured `btn_*_page_html` is projected into the button's named
// slot, reproducing legacy's custom markup (paging.js:399-401).
test('paging bridge projects configured button html into the slot',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (tableHtml) => {
            await import('/src/components/tf-pager.js');

            const table = document.createElement('table');
            table.id = 'ce-pager-html';
            table.innerHTML = tableHtml;
            document.body.appendChild(table);

            const tf = new TableFilter('ce-pager-html', {
                base_path: '/dist/tablefilter/',
                enable_icons: false,
                paging: {
                    length: 5,
                    btn_next_page_html: '<em class="fwd">Go</em>'
                }
            });
            tf.init();

            const paging = tf.feature('paging');
            const slotted = paging.pagerEl.querySelector('[slot="next"]');
            const before = paging.currentPageNb;
            slotted.firstElementChild.click();

            const state = {
                tag: slotted.firstElementChild.tagName,
                className: slotted.firstElementChild.className,
                text: slotted.textContent,
                reachedButton: paging.currentPageNb === before + 1
            };

            paging.destroy();
            return state;
        }, PAGER_TABLE_HTML);

        expect(result.tag).toBe('EM');
        expect(result.className).toBe('fwd');
        expect(result.text).toBe('Go');
        expect(result.reachedButton).toBe(true);
    });

// A click on a <tf-pager> button reaches the legacy handlers, which hold
// the paging arithmetic and its wrap-around (paging.js:303-318).
test('paging bridge forwards button clicks to the legacy feature',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (tableHtml) => {
            await import('/src/components/tf-pager.js');

            const table = document.createElement('table');
            table.id = 'ce-pager-click';
            table.innerHTML = tableHtml;
            document.body.appendChild(table);

            const tf = new TableFilter('ce-pager-click', {
                base_path: '/dist/tablefilter/',
                paging: { length: 5 }
            });
            tf.init();

            const paging = tf.feature('paging');
            const sr = paging.pagerEl.shadowRoot;
            const click = (part) =>
                sr.querySelector(`[part="${part}"]`).click();

            const after = { initial: paging.currentPageNb };
            click('next');
            after.next = paging.currentPageNb;
            click('last');
            after.last = paging.currentPageNb;
            click('first');
            after.first = paging.currentPageNb;
            after.pageAttr = paging.pagerEl.getAttribute('page');

            paging.destroy();
            return after;
        }, PAGER_TABLE_HTML);

        expect(result.initial).toBe(1);
        expect(result.next).toBe(2);
        expect(result.last).toBe(3);
        expect(result.first).toBe(1);
        expect(result.pageAttr).toBe('1');
    });

// The select's `change` is not composed, so <tf-pager> relays the pick
// as `page-change` (paging.js:363-366) and the bridge resolves the page
// number to an index.
test('paging bridge forwards a page pick from the select',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (tableHtml) => {
            await import('/src/components/tf-pager.js');

            const table = document.createElement('table');
            table.id = 'ce-pager-slc';
            table.innerHTML = tableHtml;
            document.body.appendChild(table);

            const tf = new TableFilter('ce-pager-slc', {
                base_path: '/dist/tablefilter/',
                paging: { length: 5 }
            });
            tf.init();

            const paging = tf.feature('paging');
            const host = paging.pagerEl;
            const select = host.shadowRoot
                .querySelector('[part="page-select"]');

            select.selectedIndex = 2;
            select.dispatchEvent(new Event('change', { bubbles: true }));

            const picked = {
                currentPage: paging.currentPageNb,
                startRow: paging.startPagingRow,
                pageAttr: host.getAttribute('page')
            };

            paging.destroy();
            return picked;
        }, PAGER_TABLE_HTML);

        expect(result.currentPage).toBe(3);
        expect(result.startRow).toBe('10');
        expect(result.pageAttr).toBe('3');
    });

// Without the component registered the feature renders the legacy
// spans, controls and select.
test('paging stays on the legacy path when the element is not loaded',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (tableHtml) => {
            const table = document.createElement('table');
            table.id = 'ce-pager-legacy';
            table.innerHTML = tableHtml;
            document.body.appendChild(table);

            const tf = new TableFilter('ce-pager-legacy', {
                base_path: '/dist/tablefilter/',
                paging: { length: 5, slc_css_class: 'legacySlc' }
            });
            tf.init();

            const paging = tf.feature('paging');
            const slc = paging.pageSlc;

            const state = {
                pagerEl: paging.pagerEl,
                selectorTag: slc.tagName,
                selectorClass: slc.className,
                options: slc.options.length,
                btnContainers: [paging.btnFirstCont, paging.btnPrevCont,
                    paging.btnNextCont, paging.btnLastCont]
                    .every((el) => Boolean(el))
            };

            paging.destroy();
            return state;
        }, PAGER_TABLE_HTML);

        expect(result.pagerEl).toBe(null);
        expect(result.selectorTag).toBe('SELECT');
        expect(result.selectorClass).toBe('legacySlc');
        expect(result.options).toBe(3);
        expect(result.btnContainers).toBe(true);
    });
