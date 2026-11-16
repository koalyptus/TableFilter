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

// With `enable_icons` on, legacy renders an `<input>` whose
// `.nextPage`/`.previousPage`/`.firstPage`/`.lastPage` classes the themes
// paint the icon on (tablefilter.css, paging.js:152-182). Those classes
// cannot reach the shadow button, so this configuration stays on the
// legacy markup with its icon intact (clearButton.js:97-110).
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
// custom HTML is injected into the button span (paging.js:399-401) and
// the click is bound on that span.
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
// page position from `.value` instead (paging.js:955-956) and clamps it
// to the last page before handing it to the element.
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
                listboxLabel: host.getAttribute('listbox-label'),
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
                listboxLabel: host.getAttribute('listbox-label'),
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
                instructions.textContent.includes('www.tablefilter.com') &&
                Boolean(instructions.querySelector('.helpFooter')),
            footerClose: Boolean(instructions.querySelector('a.close')),
            closeText: window.helpPart(host, 'close-text').textContent,
            legacy: Boolean(document.querySelector('.helpBtn')) ||
                Boolean(document.querySelector('.helpCont'))
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
                anchor: Boolean(help.btn &&
                    help.btn.querySelector('.helpBtn')),
                parentId: help.btn && help.btn.parentNode ?
                    help.btn.parentNode.id : null,
                contParentId: help.cont && help.cont.parentNode ?
                    help.cont.parentNode.id : null,
                contClass: help.cont ? help.cont.className : null,
                contIsBtn: help.cont === help.btn
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
                legacy: Boolean(document.querySelector('.helpBtn')) ||
                    Boolean(document.querySelector('.helpCont'))
            };
            tf.destroy();
            return state;
        }, HELP_TABLE_HTML);

        expect(result.isCE).toBe(true);
        expect(result.legacy).toBe(false);
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
            const state = {
                registered: Boolean(customElements.get('tf-help')),
                tag: help.btn.nodeName,
                anchor: help.btn.querySelector('.helpBtn') !== null,
                contTag: help.cont.nodeName,
                contClass: help.cont.className,
                instructions:
                    help.cont.textContent.includes('Use the filters'),
                footer: help.cont.textContent.includes('TableFilter v') &&
                    help.cont.textContent.includes('www.tablefilter.com'),
                close: help.cont.querySelector('a.close') !== null
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
                        '<img src="x" onerror="window.__legacyXss = 3">'
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
                closeHref: htmlHelp.cont.querySelector('a.close')
                    .getAttribute('href'),
                closeClass: htmlHelp.cont.querySelector('a.close').className
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
                footerClose: Boolean(instructions.querySelector('a.close')),
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
                legacy: Boolean(document.querySelector('.helpBtn')) ||
                    Boolean(document.querySelector('.helpCont'))
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
