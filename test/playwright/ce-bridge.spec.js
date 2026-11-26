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
// (ROADMAP/v1-webcomponents-investigation.md).
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

// With `enable_icons` on, legacy renders an `<input>` whose
// `.nextPage`/`.previousPage`/`.firstPage`/`.lastPage` classes the themes
// paint the icon on (tablefilter.css). Those classes cannot reach the
// shadow button, so this configuration stays on the legacy markup with
// its icon intact.
test('paging stays on the legacy path when enable_icons is on',
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
                enable_icons: true,
                paging: { length: 5 }
            });
            tf.init();

            const paging = tf.feature('paging');
            const state = {
                pagerEl: paging.pagerEl,
                iconClass: paging.btnNextCont.firstElementChild.className,
                hasTitle: Boolean(paging.btnNextCont.firstElementChild
                    .getAttribute('title')),
                // the icon input carries no caption text, so a blank
                // button here means the icon was dropped
                visible: paging.btnNextCont.firstElementChild.offsetWidth > 0
            };

            paging.destroy();
            return state;
        }, PAGER_TABLE_HTML);

        expect(result.pagerEl).toBe(null);
        expect(result.iconClass).toContain('nextPage');
        expect(result.hasTitle).toBe(true);
        expect(result.visible).toBe(true);
    });

// A configured `btn_next_page_html` stays on the legacy markup, where the
// custom HTML is injected into the button span and the click is bound on
// that span.
test('paging keeps configured button html on the legacy path',
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
            const inner = paging.btnNextCont.firstElementChild;
            const before = paging.currentPageNb;
            paging.btnNextCont.click();

            const state = {
                pagerEl: paging.pagerEl,
                tag: inner.tagName,
                className: inner.className,
                text: paging.btnNextCont.textContent,
                reachedFeature: paging.currentPageNb === before + 1
            };

            paging.destroy();
            return state;
        }, PAGER_TABLE_HTML);

        expect(result.pagerEl).toBe(null);
        expect(result.tag).toBe('EM');
        expect(result.className).toBe('fwd');
        expect(result.text).toBe('Go');
        expect(result.reachedFeature).toBe(true);
    });

// A click on a <tf-pager> button reaches the legacy handlers, which hold
// the paging arithmetic and its wrap-around.
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
                enable_icons: false,
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
// as `page-change` and the bridge resolves the page number to an index.
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
                enable_icons: false,
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

// With `page_selector_type: 'input'` the page control is a shadow
// `<input>`, which has no `.options`. Changing results-per-page reads the
// page position from `.value` and clamps it to the last page before
// handing it to the element.
test('changing results per page works with the input selector',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (tableHtml) => {
            await import('/src/components/tf-pager.js');

            const table = document.createElement('table');
            table.id = 'ce-pager-input';
            table.innerHTML = tableHtml;
            document.body.appendChild(table);

            const tf = new TableFilter('ce-pager-input', {
                base_path: '/dist/tablefilter/',
                enable_icons: false,
                paging: {
                    length: 5,
                    page_selector_type: 'input',
                    results_per_page: ['Rows: ', [5, 2]]
                }
            });
            tf.init();

            const paging = tf.feature('paging');
            const host = paging.pagerEl;

            // sit on the last page (12 rows / 5 = 3 pages), then shrink
            // the page length to 2 (6 pages): the held page stays valid
            paging.setPage(3);
            let threw = null;
            try {
                paging.changeResultsPerPage('2');
            } catch (e) {
                threw = e.message;
            }

            const state = {
                threw,
                pageLength: paging.pageLength,
                nbPages: paging.nbPages,
                currentPage: paging.currentPageNb,
                pageAttr: host.getAttribute('page')
            };

            paging.destroy();
            return state;
        }, PAGER_TABLE_HTML);

        expect(result.threw).toBe(null);
        expect(result.pageLength).toBe(2);
        expect(result.nbPages).toBe(6);
        expect(result.currentPage).toBe(3);
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

// Paging bridge behaviour matrix (#926): page selection through both
// selector types, button wrap-around, host configuration, filtering,
// results per page, lifecycle and multiple instances.
const MOUNT = `
window.shadow = function (host, part) {
    return host.shadowRoot.querySelector('[part="' + part + '"]');
};
window.click = function (host, part) {
    window.shadow(host, part).click();
};
window.enter = function (input, value) {
    input.value = value;
    input.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'Enter', bubbles: true, composed: true
    }));
};
window.selectPage = function (select, index) {
    select.selectedIndex = index;
    select.dispatchEvent(new Event('change', { bubbles: true }));
};
window.mountPager = async function (id, config, html) {
    await import('/src/components/tf-pager.js');
    const table = document.createElement('table');
    table.id = id;
    table.innerHTML = html;
    document.body.appendChild(table);
    const tf = new TableFilter(id, Object.assign({
        base_path: '/dist/tablefilter/',
        enable_icons: false
    }, config));
    tf.init();
    window.tf = tf;
    return tf;
};
`;

test('paging bridge keeps each configured button html on the legacy path',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: MOUNT });

        const result = await page.evaluate(async (html) => {
            const keys = ['btn_first_page_html', 'btn_prev_page_html',
                'btn_next_page_html', 'btn_last_page_html'];
            const state = {};

            for (const key of keys) {
                const pagingConfig = { length: 5 };
                pagingConfig[key] = '<em>x</em>';
                const tf = await window.mountPager(`gate-${key}`,
                    { paging: pagingConfig }, html);
                const paging = tf.feature('paging');
                state[key] = {
                    ce: Boolean(paging.pagerEl),
                    selector: paging.pageSlc ? paging.pageSlc.tagName : null
                };
                tf.destroy();
            }
            return state;
        }, PAGER_TABLE_HTML);

        for (const key of Object.keys(result)) {
            expect(result[key].ce, key).toBe(false);
            expect(result[key].selector, key).toBe('SELECT');
        }
    });

test('paging bridge moves to the page typed into the input',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountPager('bridge-input',
                { paging: { length: 5, page_selector_type: 'input' } },
                html);
            const paging = tf.feature('paging');
            const host = paging.pagerEl;
            const events = [];
            tf.emitter.on(['before-page-change'],
                (inst, page) => events.push(page));

            window.enter(window.shadow(host, 'page-input'), '3');

            const state = {
                page: paging.currentPageNb,
                startRow: paging.startPagingRow,
                attr: host.getAttribute('page'),
                visible: Array.from(tf.dom().rows)
                    .filter((r) => r.style.display !== 'none' &&
                        /^City /.test(r.textContent)).length,
                events
            };
            tf.destroy();
            return state;
        }, PAGER_TABLE_HTML);

        expect(result.page).toBe(3);
        expect(result.startRow).toBe(10);
        expect(result.attr).toBe('3');
        expect(result.visible).toBe(2);
        expect(result.events).toEqual([3]);
    });

test('paging bridge ignores an empty or malformed input value',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountPager('bridge-input-empty',
                { paging: { length: 5, page_selector_type: 'input' } },
                html);
            const paging = tf.feature('paging');
            const host = paging.pagerEl;
            const input = window.shadow(host, 'page-input');
            let changes = 0;
            host.addEventListener('page-change', () => changes++);

            window.enter(input, '');
            window.enter(input, 'abc');

            const state = {
                page: paging.currentPageNb,
                changes,
                sanitised: input.value
            };
            tf.destroy();
            return state;
        }, PAGER_TABLE_HTML);

        expect(result.page).toBe(1);
        expect(result.changes).toBe(0);
        expect(result.sanitised).toBe('');
    });

test('paging bridge ignores out-of-range and non-positive input values',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountPager('bridge-input-bounds',
                { paging: { length: 5, page_selector_type: 'input' } },
                html);
            const paging = tf.feature('paging');
            const host = paging.pagerEl;
            const input = window.shadow(host, 'page-input');
            const pages = [];
            let threw = null;

            for (const value of ['99', '0', '-2']) {
                try {
                    window.enter(input, value);
                    pages.push(paging.currentPageNb);
                } catch (e) {
                    threw = e.message;
                }
            }

            tf.destroy();
            return { pages, threw };
        }, PAGER_TABLE_HTML);

        expect(result.threw).toBe(null);
        expect(result.pages).toEqual([1, 1, 1]);
    });

test('paging bridge moves through every page from the select',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountPager('bridge-select-all',
                { paging: { length: 5 } }, html);
            const paging = tf.feature('paging');
            const host = paging.pagerEl;
            const select = window.shadow(host, 'page-select');
            const seen = [];

            for (let i = 0; i < 3; i++) {
                window.selectPage(select, i);
                seen.push([paging.currentPageNb, paging.startPagingRow,
                    host.getAttribute('page')]);
            }
            window.selectPage(select, 2);
            seen.push([paging.currentPageNb, paging.startPagingRow,
                host.getAttribute('page')]);

            tf.destroy();
            return seen;
        }, PAGER_TABLE_HTML);

        // Select pagers store the option's start-row value as a string;
        // groupByPage() parses it for row grouping.
        expect(result).toEqual([
            [1, '0', '1'],
            [2, '5', '2'],
            [3, '10', '3'],
            [3, '10', '3']
        ]);
    });

test('paging bridge buttons wrap at the first and last page',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountPager('bridge-buttons',
                { paging: { length: 5 } }, html);
            const paging = tf.feature('paging');
            const host = paging.pagerEl;
            const seen = [];
            const record = () => seen.push(paging.currentPageNb);

            window.click(host, 'prev');
            record();
            window.click(host, 'next');
            record();
            window.click(host, 'next');
            record();
            window.click(host, 'next');
            record();
            window.click(host, 'last');
            record();
            window.click(host, 'first');
            record();
            window.click(host, 'prev');
            record();
            window.click(host, 'last');
            record();

            tf.destroy();
            return seen;
        }, PAGER_TABLE_HTML);

        expect(result).toEqual([3, 1, 2, 3, 3, 1, 3, 3]);
    });

test('paging bridge renders into target_id and hides it when empty',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: MOUNT });

        const result = await page.evaluate(async (html) => {
            const target = document.createElement('div');
            target.id = 'pager-target';
            document.body.appendChild(target);

            const tf = await window.mountPager('bridge-target',
                { paging: { length: 5, target_id: 'pager-target' } }, html);
            const paging = tf.feature('paging');
            const host = paging.pagerEl;

            const inTarget = host.parentElement === target;
            const inCaption = Boolean(host.closest('caption'));

            tf.setFilterValue(0, 'zzz');
            tf.filter();
            const hidden = target.style.visibility;

            tf.clearFilters();
            const visible = target.style.visibility;

            tf.destroy();
            return { inTarget, inCaption, hidden, visible };
        }, PAGER_TABLE_HTML);

        expect(result.inTarget).toBe(true);
        expect(result.inCaption).toBe(false);
        expect(result.hidden).toBe('hidden');
        expect(result.visible).toBe('visible');
    });

test('paging bridge renders into the configured toolbar position',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountPager('bridge-toolbar',
                { paging: { length: 5, toolbar_position: 'left' } }, html);
            const toolbar = tf.feature('toolbar');
            const host = tf.feature('paging').pagerEl;

            const state = {
                inLeft: host.parentElement === toolbar.innerCont.left,
                inCenter: Boolean(
                    toolbar.innerCont.center.querySelector('tf-pager'))
            };
            tf.destroy();
            return state;
        }, PAGER_TABLE_HTML);

        expect(result.inLeft).toBe(true);
        expect(result.inCenter).toBe(false);
    });

test('paging bridge resets and re-renders after filtering',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountPager('bridge-filter',
                { paging: { length: 5 } }, html);
            const paging = tf.feature('paging');
            const host = paging.pagerEl;
            const select = window.shadow(host, 'page-select');
            const snapshot = () => ({
                page: paging.currentPageNb,
                total: host.getAttribute('total-pages'),
                attr: host.getAttribute('page'),
                selected: select.selectedIndex,
                options: Array.from(select.options)
                    .map((o) => `${o.textContent}:${o.value}`)
            });

            window.selectPage(select, 2);
            const before = snapshot();

            tf.setFilterValue(0, 'City 1');
            tf.filter();
            const filtered = snapshot();

            tf.clearFilters();
            const restored = snapshot();

            tf.destroy();
            return { before, filtered, restored };
        }, PAGER_TABLE_HTML);

        expect(result.before.page).toBe(3);
        expect(result.filtered).toEqual({
            page: 1,
            total: '1',
            attr: '1',
            selected: 0,
            options: ['1:0']
        });
        expect(result.restored).toEqual({
            page: 1,
            total: '3',
            attr: '1',
            selected: 0,
            options: ['1:0', '2:5', '3:10']
        });
    });

test('paging bridge hides the controls when no rows match',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountPager('bridge-empty',
                { paging: { length: 5 } }, html);
            const paging = tf.feature('paging');
            const host = paging.pagerEl;
            const visibility = () => host.parentElement.style.visibility;

            tf.setFilterValue(0, 'zzz');
            tf.filter();
            const empty = {
                nbPages: paging.nbPages,
                total: host.getAttribute('total-pages'),
                visibility: visibility()
            };

            tf.clearFilters();
            const restored = {
                nbPages: paging.nbPages,
                visibility: visibility()
            };

            tf.destroy();
            return { empty, restored };
        }, PAGER_TABLE_HTML);

        expect(result.empty).toEqual({
            nbPages: 0,
            total: '0',
            visibility: 'hidden'
        });
        expect(result.restored).toEqual({ nbPages: 3, visibility: 'visible' });
    });

test('paging bridge re-renders the page list on results per page change',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountPager('bridge-rspg',
                {
                    paging: {
                        length: 5,
                        results_per_page: ['Rows: ', [5, 2]]
                    }
                }, html);
            const paging = tf.feature('paging');
            const host = paging.pagerEl;
            const select = window.shadow(host, 'page-select');

            window.selectPage(select, 2);
            paging.pageLengthSlc.selectedIndex = 1;
            paging.pageLengthSlc.dispatchEvent(
                new Event('change', { bubbles: true }));

            const state = {
                pageLength: paging.pageLength,
                page: paging.currentPageNb,
                total: host.getAttribute('total-pages'),
                attr: host.getAttribute('page'),
                options: Array.from(select.options).map((o) => o.value)
            };
            tf.destroy();
            return state;
        }, PAGER_TABLE_HTML);

        expect(result.pageLength).toBe(2);
        expect(result.page).toBe(3);
        expect(result.total).toBe('6');
        expect(result.attr).toBe('3');
        expect(result.options)
            .toEqual(['0', '2', '4', '6', '8', '10']);
    });

test('paging bridge honours disable() and enable()', async ({ page }) => {
    await page.goto(FIXTURE);
    await page.addScriptTag({ content: MOUNT });

    const result = await page.evaluate(async (html) => {
        const tf = await window.mountPager('bridge-disabled',
            { paging: { length: 5 } }, html);
        const paging = tf.feature('paging');
        const host = paging.pagerEl;
        const select = window.shadow(host, 'page-select');
        const buttons = () => Array.from(
            host.shadowRoot.querySelectorAll('button'))
            .map((b) => b.hasAttribute('disabled'));

        paging.disable();
        const disabledAttr = host.hasAttribute('disabled');
        const disabledButtons = buttons();
        window.selectPage(select, 2);
        window.click(host, 'next');
        const disabled = paging.currentPageNb;

        paging.enable();
        const enabledAttr = host.hasAttribute('disabled');
        const enabledButtons = buttons();
        window.selectPage(select, 1);
        const enabled = paging.currentPageNb;

        tf.destroy();
        return {
            disabled, enabled, disabledAttr, disabledButtons,
            enabledAttr, enabledButtons
        };
    }, PAGER_TABLE_HTML);

    expect(result.disabledAttr).toBe(true);
    expect(result.disabledButtons).toEqual([true, true, true, true]);
    expect(result.disabled).toBe(1);
    expect(result.enabledAttr).toBe(false);
    expect(result.enabledButtons).toEqual([false, false, false, false]);
    expect(result.enabled).toBe(2);
});

test('paging bridge truncates fractional input like the legacy selector',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountPager('bridge-fraction',
                { paging: { length: 5, page_selector_type: 'input' } },
                html);
            const paging = tf.feature('paging');
            const host = paging.pagerEl;

            window.enter(window.shadow(host, 'page-input'), '2.5');

            const state = {
                page: paging.currentPageNb,
                startRow: paging.startPagingRow,
                attr: host.getAttribute('page')
            };
            tf.destroy();
            return state;
        }, PAGER_TABLE_HTML);

        expect(result.page).toBe(2);
        expect(result.startRow).toBe(5);
        expect(result.attr).toBe('2');
    });

test('paging bridge destroy unbinds handlers and re-init mounts one pager',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: MOUNT });

        const result = await page.evaluate(async (html) => {
            let tf = await window.mountPager('bridge-lifecycle',
                { paging: { length: 5 } }, html);
            let paging = tf.feature('paging');
            const host = paging.pagerEl;
            window.click(host, 'next');
            const beforeDestroy = paging.currentPageNb;

            tf.destroy();
            const removed = !host.isConnected;
            window.click(host, 'next');
            const afterDetachedClick = paging.currentPageNb;

            let threw = null;
            try {
                tf.destroy();
            } catch (e) {
                threw = e.message;
            }

            tf.init();
            paging = tf.feature('paging');
            const remounted = paging.pagerEl;
            window.click(remounted, 'next');
            const afterReinit = paging.currentPageNb;
            const pagerCount = remounted.parentElement
                .querySelectorAll('tf-pager').length;

            tf.destroy();
            return {
                beforeDestroy,
                removed,
                afterDetachedClick,
                threw,
                pagerCount,
                afterReinit
            };
        }, PAGER_TABLE_HTML);

        expect(result.beforeDestroy).toBe(2);
        expect(result.removed).toBe(true);
        expect(result.afterDetachedClick).toBe(2);
        expect(result.threw).toBe(null);
        expect(result.pagerCount).toBe(1);
        expect(result.afterReinit).toBe(3);
    });

test('paging bridge instances are independent', async ({ page }) => {
    await page.goto(FIXTURE);
    await page.addScriptTag({ content: MOUNT });

    const result = await page.evaluate(async (html) => {
        const tfA = await window.mountPager('bridge-a',
            { paging: { length: 5 } }, html);
        const pagingA = tfA.feature('paging');
        const hostA = pagingA.pagerEl;

        const tfB = await window.mountPager('bridge-b',
            { paging: { length: 5 } }, html);
        const pagingB = tfB.feature('paging');
        const hostB = pagingB.pagerEl;

        window.click(hostA, 'next');
        const moved = [pagingA.currentPageNb, pagingB.currentPageNb];
        const distinct = hostA !== hostB;

        tfA.destroy();
        const afterDestroy = {
            removedA: !hostA.isConnected,
            aliveB: hostB.isConnected
        };
        window.click(hostB, 'next');
        const movedB = pagingB.currentPageNb;

        tfB.destroy();
        return { moved, distinct, afterDestroy, movedB };
    }, PAGER_TABLE_HTML);

    expect(result.moved).toEqual([2, 1]);
    expect(result.distinct).toBe(true);
    expect(result.afterDestroy).toEqual({ removedA: true, aliveB: true });
    expect(result.movedB).toBe(2);
});

test('paging bridge setPage() drives the element', async ({ page }) => {
    await page.goto(FIXTURE);
    await page.addScriptTag({ content: MOUNT });

    const result = await page.evaluate(async (html) => {
        const tf = await window.mountPager('bridge-setpage',
            { paging: { length: 5 } }, html);
        const paging = tf.feature('paging');
        const host = paging.pagerEl;
        const seen = [];
        const record = () => seen.push(
            [paging.currentPageNb, host.getAttribute('page')]);

        paging.setPage('last');
        record();
        paging.setPage(2);
        record();
        paging.setPage('previous');
        record();
        paging.setPage('first');
        record();
        paging.setPage('next');
        record();
        paging.setPage('unknown');
        record();

        tf.destroy();
        return seen;
    }, PAGER_TABLE_HTML);

    expect(result).toEqual([
        [3, '3'],
        [2, '2'],
        [1, '1'],
        [1, '1'],
        [2, '2'],
        [3, '3']
    ]);
});

test('paging bridge emits page-change and the legacy page events',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountPager('bridge-events',
                { paging: { length: 5 } }, html);
            const paging = tf.feature('paging');
            const host = paging.pagerEl;
            const select = window.shadow(host, 'page-select');
            const doc = [];
            const before = [];
            const after = [];

            document.addEventListener('page-change',
                (e) => doc.push(e.detail.page));
            tf.emitter.on(['before-page-change'],
                (inst, page) => before.push(page));
            tf.emitter.on(['after-page-change'],
                (inst, page) => after.push(page));

            window.click(host, 'next');
            window.selectPage(select, 2);

            tf.destroy();
            return { doc, before, after };
        }, PAGER_TABLE_HTML);

        expect(result.doc).toEqual(['3']);
        expect(result.before).toEqual([2, 3]);
        expect(result.after).toEqual([2, 3]);
    });

// Results per page bridge (#1042): the feature routes through
// <tf-results-per-page> when the source registers it, so the label text,
// option list and selection live in the element while the feature keeps
// the paging arithmetic. The host carries both legacy classes and the
// shadow `results-select` part is the select the feature reads and writes.
const RESULTS_MOUNT = `
window.resultsHost = function (tf) {
    return tf.feature('paging').resultsPerPageEl;
};
window.resultsPart = function (host, part) {
    return host.shadowRoot.querySelector('[part="' + part + '"]');
};
window.mountResults = async function (id, config, html) {
    await import('/src/components/tf-pager.js');
    await import('/src/components/tf-results-per-page.js');
    const table = document.createElement('table');
    table.id = id;
    table.innerHTML = html;
    document.body.appendChild(table);
    const tf = new TableFilter(id, Object.assign({
        base_path: '/dist/tablefilter/',
        enable_icons: false
    }, config));
    tf.init();
    return tf;
};
`;

test('results per page bridge uses tf-results-per-page with the legacy config',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: RESULTS_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountResults('ce-results',
                {
                    paging: {
                        length: 10,
                        results_per_page: ['Rows: ', [5, 2]],
                        results_slc_css_class: 'mySlc',
                        results_span_css_class: 'mySpan'
                    }
                }, html);
            const paging = tf.feature('paging');
            const host = window.resultsHost(tf);
            const select = window.resultsPart(host, 'results-select');
            const state = {
                isCE: host.nodeName === 'TF-RESULTS-PER-PAGE',
                className: host.className,
                text: window.resultsPart(host, 'results-text').textContent,
                options: Array.from(select.options).map((o) => o.value),
                selected: select.value,
                attr: host.getAttribute('page-length'),
                pageLength: paging.pageLength,
                nbPages: paging.nbPages,
                pageOptions: Array.from(
                    window.resultsPart(paging.pagerEl, 'page-select').options)
                    .map((o) => o.value),
                isShadowSelect: paging.pageLengthSlc === select,
                besidePager: !paging.pagerEl.contains(host),
                sameToolbar: host.closest('.inf') ===
                    paging.pagerEl.closest('.inf')
            };

            paging.destroy();
            return { state, removed: !host.isConnected };
        }, PAGER_TABLE_HTML);

        expect(result.state.isCE).toBe(true);
        expect(result.state.className).toBe('mySlc mySpan');
        expect(result.state.text).toBe('Rows: ');
        expect(result.state.options).toEqual(['5', '2']);
        expect(result.state.selected).toBe('5');
        expect(result.state.attr).toBe('5');
        expect(result.state.pageLength).toBe(5);
        expect(result.state.nbPages).toBe(3);
        expect(result.state.pageOptions).toEqual(['0', '5', '10']);
        expect(result.state.isShadowSelect).toBe(true);
        expect(result.state.besidePager).toBe(true);
        expect(result.state.sameToolbar).toBe(true);
        expect(result.removed).toBe(true);
    });

test('results per page bridge applies a pick from the element',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: RESULTS_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountResults('ce-results-pick',
                {
                    paging: {
                        length: 5,
                        results_per_page: ['Rows: ', [5, 2]]
                    }
                }, html);
            const paging = tf.feature('paging');
            const host = window.resultsHost(tf);
            const select = window.resultsPart(host, 'results-select');

            select.selectedIndex = 1;
            select.dispatchEvent(new Event('change', { bubbles: true }));

            const state = {
                pageLength: paging.pageLength,
                nbPages: paging.nbPages,
                pageLengthAttr: host.getAttribute('page-length'),
                pageAttr: paging.pagerEl.getAttribute('page'),
                options: Array.from(
                    window.resultsPart(paging.pagerEl, 'page-select').options)
                    .map((o) => o.value)
            };

            paging.destroy();
            return state;
        }, PAGER_TABLE_HTML);

        expect(result.pageLength).toBe(2);
        expect(result.nbPages).toBe(6);
        expect(result.pageLengthAttr).toBe('2');
        expect(result.pageAttr).toBe('1');
        expect(result.options).toEqual(['0', '2', '4', '6', '8', '10']);
    });

test('results per page bridge renders into results_per_page_target_id',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: RESULTS_MOUNT });

        const result = await page.evaluate(async (html) => {
            const target = document.createElement('div');
            target.id = 'results-target';
            document.body.appendChild(target);

            const tf = await window.mountResults('ce-results-target',
                {
                    help_instructions: false,
                    paging: {
                        length: 5,
                        results_per_page: ['Rows: ', [5, 2]],
                        results_per_page_target_id: 'results-target'
                    }
                }, html);
            const paging = tf.feature('paging');
            const host = window.resultsHost(tf);

            const state = {
                inTarget: host.parentElement === target,
                tag: host.nodeName
            };

            paging.destroy();
            target.remove();
            return state;
        }, PAGER_TABLE_HTML);

        expect(result.inTarget).toBe(true);
        expect(result.tag).toBe('TF-RESULTS-PER-PAGE');
    });

test('results per page bridge keeps the attribute in step with the API',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: RESULTS_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountResults('ce-results-api',
                {
                    paging: {
                        length: 5,
                        results_per_page: ['Rows: ', [5, 2]]
                    }
                }, html);
            const paging = tf.feature('paging');
            const host = window.resultsHost(tf);
            const state = [];

            ['2', '5', '999'].forEach((val) => {
                paging.changeResultsPerPage(val);
                state.push({
                    pageLength: paging.pageLength,
                    nbPages: paging.nbPages,
                    attr: host.getAttribute('page-length'),
                    selected: window.resultsPart(host, 'results-select').value
                });
            });

            paging.destroy();
            return state;
        }, PAGER_TABLE_HTML);

        expect(result[0]).toEqual({
            pageLength: 2, nbPages: 6, attr: '2', selected: '2'
        });
        expect(result[1]).toEqual({
            pageLength: 5, nbPages: 3, attr: '5', selected: '5'
        });
        expect(result[2]).toEqual({
            pageLength: 5, nbPages: 3, attr: '5', selected: '5'
        });
    });

test('results per page falls back for a foreign element without the part',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: MOUNT });

        const result = await page.evaluate(async (html) => {
            class ForeignResults extends HTMLElement {
                setText() {}
                setPageLengths() {}
                setPageLength() {}
            }
            customElements.define('tf-results-per-page', ForeignResults);

            const tf = await window.mountPager('ce-results-foreign',
                {
                    paging: {
                        length: 5,
                        results_per_page: ['Rows: ', [5, 2]]
                    }
                }, html);
            const paging = tf.feature('paging');
            const state = {
                foreign: customElements.get('tf-results-per-page') ===
                    ForeignResults,
                hosts: document.querySelectorAll(
                    'tf-results-per-page').length,
                isCE: Boolean(paging.resultsPerPageEl),
                tag: paging.pageLengthSlc.tagName,
                className: paging.pageLengthSlc.className,
                span: document.querySelector('span.rspgSpan').tagName
            };

            paging.changeResultsPerPage('2');
            state.pageLength = paging.pageLength;
            tf.destroy();
            return state;
        }, PAGER_TABLE_HTML);

        expect(result).toEqual({
            foreign: true,
            hosts: 0,
            isCE: false,
            tag: 'SELECT',
            className: 'rspg',
            span: 'SPAN',
            pageLength: 2
        });
    });

test('results per page stays on the legacy path without the element',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountPager('ce-results-legacy',
                {
                    paging: {
                        length: 5,
                        results_per_page: ['Rows: ', [5, 2]]
                    }
                }, html);
            const paging = tf.feature('paging');
            const select = paging.pageLengthSlc;
            const span = paging.slcResultsTxt;
            const state = {
                host: paging.resultsPerPageEl,
                tag: select.tagName,
                className: select.className,
                span: span && span.tagName
            };

            paging.destroy();
            state.selectRemoved = !select.isConnected;
            state.spanRemoved = !span.isConnected;
            return state;
        }, PAGER_TABLE_HTML);

        expect(result.host).toBe(null);
        expect(result.tag).toBe('SELECT');
        expect(result.className).toBe('rspg');
        expect(result.span).toBe('SPAN');
        expect(result.selectRemoved).toBe(true);
        expect(result.spanRemoved).toBe(true);
    });

test('results per page bridge works without the pager element',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: RESULTS_MOUNT });

        const result = await page.evaluate(async (html) => {
            await import('/src/components/tf-results-per-page.js');

            const table = document.createElement('table');
            table.id = 'ce-results-no-pager';
            table.innerHTML = html;
            document.body.appendChild(table);
            const tf = new TableFilter(table.id, {
                base_path: '/dist/tablefilter/',
                enable_icons: false,
                paging: {
                    length: 5,
                    results_per_page: ['Rows: ', [5, 2]]
                }
            });
            tf.init();

            const paging = tf.feature('paging');
            const host = paging.resultsPerPageEl;
            const select = window.resultsPart(host, 'results-select');
            const state = {
                isCE: host.nodeName === 'TF-RESULTS-PER-PAGE',
                pagerIsCE: Boolean(paging.pagerEl),
                pageSlcTag: paging.pageSlc.tagName,
                isShadowSelect: paging.pageLengthSlc === select,
                pageLength: paging.pageLength
            };

            select.selectedIndex = 1;
            select.dispatchEvent(new Event('change', { bubbles: true }));
            state.pickedLength = paging.pageLength;
            state.pageOptions = Array.from(paging.pageSlc.options)
                .map((o) => o.value);

            tf.destroy();
            return state;
        }, PAGER_TABLE_HTML);

        expect(result.isCE).toBe(true);
        expect(result.pagerIsCE).toBe(false);
        expect(result.pageSlcTag).toBe('SELECT');
        expect(result.isShadowSelect).toBe(true);
        expect(result.pageLength).toBe(5);
        expect(result.pickedLength).toBe(2);
        expect(result.pageOptions).toEqual(
            ['0', '2', '4', '6', '8', '10']);
    });

test('results per page bridge resets the element selection',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: RESULTS_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountResults('ce-results-reset',
                {
                    paging: {
                        length: 5,
                        results_per_page: ['Rows: ', [5, 2]]
                    }
                }, html);
            const paging = tf.feature('paging');
            const host = paging.resultsPerPageEl;

            tf.Mod.store = { getPageLength: () => '1' };
            paging.resetPageLength();

            const select = window.resultsPart(host, 'results-select');
            const state = {
                value: select.value,
                optionSelected: select.options[1].selected,
                attr: host.getAttribute('page-length')
            };

            paging.destroy();
            return state;
        }, PAGER_TABLE_HTML);

        expect(result.value).toBe('2');
        expect(result.optionSelected).toBe(true);
        expect(result.attr).toBe('2');
    });

test('results per page bridge keeps the pick when no rows are valid',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: RESULTS_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountResults('ce-results-empty',
                {
                    paging: {
                        length: 5,
                        results_per_page: ['Rows: ', [5, 2]]
                    }
                }, html);
            const paging = tf.feature('paging');
            const host = paging.resultsPerPageEl;

            tf.setFilterValue(0, 'no such city');
            tf.filter();
            const validRows = tf.getValidRowsNb();

            paging.changeResultsPerPage('2');
            const state = {
                validRows,
                value: window.resultsPart(host, 'results-select').value,
                attr: host.getAttribute('page-length'),
                pageLength: paging.pageLength,
                page: paging.getPage()
            };

            paging.destroy();
            return state;
        }, PAGER_TABLE_HTML);

        expect(result.validRows).toBe(0);
        expect(result.value).toBe('2');
        expect(result.attr).toBe('2');
        expect(result.pageLength).toBe(5);
        expect(result.page).toBe(1);
    });

test('results per page bridge unbinds the element event on destroy',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: RESULTS_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountResults('ce-results-unbind',
                {
                    paging: {
                        length: 5,
                        results_per_page: ['Rows: ', [5, 2]]
                    }
                }, html);
            const paging = tf.feature('paging');
            const host = paging.resultsPerPageEl;

            paging.destroy();

            let threw = false;
            try {
                const select = window.resultsPart(host, 'results-select');
                select.selectedIndex = 1;
                select.dispatchEvent(new Event('change', { bubbles: true }));
            } catch (err) {
                threw = true;
            }

            return {
                threw,
                pageLength: paging.pageLength,
                attr: host.getAttribute('page-length')
            };
        }, PAGER_TABLE_HTML);

        expect(result.threw).toBe(false);
        expect(result.pageLength).toBe(5);
        expect(result.attr).toBe('2');
    });

test('results per page bridge double-init is guarded and reset re-inits',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: RESULTS_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountResults('ce-results-lifecycle',
                {
                    paging: {
                        length: 5,
                        results_per_page: ['Rows: ', [5, 2]]
                    }
                }, html);
            const paging = tf.feature('paging');

            paging.init();
            const afterDoubleInit = document
                .querySelectorAll('tf-results-per-page').length;

            paging.destroy();
            const afterDestroy = document
                .querySelectorAll('tf-results-per-page').length;

            paging.reset();
            const host = paging.resultsPerPageEl;
            const afterReset = {
                hosts: document
                    .querySelectorAll('tf-results-per-page').length,
                connected: Boolean(host) && host.isConnected,
                text: host ? window.resultsPart(host, 'results-text')
                    .textContent : null,
                value: host ? window.resultsPart(host, 'results-select')
                    .value : null
            };

            paging.destroy();
            return { afterDoubleInit, afterDestroy, afterReset };
        }, PAGER_TABLE_HTML);

        expect(result.afterDoubleInit).toBe(1);
        expect(result.afterDestroy).toBe(0);
        expect(result.afterReset.hosts).toBe(1);
        expect(result.afterReset.connected).toBe(true);
        expect(result.afterReset.text).toBe('Rows: ');
        expect(result.afterReset.value).toBe('5');
    });

// Checklist bridge (#930): the feature routes through <tf-checklist>
// when the source registers it, so the options, selection state and
// open state live in the element while the feature keeps the filtering,
// linked-filter and load-on-demand behaviour. Each test asserts the host
// and that interaction still reaches TableFilter.
const CHECKLIST_TABLE_HTML =
    '<thead><tr><th>City</th><th>Country</th></tr></thead>' +
    '<tbody>' +
    '<tr><td>Sydney</td><td>Australia</td></tr>' +
    '<tr><td>Perth</td><td>Australia</td></tr>' +
    '<tr><td>Paris</td><td>France</td></tr>' +
    '<tr><td>Lyon</td><td>France</td></tr>' +
    '</tbody>';

const CHECKLIST_MOUNT = `
window.checklistHost = function (tf, col) {
    return tf.feature('checkList').containers[col];
};
window.checklistOptions = function (host) {
    return Array.from(host.shadowRoot.querySelectorAll('[part~="option"]'))
        .map(function (el) {
            return {
                text: el.querySelector('[part="option-text"]').textContent,
                selected: el.getAttribute('aria-selected'),
                disabled: el.getAttribute('aria-disabled')
            };
        });
};
window.checklistOption = function (host, text) {
    return Array.from(host.shadowRoot.querySelectorAll('[part~="option"]'))
        .find(function (el) {
            const label = el.querySelector('[part="option-text"]');
            return label.textContent === text;
        });
};
window.checklistTrigger = function (host) {
    return host.shadowRoot.querySelector('[part="trigger"]');
};
window.visibleRows = function (tableId) {
    return Array.from(document.querySelectorAll('#' + tableId + ' tbody tr'))
        .filter(function (row) { return row.style.display !== 'none'; })
        .length;
};
window.mountChecklist = async function (id, config, html) {
    await import('/src/components/tf-checklist.js');
    const table = document.createElement('table');
    table.id = id;
    table.innerHTML = html;
    document.body.appendChild(table);
    const tf = new TableFilter(id, Object.assign({
        base_path: '/dist/tablefilter/'
    }, config));
    tf.init();
    window.tf = tf;
    return tf;
};
`;

test('checklist bridge uses tf-checklist with the legacy config',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: CHECKLIST_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountChecklist('ce-checklist',
                { col_0: 'checklist' }, html);
            const checkList = tf.feature('checkList');
            const host = window.checklistHost(tf, 0);
            const sr = host.shadowRoot;

            const state = {
                isCE: Boolean(host) && host.nodeName === 'TF-CHECKLIST',
                id: host.id,
                col: host.getAttribute('col'),
                className: host.className,
                filterId: tf.getFilterId(0),
                byType: tf.getFiltersByType('checklist'),
                byTypeIdx: tf.getFiltersByType('checklist', true),
                filterElement: tf.getFilterElement(0) === host,
                triggerText: host.getAttribute('trigger-text'),
                listboxLabel: host.getAttribute('accessible-listbox-label'),
                parts: ['trigger', 'listbox'].map((name) =>
                    Boolean(sr.querySelector(`[part="${name}"]`))),
                options: window.checklistOptions(host),
                legacy: host.parentElement.querySelectorAll(
                    'div.div_checklist, ul.flt_checklist').length
            };

            tf.destroy();
            return Object.assign(state, {
                removed: !host.isConnected,
                initialized: checkList.initialized
            });
        }, CHECKLIST_TABLE_HTML);

        expect(result.isCE).toBe(true);
        expect(result.id).toBe('flt0_ce-checklist');
        expect(result.col).toBe('0');
        expect(result.className).toBe('div_checklist');
        expect(result.filterId).toBe(result.id);
        expect(result.byType).toEqual([result.id]);
        expect(result.byTypeIdx).toEqual([0]);
        expect(result.filterElement).toBe(true);
        expect(result.triggerText).toBe('City');
        expect(result.listboxLabel).toBe('City options');
        expect(result.parts).toEqual([true, true]);
        expect(result.options).toEqual([
            { text: 'Clear', selected: 'false', disabled: null },
            { text: 'Lyon', selected: 'false', disabled: null },
            { text: 'Paris', selected: 'false', disabled: null },
            { text: 'Perth', selected: 'false', disabled: null },
            { text: 'Sydney', selected: 'false', disabled: null }
        ]);
        expect(result.legacy).toBe(0);
        expect(result.removed).toBe(true);
        expect(result.initialized).toBe(false);
    });

test('checklist bridge filters the table from an option click',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: CHECKLIST_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountChecklist('ce-checklist-click',
                { col_0: 'checklist' }, html);
            const host = window.checklistHost(tf, 0);
            const active = [];

            tf.emitter.on(['filter-focus'],
                (inst, filter) => active.push(filter.id));

            window.checklistOption(host, 'Perth').click();
            const state = {
                values: tf.feature('checkList').getValues(0),
                filterValue: tf.getFilterValue(0),
                visible: window.visibleRows('ce-checklist-click'),
                triggerText: host.getAttribute('trigger-text'),
                selected: window.checklistOptions(host)
                    .filter((option) => option.selected === 'true')
                    .map((option) => option.text),
                active: active.slice()
            };

            // A second pick widens the filter with an OR condition.
            window.checklistOption(host, 'Paris').click();
            state.twoValues = tf.getFilterValue(0);
            state.twoVisible = window.visibleRows('ce-checklist-click');
            state.twoTrigger = host.getAttribute('trigger-text');

            tf.destroy();
            return state;
        }, CHECKLIST_TABLE_HTML);

        expect(result.values).toEqual(['Perth']);
        expect(result.filterValue).toEqual(['Perth']);
        expect(result.visible).toBe(1);
        expect(result.triggerText).toBe('City (1)');
        expect(result.selected).toEqual(['Perth']);
        expect(result.active).toEqual(['flt0_ce-checklist-click']);
        expect(result.twoValues).toEqual(['Paris', 'Perth']);
        expect(result.twoVisible).toBe(2);
        expect(result.twoTrigger).toBe('City (2)');
    });

test('checklist bridge keeps the reset option exclusive',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: CHECKLIST_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountChecklist('ce-checklist-reset',
                { col_0: 'checklist' }, html);
            const host = window.checklistHost(tf, 0);

            window.checklistOption(host, 'Sydney').click();
            window.checklistOption(host, 'Perth').click();
            const selected = window.checklistOptions(host)
                .filter((option) => option.selected === 'true')
                .map((option) => option.text);

            window.checklistOption(host, 'Clear').click();
            const afterReset = {
                values: tf.feature('checkList').getValues(0),
                filterValue: tf.getFilterValue(0),
                visible: window.visibleRows('ce-checklist-reset'),
                selected: window.checklistOptions(host)
                    .filter((option) => option.selected === 'true')
                    .map((option) => option.text)
            };

            // A pick after the reset unselects the reset option.
            window.checklistOption(host, 'Paris').click();
            const afterPick = {
                values: tf.feature('checkList').getValues(0),
                selected: window.checklistOptions(host)
                    .filter((option) => option.selected === 'true')
                    .map((option) => option.text)
            };

            tf.destroy();
            return { selected, afterReset, afterPick };
        }, CHECKLIST_TABLE_HTML);

        expect(result.selected).toEqual(['Perth', 'Sydney']);
        expect(result.afterReset).toEqual({
            values: [''],
            filterValue: '',
            visible: 4,
            selected: ['Clear']
        });
        expect(result.afterPick).toEqual({
            values: ['Paris'],
            selected: ['Paris']
        });
    });

test('checklist bridge maps selectOptions, setFilterValue and getValues',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: CHECKLIST_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountChecklist('ce-checklist-api',
                { col_0: 'checklist' }, html);
            const checkList = tf.feature('checkList');
            const host = window.checklistHost(tf, 0);

            checkList.selectOptions(0, ['Perth', 'Sydney']);
            const selected = {
                values: checkList.getValues(0),
                selected: window.checklistOptions(host)
                    .filter((option) => option.selected === 'true')
                    .map((option) => option.text)
            };

            tf.setFilterValue(0, 'Sydney');
            const single = {
                value: tf.getFilterValue(0),
                selected: window.checklistOptions(host)
                    .filter((option) => option.selected === 'true')
                    .map((option) => option.text)
            };

            tf.setFilterValue(0, 'sydney || perth');
            const orString = checkList.getValues(0);

            tf.clearFilters();
            const cleared = {
                values: checkList.getValues(0),
                filterValue: tf.getFilterValue(0),
                selected: window.checklistOptions(host)
                    .filter((option) => option.selected === 'true').length
            };

            tf.destroy();
            return { selected, single, orString, cleared };
        }, CHECKLIST_TABLE_HTML);

        expect(result.selected).toEqual({
            values: ['Perth', 'Sydney'],
            selected: ['Perth', 'Sydney']
        });
        expect(result.single).toEqual({
            value: ['Sydney'],
            selected: ['Sydney']
        });
        expect(result.orString).toEqual(['Perth', 'Sydney']);
        expect(result.cleared).toEqual({
            values: [''],
            filterValue: '',
            selected: 0
        });
    });

test('checklist bridge maps empty, non-empty and reset text options',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: CHECKLIST_MOUNT });

        const tableHtml =
            '<thead><tr><th>City</th></tr></thead>' +
            '<tbody>' +
            '<tr><td>Sydney</td></tr>' +
            '<tr><td></td></tr>' +
            '</tbody>';

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountChecklist('ce-checklist-empty', {
                col_0: 'checklist',
                enable_empty_option: true,
                enable_non_empty_option: true,
                clear_filter_text: 'Reset city'
            }, html);
            const checkList = tf.feature('checkList');
            const host = window.checklistHost(tf, 0);

            const options = window.checklistOptions(host);
            checkList.selectOptions(0, [tf.emOperator, tf.nmOperator]);
            const operators = {
                values: checkList.getValues(0),
                visible: window.visibleRows('ce-checklist-empty')
            };

            window.checklistOption(host, 'Reset city').click();
            const resetText = window.checklistOptions(host)
                .map((option) => option.text);

            tf.destroy();
            return { options, operators, resetText };
        }, tableHtml);

        expect(result.options.map((option) => option.text)).toEqual([
            'Reset city', '(Empty)', '(Non empty)', 'Sydney'
        ]);
        expect(result.operators.values).toEqual(['[empty]', '[nonempty]']);
        expect(result.operators.visible).toBe(2);
        expect(result.resetText).toEqual([
            'Reset city', '(Empty)', '(Non empty)', 'Sydney'
        ]);
    });

test('checklist bridge renders custom options and sorted values',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: CHECKLIST_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountChecklist('ce-checklist-custom', {
                col_0: 'checklist',
                custom_options: {
                    cols: [0],
                    values: [['syd', 'per', 'par']],
                    texts: [['Sydney', 'Perth', 'Paris']],
                    sorts: [true]
                }
            }, html);
            const host = window.checklistHost(tf, 0);

            const custom = window.checklistOptions(host)
                .map((option) => option.text);

            // A non-custom column sorts its options from the cells.
            tf.destroy();
            const tf2 = await window.mountChecklist('ce-checklist-sorted', {
                col_0: 'checklist',
                sort_filter_options_desc: [0]
            }, html);
            const sorted = window.checklistOptions(
                window.checklistHost(tf2, 0)).map((option) => option.text);

            tf2.destroy();
            return { custom, sorted };
        }, CHECKLIST_TABLE_HTML);

        expect(result.custom).toEqual([
            'Clear', 'Paris', 'Perth', 'Sydney'
        ]);
        expect(result.sorted).toEqual([
            'Clear', 'Sydney', 'Perth', 'Paris', 'Lyon'
        ]);
    });

test('checklist bridge disables options excluded by linked filters',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: CHECKLIST_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountChecklist('ce-checklist-linked', {
                col_0: 'checklist',
                col_1: 'checklist',
                linked_filters: true,
                disable_excluded_options: true
            }, html);
            const city = window.checklistHost(tf, 0);
            const country = window.checklistHost(tf, 1);

            window.checklistOption(country, 'France').click();
            const state = {
                cities: window.checklistOptions(city)
                    .map((option) => [option.text, option.disabled]),
                countries: window.checklistOptions(country)
                    .map((option) => [option.text, option.selected])
            };

            window.checklistOption(city, 'Sydney').click();
            state.afterDisabledClick = tf.feature('checkList').getValues(0);

            window.checklistOption(city, 'Paris').click();
            state.afterEnabledClick = tf.feature('checkList').getValues(0);

            tf.destroy();
            return state;
        }, CHECKLIST_TABLE_HTML);

        expect(result.cities).toEqual([
            ['Clear', null],
            ['Lyon', null],
            ['Paris', null],
            ['Perth', 'true'],
            ['Sydney', 'true']
        ]);
        expect(result.countries).toEqual([
            ['Clear', 'false'],
            ['Australia', 'false'],
            ['France', 'true']
        ]);
        expect(result.afterDisabledClick).toEqual(['']);
        expect(result.afterEnabledClick).toEqual(['Paris']);
    });

test('checklist bridge mounts into external filters',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: CHECKLIST_MOUNT });

        const result = await page.evaluate(async (html) => {
            const external = document.createElement('div');
            external.id = 'ce-checklist-external';
            document.body.appendChild(external);

            const tf = await window.mountChecklist('ce-checklist-ext', {
                col_0: 'checklist',
                external_flt_ids: ['ce-checklist-external']
            }, html);
            const host = window.checklistHost(tf, 0);

            const state = {
                mounted: host.parentElement === external,
                externalEmpty: external.children.length
            };

            tf.destroy();
            return Object.assign(state, {
                removed: !host.isConnected,
                externalAfter: external.children.length
            });
        }, CHECKLIST_TABLE_HTML);

        expect(result.mounted).toBe(true);
        expect(result.externalEmpty).toBe(1);
        expect(result.removed).toBe(true);
        expect(result.externalAfter).toBe(0);
    });

test('checklist bridge builds on demand from the open state',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: CHECKLIST_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountChecklist('ce-checklist-demand', {
                col_0: 'checklist',
                load_filters_on_demand: true,
                activate_checklist_text: 'Load cities'
            }, html);
            const host = window.checklistHost(tf, 0);

            const before = {
                triggerText: host.getAttribute('trigger-text'),
                listboxLabel: host.getAttribute('accessible-listbox-label'),
                filled: host.getAttribute('filled'),
                options: window.checklistOptions(host).length
            };

            window.checklistTrigger(host).click();
            const after = {
                open: host.hasAttribute('open'),
                filled: host.getAttribute('filled'),
                triggerText: host.getAttribute('trigger-text'),
                options: window.checklistOptions(host)
                    .map((option) => option.text)
            };

            window.checklistOption(host, 'Perth').click();
            const filtered = {
                values: tf.feature('checkList').getValues(0),
                visible: window.visibleRows('ce-checklist-demand')
            };

            tf.destroy();
            return { before, after, filtered };
        }, CHECKLIST_TABLE_HTML);

        expect(result.before).toEqual({
            triggerText: 'Load cities',
            listboxLabel: 'Load cities options',
            filled: null,
            options: 0
        });
        expect(result.after).toEqual({
            open: true,
            filled: '1',
            triggerText: 'City',
            options: ['Clear', 'Lyon', 'Paris', 'Perth', 'Sydney']
        });
        expect(result.filtered).toEqual({
            values: ['Perth'],
            visible: 1
        });
    });

test('checklist bridge falls back to the legacy markup without the element',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (html) => {
            const table = document.createElement('table');
            table.id = 'ce-checklist-legacy';
            table.innerHTML = html;
            document.body.appendChild(table);

            const tf = new TableFilter('ce-checklist-legacy', {
                base_path: '/dist/tablefilter/',
                col_0: 'checklist'
            });
            tf.init();

            const checkList = tf.feature('checkList');
            const container = checkList.containers[0];
            const ul = tf.getFilterElement(0);
            const state = {
                registered: Boolean(customElements.get('tf-checklist')),
                containerTag: container.nodeName,
                containerId: container.id,
                ulTag: ul ? ul.nodeName : null,
                options: ul ? ul.querySelectorAll('li').length : 0,
                values: checkList.getValues(0)
            };

            tf.destroy();
            return state;
        }, CHECKLIST_TABLE_HTML);

        expect(result.registered).toBe(false);
        expect(result.containerTag).toBe('DIV');
        expect(result.containerId).toBe('chkdiv_0_ce-checklist-legacy');
        expect(result.ulTag).toBe('UL');
        expect(result.options).toBe(5);
        expect(result.values).toEqual(['']);
    });

test('checklist bridge instances are independent and re-init mounts one',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: CHECKLIST_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tfA = await window.mountChecklist('ce-checklist-a',
                { col_0: 'checklist' }, html);
            const hostA = window.checklistHost(tfA, 0);
            const tfB = await window.mountChecklist('ce-checklist-b',
                { col_0: 'checklist' }, html);
            const hostB = window.checklistHost(tfB, 0);

            window.checklistOption(hostA, 'Perth').click();
            const picked = {
                a: tfA.feature('checkList').getValues(0),
                b: tfB.feature('checkList').getValues(0),
                distinct: hostA !== hostB
            };

            tfA.destroy();
            const removed = !hostA.isConnected;
            tfA.init();
            const remounted = window.checklistHost(tfA, 0);
            const hosts = remounted.parentElement
                .querySelectorAll('tf-checklist').length;

            tfA.destroy();
            tfB.destroy();
            return { picked, removed, hosts, remounted: remounted !== hostA };
        }, CHECKLIST_TABLE_HTML);

        expect(result.picked).toEqual({
            a: ['Perth'],
            b: [''],
            distinct: true
        });
        expect(result.removed).toBe(true);
        expect(result.hosts).toBe(1);
        expect(result.remounted).toBe(true);
    });

test('checklist bridge keeps case-sensitive option values distinct',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: CHECKLIST_MOUNT });

        const html =
            '<thead><tr><th>City</th></tr></thead>' +
            '<tbody>' +
            '<tr><td>Paris</td></tr>' +
            '<tr><td>paris</td></tr>' +
            '<tr><td>Lyon</td></tr>' +
            '</tbody>';

        const result = await page.evaluate(async (rawHtml) => {
            const tf = await window.mountChecklist(
                'ce-checklist-case', {
                    col_0: 'checklist',
                    case_sensitive: true
                }, rawHtml);
            const host = window.checklistHost(tf, 0);

            const names = window.checklistOptions(host)
                .map((option) => option.text);
            const total = names.length; // includes Clear

            // Case-insensitive mount: the two casing variants collapse.
            const tf2 = await window.mountChecklist(
                'ce-checklist-nocase', {
                    col_0: 'checklist',
                    case_sensitive: false
                }, rawHtml);
            const host2 = window.checklistHost(tf2, 0);
            const names2 = window.checklistOptions(host2)
                .map((option) => option.text);

            tf.destroy();
            tf2.destroy();
            return { total, names, names2 };
        }, html);

        expect(result.total).toBe(4); // Clear, Lyon, Paris, paris
        expect(result.names).toEqual(['Clear', 'Lyon', 'Paris', 'paris']);
        expect(result.names2).toEqual(['Clear', 'Lyon', 'Paris']);
    });

test('checklist bridge works with grid layout', async ({ page }) => {
    await page.goto(FIXTURE);
    await page.addScriptTag({ content: CHECKLIST_MOUNT });

    const result = await page.evaluate(async (html) => {
        const tf = await window.mountChecklist('ce-checklist-grid', {
            col_0: 'checklist', grid_layout: true
        }, html);
        const host = window.checklistHost(tf, 0);

        const before = {
            isCE: host.nodeName === 'TF-CHECKLIST',
            hostInDoc: host.isConnected,
            className: host.className
        };

        window.checklistOption(host, 'Paris').click();

        const filtered = {
            values: tf.feature('checkList').getValues(0),
            visible: Array.from(
                document.querySelectorAll('#ce-checklist-grid tbody tr')
            ).filter((row) => row.offsetParent !== null).length
        };

        const leftovers = document.querySelectorAll(
            '#ce-checklist-grid').length === 1;

        tf.destroy();
        return { before, filtered, leftovers };
    }, CHECKLIST_TABLE_HTML);

    expect(result.before.isCE).toBe(true);
    expect(result.before.hostInDoc).toBe(true);
    expect(result.before.className).toBe('div_checklist');
    expect(result.filtered.values).toEqual(['Paris']);
    expect(result.filtered.visible).toBe(1);
    expect(result.leftovers).toBe(true);
});

test('checklist bridge teardown is clean (two columns)', async ({ page }) => {
    await page.goto(FIXTURE);
    await page.addScriptTag({ content: CHECKLIST_MOUNT });

    const result = await page.evaluate(async (html) => {
        const tf = await window.mountChecklist('ce-checklist-multi', {
            col_0: 'checklist', col_1: 'checklist'
        }, html);
        const cities = window.checklistHost(tf, 0);
        const countries = window.checklistHost(tf, 1);

        // Interaction with either column filters the rows once.
        window.checklistOption(cities, 'Paris').click();
        const afterPick = Array.from(
            document.querySelectorAll('#ce-checklist-multi tbody tr')
        ).filter((row) => row.offsetParent !== null).length;

        const statusBefore = tf.emitter.events['after-filtering'].length;

        tf.destroy();
        const destroyed = !cities.isConnected && !countries.isConnected;
        const statusAfterDestroy = tf.emitter.events['after-filtering'].length;

        tf.init();
        const citiesNext = window.checklistHost(tf, 0);
        const countriesNext = window.checklistHost(tf, 1);
        window.checklistOption(citiesNext, 'Lyon').click();
        const afterReinit = Array.from(
            document.querySelectorAll('#ce-checklist-multi tbody tr')
        ).filter((row) => row.offsetParent !== null).length;

        tf.destroy();
        return {
            afterPick, statusBefore, statusAfterDestroy, destroyed,
            remounted: citiesNext !== cities && countriesNext !== countries,
            afterReinit
        };
    }, CHECKLIST_TABLE_HTML);

    expect(result.afterPick).toBe(1);
    expect(result.destroyed).toBe(true);
    expect(result.statusBefore).toBe(1);
    expect(result.statusAfterDestroy).toBe(0);
    expect(result.remounted).toBe(true);
    expect(result.afterReinit).toBe(1);
});

test('checklist destroy safe on uninitialized', async ({ page }) => {
    await page.goto(FIXTURE);
    await page.addScriptTag({ content: CHECKLIST_MOUNT });

    const result = await page.evaluate(async (html) => {
        const table = document.createElement('table');
        table.id = 'ce-checklist-uninit';
        table.innerHTML = html;
        document.body.appendChild(table);

        const tf = new TableFilter('ce-checklist-uninit', {
            base_path: '/dist/tablefilter/', col_0: 'checklist'
        });

        let threwOnFirst = null;
        try {
            tf.destroy();
        } catch (error) {
            threwOnFirst = error.message;
        }

        tf.init();
        const host = window.checklistHost(tf, 0);
        tf.destroy();
        let threwOnSecond = null;
        try {
            tf.destroy();
        } catch (error) {
            threwOnSecond = error.message;
        }
        return { threwOnFirst, threwOnSecond, removed: !host.isConnected };
    }, CHECKLIST_TABLE_HTML);

    expect(result.threwOnFirst).toBeNull();
    expect(result.threwOnSecond).toBeNull();
    expect(result.removed).toBe(true);
});

// Help bridge (#915): the feature routes through <tf-help> when the
// source registers it, projecting the legacy instructions, trigger
// markup and footer through the element slots.
const HELP_TABLE_HTML =
    '<thead><tr><th>City</th><th>Country</th></tr></thead>' +
    '<tbody><tr><td>Sydney</td><td>Australia</td></tr>' +
    '<tr><td>Paris</td><td>France</td></tr></tbody>';

const HELP_MOUNT = `
window.helpHost = function (tf) { return tf.feature('help').btn; };
window.helpPart = function (host, name) {
    return host.shadowRoot.querySelector('[part="' + name + '"]');
};
window.helpAssigned = function (host, name) {
    const slot = host.shadowRoot.querySelector('slot[name="' + name + '"]');
    return slot ? slot.assignedElements() : [];
};
window.mountHelp = async function (id, config, html) {
    await import('/src/components/tf-help.js');
    const table = document.createElement('table');
    table.id = id;
    table.innerHTML = html;
    document.body.appendChild(table);
    const tf = new TableFilter(id, Object.assign({
        base_path: '/dist/tablefilter/',
        rows_counter: true
    }, config));
    tf.init();
    return tf;
};
`;

test('help bridge uses tf-help with the legacy config', async ({ page }) => {
    await page.goto(FIXTURE);
    await page.addScriptTag({ content: HELP_MOUNT });

    const result = await page.evaluate(async (html) => {
        const tf = await window.mountHelp('ce-help', {
            btn_reset: true,
            help_instructions: {
                btn_text: '??',
                label: 'Help',
                text: 'hello <b>world</b>'
            }
        }, html);
        const help = tf.feature('help');
        const host = window.helpHost(tf);
        const toolbar = tf.feature('toolbar');
        const clear = tf.feature('clearButton').container;
        const instructions = window.helpAssigned(host, 'instructions')[0];

        const state = {
            isCE: host.nodeName === 'TF-HELP',
            contIsHost: help.cont === host,
            inRight: host.parentElement === toolbar.innerCont.right,
            beforeClear: host.nextElementSibling === clear,
            clearLast: toolbar.innerCont.right.lastElementChild === clear,
            triggerText: window.helpPart(host, 'trigger-text').textContent,
            triggerLabel:
                window.helpPart(host, 'trigger').getAttribute('aria-label'),
            instructionsHtml: instructions.innerHTML,
            instructionsText: instructions.textContent,
            hasBold: Boolean(instructions.querySelector('b')),
            footer: instructions.textContent.includes('TableFilter v') &&
                instructions.textContent.includes('www.tablefilter.com'),
            footerClose: Array.from(instructions.querySelectorAll('a'))
                .some((a) => a.textContent.trim() === 'Close'),
            closeText: window.helpPart(host, 'close-text').textContent,
            legacy: !document.querySelector('tf-help')
        };

        tf.destroy();
        return Object.assign(state, { removed: !host.isConnected });
    }, HELP_TABLE_HTML);

    expect(result.isCE).toBe(true);
    expect(result.contIsHost).toBe(true);
    expect(result.inRight).toBe(true);
    expect(result.beforeClear).toBe(true);
    expect(result.clearLast).toBe(true);
    expect(result.triggerText).toBe('??');
    expect(result.triggerLabel).toBe('Help');
    expect(result.instructionsHtml).toContain(
        'hello &lt;b&gt;world&lt;/b&gt;');
    expect(result.instructionsText).toContain('hello <b>world</b>');
    expect(result.hasBold).toBe(false);
    expect(result.footer).toBe(true);
    expect(result.footerClose).toBe(false);
    expect(result.closeText).toBe('Close');
    expect(result.legacy).toBe(false);
    expect(result.removed).toBe(true);
});

test('help bridge maps btn_html and instructions html onto the slots',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: HELP_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountHelp('ce-help-markup', {
                help_instructions: {
                    btn_html: '<a class="customHelp" href="#">?</a>',
                    label: 'Custom help',
                    html: '<p class="customInstr"><b>Operators</b>' +
                        '<a class="close" href="#">Close</a></p>'
                }
            }, html);
            const host = window.helpHost(tf);
            const trigger = window.helpAssigned(host, 'trigger')[0];
            const instructions = window.helpAssigned(host, 'instructions')[0];
            const dialog = window.helpPart(host, 'dialog');
            const elementTrigger = window.helpPart(host, 'trigger');

            const state = {
                triggerClass: trigger.className,
                triggerText: trigger.textContent,
                triggerLabel: trigger.getAttribute('aria-label'),
                elementTriggerHidden: elementTrigger.hidden,
                instructionsClass:
                    instructions.querySelector('.customInstr').className,
                hasBold: Boolean(instructions.querySelector('b')),
                hasClose: Boolean(instructions.querySelector('a.close'))
            };

            trigger.click();
            const opened = dialog.open;
            instructions.querySelector('a.close').click();
            const closed = dialog.open;

            tf.feature('help').toggle();
            const toggledOpen = dialog.open;
            tf.feature('help').toggle();
            const toggledClosed = dialog.open;

            tf.destroy();
            return Object.assign(state, {
                opened, closed, toggledOpen, toggledClosed
            });
        }, HELP_TABLE_HTML);

        expect(result.triggerClass).toBe('customHelp');
        expect(result.triggerText).toBe('?');
        expect(result.triggerLabel).toBe('Custom help');
        expect(result.elementTriggerHidden).toBe(true);
        expect(result.instructionsClass).toBe('customInstr');
        expect(result.hasBold).toBe(true);
        expect(result.hasClose).toBe(true);
        expect(result.opened).toBe(true);
        expect(result.closed).toBe(false);
        expect(result.toggledOpen).toBe(true);
        expect(result.toggledClosed).toBe(false);
    });

test('help bridge maps a multi-node btn_html onto the trigger slot',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: HELP_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountHelp('ce-help-multi', {
                help_instructions: {
                    btn_html: '<b class="q">?</b> and <i class="i">help</i>'
                }
            }, html);
            const host = window.helpHost(tf);
            const trigger = window.helpAssigned(host, 'trigger');
            const elementTrigger = window.helpPart(host, 'trigger');
            const state = {
                count: trigger.length,
                tags: trigger.map((node) => node.nodeName),
                wrapped: trigger.every((node) => node.nodeName === 'BUTTON'),
                text: trigger.map((node) => node.textContent),
                hidden: elementTrigger.hidden,
                triggerText:
                    window.helpPart(host, 'trigger-text').textContent
            };
            host.querySelector('.i').click();
            state.opened = host.hasAttribute('open');
            tf.destroy();
            return state;
        }, HELP_TABLE_HTML);

        expect(result.count).toBe(1);
        expect(result.tags).toEqual(['BUTTON']);
        expect(result.wrapped).toBe(true);
        expect(result.text).toEqual(['? and help']);
        expect(result.hidden).toBe(true);
        expect(result.triggerText).toBe('?');
        expect(result.opened).toBe(true);
    });

test('help bridge labels the nested focusable trigger inside btn_html',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: HELP_MOUNT });

        const authored = await page.evaluate(async (html) => {
            const tf = await window.mountHelp('ce-help-label-nested', {
                help_instructions: {
                    label: 'Configured label',
                    btn_html: '<span><button aria-label="Authored label">' +
                        '?</button></span>'
                }
            }, html);
            const host = window.helpHost(tf);
            const trigger = window.helpAssigned(host, 'trigger')[0];
            const button = trigger.querySelector('button');
            const state = {
                wrapperAriaLabel: trigger.getAttribute('aria-label'),
                buttonAriaLabel: button.getAttribute('aria-label')
            };
            tf.destroy();
            return state;
        }, HELP_TABLE_HTML);

        expect(authored.wrapperAriaLabel).toBeNull();
        expect(authored.buttonAriaLabel).toBe('Authored label');

        const wrapped = await page.evaluate(async (html) => {
            const tf = await window.mountHelp('ce-help-label-nested2', {
                help_instructions: {
                    label: 'Configured label',
                    btn_html: '<span><button>?</button></span>'
                }
            }, html);
            const host = window.helpHost(tf);
            const trigger = window.helpAssigned(host, 'trigger')[0];
            const button = trigger.querySelector('button');
            const state = {
                wrapperAriaLabel: trigger.getAttribute('aria-label'),
                buttonAriaLabel: button.getAttribute('aria-label')
            };
            tf.destroy();
            return state;
        }, HELP_TABLE_HTML);

        expect(wrapped.wrapperAriaLabel).toBeNull();
        expect(wrapped.buttonAriaLabel).toBe('Configured label');
    });

test('help bridge labels an outer focusable trigger before its nested ' +
    'control', async ({ page }) => {
    await page.goto(FIXTURE);
    await page.addScriptTag({ content: HELP_MOUNT });

    const result = await page.evaluate(async (html) => {
        const tf = await window.mountHelp('ce-help-label-outer', {
            help_instructions: {
                label: 'Outer label',
                btn_html: '<a href="#"><span tabindex="0">?</span></a>'
            }
        }, html);
        const host = window.helpHost(tf);
        const trigger = window.helpAssigned(host, 'trigger')[0];
        const nested = trigger.querySelector('span');
        const state = {
            tag: trigger.nodeName,
            outerLabel: trigger.getAttribute('aria-label'),
            nestedLabel: nested.getAttribute('aria-label')
        };
        tf.destroy();
        return state;
    }, HELP_TABLE_HTML);

    expect(result.tag).toBe('A');
    expect(result.outerLabel).toBe('Outer label');
    expect(result.nestedLabel).toBeNull();
});

test('help bridge falls back to its own trigger when btn_html ' +
    'sanitises to nothing', async ({ page }) => {
    await page.goto(FIXTURE);
    await page.addScriptTag({ content: HELP_MOUNT });

    const result = await page.evaluate(async (html) => {
        const tf = await window.mountHelp('ce-help-empty-btn', {
            help_instructions: {
                btn_html: '<script>window.__helpEmpty = true</script>'
            }
        }, html);
        const host = window.helpHost(tf);
        const triggerPart = window.helpPart(host, 'trigger');
        const state = {
            triggered: window.__helpEmpty,
            assignedTrigger: window.helpAssigned(host, 'trigger').length,
            hasElementTrigger: !!triggerPart,
            elementTriggerVisible: !triggerPart.hidden,
            triggerText: host.getAttribute('trigger-text')
        };
        tf.destroy();
        return state;
    }, HELP_TABLE_HTML);

    expect(result.triggered).toBeUndefined();
    expect(result.assignedTrigger).toBe(0);
    expect(result.hasElementTrigger).toBe(true);
    expect(result.elementTriggerVisible).toBe(true);
    expect(result.triggerText).toBe('?');
});

test('help bridge maps btn_html with a bare text node onto the slot',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: HELP_MOUNT });

        const base = await page.evaluate(async (html) => {
            const tf = await window.mountHelp('ce-help-text-kb', {
                help_instructions: {
                    btn_html: 'Help me'
                }
            }, html);
            const host = window.helpHost(tf);
            const trigger = window.helpAssigned(host, 'trigger');
            const button = trigger[0];
            button.focus();
            return {
                count: trigger.length,
                tag: button.nodeName,
                type: button.getAttribute('type'),
                text: trigger.map((node) => node.textContent),
                hidden: window.helpPart(host, 'trigger').hidden,
                focused: document.activeElement === button
            };
        }, HELP_TABLE_HTML);

        expect(base.count).toBe(1);
        expect(base.tag).toBe('BUTTON');
        expect(base.type).toBe('button');
        expect(base.text).toEqual(['Help me']);
        expect(base.hidden).toBe(true);
        expect(base.focused).toBe(true);

        const openState = () => page.evaluate(() =>
            document.querySelector('tf-help').hasAttribute('open'));

        await page.keyboard.press('Enter');
        expect(await openState()).toBe(true);
        await page.keyboard.press('Escape');
        await page.waitForFunction(() =>
            !document.querySelector('tf-help').hasAttribute('open'));

        await page.evaluate(() => {
            document.querySelector('tf-help [slot=trigger]').focus();
        });
        await page.keyboard.press('Space');
        expect(await openState()).toBe(true);

        await page.evaluate(() => {
            document.querySelector('tf-help').remove();
        });
    });

test('help bridge keeps focusable btn_html markup unwrapped',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: HELP_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountHelp('ce-help-anchor', {
                help_instructions: {
                    btn_html: '<a class="customHelp" href="#">?</a>'
                }
            }, html);
            const host = window.helpHost(tf);
            const trigger = window.helpAssigned(host, 'trigger');
            const state = {
                count: trigger.length,
                tag: trigger[0].nodeName,
                href: trigger[0].getAttribute('href'),
                hidden: window.helpPart(host, 'trigger').hidden
            };
            trigger[0].click();
            state.opened = host.hasAttribute('open');
            tf.destroy();
            return state;
        }, HELP_TABLE_HTML);

        expect(result.count).toBe(1);
        expect(result.tag).toBe('A');
        expect(result.href).toBe('#');
        expect(result.hidden).toBe(true);
        expect(result.opened).toBe(true);
    });

test('help bridge sanitises config markup', async ({ page }) => {
    await page.goto(FIXTURE);
    await page.addScriptTag({ content: HELP_MOUNT });

    const result = await page.evaluate(async (html) => {
        const tf = await window.mountHelp('ce-help-sanitise', {
            help_instructions: {
                btn_html: '<span class="customHelp" ' +
                    'onclick="window.__helpXss = 3">?</span>',
                html: '<p id="help-ok">Operators</p>' +
                    '<script>window.__helpXss = 1<\/script>' +
                    '<img src="x" onerror="window.__helpXss = 2">'
            }
        }, html);
        const host = window.helpHost(tf);
        const instructions = window.helpAssigned(host, 'instructions')[0];
        const trigger = window.helpAssigned(host, 'trigger')[0];

        const state = {
            xss: window.__helpXss,
            scripts: instructions.querySelectorAll('script').length,
            onerror: instructions.querySelectorAll('[onerror]').length,
            onclick: trigger.querySelectorAll('[onclick]').length,
            instruction: Boolean(instructions.querySelector('#help-ok')),
            triggerClass: trigger.querySelector('.customHelp').className,
            triggerText: trigger.textContent
        };

        tf.destroy();
        return state;
    }, HELP_TABLE_HTML);

    expect(result.xss).toBeUndefined();
    expect(result.scripts).toBe(0);
    expect(result.onerror).toBe(0);
    expect(result.onclick).toBe(0);
    expect(result.instruction).toBe(true);
    expect(result.triggerClass).toBe('customHelp');
    expect(result.triggerText).toBe('?');
});

test('help bridge keeps custom containers and scroll adjustment on the ' +
    'legacy path', async ({ page }) => {
    await page.goto(FIXTURE);
    await page.addScriptTag({ content: HELP_MOUNT });

    const result = await page.evaluate(async (html) => {
        const variants = [
            { target_id: 'help-target' },
            { container_target_id: 'help-cont' },
            { container_adjust_left_position: 30 },
            { container_adjust_left_position: 0 }
        ];
        const targets = { 'help-target': 'div', 'help-cont': 'div' };
        for (const id of Object.keys(targets)) {
            const el = document.createElement(targets[id]);
            el.id = id;
            document.body.appendChild(el);
        }

        const state = [];
        for (let i = 0; i < variants.length; i++) {
            const tf = await window.mountHelp(`ce-help-legacy-${i}`, {
                btn_reset: true,
                help_instructions: variants[i]
            }, html);
            const help = tf.feature('help');
            state.push({
                tag: help.btn ? help.btn.nodeName : null,
                element: Boolean(help.btn && help.btn.nodeName === 'TF-HELP'),
                anchor: Boolean(help.btn && help.btn.querySelector(
                    '.' + help.btnCssClass)),
                parentId: help.btn && help.btn.parentNode ?
                    help.btn.parentNode.id : null,
                contParentId: help.cont && help.cont.parentNode ?
                    help.cont.parentNode.id : null,
                contClass: help.cont ? help.cont.className : null,
                contIsBtn: help.cont === help.btn,
                contAdjustLeftPosition: help.contAdjustLeftPosition,
                hasContAdjustLeftPosition: help.hasContAdjustLeftPosition
            });
            tf.destroy();
        }
        return state;
    }, HELP_TABLE_HTML);

    for (const entry of result) {
        expect(entry.tag).toBe('SPAN');
        expect(entry.element).toBe(false);
        expect(entry.anchor).toBe(true);
        expect(entry.contIsBtn).toBe(false);
    }
    expect(result[0].parentId).toBe('help-target');
    expect(result[1].contParentId).toBe('help-cont');
    expect(result[1].contClass).toBe('helpCont');
    expect(result[0].contAdjustLeftPosition).toBe(25);
    expect(result[0].hasContAdjustLeftPosition).toBe(false);
    expect(result[1].contAdjustLeftPosition).toBe(25);
    expect(result[1].hasContAdjustLeftPosition).toBe(false);
    expect(result[2].contAdjustLeftPosition).toBe(30);
    expect(result[2].hasContAdjustLeftPosition).toBe(true);
    expect(result[3].contAdjustLeftPosition).toBe(0);
    expect(result[3].hasContAdjustLeftPosition).toBe(true);
});

test('help bridge treats an explicit null adjust position as unset',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: HELP_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountHelp('ce-help-null-adjust', {
                help_instructions: {
                    container_adjust_left_position: null
                }
            }, html);
            const host = window.helpHost(tf);
            const state = {
                isCE: host.nodeName === 'TF-HELP',
                legacy: !document.querySelector('tf-help')
            };
            tf.destroy();
            return state;
        }, HELP_TABLE_HTML);

        expect(result.isCE).toBe(true);
        expect(result.legacy).toBe(false);
    });

test('help bridge reflects disable()/enable() on the <tf-help> host',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: HELP_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountHelp('ce-help-disable', {}, html);
            const help = tf.feature('help');
            const host = window.helpHost(tf);
            const trigger = window.helpPart(host, 'trigger');
            const state = {};

            state.initial = {
                hostDisabled: host.hasAttribute('disabled'),
                triggerDisabled: trigger.hasAttribute('disabled'),
                enabled: help.isEnabled()
            };

            help.toggle();
            state.toggleOpened = host.hasAttribute('open');
            help.toggle();
            state.toggleClosed = !host.hasAttribute('open');

            help.disable();
            state.disabled = {
                hostDisabled: host.hasAttribute('disabled'),
                triggerDisabled: trigger.hasAttribute('disabled'),
                enabled: help.isEnabled()
            };
            trigger.click();
            help.toggle();
            state.openWhileDisabled = host.hasAttribute('open');

            help.enable();
            state.enabled = {
                hostDisabled: host.hasAttribute('disabled'),
                triggerDisabled: trigger.hasAttribute('disabled'),
                enabled: help.isEnabled()
            };
            trigger.click();
            state.openAfterEnable = host.hasAttribute('open');

            tf.destroy();
            return state;
        }, HELP_TABLE_HTML);

        expect(result.initial).toEqual({
            hostDisabled: false,
            triggerDisabled: false,
            enabled: true
        });
        expect(result.toggleOpened).toBe(true);
        expect(result.toggleClosed).toBe(true);
        expect(result.disabled).toEqual({
            hostDisabled: true,
            triggerDisabled: true,
            enabled: false
        });
        expect(result.openWhileDisabled).toBe(false);
        expect(result.enabled).toEqual({
            hostDisabled: false,
            triggerDisabled: false,
            enabled: true
        });
        expect(result.openAfterEnable).toBe(true);
    });

test('help bridge blocks a wrapped slotted trigger while disabled',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: HELP_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountHelp('ce-help-disable-slot', {
                help_instructions: {
                    btn_html: 'Help me'
                }
            }, html);
            const help = tf.feature('help');
            const host = window.helpHost(tf);
            const wrapped = window.helpAssigned(host, 'trigger')[0];
            const state = {};

            state.wrappedTag = wrapped.nodeName;
            state.wrappedType = wrapped.getAttribute('type');
            state.initialDisabled = host.hasAttribute('disabled');

            help.disable();
            state.disabledAttribute = host.hasAttribute('disabled');
            wrapped.click();
            state.openWhileDisabled = host.hasAttribute('open');

            help.enable();
            state.enabledAttribute = host.hasAttribute('disabled');
            wrapped.click();
            state.openAfterEnable = host.hasAttribute('open');

            tf.destroy();
            return state;
        }, HELP_TABLE_HTML);

        expect(result.wrappedTag).toBe('BUTTON');
        expect(result.wrappedType).toBe('button');
        expect(result.initialDisabled).toBe(false);
        expect(result.disabledAttribute).toBe(true);
        expect(result.openWhileDisabled).toBe(false);
        expect(result.enabledAttribute).toBe(false);
        expect(result.openAfterEnable).toBe(true);
    });

test('help bridge falls back to the legacy markup without the element',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate((html) => {
            const table = document.createElement('table');
            table.id = 'ce-help-no-element';
            table.innerHTML = html;
            document.body.appendChild(table);

            const tf = new TableFilter('ce-help-no-element', {
                base_path: '/dist/tablefilter/',
                help_instructions: true
            });
            tf.init();

            const help = tf.feature('help');
            const close = Array.from(help.cont.querySelectorAll('a'))
                .find((a) => a.textContent.trim() === 'Close');
            const state = {
                registered: Boolean(customElements.get('tf-help')),
                tag: help.btn.nodeName,
                anchor: help.btn.querySelector(
                    '.' + help.btnCssClass) !== null,
                contTag: help.cont.nodeName,
                contClass: help.cont.className,
                instructions:
                    help.cont.textContent.includes('Use the filters'),
                footer: help.cont.textContent.includes('TableFilter v') &&
                    help.cont.textContent.includes('www.tablefilter.com'),
                close: Boolean(close),
                closeHref: close.getAttribute('href'),
                closeCursor: window.getComputedStyle(close).cursor
            };

            tf.destroy();
            return state;
        }, HELP_TABLE_HTML);

        expect(result.registered).toBe(false);
        expect(result.tag).toBe('SPAN');
        expect(result.anchor).toBe(true);
        expect(result.contTag).toBe('DIV');
        expect(result.contClass).toBe('helpCont');
        expect(result.instructions).toBe(true);
        expect(result.footer).toBe(true);
        expect(result.close).toBe(true);
        expect(result.closeHref).toBe('javascript:void(0);');
        expect(result.closeCursor).toBe('pointer');
    });

test('help bridge falls back to the legacy trigger when btn_html ' +
    'sanitises to nothing', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate((html) => {
        const table = document.createElement('table');
        table.id = 'ce-help-legacy-empty';
        table.innerHTML = html;
        document.body.appendChild(table);

        const tf = new TableFilter('ce-help-legacy-empty', {
            base_path: '/dist/tablefilter/',
            help_instructions: {
                btn_html: '<script>window.__helpLegacyEmpty = true</script>'
            }
        });
        tf.init();

        const help = tf.feature('help');
        const anchor = help.btn.querySelector('.' + help.btnCssClass);
        const state = {
            xss: window.__helpLegacyEmpty,
            tag: help.btn.nodeName,
            anchor: Boolean(anchor),
            text: anchor ? anchor.textContent : null,
            contTag: help.cont.nodeName
        };
        anchor.click();
        state.opened = help.cont.style.display === 'inline';
        tf.destroy();
        return state;
    }, HELP_TABLE_HTML);

    expect(result.xss).toBeUndefined();
    expect(result.tag).toBe('SPAN');
    expect(result.anchor).toBe(true);
    expect(result.text).toBe('?');
    expect(result.contTag).toBe('DIV');
    expect(result.opened).toBe(true);
});

test('help bridge applies label to the legacy trigger',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate((html) => {
            const table = document.createElement('table');
            table.id = 'ce-help-legacy-label';
            table.innerHTML = html;
            document.body.appendChild(table);

            const tf = new TableFilter('ce-help-legacy-label', {
                base_path: '/dist/tablefilter/',
                help_instructions: {
                    label: 'Legacy help'
                }
            });
            tf.init();

            const help = tf.feature('help');
            const anchor = help.btn.querySelector('.' + help.btnCssClass);
            const state = {
                label: anchor.getAttribute('aria-label')
            };
            tf.destroy();
            return state;
        }, HELP_TABLE_HTML);

        expect(result.label).toBe('Legacy help');
    });

test('help bridge sanitises and escapes markup on the legacy path',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate((html) => {
            const mount = (id, config) => {
                const table = document.createElement('table');
                table.id = id;
                table.innerHTML = html;
                document.body.appendChild(table);
                const tf = new TableFilter(id, Object.assign({
                    base_path: '/dist/tablefilter/'
                }, config));
                tf.init();
                return tf;
            };

            const textTf = mount('ce-help-legacy-text', {
                help_instructions: { text: '5 < 6 <b>bold?</b>' }
            });
            const textHelp = textTf.feature('help');
            const textState = {
                hasBold: Boolean(textHelp.cont.querySelector('b')),
                escaped: textHelp.cont.innerHTML.includes('5 &lt; 6'),
                content: textHelp.cont.textContent.includes('5 < 6')
            };
            textTf.destroy();

            const htmlTf = mount('ce-help-legacy-html', {
                help_instructions: {
                    btn_html: '<span class="legacyTrigger" ' +
                        'onclick="window.__legacyXss = 1">?</span>',
                    html: '<p id="legacy-ok">Operators</p>' +
                        '<script>window.__legacyXss = 2<\/script>' +
                        '<img src="x" onerror="window.__legacyXss = 3">' +
                        '<a id="legacy-close" class="close" ' +
                        'href="javascript:window.__legacyXss = 4">x</a>'
                }
            });
            const htmlHelp = htmlTf.feature('help');
            const htmlState = {
                btnTag: htmlHelp.btn.firstChild.nodeName,
                btnClass: htmlHelp.btn.firstChild.className,
                onclick: htmlHelp.btn.querySelectorAll('[onclick]').length,
                instruction:
                    Boolean(htmlHelp.cont.querySelector('#legacy-ok')),
                scripts: htmlHelp.cont.querySelectorAll('script').length,
                onerror: htmlHelp.cont.querySelectorAll('[onerror]').length,
                closeHref: htmlHelp.cont
                    .querySelector('#legacy-close').getAttribute('href'),
                closeClass: htmlHelp.cont
                    .querySelector('#legacy-close').className,
                footerCloseHref: Array.from(
                    htmlHelp.cont.querySelectorAll('a'))
                    .find((a) => a.textContent.trim() === 'Close')
                    .getAttribute('href')
            };
            const xss = window.__legacyXss;
            htmlTf.destroy();

            return { textState, htmlState, xss };
        }, HELP_TABLE_HTML);

        expect(result.textState.hasBold).toBe(false);
        expect(result.textState.escaped).toBe(true);
        expect(result.textState.content).toBe(true);
        expect(result.xss).toBeUndefined();
        expect(result.htmlState.btnTag).toBe('SPAN');
        expect(result.htmlState.btnClass).toBe('legacyTrigger');
        expect(result.htmlState.onclick).toBe(0);
        expect(result.htmlState.instruction).toBe(true);
        expect(result.htmlState.scripts).toBe(0);
        expect(result.htmlState.onerror).toBe(0);
        expect(result.htmlState.closeHref).toBe(null);
        expect(result.htmlState.closeClass).toBe('close');
        expect(result.htmlState.footerCloseHref).toBe(
            'javascript:void(0);');
    });


test('help bridge does not mount when help_instructions is false',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: HELP_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountHelp('ce-help-off', {
                help_instructions: false
            }, html);
            const help = tf.feature('help');
            const state = {
                initialized: help.initialized,
                btn: help.btn,
                element: Boolean(document.querySelector('tf-help'))
            };
            tf.destroy();
            return state;
        }, HELP_TABLE_HTML);

        expect(result.initialized).toBe(false);
        expect(result.btn).toBe(null);
        expect(result.element).toBe(false);
    });

test('help bridge projects the default instructions and footer',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: HELP_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountHelp('ce-help-default', {
                help_instructions: true
            }, html);
            const host = window.helpHost(tf);
            const instructions = window.helpAssigned(host, 'instructions')[0];
            const dialog = window.helpPart(host, 'dialog');
            const state = {
                triggerText:
                    window.helpPart(host, 'trigger-text').textContent,
                instructions: instructions.textContent,
                hasOperators: Boolean(instructions.querySelector('b')),
                footer: instructions.textContent.includes('TableFilter v') &&
                    instructions.textContent.includes('www.tablefilter.com'),
                footerClose: Array.from(instructions.querySelectorAll('a'))
                    .some((a) => a.textContent.trim() === 'Close'),
                closeText: window.helpPart(host, 'close-text').textContent
            };

            window.helpPart(host, 'trigger').click();
            state.open = dialog.open;
            state.modal = dialog.matches(':modal');
            window.helpPart(host, 'close').click();
            state.closedByElement = dialog.open;
            tf.destroy();
            return state;
        }, HELP_TABLE_HTML);

        expect(result.triggerText).toBe('?');
        expect(result.instructions).toContain('Use the filters above each ' +
            'column');
        expect(result.instructions).toContain('rgx:');
        expect(result.hasOperators).toBe(true);
        expect(result.footer).toBe(true);
        expect(result.footerClose).toBe(false);
        expect(result.closeText).toBe('Close');
        expect(result.open).toBe(true);
        expect(result.modal).toBe(true);
        expect(result.closedByElement).toBe(false);
    });

test('help bridge mounts by default and leaves the trigger unnamed',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: HELP_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountHelp('ce-help-enabled', {}, html);
            const help = tf.feature('help');
            const toolbar = tf.feature('toolbar');
            const host = window.helpHost(tf);
            const trigger = window.helpPart(host, 'trigger');
            const instructions =
                window.helpAssigned(host, 'instructions')[0];
            const state = {
                initialized: help.initialized,
                isCE: host.nodeName === 'TF-HELP',
                inRight: host.parentElement === toolbar.innerCont.right,
                triggerText: window.helpPart(host, 'trigger-text').textContent,
                triggerLabel: trigger.getAttribute('aria-label'),
                dialogLabelledby:
                    window.helpPart(host, 'dialog')
                        .getAttribute('aria-labelledby'),
                instructions:
                    instructions.textContent.includes('Use the filters above'),
                footer: instructions.textContent
                    .includes('TableFilter v' + tf.version),
                closeText: window.helpPart(host, 'close-text').textContent,
                legacy: !document.querySelector('tf-help')
            };

            tf.destroy();
            return Object.assign(state, { removed: !host.isConnected });
        }, HELP_TABLE_HTML);

        expect(result.initialized).toBe(true);
        expect(result.isCE).toBe(true);
        expect(result.inRight).toBe(true);
        expect(result.triggerText).toBe('?');
        expect(result.triggerLabel).toBe(null);
        expect(result.dialogLabelledby).toBe('trigger');
        expect(result.instructions).toBe(true);
        expect(result.footer).toBe(true);
        expect(result.closeText).toBe('Close');
        expect(result.legacy).toBe(false);
        expect(result.removed).toBe(true);
    });

test('help bridge honours toolbar_position and btn_text',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: HELP_MOUNT });

        const result = await page.evaluate(async (html) => {
            const positions = ['left', 'center', 'right'];
            const state = [];
            for (let i = 0; i < positions.length; i++) {
                const tf = await window.mountHelp(`ce-help-pos-${i}`, {
                    help_instructions: {
                        toolbar_position: positions[i],
                        btn_text: `Q${i}`
                    }
                }, html);
                const host = window.helpHost(tf);
                const toolbar = tf.feature('toolbar');
                state.push({
                    placed:
                        host.parentElement === toolbar.innerCont[positions[i]],
                    text: window.helpPart(host, 'trigger-text').textContent
                });
                tf.destroy();
            }
            return state;
        }, HELP_TABLE_HTML);

        expect(result).toEqual([
            { placed: true, text: 'Q0' },
            { placed: true, text: 'Q1' },
            { placed: true, text: 'Q2' }
        ]);
    });

test('help bridge treats empty text as unset and html over text',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: HELP_MOUNT });

        const result = await page.evaluate(async (html) => {
            const empty = await window.mountHelp('ce-help-empty-text', {
                help_instructions: { text: '' }
            }, html);
            const emptyInstructions = window.helpAssigned(
                window.helpHost(empty), 'instructions')[0];
            const emptyText = {
                defaultShown:
                    emptyInstructions.textContent.includes('Use the filters'),
                hasOperators: Boolean(emptyInstructions.querySelector('b'))
            };
            empty.destroy();

            const htmlWins = await window.mountHelp('ce-help-html-wins', {
                help_instructions: {
                    text: 'ignored legacy text',
                    html: '<p id="html-wins">HTML wins</p>'
                }
            }, html);
            const htmlInstructions = window.helpAssigned(
                window.helpHost(htmlWins), 'instructions')[0];
            const htmlText = {
                hasHtml: Boolean(htmlInstructions.querySelector('#html-wins')),
                ignoredText:
                    !htmlInstructions.textContent.includes('ignored legacy'),
                hasDefault: htmlInstructions.textContent
                    .includes('Use the filters')
            };
            htmlWins.destroy();

            return { emptyText, htmlText };
        }, HELP_TABLE_HTML);

        expect(result.emptyText).toEqual({
            defaultShown: true,
            hasOperators: true
        });
        expect(result.htmlText).toEqual({
            hasHtml: true,
            ignoredText: true,
            hasDefault: false
        });
    });

test('help bridge keeps custom css classes on the legacy path',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: HELP_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountHelp('ce-help-css', {
                help_instructions: {
                    btn_css_class: 'legacyHelpBtn',
                    container_css_class: 'legacyHelpCont'
                }
            }, html);
            const help = tf.feature('help');
            const state = {
                element: Boolean(document.querySelector('tf-help')),
                btnTag: help.btn ? help.btn.nodeName : null,
                btnClass: Boolean(help.btn &&
                    help.btn.querySelector('.legacyHelpBtn')),
                contTag: help.cont ? help.cont.nodeName : null,
                contClass: help.cont ? help.cont.className : null
            };
            tf.destroy();
            return state;
        }, HELP_TABLE_HTML);

        expect(result.element).toBe(false);
        expect(result.btnTag).toBe('SPAN');
        expect(result.btnClass).toBe(true);
        expect(result.contTag).toBe('DIV');
        expect(result.contClass).toBe('legacyHelpCont');
    });

test('help bridge treats the default css classes as unset',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: HELP_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountHelp('ce-help-css-default', {
                help_instructions: {
                    btn_css_class: 'helpBtn',
                    container_css_class: 'helpCont'
                }
            }, html);
            const host = window.helpHost(tf);
            const state = {
                isCE: host && host.nodeName === 'TF-HELP'
            };
            tf.destroy();
            return state;
        }, HELP_TABLE_HTML);

        expect(result.isCE).toBe(true);
    });

test('help bridge instances are independent and re-init mounts one',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: HELP_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tfA = await window.mountHelp('ce-help-instance-a', {
                help_instructions: { btn_text: 'A' }
            }, html);
            const hostA = window.helpHost(tfA);
            const tfB = await window.mountHelp('ce-help-instance-b', {
                help_instructions: { btn_text: 'B' }
            }, html);
            const hostB = window.helpHost(tfB);

            const initial = {
                distinct: hostA !== hostB,
                a: window.helpPart(hostA, 'trigger-text').textContent,
                b: window.helpPart(hostB, 'trigger-text').textContent
            };

            tfA.destroy();
            const removed = !hostA.isConnected;
            tfA.init();
            const remounted = window.helpHost(tfA);
            const remountedState = {
                newHost: remounted !== hostA,
                hosts: remounted.parentElement
                    .querySelectorAll('tf-help').length,
                text: window.helpPart(remounted, 'trigger-text').textContent,
                bUntouched: hostB.isConnected
            };

            tfA.destroy();
            tfB.destroy();
            return { initial, removed, remountedState };
        }, HELP_TABLE_HTML);

        expect(result.initial).toEqual({
            distinct: true,
            a: 'A',
            b: 'B'
        });
        expect(result.removed).toBe(true);
        expect(result.remountedState).toEqual({
            newHost: true,
            hosts: 1,
            text: 'A',
            bUntouched: true
        });
    });

test('help bridge keeps the paging results control before the trigger',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: HELP_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountHelp('ce-help-paging', {
                btn_reset: true,
                paging: {
                    length: 1,
                    results_per_page: ['Rows: ', [1, 2]]
                },
                help_instructions: true
            }, html);
            const host = window.helpHost(tf);
            const paging = tf.feature('paging');
            const toolbar = tf.feature('toolbar');
            const clear = tf.feature('clearButton').container;
            const state = {
                inRight: host.parentElement === toolbar.innerCont.right,
                selectBefore: paging.pageLengthSlc.nextSibling === host,
                beforeClear: host.nextElementSibling === clear,
                clearLast: toolbar.innerCont.right.lastElementChild === clear
            };
            tf.destroy();
            return state;
        }, HELP_TABLE_HTML);

        expect(result.inRight).toBe(true);
        expect(result.selectBefore).toBe(true);
        expect(result.beforeClear).toBe(true);
        expect(result.clearLast).toBe(true);
    });

test('help bridge keeps the results element before the trigger',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: HELP_MOUNT });

        const result = await page.evaluate(async (html) => {
            await import('/src/components/tf-results-per-page.js');

            const target = document.createElement('div');
            target.id = 'help-results-target';
            document.body.appendChild(target);

            const tf = await window.mountHelp('ce-help-results', {
                paging: {
                    length: 1,
                    results_per_page: ['Rows: ', [1, 2]],
                    results_per_page_target_id: target.id
                },
                help_instructions: true
            }, html);
            const host = window.helpHost(tf);
            const paging = tf.feature('paging');
            const results = paging.resultsPerPageEl;
            const state = {
                isCE: results.nodeName === 'TF-RESULTS-PER-PAGE',
                beforeHelp: results.nextElementSibling === host,
                sameParent: results.parentElement === host.parentElement,
                notInTarget: results.parentElement !== target
            };

            tf.destroy();
            target.remove();
            return state;
        }, HELP_TABLE_HTML);

        expect(result.isCE).toBe(true);
        expect(result.beforeHelp).toBe(true);
        expect(result.sameParent).toBe(true);
        expect(result.notInTarget).toBe(true);
    });

// Loader bridge (#917): the feature routes through <tf-loader> when the
// source registers it, mounting the host before the table (or into a
// configured `target_id`) and toggling visibility on the legacy
// before/after action events.
const LOADER_TABLE_HTML =
    '<tbody><tr><th>From</th></tr><tr><td>Sydney</td></tr></tbody>';

const LOADER_MOUNT = `
window.loaderPart = function (host, name) {
    return host.shadowRoot.querySelector('[part="' + name + '"]');
};
window.mountLoader = async function (id, config, html) {
    await import('/src/components/tf-loader.js');
    const table = document.createElement('table');
    table.id = id;
    table.innerHTML = html;
    document.body.appendChild(table);
    const tf = new TableFilter(id, Object.assign({
        base_path: '/dist/tablefilter/',
        rows_counter: true
    }, config));
    tf.init();
    return tf;
};
`;

test('loader bridge uses tf-loader with the legacy config',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: LOADER_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountLoader('ce-loader', {
                loader: true
            }, html);
            const loader = tf.feature('loader');
            const host = loader.cont;
            const partMessage = window.loaderPart(host, 'message');
            const mount = {
                isCE: host.nodeName === 'TF-LOADER',
                className: host.className,
                beforeTable: host.nextSibling ===
                    document.querySelector('#ce-loader'),
                message: partMessage.textContent,
                messageHidden: partMessage.hidden
            };

            // Legacy starts hidden after init (closeDelay applies).
            await new Promise((resolve) => setTimeout(resolve, 400));
            const hiddenAfterInit = host.style.display === 'none';

            loader.destroy();
            return Object.assign(mount, {
                hiddenAfterInit,
                removed: !host.isConnected
            });
        }, LOADER_TABLE_HTML);

        expect(result.isCE).toBe(true);
        expect(result.className).toBe('loader');
        expect(result.beforeTable).toBe(true);
        expect(result.message).toBe('Loading...');
        expect(result.messageHidden).toBe(false);
        expect(result.hiddenAfterInit).toBe(true);
        expect(result.removed).toBe(true);
    });

test('loader bridge maps the text config onto the message part',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: LOADER_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountLoader('ce-loader-text', {
                loader: { text: 'Fetching rows' }
            }, html);
            const host = tf.feature('loader').cont;
            const text = window.loaderPart(host, 'message').textContent;
            tf.feature('loader').destroy();
            return { text, attribute: host.getAttribute('text') };
        }, LOADER_TABLE_HTML);

        expect(result.text).toBe('Fetching rows');
        expect(result.attribute).toBe('Fetching rows');
    });

test('loader bridge projects sanitised html through the slot',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: LOADER_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountLoader('ce-loader-html', {
                loader: {
                    html: '<b id="dogfood">Dogfood</b>' +
                        '<img src=x onerror="window.__xss=1">' +
                        '<script>window.__xss=1<\/script>'
                }
            }, html);
            const host = tf.feature('loader').cont;
            const state = {
                slotted: Boolean(host.querySelector('#dogfood')),
                xss: window.__xss === 1,
                messageHidden: window.loaderPart(host, 'message').hidden
            };
            tf.feature('loader').destroy();
            return state;
        }, LOADER_TABLE_HTML);

        expect(result.slotted).toBe(true);
        expect(result.xss).toBe(false);
        expect(result.messageHidden).toBe(true);
    });

test('loader bridge forces the legacy path on a custom css_class',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: LOADER_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountLoader('ce-loader-class', {
                loader: { css_class: 'myLoader' }
            }, html);
            const loader = tf.feature('loader');
            const host = loader.cont;
            const state = {
                tag: host.nodeName,
                className: host.className,
                elementHosts: document.querySelectorAll('tf-loader').length
            };
            loader.destroy();
            return Object.assign(state, { removed: !host.isConnected });
        }, LOADER_TABLE_HTML);

        expect(result.tag).toBe('DIV');
        expect(result.className).toBe('myLoader');
        expect(result.elementHosts).toBe(0);
        expect(result.removed).toBe(true);
    });

test('loader bridge keeps loader off without a config',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: LOADER_MOUNT });

        const result = await page.evaluate(async (html) => {
            const configs = [
                { themes: [{ name: 'default' }], loader: false },
                { themes: [{ name: 'default' }] },
                { enable_default_theme: true },
                { enable_default_theme: true, loader: false },
                { loader: false },
                {}
            ];
            const mounts = [];
            for (let i = 0; i < configs.length; i++) {
                const tf = await window.mountLoader('ce-loader-off-' + i,
                    configs[i], html);
                mounts.push({
                    feature: Boolean(tf.feature('loader')),
                    hosts: document.querySelectorAll('tf-loader').length
                });
                tf.destroy();
            }
            return mounts;
        }, LOADER_TABLE_HTML);

        expect(result).toEqual([
            { feature: false, hosts: 0 },
            { feature: false, hosts: 0 },
            { feature: false, hosts: 0 },
            { feature: false, hosts: 0 },
            { feature: false, hosts: 0 },
            { feature: false, hosts: 0 }
        ]);
    });

test('loader bridge mounts with themes and a configured loader',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: LOADER_MOUNT });

        const result = await page.evaluate(async (html) => {
            const configs = [
                { themes: [{ name: 'default' }], loader: true },
                { themes: [{ name: 'default' }], loader: { text: 'Hi' } },
                { enable_default_theme: true, loader: true }
            ];
            const mounts = [];
            for (let i = 0; i < configs.length; i++) {
                const tf = await window.mountLoader(
                    'ce-loader-themes-' + i, configs[i], html);
                const feature = tf.feature('loader');
                const host = feature && feature.cont;
                mounts.push({
                    isCE: Boolean(host) && host.nodeName === 'TF-LOADER',
                    className: host && host.className,
                    connected: Boolean(host) && host.isConnected
                });
                tf.destroy();
            }
            return mounts;
        }, LOADER_TABLE_HTML);

        expect(result).toEqual([
            { isCE: true, className: 'loader', connected: true },
            { isCE: true, className: 'loader', connected: true },
            { isCE: true, className: 'loader', connected: true }
        ]);
    });

test('loader bridge tf.destroy() removes the host',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: LOADER_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountLoader('ce-loader-tfdestroy', {
                loader: true
            }, html);
            const host = tf.feature('loader').cont;
            tf.destroy();
            return {
                connected: host.isConnected,
                hosts: document.querySelectorAll('tf-loader').length
            };
        }, LOADER_TABLE_HTML);

        expect(result.connected).toBe(false);
        expect(result.hosts).toBe(0);
    });

test('loader bridge appends the legacy div into a resolving target_id',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: LOADER_MOUNT });

        const result = await page.evaluate(async (html) => {
            const box = document.createElement('div');
            box.id = 'legacyLoaderBox';
            document.body.appendChild(box);
            const tf = await window.mountLoader('ce-loader-legacy-target', {
                loader: { target_id: 'legacyLoaderBox',
                    css_class: 'myLoader' }
            }, html);
            const host = tf.feature('loader').cont;
            const state = {
                tag: host.nodeName,
                className: host.className,
                inBox: host.parentNode === box,
                elementHosts: document.querySelectorAll('tf-loader').length
            };
            tf.feature('loader').destroy();
            return Object.assign(state, { removed: !host.isConnected });
        }, LOADER_TABLE_HTML);

        expect(result.tag).toBe('DIV');
        expect(result.className).toBe('myLoader');
        expect(result.inBox).toBe(true);
        expect(result.elementHosts).toBe(0);
        expect(result.removed).toBe(true);
    });

test('loader bridge clears the text fallback when html is configured',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: LOADER_MOUNT });

        const result = await page.evaluate(async (html) => {
            const configs = [
                { text: 'Loading...', html: '   ' },
                {
                    text: 'Loading...',
                    html: '<script>window.__xss=1<\/script>'
                },
                { text: 'Loading...', html: '<!-- only a comment -->' }
            ];
            const ce = [];
            for (let i = 0; i < configs.length; i++) {
                const tf = await window.mountLoader(
                    'ce-loader-empty-html-' + i, { loader: configs[i] }, html);
                const host = tf.feature('loader').cont;
                const message = window.loaderPart(host, 'message');
                ce.push({
                    tag: host.nodeName,
                    message: message.textContent,
                    elements: host.children.length
                });
                tf.destroy();
            }

            const tf = await window.mountLoader('ce-loader-empty-html-legacy', {
                loader: {
                    text: 'Loading...',
                    html: '   ',
                    css_class: 'myLoader'
                }
            }, html);
            const cont = tf.feature('loader').cont;
            const legacy = { tag: cont.nodeName, text: cont.textContent };
            tf.destroy();

            return { ce, legacy };
        }, LOADER_TABLE_HTML);

        expect(result.ce).toEqual([
            { tag: 'TF-LOADER', message: '', elements: 0 },
            { tag: 'TF-LOADER', message: '', elements: 0 },
            { tag: 'TF-LOADER', message: '', elements: 0 }
        ]);
        expect(result.legacy).toEqual({ tag: 'DIV', text: '   ' });
    });

test('loader bridge falls back when the registered tf-loader lacks setText',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: LOADER_MOUNT });

        const result = await page.evaluate(async (html) => {
            class Foreign extends HTMLElement {}
            customElements.define('tf-loader', Foreign);

            let error = null;
            let state = null;
            try {
                const tf = await window.mountLoader('ce-loader-foreign', {
                    loader: true
                }, html);
                const loader = tf.feature('loader');
                state = {
                    tag: loader.cont.nodeName,
                    className: loader.cont.className,
                    text: loader.cont.textContent
                };
                loader.destroy();
            } catch (err) {
                error = err && err.message;
            }
            return { error, state };
        }, LOADER_TABLE_HTML);

        expect(result.error).toBeNull();
        expect(result.state).toEqual({
            tag: 'DIV',
            className: 'loader',
            text: 'Loading...'
        });
    });

test('loader bridge falls back to legacy without customElements',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: LOADER_MOUNT });

        const result = await page.evaluate(async (html) => {
            Object.defineProperty(window, 'customElements',
                { value: undefined, configurable: true });
            let state;
            try {
                const tf = await window.mountLoader('ce-loader-no-ce', {
                    loader: true
                }, html);
                const host = tf.feature('loader').cont;
                state = {
                    tag: host.nodeName,
                    className: host.className,
                    elementHosts:
                        document.querySelectorAll('tf-loader').length
                };
                tf.feature('loader').destroy();
            } finally {
                delete window.customElements;
            }
            return state;
        }, LOADER_TABLE_HTML);

        expect(result.tag).toBe('DIV');
        expect(result.className).toBe('loader');
        expect(result.elementHosts).toBe(0);
    });

test('loader bridge destroy() tolerates an externally detached host',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: LOADER_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountLoader('ce-loader-detached', {
                loader: true
            }, html);
            const loader = tf.feature('loader');
            loader.cont.remove();
            let error = null;
            try {
                tf.destroy();
            } catch (err) {
                error = err && err.message;
            }
            return { error, loaderCont: loader.cont };
        }, LOADER_TABLE_HTML);

        expect(result.error).toBeNull();
        expect(result.loaderCont).toBeNull();
    });

test('loader bridge mounts into a target_id container',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: LOADER_MOUNT });

        const result = await page.evaluate(async (html) => {
            const box = document.createElement('div');
            box.id = 'loaderBox';
            document.body.appendChild(box);
            const tf = await window.mountLoader('ce-loader-target', {
                loader: { target_id: 'loaderBox' }
            }, html);
            const host = tf.feature('loader').cont;
            const state = {
                isCE: host.nodeName === 'TF-LOADER',
                inBox: host.parentNode === box
            };
            tf.feature('loader').destroy();
            return state;
        }, LOADER_TABLE_HTML);

        expect(result.isCE).toBe(true);
        expect(result.inBox).toBe(true);
    });

test('loader bridge mounts before the table when target_id is missing',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: LOADER_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountLoader('ce-loader-missing', {
                loader: { target_id: 'missingBox' }
            }, html);
            const loader = tf.feature('loader');
            const host = loader.cont;
            const state = {
                tag: host.nodeName,
                className: host.className,
                elementHosts: document.querySelectorAll('tf-loader').length,
                beforeTable: host.nextSibling ===
                    document.querySelector('#ce-loader-missing')
            };
            loader.destroy();
            return Object.assign(state, { removed: !host.isConnected });
        }, LOADER_TABLE_HTML);

        expect(result.tag).toBe('DIV');
        expect(result.className).toBe('loader');
        expect(result.elementHosts).toBe(0);
        expect(result.beforeTable).toBe(true);
        expect(result.removed).toBe(true);
    });

test('loader bridge toggles visibility on the action events',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: LOADER_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountLoader('ce-loader-events', {
                loader: {
                    on_show_loader(instance) {
                        window.__onShow = (window.__onShow || 0) + 1;
                        window.__onShowInstance =
                            instance === tf.feature('loader');
                    },
                    on_hide_loader(instance) {
                        window.__onHide = (window.__onHide || 0) + 1;
                        window.__onHideInstance =
                            instance === tf.feature('loader');
                    }
                }
            }, html);
            const loader = tf.feature('loader');
            const host = loader.cont;

            tf.emitter.emit('before-filtering', tf);
            await new Promise((resolve) => setTimeout(resolve, 50));
            const shown = host.style.display === '';

            tf.emitter.emit('after-filtering', tf);
            await new Promise((resolve) => setTimeout(resolve, 400));
            const hidden = host.style.display === 'none';

            loader.destroy();
            return {
                shown,
                hidden,
                onShow: window.__onShow || 0,
                onHide: window.__onHide || 0,
                showInstance: window.__onShowInstance,
                hideInstance: window.__onHideInstance
            };
        }, LOADER_TABLE_HTML);

        expect(result.shown).toBe(true);
        expect(result.hidden).toBe(true);
        expect(result.onShow).toBe(1);
        expect(result.onHide).toBeGreaterThanOrEqual(1);
        expect(result.showInstance).toBe(true);
        expect(result.hideInstance).toBe(true);
    });

test('loader bridge destroy() unsubscribes the action events',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: LOADER_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountLoader('ce-loader-destroy', {
                loader: {
                    on_show_loader() { window.__onShow = 0; }
                }
            }, html);
            const loader = tf.feature('loader');
            loader.destroy();
            tf.emitter.emit('before-filtering', tf);
            await new Promise((resolve) => setTimeout(resolve, 50));
            return { onShow: window.__onShow };
        }, LOADER_TABLE_HTML);

        expect(result.onShow).toBeUndefined();
    });

test('loader bridge double-init is guarded and reset() re-inits',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: LOADER_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountLoader('ce-loader-reset', {
                loader: { text: 'Again' }
            }, html);
            const loader = tf.feature('loader');
            loader.init();
            const afterDoubleInit = document
                .querySelectorAll('tf-loader').length;

            loader.destroy();
            const afterDestroy = document
                .querySelectorAll('tf-loader').length;
            loader.reset();
            const host = loader.cont;
            const afterReset = {
                hosts: document.querySelectorAll('tf-loader').length,
                connected: Boolean(host) && host.isConnected,
                text: host ? window.loaderPart(host, 'message')
                    .textContent : null
            };
            loader.destroy();
            return { afterDoubleInit, afterDestroy, afterReset };
        }, LOADER_TABLE_HTML);

        expect(result.afterDoubleInit).toBe(1);
        expect(result.afterDestroy).toBe(0);
        expect(result.afterReset.hosts).toBe(1);
        expect(result.afterReset.connected).toBe(true);
        expect(result.afterReset.text).toBe('Again');
    });

test('loader bridge hosts the status bar target (pagination template)',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: LOADER_MOUNT });

        const result = await page.evaluate(async (html) => {
            const config = {
                loader: { html: '<div id="lblMsg"></div>' },
                status_bar: { target_id: 'lblMsg' }
            };
            const tf = await window.mountLoader('ce-loader-status',
                config, html);
            const host = tf.feature('loader').cont;
            tf.feature('statusBar').message('Sorting data...');
            await new Promise((resolve) => setTimeout(resolve, 50));
            const target = document.querySelector('#lblMsg');
            const state = {
                isCE: host.nodeName === 'TF-LOADER',
                targetInsideHost: Boolean(target) && host.contains(target),
                statusText: target ? target.textContent : null
            };
            tf.destroy();
            return state;
        }, LOADER_TABLE_HTML);

        expect(result.isCE).toBe(true);
        expect(result.targetInsideHost).toBe(true);
        expect(result.statusText).toContain('Sorting data...');
    });

test('loader bridge keeps the pagination template on the legacy path',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: LOADER_MOUNT });

        const result = await page.evaluate(async (html) => {
            const config = {
                loader: {
                    html: '<div id="lblMsg"></div>',
                    css_class: 'myLoader'
                },
                status_bar: { target_id: 'lblMsg' }
            };
            const tf = await window.mountLoader('ce-loader-status-legacy',
                config, html);
            const loader = tf.feature('loader');
            tf.feature('statusBar').message('Sorting data...');
            await new Promise((resolve) => setTimeout(resolve, 50));
            const target = document.querySelector('#lblMsg');
            const state = {
                tag: loader.cont.nodeName,
                className: loader.cont.className,
                statusText: target ? target.textContent : null
            };
            tf.destroy();
            return state;
        }, LOADER_TABLE_HTML);

        expect(result.tag).toBe('DIV');
        expect(result.className).toBe('myLoader');
        expect(result.statusText).toContain('Sorting data...');
    });
// NoResults bridge (#919): the feature routes through <tf-no-results> when
// the source registers it, projecting `content` through the default slot and
// keeping the legacy div (and its raw markup) on the fallback path.
const NORESULTS_TABLE_HTML = '<thead><tr><th>From</th></tr></thead>' +
    '<tbody><tr><td>Sydney</td></tr></tbody>';
const NORESULTS_EMPTY_TABLE_HTML =
    '<thead><tr><th>From</th></tr></thead><tbody></tbody>';

const NORESULTS_MOUNT = `
window.nrPart = function (host, name) {
    return host.shadowRoot.querySelector('[part="' + name + '"]');
};
window.mountNoResults = async function (id, config, html) {
    await import('/src/components/tf-no-results.js');
    const table = document.createElement('table');
    table.id = id;
    table.innerHTML = html;
    document.body.appendChild(table);
    const tf = new TableFilter(id, Object.assign({
        base_path: '/dist/tablefilter/',
        alternate_rows: true
    }, config));
    tf.init();
    return tf;
};
`;

test('no-results bridge uses tf-no-results with the legacy config',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: NORESULTS_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountNoResults('ce-nr', {
                no_results_message: true
            }, html);
            const feature = tf.feature('noResults');
            const host = feature.cont;
            const slot = window.nrPart(host, 'message-slot');
            const message = window.nrPart(host, 'message');
            const state = {
                isCE: host.nodeName === 'TF-NO-RESULTS',
                className: host.className,
                afterTable: host.previousSibling ===
                    document.querySelector('#ce-nr'),
                slotText: slot.assignedNodes({ flatten: true })
                    .map((node) => node.textContent || '').join(''),
                messageText: message.textContent,
                messageHidden: message.hidden,
                display: host.style.display,
                role: host.getAttribute('role'),
                live: host.getAttribute('aria-live'),
                atomic: host.getAttribute('aria-atomic'),
                legacyDivs: document.querySelectorAll('div.no-results').length
            };
            feature.destroy();
            return Object.assign(state, { removed: !host.isConnected });
        }, NORESULTS_TABLE_HTML);

        expect(result.isCE).toBe(true);
        expect(result.className).toBe('no-results');
        expect(result.afterTable).toBe(true);
        expect(result.slotText).toBe('No results');
        expect(result.messageText).toBe('');
        expect(result.messageHidden).toBe(true);
        expect(result.display).toBe('none');
        expect(result.role).toBe('status');
        expect(result.live).toBe('polite');
        expect(result.atomic).toBe('true');
        expect(result.legacyDivs).toBe(0);
        expect(result.removed).toBe(true);
    });

test('no-results bridge shows an initially empty table on init',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: NORESULTS_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountNoResults('ce-nr-empty', {
                no_results_message: true
            }, html);
            const host = tf.feature('noResults').cont;
            const state = {
                display: host.style.display,
                width: host.style.width,
                hasWidth: host.style.width.indexOf('px') !== -1
            };
            tf.destroy();
            return state;
        }, NORESULTS_EMPTY_TABLE_HTML);

        expect(result.display).toBe('block');
        expect(result.hasWidth).toBe(true);
    });

test('no-results bridge projects sanitised content through the slot',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: NORESULTS_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountNoResults('ce-nr-content', {
                no_results_message: {
                    content: '<b id="nr-dogfood">No match</b>' +
                        '<img src=x onerror="window.__nrXss=1">' +
                        '<script>window.__nrXss=1<\/script>'
                }
            }, html);
            const host = tf.feature('noResults').cont;
            const state = {
                slotted: Boolean(host.querySelector('#nr-dogfood')),
                text: host.textContent,
                xss: window.__nrXss === 1,
                scripts: host.querySelectorAll('script').length,
                handlers: host.querySelectorAll('[onerror]').length,
                messageHidden: window.nrPart(host, 'message').hidden,
                fallbackText: window.nrPart(host, 'message').textContent
            };
            tf.destroy();
            return state;
        }, NORESULTS_TABLE_HTML);

        expect(result.slotted).toBe(true);
        expect(result.text).toContain('No match');
        expect(result.xss).toBe(false);
        expect(result.scripts).toBe(0);
        expect(result.handlers).toBe(0);
        expect(result.messageHidden).toBe(true);
        expect(result.fallbackText).toBe('');
    });

test('no-results bridge keeps a sanitised-away message empty',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: NORESULTS_MOUNT });

        const result = await page.evaluate(async (html) => {
            const configs = [
                { content: '<!-- only a comment -->' },
                { content: '<script>window.__nrXss=1<\/script>' }
            ];
            const states = [];
            for (let i = 0; i < configs.length; i++) {
                const tf = await window.mountNoResults(
                    'ce-nr-empty-content-' + i,
                    { no_results_message: configs[i] }, html);
                const host = tf.feature('noResults').cont;
                const message = window.nrPart(host, 'message');
                states.push({
                    text: host.textContent,
                    nodes: host.children.length,
                    fallback: message.textContent,
                    hidden: message.hidden
                });
                tf.destroy();
            }
            return states;
        }, NORESULTS_TABLE_HTML);

        expect(result).toEqual([
            { text: '', nodes: 0, fallback: '', hidden: false },
            { text: '', nodes: 0, fallback: '', hidden: false }
        ]);
    });

test('no-results bridge applies a custom css_class to the host',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: NORESULTS_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountNoResults('ce-nr-class', {
                no_results_message: { css_class: 'myNoResults' }
            }, html);
            const host = tf.feature('noResults').cont;
            const state = {
                tag: host.nodeName,
                className: host.className,
                hosts: document.querySelectorAll('tf-no-results').length,
                divClass: document.querySelectorAll('div.myNoResults').length
            };
            tf.destroy();
            return state;
        }, NORESULTS_TABLE_HTML);

        expect(result.tag).toBe('TF-NO-RESULTS');
        expect(result.className).toBe('myNoResults');
        expect(result.hosts).toBe(1);
        expect(result.divClass).toBe(0);
    });

test('no-results bridge mounts into a custom_container element',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: NORESULTS_MOUNT });

        const result = await page.evaluate(async (html) => {
            const box = document.createElement('div');
            box.id = 'nrExternal';
            document.body.appendChild(box);
            const tf = await window.mountNoResults('ce-nr-container', {
                no_results_message: {
                    custom_container: box,
                    content: '<h3>Nothing here</h3>'
                }
            }, html);
            const feature = tf.feature('noResults');
            const host = feature.cont;
            const state = {
                isCE: host.nodeName === 'TF-NO-RESULTS',
                inBox: host.parentNode === box,
                markup: Boolean(host.querySelector('h3')),
                external: feature.isExternal,
                width: host.style.width,
                display: host.style.display
            };
            feature.destroy();
            return Object.assign(state, { removed: !host.isConnected });
        }, NORESULTS_EMPTY_TABLE_HTML);

        expect(result.isCE).toBe(true);
        expect(result.inBox).toBe(true);
        expect(result.markup).toBe(true);
        expect(result.external).toBe(true);
        expect(result.width).toBe('');
        expect(result.display).toBe('block');
        expect(result.removed).toBe(true);
    });

test('no-results bridge treats empty form/select containers as external',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: NORESULTS_MOUNT });

        const result = await page.evaluate(async (html) => {
            const states = [];
            for (const tag of ['form', 'select']) {
                const box = document.createElement(tag);
                box.id = 'nrEmptyContainer';
                document.body.appendChild(box);
                const id = 'ce-nr-empty-container-' + tag;
                const tf = await window.mountNoResults(id,
                    { no_results_message: { custom_container: box } }, html);
                const feature = tf.feature('noResults');
                const host = feature.cont;
                states.push({
                    tag: tag,
                    length: box.length,
                    isCE: host.nodeName === 'TF-NO-RESULTS',
                    external: feature.isExternal,
                    inBox: host.parentNode === box
                });
                tf.destroy();
                document.getElementById(id).remove();
                box.remove();
            }
            return states;
        }, NORESULTS_TABLE_HTML);

        expect(result).toEqual([
            { tag: 'form', length: 0, isCE: true, external: true,
                inBox: true },
            { tag: 'select', length: 0, isCE: true, external: true,
                inBox: true }
        ]);
    });

test('no-results bridge mounts into a resolving custom_container_id',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: NORESULTS_MOUNT });

        const result = await page.evaluate(async (html) => {
            const box = document.createElement('div');
            box.id = 'nrExternalById';
            document.body.appendChild(box);
            const tf = await window.mountNoResults('ce-nr-container-id', {
                no_results_message: { custom_container_id: 'nrExternalById' }
            }, html);
            const host = tf.feature('noResults').cont;
            const state = {
                isCE: host.nodeName === 'TF-NO-RESULTS',
                inBox: host.parentNode === box
            };
            tf.destroy();
            return state;
        }, NORESULTS_TABLE_HTML);

        expect(result.isCE).toBe(true);
        expect(result.inBox).toBe(true);
    });

test('no-results bridge keeps an unresolved custom_container_id legacy',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: NORESULTS_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountNoResults('ce-nr-missing', {
                no_results_message: {
                    custom_container_id: 'missingContainer',
                    content: '<b>Legacy message</b>'
                }
            }, html);
            const host = tf.feature('noResults').cont;
            const state = {
                tag: host.nodeName,
                className: host.className,
                inTable: host.parentNode ===
                    document.querySelector('#ce-nr-missing'),
                markup: host.innerHTML,
                hosts: document.querySelectorAll('tf-no-results').length
            };
            tf.destroy();
            return state;
        }, NORESULTS_TABLE_HTML);

        expect(result.tag).toBe('DIV');
        expect(result.className).toBe('no-results');
        expect(result.inTable).toBe(true);
        expect(result.markup).toBe('<b>Legacy message</b>');
        expect(result.hosts).toBe(0);
    });

test('no-results bridge injects legacy content as authored',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: NORESULTS_MOUNT });

        const result = await page.evaluate(async (html) => {
            class Foreign extends HTMLElement {}
            customElements.define('tf-no-results', Foreign);
            const tf = await window.mountNoResults('ce-nr-legacy-content', {
                no_results_message: {
                    content: '<b id="nrRaw">Raw</b>' +
                        // Inert onerror payload: the authored attribute
                        // survives without writing the __nrRaw sentinel
                        // on error.
                        '<img src=x onerror="void 0">'
                }
            }, html);
            const host = tf.feature('noResults').cont;
            const state = {
                tag: host.nodeName,
                className: host.className,
                markup: host.innerHTML,
                hostHandler: Boolean(host.querySelector('[onerror]')),
                hosts: document.querySelectorAll('tf-no-results').length
            };
            const event = new Event('error');
            host.querySelector('img').dispatchEvent(event);
            state.inert = !('__nrRaw' in window);
            tf.destroy();
            return state;
        }, NORESULTS_TABLE_HTML);

        expect(result.tag).toBe('DIV');
        expect(result.className).toBe('no-results');
        expect(result.markup).toContain('<b id="nrRaw">Raw</b>');
        expect(result.hostHandler).toBe(true);
        expect(result.inert).toBe(true);
        expect(result.hosts).toBe(0);
    });

test('no-results bridge toggles display and fires the callbacks',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: NORESULTS_MOUNT });

        const result = await page.evaluate(async (html) => {
            const calls = [];
            let currentTf;
            let currentFeature;
            const signature = (instance, feature) =>
                (instance === currentTf) + ':' +
                (feature === currentFeature);
            const tf = await window.mountNoResults('ce-nr-events', {
                no_results_message: {
                    on_before_show_msg(instance, feature) {
                        calls.push('before-show:' + signature(instance,
                            feature));
                    },
                    on_after_show_msg(instance, feature) {
                        calls.push('after-show:' + signature(instance,
                            feature));
                    },
                    on_before_hide_msg(instance, feature) {
                        calls.push('before-hide:' + signature(instance,
                            feature));
                    },
                    on_after_hide_msg(instance, feature) {
                        calls.push('after-hide:' + signature(instance,
                            feature));
                    }
                }
            }, html);
            currentTf = tf;
            currentFeature = tf.feature('noResults');
            const host = currentFeature.cont;
            calls.length = 0;

            tf.setFilterValue(0, 'ZZZ');
            tf.filter();
            const shown = host.style.display;

            tf.setFilterValue(0, 'Sydney');
            tf.filter();
            const hidden = host.style.display;

            tf.destroy();
            return { shown, hidden, calls };
        }, NORESULTS_TABLE_HTML);

        expect(result.shown).toBe('block');
        expect(result.hidden).toBe('none');
        expect(result.calls).toEqual([
            'before-show:true:true', 'after-show:true:true',
            'before-hide:true:true', 'after-hide:true:true'
        ]);
    });

test('no-results bridge sets the width from the table and grid layout',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: NORESULTS_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountNoResults('ce-nr-width', {
                no_results_message: true
            }, html);
            const feature = tf.feature('noResults');
            const tableWidth = document.querySelector('#ce-nr-width')
                .tHead.clientWidth;
            feature.show();
            const plain = feature.cont.style.width;
            tf.destroy();

            const grid = await window.mountNoResults('ce-nr-grid', {
                grid_layout: true,
                no_results_message: true
            }, html);
            const gridFeature = grid.feature('noResults');
            const gridWidth = grid.feature('gridLayout').headTbl.clientWidth;
            gridFeature.show();
            const styled = gridFeature.cont.style.width;
            grid.destroy();
            return {
                plain,
                tableWidth,
                styled,
                gridWidth
            };
        }, NORESULTS_TABLE_HTML);

        expect(result.plain).toBe(result.tableWidth + 'px');
        expect(result.styled).toBe(result.gridWidth + 'px');
    });

test('no-results bridge honours disable() and enable()', async ({ page }) => {
    await page.goto(FIXTURE);
    await page.addScriptTag({ content: NORESULTS_MOUNT });

    const result = await page.evaluate(async (html) => {
        const tf = await window.mountNoResults('ce-nr-enabled', {
            no_results_message: true
        }, html);
        const feature = tf.feature('noResults');
        const host = feature.cont;
        host.style.display = 'none';

        feature.disable();
        feature.show();
        const disabled = host.style.display;

        feature.enable();
        feature.show();
        const enabled = host.style.display;

        tf.destroy();
        return { disabled, enabled };
    }, NORESULTS_TABLE_HTML);

    expect(result.disabled).toBe('none');
    expect(result.enabled).toBe('block');
});

test('no-results bridge destroy unsubscribes and tolerates detached hosts',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: NORESULTS_MOUNT });

        const result = await page.evaluate(async (html) => {
            let calls = 0;
            const tf = await window.mountNoResults('ce-nr-destroy', {
                no_results_message: {
                    on_before_show_msg() { calls++; }
                }
            }, html);
            const feature = tf.feature('noResults');
            const host = feature.cont;
            const initEvents = tf.emitter.events['after-filtering'].length;
            const initEventsAll = tf.emitter.events['initialized'].length;
            calls = 0;

            feature.destroy();
            const afterDestroy = tf.emitter.events['after-filtering'].length;
            const afterDestroyAll = tf.emitter.events['initialized'].length;
            tf.emitter.emit('initialized', tf);
            tf.emitter.emit('after-filtering', tf);
            const afterEmit = {
                calls,
                hosts: document.querySelectorAll('tf-no-results').length
            };

            feature.init();
            feature.cont.remove();
            let error = null;
            try {
                tf.destroy();
            } catch (err) {
                error = err && err.message;
            }
            return {
                initEvents,
                initEventsAll,
                afterDestroy,
                afterDestroyAll,
                afterEmit,
                error,
                cont: feature.cont,
                removed: !host.isConnected
            };
        }, NORESULTS_TABLE_HTML);

        expect(result.afterDestroy).toBe(result.initEvents - 1);
        expect(result.afterDestroyAll).toBe(result.initEventsAll - 1);
        expect(result.afterEmit).toEqual({ calls: 0, hosts: 0 });
        expect(result.error).toBeNull();
        expect(result.cont).toBeNull();
        expect(result.removed).toBe(true);
    });

test('no-results bridge tf.destroy removes the host', async ({ page }) => {
    await page.goto(FIXTURE);
    await page.addScriptTag({ content: NORESULTS_MOUNT });

    const result = await page.evaluate(async (html) => {
        const tf = await window.mountNoResults('ce-nr-tf-destroy', {
            no_results_message: true
        }, html);
        const feature = tf.feature('noResults');
        const host = feature.cont;

        tf.destroy();
        return {
            connected: host.isConnected,
            cont: feature.cont,
            hosts: document.querySelectorAll('tf-no-results').length
        };
    }, NORESULTS_TABLE_HTML);

    expect(result).toEqual({ connected: false, cont: null, hosts: 0 });
});

test('no-results bridge double-init is guarded and reset() re-inits',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: NORESULTS_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountNoResults('ce-nr-reset', {
                no_results_message: { content: 'Again' }
            }, html);
            const feature = tf.feature('noResults');
            feature.init();
            const afterDoubleInit = document
                .querySelectorAll('tf-no-results').length;

            feature.destroy();
            const afterDestroy = document
                .querySelectorAll('tf-no-results').length;
            feature.reset();
            const host = feature.cont;
            const afterReset = {
                hosts: document.querySelectorAll('tf-no-results').length,
                connected: Boolean(host) && host.isConnected,
                text: host && window.nrPart(host, 'message-slot')
                    .assignedNodes({ flatten: true })
                    .map((node) => node.textContent).join('')
            };
            feature.destroy();
            return { afterDoubleInit, afterDestroy, afterReset };
        }, NORESULTS_TABLE_HTML);

        expect(result.afterDoubleInit).toBe(1);
        expect(result.afterDestroy).toBe(0);
        expect(result.afterReset.hosts).toBe(1);
        expect(result.afterReset.connected).toBe(true);
        expect(result.afterReset.text).toBe('Again');
    });

test('no-results bridge falls back when tf-no-results lacks setText',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: NORESULTS_MOUNT });

        const result = await page.evaluate(async (html) => {
            class Foreign extends HTMLElement {}
            customElements.define('tf-no-results', Foreign);
            const tf = await window.mountNoResults('ce-nr-foreign', {
                no_results_message: true
            }, html);
            const host = tf.feature('noResults').cont;
            const state = {
                tag: host.nodeName,
                className: host.className,
                text: host.textContent,
                hosts: document.querySelectorAll('tf-no-results').length
            };
            tf.destroy();
            return state;
        }, NORESULTS_TABLE_HTML);

        expect(result.tag).toBe('DIV');
        expect(result.className).toBe('no-results');
        expect(result.text).toBe('No results');
        expect(result.hosts).toBe(0);
    });

test('no-results bridge falls back to legacy without customElements',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: NORESULTS_MOUNT });

        const result = await page.evaluate(async (html) => {
            Object.defineProperty(window, 'customElements',
                { value: undefined, configurable: true });
            let state;
            try {
                const tf = await window.mountNoResults('ce-nr-no-ce', {
                    no_results_message: true
                }, html);
                const host = tf.feature('noResults').cont;
                state = {
                    tag: host.nodeName,
                    className: host.className,
                    hosts: document.querySelectorAll('tf-no-results').length
                };
                tf.destroy();
            } finally {
                delete window.customElements;
            }
            return state;
        }, NORESULTS_TABLE_HTML);

        expect(result.tag).toBe('DIV');
        expect(result.className).toBe('no-results');
        expect(result.hosts).toBe(0);
    });

test('no-results bridge does not mount when no_results_message is false',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: NORESULTS_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountNoResults('ce-nr-off', {
                no_results_message: false
            }, html);
            const state = {
                feature: Boolean(tf.feature('noResults')),
                hosts: document.querySelectorAll('tf-no-results').length,
                divs: document.querySelectorAll('div.no-results').length
            };
            tf.destroy();
            return state;
        }, NORESULTS_TABLE_HTML);

        expect(result).toEqual({ feature: false, hosts: 0, divs: 0 });
    });

test('no-results bridge instances are independent', async ({ page }) => {
    await page.goto(FIXTURE);
    await page.addScriptTag({ content: NORESULTS_MOUNT });

    const result = await page.evaluate(async (html) => {
        const first = await window.mountNoResults('ce-nr-first', {
            no_results_message: { content: 'First message' }
        }, html);
        const second = await window.mountNoResults('ce-nr-second', {
            no_results_message: {
                content: 'Second message',
                css_class: 'second-message'
            }
        }, html);
        const firstHost = first.feature('noResults').cont;
        const secondHost = second.feature('noResults').cont;
        const text = (host) => window.nrPart(host, 'message-slot')
            .assignedNodes({ flatten: true })
            .map((node) => node.textContent).join('');

        const state = {
            firstText: text(firstHost),
            secondText: text(secondHost),
            firstClass: firstHost.className,
            secondClass: secondHost.className,
            hosts: document.querySelectorAll('tf-no-results').length
        };

        first.destroy();
        return Object.assign(state, {
            firstRemoved: !firstHost.isConnected,
            secondKept: secondHost.isConnected
        });
    }, NORESULTS_TABLE_HTML);

    expect(result.firstText).toBe('First message');
    expect(result.secondText).toBe('Second message');
    expect(result.firstClass).toBe('no-results');
    expect(result.secondClass).toBe('second-message');
    expect(result.hosts).toBe(2);
    expect(result.firstRemoved).toBe(true);
    expect(result.secondKept).toBe(true);
});

// PopupFilter bridge (#921): the feature routes trigger and popup state
// through <tf-popup-filter> while keeping the legacy filter containers,
// callbacks, icon state and close-on-filtering behaviour.
const POPUP_TABLE_HTML =
    '<thead><tr><th>City</th><th>Country</th><th>Code</th></tr></thead>' +
    '<tbody><tr><td>Sydney</td><td>Australia</td><td>AU</td></tr>' +
    '<tr><td>Paris</td><td>France</td><td>FR</td></tr></tbody>';

const POPUP_MOUNT = `
window.popupPart = function (host, name) {
    return host.shadowRoot.querySelector('[part="' + name + '"]');
};
window.popupAssigned = function (host, name) {
    const slot = host.shadowRoot.querySelector('slot[name="' + name + '"]');
    return slot ? slot.assignedNodes({ flatten: true }) : [];
};
window.mountPopup = async function (id, config, html) {
    await import('/src/components/tf-popup-filter.js');
    const table = document.createElement('table');
    table.id = id;
    table.innerHTML = html;
    document.body.appendChild(table);
    const tf = new TableFilter(id, Object.assign({
        base_path: '/dist/tablefilter/',
        popup_filters: true,
        col_0: 'select',
        col_1: 'select',
        col_2: 'multiple'
    }, config));
    tf.init();
    return tf;
};
`;

test('popup filter bridge uses tf-popup-filter with the legacy config',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: POPUP_MOUNT });

        const result = await page.evaluate(async (html) => {
            const calls = [];
            const record = (name) =>
                function (feature, container, colIndex) {
                    calls.push({
                        name,
                        isFeature: feature === tf.feature('popupFilter'),
                        containerId: container && container.id,
                        colIndex,
                        argc: arguments.length
                    });
                };
            const tf = await window.mountPopup('ce-popup', {
                popup_filters: {
                    on_before_popup_filter_open: record('beforeOpen'),
                    on_after_popup_filter_open: record('afterOpen'),
                    on_before_popup_filter_close: record('beforeClose'),
                    on_after_popup_filter_close: record('afterClose')
                }
            }, html);
            const feature = tf.feature('popupFilter');
            const host = feature.hosts[0];
            const container = feature.fltElms[0];
            const trigger = window.popupAssigned(host, 'trigger')[0];

            const initial = {
                isCE: host.nodeName === 'TF-POPUP-FILTER',
                inHeader: host.parentNode === tf.getHeaderElement(0),
                hostClass: host.className,
                containerClass: container.className,
                containerId: container.id,
                externalId: tf.externalFltIds[0],
                containerInHost: container.parentNode === host,
                triggerTag: trigger.nodeName,
                triggerType: trigger.getAttribute('type'),
                triggerSrc: trigger.querySelector('img').getAttribute('src'),
                popupLabel: host.getAttribute('accessible-popup-label'),
                elementTriggerHidden: window.popupPart(host, 'trigger').hidden,
                legacyPlaceholders:
                    document.querySelectorAll('div.popUpPlaceholder').length
            };

            trigger.click();
            const opened = {
                hasOpen: host.hasAttribute('open'),
                popupHidden: window.popupPart(host, 'popup').hidden,
                containerDisplay: container.style.display,
                activeIdx: feature.activeFilterIdx,
                calls: calls.slice()
            };

            trigger.click();
            const closed = {
                hasOpen: host.hasAttribute('open'),
                containerDisplay: container.style.display,
                activeIdx: feature.activeFilterIdx,
                calls: calls.slice()
            };

            host.setOpen(true);
            const programmatic = calls.slice();

            tf.destroy();
            return Object.assign(initial, {
                opened, closed, programmatic, removed: !host.isConnected
            });
        }, POPUP_TABLE_HTML);

        expect(result.isCE).toBe(true);
        expect(result.inHeader).toBe(true);
        expect(result.hostClass).toBe('popUpPlaceholder');
        expect(result.containerClass).toBe('popUpFilter');
        expect(result.containerId).toBe(result.externalId);
        expect(result.containerInHost).toBe(true);
        expect(result.triggerTag).toBe('BUTTON');
        expect(result.triggerType).toBe('button');
        expect(result.triggerSrc).toContain('icn_filter.gif');
        expect(result.popupLabel).toBe('Column filter');
        expect(result.elementTriggerHidden).toBe(true);
        expect(result.legacyPlaceholders).toBe(0);
        expect(result.opened.hasOpen).toBe(true);
        expect(result.opened.popupHidden).toBe(false);
        expect(result.opened.containerDisplay).toBe('block');
        expect(result.opened.activeIdx).toBe(0);
        const callSeq = (calls) => calls.map(
            (call) => `${call.name}:${call.colIndex}`);
        expect(callSeq(result.opened.calls)).toEqual([
            'beforeClose:1', 'afterClose:1',
            'beforeClose:2', 'afterClose:2',
            'beforeOpen:0', 'afterOpen:0'
        ]);
        expect(result.closed.hasOpen).toBe(false);
        expect(result.closed.containerDisplay).toBe('none');
        expect(result.closed.activeIdx).toBe(-1);
        expect(callSeq(result.closed.calls)).toEqual([
            'beforeClose:1', 'afterClose:1',
            'beforeClose:2', 'afterClose:2',
            'beforeOpen:0', 'afterOpen:0',
            'beforeClose:0', 'afterClose:0'
        ]);
        expect(callSeq(result.programmatic)).toEqual([
            'beforeClose:1', 'afterClose:1',
            'beforeClose:2', 'afterClose:2',
            'beforeOpen:0', 'afterOpen:0',
            'beforeClose:0', 'afterClose:0',
            'beforeClose:1', 'afterClose:1',
            'beforeClose:2', 'afterClose:2',
            'beforeOpen:0', 'afterOpen:0'
        ]);
        for (const call of result.closed.calls.filter(
            (entry) => entry.colIndex === 0)) {
            expect(call.isFeature).toBe(true);
            expect(call.containerId).toBe(result.containerId);
            expect(call.argc).toBe(3);
        }
        expect(result.removed).toBe(true);
    });

test('popup filter bridge sanitises image_html and keeps a keyboard ' +
    'activatable trigger', async ({ page }) => {
    await page.goto(FIXTURE);
    await page.addScriptTag({ content: POPUP_MOUNT });

    const mounted = await page.evaluate(async (html) => {
        const tf = await window.mountPopup('ce-popup-markup', {
            popup_filters: {
                image_html: '<span class="filterIcon" ' +
                    'onclick="window.__popupXss = 1">Filter me' +
                    '<img src="/icon.gif" alt="Filter icon" ' +
                    'onerror="window.__popupXss = 2"></span>'
            }
        }, html);
        const host = tf.feature('popupFilter').hosts[0];
        const trigger = window.popupAssigned(host, 'trigger')[0];
        trigger.focus();
        return {
            tag: trigger.nodeName,
            type: trigger.getAttribute('type'),
            className: trigger.querySelector('.filterIcon').className,
            alt: trigger.querySelector('img').getAttribute('alt'),
            xss: window.__popupXss,
            focused: document.activeElement === trigger,
            popupLabel: host.getAttribute('accessible-popup-label')
        };
    }, POPUP_TABLE_HTML);

    expect(mounted.tag).toBe('BUTTON');
    expect(mounted.type).toBe('button');
    expect(mounted.className).toBe('filterIcon');
    expect(mounted.alt).toBe('Filter icon');
    expect(mounted.xss).toBeUndefined();
    expect(mounted.focused).toBe(true);
    expect(mounted.popupLabel).toBe('Filter me');

    await page.keyboard.press('Enter');
    expect(await page.evaluate(() =>
        document.querySelector('tf-popup-filter').hasAttribute('open')))
        .toBe(true);
});

test('popup filter bridge keeps nested focusable image_html unwrapped',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: POPUP_MOUNT });

        const mounted = await page.evaluate(async (html) => {
            const tf = await window.mountPopup('ce-popup-nested', {
                popup_filters: {
                    image_html: '<span class="filterWrap">' +
                        '<button type="button" class="innerTrigger">' +
                        'Open filter</button></span>'
                }
            }, html);
            const host = tf.feature('popupFilter').hosts[0];
            const trigger = window.popupAssigned(host, 'trigger')[0];
            const inner = trigger.querySelector('.innerTrigger');
            inner.focus();
            return {
                triggerTag: trigger.nodeName,
                triggerClass: trigger.className,
                slotted: host.querySelectorAll('[slot="trigger"]').length,
                popupLabel: host.getAttribute('accessible-popup-label'),
                focused: document.activeElement === inner
            };
        }, POPUP_TABLE_HTML);

        expect(mounted.triggerTag).toBe('SPAN');
        expect(mounted.triggerClass).toBe('filterWrap');
        expect(mounted.slotted).toBe(1);
        expect(mounted.popupLabel).toBe('Open filter');
        expect(mounted.focused).toBe(true);

        await page.keyboard.press('Enter');
        expect(await page.evaluate(() =>
            document.querySelector('tf-popup-filter').hasAttribute('open')))
            .toBe(true);
    });

test('popup filter bridge swaps image and image_active icon state',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: POPUP_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountPopup('ce-popup-icons', {
                popup_filters: {
                    image: '/idle.gif',
                    image_active: '/active.gif'
                }
            }, html);
            const feature = tf.feature('popupFilter');
            const icon = feature.fltIcons[0];
            const idle = icon.src;
            tf.emitter.emit('cell-processed', tf, 0);
            const active = icon.src;
            tf.emitter.emit('before-filtering', tf);
            const restored = icon.src;
            tf.destroy();
            return { idle, active, restored };
        }, POPUP_TABLE_HTML);

        expect(result.idle).toContain('idle.gif');
        expect(result.active).toContain('active.gif');
        expect(result.restored).toContain('idle.gif');
    });

test('popup filter bridge honours close_on_filtering and the multiple ' +
    'filter exception', async ({ page }) => {
    await page.goto(FIXTURE);
    await page.addScriptTag({ content: POPUP_MOUNT });

    const result = await page.evaluate(async (html) => {
        const kept = await window.mountPopup('ce-popup-keep', {
            popup_filters: { close_on_filtering: false }
        }, html);
        const closeAll = () => kept.emitter.emit('after-filtering', kept);
        kept.feature('popupFilter').open(0);
        kept.feature('popupFilter').open(2);
        closeAll();
        const keptState = {
            single: kept.feature('popupFilter').isOpen(0),
            multiple: kept.feature('popupFilter').isOpen(2)
        };

        const closed = await window.mountPopup('ce-popup-close', {
            popup_filters: { close_on_filtering: true }
        }, html);
        closed.feature('popupFilter').open(0);
        closed.feature('popupFilter').open(2);
        closed.emitter.emit('after-filtering', closed);
        const closedState = {
            single: closed.feature('popupFilter').isOpen(0),
            multiple: closed.feature('popupFilter').isOpen(2)
        };

        kept.destroy();
        closed.destroy();
        return { keptState, closedState };
    }, POPUP_TABLE_HTML);

    expect(result.keptState).toEqual({ single: true, multiple: true });
    expect(result.closedState).toEqual({ single: false, multiple: true });
});

test('popup filter bridge applies configurable classes and host width',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: POPUP_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountPopup('ce-popup-classes', {
                popup_filters: {
                    placeholder_css_class: 'customPlaceholder',
                    div_css_class: 'customPopup',
                    image_html: '<span>Filter</span>'
                }
            }, html);
            const feature = tf.feature('popupFilter');
            const host = feature.hosts[0];
            const container = feature.fltElms[0];
            feature.open(0);
            const state = {
                hostClass: host.className,
                containerClass: container.className,
                width: host.style.width
            };
            tf.destroy();
            return state;
        }, POPUP_TABLE_HTML);

        expect(result.hostClass).toBe('customPlaceholder');
        expect(result.containerClass).toBe('customPopup');
        expect(result.width).toMatch(/^\d+px$/);
    });

test('popup filter bridge falls back for a foreign tf-popup-filter',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: POPUP_MOUNT });

        const result = await page.evaluate(async (html) => {
            class ForeignPopupFilter extends HTMLElement {
                setOpen() {}
                setPopupLabel() {}
                setLabel() {}
                setText() {}
            }
            customElements.define('tf-popup-filter', ForeignPopupFilter);

            const tf = await window.mountPopup('popup-foreign', {}, html);
            const feature = tf.feature('popupFilter');
            const state = {
                foreign: customElements.get('tf-popup-filter') ===
                    ForeignPopupFilter,
                hosts: feature.hosts.length,
                placeholder: document.querySelectorAll(
                    'div.popUpPlaceholder').length,
                icon: feature.fltIcons[0].nodeName
            };
            feature.open(0);
            state.open = feature.isOpen(0);
            tf.destroy();
            return state;
        }, POPUP_TABLE_HTML);

        expect(result.foreign).toBe(true);
        expect(result.hosts).toBe(0);
        expect(result.placeholder).toBe(3);
        expect(result.icon).toBe('IMG');
        expect(result.open).toBe(true);
    });

test('popup filter bridge falls back to legacy markup without the element',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate((html) => {
            const table = document.createElement('table');
            table.id = 'popup-legacy';
            table.innerHTML = html;
            document.body.appendChild(table);
            const tf = new TableFilter('popup-legacy', {
                base_path: '/dist/tablefilter/',
                popup_filters: true,
                col_0: 'select',
                col_1: 'select',
                col_2: 'multiple'
            });
            tf.init();
            const feature = tf.feature('popupFilter');
            const state = {
                hosts: feature.hosts.length,
                placeholder: document.querySelectorAll(
                    'div.popUpPlaceholder').length,
                container: document.querySelectorAll('div.popUpFilter').length,
                icon: feature.fltIcons[0].nodeName
            };
            feature.open(0);
            state.open = feature.isOpen(0);
            tf.destroy();
            return state;
        }, POPUP_TABLE_HTML);

        expect(result.hosts).toBe(0);
        expect(result.placeholder).toBe(3);
        expect(result.container).toBe(3);
        expect(result.icon).toBe('IMG');
        expect(result.open).toBe(true);
    });

test('popup filter bridge destroy removes an open legacy mouseup listener',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate((html) => {
            const table = document.createElement('table');
            table.id = 'popup-legacy-listener';
            table.innerHTML = html;
            document.body.appendChild(table);
            const tf = new TableFilter('popup-legacy-listener', {
                base_path: '/dist/tablefilter/',
                popup_filters: true,
                col_0: 'select',
                col_1: 'select',
                col_2: 'multiple'
            });
            tf.init();

            const feature = tf.feature('popupFilter');
            feature.open(0);
            tf.destroy();

            const activeAfterDestroy = feature.activeFilterIdx;
            let staleMouseup = 0;
            feature.onMouseup = () => staleMouseup++;
            feature.activeFilterIdx = 0;
            window.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
            return { activeAfterDestroy, staleMouseup };
        }, POPUP_TABLE_HTML);

        expect(result.activeAfterDestroy).toBe(-1);
        expect(result.staleMouseup).toBe(0);
    });

test('popup filter bridge grid reset keeps one host per column',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: POPUP_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountPopup('ce-popup-grid-reset',
                { grid_layout: true }, html);
            const feature = tf.feature('popupFilter');
            const firstHost = feature.hosts[0];

            feature.destroy();
            feature.reset();

            const hosts = Array.from(
                document.querySelectorAll('tf-popup-filter'));
            const state = {
                hosts: hosts.length,
                connected: hosts.filter((host) => host.parentNode).length,
                firstRemoved: !firstHost.parentNode,
                currentConnected: Boolean(feature.hosts[0].parentNode),
                containerInHost: feature.fltElms[0].parentNode ===
                    feature.hosts[0]
            };
            feature.open(0);
            state.open = feature.isOpen(0);
            tf.destroy();
            return state;
        }, POPUP_TABLE_HTML);

        expect(result.hosts).toBe(3);
        expect(result.connected).toBe(3);
        expect(result.firstRemoved).toBe(true);
        expect(result.currentConnected).toBe(true);
        expect(result.containerInHost).toBe(true);
        expect(result.open).toBe(true);
    });

test('popup filter bridge destroy and reset reprojects cached containers',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: POPUP_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountPopup('ce-popup-reset', {}, html);
            const feature = tf.feature('popupFilter');
            const firstHost = feature.hosts[0];
            const container = feature.fltElms[0];
            let staleCE = 0;
            let staleEmitter = 0;
            feature.onCEOpenChange = () => staleCE++;
            feature.setIconsState = () => staleEmitter++;

            feature.destroy();
            document.body.appendChild(firstHost);
            firstHost.setOpen(true);
            document.body.removeChild(firstHost);
            tf.emitter.emit('before-filtering', tf);
            const destroyed = {
                removed: !firstHost.isConnected,
                hosts: feature.hosts.length,
                cached: feature.filtersCache[0] === container,
                staleCE,
                staleEmitter
            };
            delete feature.onCEOpenChange;
            delete feature.setIconsState;

            feature.reset();
            const secondHost = feature.hosts[0];
            feature.open(0);
            const reset = {
                mounted: secondHost.isConnected,
                newHost: secondHost !== firstHost,
                reprojected: feature.fltElms[0] === container,
                inHost: container.parentNode === secondHost,
                open: feature.isOpen(0)
            };
            tf.destroy();
            return { destroyed, reset, removedAgain: !secondHost.isConnected };
        }, POPUP_TABLE_HTML);

        expect(result.destroyed).toEqual({
            removed: true, hosts: 0, cached: true, staleCE: 0,
            staleEmitter: 0
        });
        expect(result.reset).toEqual({
            mounted: true,
            newHost: true,
            reprojected: true,
            inHost: true,
            open: true
        });
        expect(result.removedAgain).toBe(true);
    });

test('popup filter bridge reset keeps one container click listener',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ content: POPUP_MOUNT });

        const result = await page.evaluate(async (html) => {
            const tf = await window.mountPopup('ce-popup-listeners', {}, html);
            const feature = tf.feature('popupFilter');
            const container = feature.fltElms[0];
            const added = [];
            const removed = [];
            const origAdd = container.addEventListener;
            const origRemove = container.removeEventListener;
            container.addEventListener = function (type, fn, opts) {
                if (type === 'click') {
                    added.push(fn);
                }
                return origAdd.call(this, type, fn, opts);
            };
            container.removeEventListener = function (type, fn, opts) {
                if (type === 'click') {
                    removed.push(fn);
                }
                return origRemove.call(this, type, fn, opts);
            };

            feature.destroy();
            feature.reset();
            feature.destroy();
            feature.reset();

            const state = {
                added: added.length,
                removed: removed.length,
                stable: added.every((fn) =>
                    fn === feature.boundHandlers.containerClick),
                reused: feature.fltElms[0] === container
            };
            tf.destroy();
            return state;
        }, POPUP_TABLE_HTML);

        expect(result.reused).toBe(true);
        expect(result.stable).toBe(true);
        expect(result.added).toBe(2);
        expect(result.removed).toBe(2);
    });
