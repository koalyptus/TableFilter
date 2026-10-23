// Component gate (#923/#924): the <tf-pager> element registers an open
// shadow root exposing a `nav` landmark with four semantic buttons —
// first, prev, next and last — each via its own part and each with an
// accessible name — plus a page indicator carrying `aria-current="page"`
// and configurable page-number state. Per the theming model (--tf-*
// custom properties + ::part()), it ships structure and hooks only: no
// invented classes and no baked-in presentational CSS. The
// results-per-page select (#925) and the Paging bridge (#926) are
// separate tickets. Fails CI on regression.
const { test, expect } = require('@playwright/test');

const FIXTURE = '/test/test-emitter.html';
const COMPONENT = '/src/components/tf-pager.js';

// Document order, matching the shadow template. The indicator sits
// between prev and next (legacy markup order), and the default
// `selector-type` contributes its `page-select` control.
const PARTS = [
    'nav',
    'first', 'first-text',
    'prev', 'prev-text',
    'page-status', 'page-text', 'page-selector', 'page-select',
    'of-text', 'total-pages',
    'next', 'next-text',
    'last', 'last-text'
];

test('registers an open shadow root exposing the button parts',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const defined = Boolean(customElements.get('tf-pager'));
            const el = document.createElement('tf-pager');
            document.body.appendChild(el);
            const sr = el.shadowRoot;
            const nodes = sr ? Array.from(sr.querySelectorAll('*')) : [];
            const buttons = sr ? Array.from(sr.querySelectorAll('button'))
                : [];
            return {
                defined,
                hasShadow: Boolean(sr),
                mode: sr && sr.mode,
                parts: sr ? Array.from(sr.querySelectorAll('[part]'))
                    .map((n) => n.getAttribute('part')) : [],
                buttonCount: buttons.length,
                allTypeButton: buttons.every(
                    (b) => b.getAttribute('type') === 'button'),
                classless: nodes.every((n) => !n.hasAttribute('class')),
                styleless: nodes.every((n) => n.tagName !== 'STYLE')
            };
        }, COMPONENT);

        expect(result.defined).toBe(true);
        expect(result.hasShadow).toBe(true);
        expect(result.mode).toBe('open');
        expect(result.parts).toEqual(PARTS);
        expect(result.buttonCount).toBe(4);
        expect(result.allTypeButton).toBe(true);
        expect(result.classless).toBe(true);
        expect(result.styleless).toBe(true);
    });

// Accessible names are configurable, never invented: the legacy Paging
// titles come from config (btn_*_page_html/title, btn_*_page_text) and
// the bridge (#926) maps them, so the scaffold ships no defaults and
// only renders aria-label when the matching attribute is set. The page
// selector is the one exception and is covered separately: legacy names
// it nowhere, so the ROADMAP default is documented rather than invented.
test('invents no accessible names by default', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-pager');
        document.body.appendChild(el);
        const sr = el.shadowRoot;
        const hasLabel = (part) =>
            sr.querySelector(`[part="${part}"]`)
                .hasAttribute('aria-label');
        return {
            nav: hasLabel('nav'),
            first: hasLabel('first'),
            prev: hasLabel('prev'),
            next: hasLabel('next'),
            last: hasLabel('last')
        };
    }, COMPONENT);

    expect(result.nav).toBe(false);
    expect(result.first).toBe(false);
    expect(result.prev).toBe(false);
    expect(result.next).toBe(false);
    expect(result.last).toBe(false);
});

test('renders accessible names from attributes when set',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-pager');
            el.setAttribute('label', 'Table pages');
            el.setAttribute('first-label', 'Go to first page');
            el.setAttribute('next-label', 'Go to next page');
            document.body.appendChild(el);
            const sr = el.shadowRoot;
            const labelOf = (part) =>
                sr.querySelector(`[part="${part}"]`)
                    .getAttribute('aria-label');
            return {
                nav: labelOf('nav'),
                first: labelOf('first'),
                next: labelOf('next'),
                // Unset buttons stay unnamed rather than defaulted.
                prev: labelOf('prev')
            };
        }, COMPONENT);

        expect(result.nav).toBe('Table pages');
        expect(result.first).toBe('Go to first page');
        expect(result.next).toBe('Go to next page');
        expect(result.prev).toBeNull();
    });

test('removes the accessible name when the attribute is cleared',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-pager');
            el.setAttribute('next-label', 'Go to next page');
            document.body.appendChild(el);
            const next = () => el.shadowRoot
                .querySelector('[part="next"]');

            const set = next().getAttribute('aria-label');
            el.removeAttribute('next-label');
            const removed = next().hasAttribute('aria-label');

            return { set, removed };
        }, COMPONENT);

        expect(result.set).toBe('Go to next page');
        expect(result.removed).toBe(false);
    });

test('projects markup through the per-button named slots',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-pager');
            el.innerHTML = `
                <svg data-icon="first"></svg>
                <svg data-icon="next"></svg>
            `;
            el.querySelector('[data-icon=first]')
                .slot = 'first';
            el.querySelector('[data-icon=next]')
                .slot = 'next';
            document.body.appendChild(el);
            const sr = el.shadowRoot;
            const projectedOf = (part) => {
                const slot = sr.querySelector(`slot[name=${part}]`);
                return slot.assignedNodes()
                    .filter((n) => n.nodeType === Node.ELEMENT_NODE)
                    .map((n) => n.getAttribute('data-icon'));
            };
            return {
                first: projectedOf('first'),
                next: projectedOf('next'),
                prev: projectedOf('prev')
            };
        }, COMPONENT);

        expect(result.first).toEqual(['first']);
        expect(result.next).toEqual(['next']);
        expect(result.prev).toEqual([]);
    });

test('renders the *-text attributes as text content',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-pager');
            el.setAttribute('first-text', '|<');
            el.setAttribute('next-text', '>');
            document.body.appendChild(el);
            const sr = el.shadowRoot;
            const textOf = (part) =>
                sr.querySelector(`[part="${part}-text"]`).textContent;
            const first = textOf('first');
            const next = textOf('next');
            const prev = textOf('prev');

            // Empty by default so slotted markup is never doubled.
            el.removeAttribute('next-text');
            return { first, next, prev, cleared: textOf('next') };
        }, COMPONENT);

        expect(result.first).toBe('|<');
        expect(result.next).toBe('>');
        expect(result.prev).toBe('');
        expect(result.cleared).toBe('');
    });

test('setLabel() updates the landmark name', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-pager');
        document.body.appendChild(el);
        el.setLabel('Pages');
        return el.shadowRoot.querySelector('nav')
            .getAttribute('aria-label');
    }, COMPONENT);

    expect(result).toBe('Pages');
});

test('exposes ::part() styling hooks for theming', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-pager');
        document.body.appendChild(el);

        const style = document.createElement('style');
        style.textContent = `
            tf-pager::part(nav) { display: flex; }
            tf-pager::part(next) { color: rgb(1, 2, 3); }
        `;
        document.head.appendChild(style);

        const sr = el.shadowRoot;
        return {
            display: getComputedStyle(sr.querySelector('nav')).display,
            color: getComputedStyle(sr.querySelector('[part=next]')).color
        };
    }, COMPONENT);

    expect(result.display).toBe('flex');
    expect(result.color).toBe('rgb(1, 2, 3)');
});

test('disabled attribute is reflected onto every button',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-pager');
            document.body.appendChild(el);
            const buttons = () => Array.from(
                el.shadowRoot.querySelectorAll('button'));
            const allDisabled = () =>
                buttons().every((b) => b.hasAttribute('disabled'));

            const initial = allDisabled();
            el.setAttribute('disabled', '');
            const set = allDisabled();
            el.removeAttribute('disabled');
            const removed = allDisabled();

            return { initial, set, removed, count: buttons().length };
        }, COMPONENT);

        expect(result.count).toBe(4);
        expect(result.initial).toBe(false);
        expect(result.set).toBe(true);
        expect(result.removed).toBe(false);
    });

// Page-number state (#924): the indicator is the accessible home of the
// current page, so it always carries `aria-current="page"`. Like the rest
// of the element it ships parts and no CSS class — the legacy keys
// (nb_pages_css_class, slc_css_class, inp_css_class) are themed through
// ::part(), applied to the host by the bridge (#926).
test('exposes the page indicator with aria-current="page"',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-pager');
            document.body.appendChild(el);
            const sr = el.shadowRoot;
            const status = sr.querySelector('[part="page-status"]');
            const nodes = Array.from(sr.querySelectorAll('*'));
            return {
                current: status.getAttribute('aria-current'),
                text: sr.querySelector('[part="page-text"]').textContent,
                of: sr.querySelector('[part="of-text"]').textContent,
                total: sr.querySelector('[part="total-pages"]').textContent,
                // Between prev and next, matching the legacy order.
                index: Array.from(status.parentNode.children).indexOf(status),
                classless: nodes.every((n) => !n.hasAttribute('class'))
            };
        }, COMPONENT);

        expect(result.current).toBe('page');
        // Empty until page-text and total-pages are configured.
        expect(result.text).toBe('');
        expect(result.of).toBe('');
        expect(result.total).toBe('');
        expect(result.index).toBe(2);
        expect(result.classless).toBe(true);
    });

test('renders page state from the configured attributes',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-pager');
            el.setAttribute('page', '2');
            el.setAttribute('page-text', ' Page ');
            el.setAttribute('of-text', ' of ');
            el.setAttribute('total-pages', '7');
            document.body.appendChild(el);
            const sr = el.shadowRoot;
            const text = sr.querySelector('[part="page-text"]').textContent;
            const of = sr.querySelector('[part="of-text"]').textContent;
            const total =
                sr.querySelector('[part="total-pages"]').textContent;

            el.removeAttribute('page-text');
            return {
                text, of, total,
                cleared: sr.querySelector('[part="page-text"]').textContent
            };
        }, COMPONENT);

        expect(result.text).toBe(' Page ');
        expect(result.of).toBe(' of ');
        expect(result.total).toBe('7');
        expect(result.cleared).toBe('');
    });

// The page count comes from `total-pages` alone. Legacy resolves it from
// `validRowsIndex` and `refRow` (paging.js:534, :284), so a `row-count`
// attribute has no effect on it.
test('renders the page count only from total-pages', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-pager');
        el.setAttribute('row-count', '25');
        document.body.appendChild(el);
        const sr = el.shadowRoot;
        const total = () => sr.querySelector('[part="total-pages"]')
            .textContent;
        const options = () =>
            sr.querySelectorAll('[part="page-select"] option').length;

        const fromRows = total();
        const optionsFromRows = options();

        // A count supplied by the host renders as-is.
        el.setAttribute('total-pages', '4');
        const supplied = total();

        el.removeAttribute('total-pages');
        const cleared = total();

        return { fromRows, optionsFromRows, supplied, cleared };
    }, COMPONENT);

    expect(result.fromRows).toBe('');
    expect(result.optionsFromRows).toBe(0);
    expect(result.supplied).toBe('4');
    expect(result.cleared).toBe('');
});

test('renders the host-supplied page entries into the select',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-pager');
            el.setAttribute('page', '2');
            document.body.appendChild(el);
            // Legacy option model: page number as text, start row as
            // value (paging.js:546).
            el.setPages([
                { text: '1', value: '0' },
                { text: '2', value: '10' },
                { text: '3', value: '20' }
            ]);
            const sr = el.shadowRoot;
            const select = sr.querySelector('[part="page-select"]');
            const options = Array.from(select.querySelectorAll('option'));
            return {
                tagName: select.tagName.toLowerCase(),
                type: select.getAttribute('type'),
                count: options.length,
                texts: options.map((o) => o.textContent),
                values: options.map((o) => o.value),
                selectedIndex: select.selectedIndex
            };
        }, COMPONENT);

        expect(result.tagName).toBe('select');
        expect(result.type).toBeNull();
        expect(result.count).toBe(3);
        expect(result.texts).toEqual(['1', '2', '3']);
        expect(result.values).toEqual(['0', '10', '20']);
        expect(result.selectedIndex).toBe(1);
    });

test('swaps the selector to a bounded number input when configured',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-pager');
            el.setAttribute('total-pages', '3');
            el.setAttribute('page', '3');
            document.body.appendChild(el);
            const host = el.shadowRoot.querySelector('[part="page-selector"]');
            const before = host.firstElementChild.getAttribute('part');

            el.setAttribute('selector-type', 'input');
            const input = host.firstElementChild;
            const after = {
                part: input.getAttribute('part'),
                type: input.getAttribute('type'),
                min: input.getAttribute('min'),
                max: input.getAttribute('max'),
                value: input.value,
                // Exactly one control exists, so nothing is hidden
                // with a presentational attribute.
                children: host.children.length
            };

            return { before, after };
        }, COMPONENT);

        expect(result.before).toBe('page-select');
        expect(result.after.part).toBe('page-input');
        expect(result.after.type).toBe('number');
        expect(result.after.min).toBe('1');
        expect(result.after.max).toBe('3');
        expect(result.after.value).toBe('3');
        expect(result.after.children).toBe(1);
    });

// The page selector is the only accessible name that ships a default:
// legacy names it nowhere, so the value comes from the ROADMAP, and
// `selector-label` overrides it.
test('defaults the selector name and honours selector-label',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-pager');
            document.body.appendChild(el);
            const name = () => el.shadowRoot
                .querySelector('[part="page-select"]')
                .getAttribute('aria-label');

            const initial = name();

            el.setAttribute('selector-label', 'Go to page');
            const overridden = name();

            // Absent falls back to the default rather than losing the name.
            el.removeAttribute('selector-label');
            const reverted = name();

            // An explicit empty value opts out entirely.
            el.setAttribute('selector-label', '');
            const optedOut = name();

            return { initial, overridden, reverted, optedOut };
        }, COMPONENT);

        expect(result.initial).toBe('Current page');
        expect(result.overridden).toBe('Go to page');
        expect(result.reverted).toBe('Current page');
        expect(result.optedOut).toBeNull();
    });

test('setPage() and setTotalPages() update the indicator state',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-pager');
            document.body.appendChild(el);
            el.setPages([
                { text: '1', value: '0' },
                { text: '2', value: '10' }
            ]);
            el.setTotalPages(2);
            el.setPage(2);
            const sr = el.shadowRoot;
            const select = sr.querySelector('[part="page-select"]');
            return {
                // Page 2 selected: visible text is the page number, the
                // value is the start row, as in the legacy select.
                selectedText:
                    select.options[select.selectedIndex].textContent,
                value: select.value,
                total: sr.querySelector('[part="total-pages"]').textContent
            };
        }, COMPONENT);

        expect(result.selectedText).toBe('2');
        expect(result.value).toBe('10');
        expect(result.total).toBe('2');
    });

test('exposes ::part() hooks for the page indicator', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-pager');
        document.body.appendChild(el);

        const style = document.createElement('style');
        style.textContent = `
            tf-pager::part(page-status) { display: flex; }
            tf-pager::part(total-pages) { color: rgb(1, 2, 3); }
        `;
        document.head.appendChild(style);

        const sr = el.shadowRoot;
        return {
            display: getComputedStyle(
                sr.querySelector('[part="page-status"]')).display,
            color: getComputedStyle(
                sr.querySelector('[part="total-pages"]')).color
        };
    }, COMPONENT);

    expect(result.display).toBe('flex');
    expect(result.color).toBe('rgb(1, 2, 3)');
});

// Paging buttons (#926): legacy `btns: false` (paging.js:206, :388)
// guards only button creation, leaving four empty spans in the markup
// (:383-386, :451-452, :467-468). Here the attribute hides the buttons.
test('buttons="false" hides the four buttons', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-pager');
        document.body.appendChild(el);
        const buttons = () => Array.from(
            el.shadowRoot.querySelectorAll('button'));
        const allHidden = () =>
            buttons().every((b) => b.hasAttribute('hidden'));

        const initial = allHidden();
        el.setAttribute('buttons', 'false');
        const set = allHidden();
        el.setAttribute('buttons', 'true');
        const restored = allHidden();

        return { initial, set, restored, count: buttons().length };
    }, COMPONENT);

    expect(result.count).toBe(4);
    expect(result.initial).toBe(false);
    expect(result.set).toBe(true);
    expect(result.restored).toBe(false);
});

// The `change` event of a shadow select is not composed, so the pick is
// relayed as a composed `page-change` carrying the page number
// (paging.js:363-366).
test('dispatches page-change from the page select', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-pager');
        el.setAttribute('total-pages', '3');
        el.setPages([
            { text: '1', value: '0' },
            { text: '2', value: '10' },
            { text: '3', value: '20' }
        ]);
        document.body.appendChild(el);

        const seen = [];
        const composed = [];
        el.addEventListener('page-change', (event) => {
            seen.push(event.detail.page);
            composed.push(event.composed);
        });

        const select = el.shadowRoot.querySelector('[part="page-select"]');
        select.selectedIndex = 2;
        select.dispatchEvent(new Event('change', { bubbles: true }));

        return { seen, composed };
    }, COMPONENT);

    expect(result.seen).toEqual(['3']);
    expect(result.composed).toEqual([true]);
});

// The input variant relays Enter the same way (paging.js:319-328).
test('dispatches page-change from the page input on Enter',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-pager');
            el.setAttribute('total-pages', '5');
            el.setAttribute('selector-type', 'input');
            document.body.appendChild(el);

            const seen = [];
            el.addEventListener('page-change', (event) => {
                seen.push(event.detail.page);
            });

            const input = el.shadowRoot.querySelector('[part="page-input"]');
            input.value = '4';
            input.dispatchEvent(new KeyboardEvent('keydown', {
                key: 'Enter', bubbles: true, composed: true
            }));

            return { seen };
        }, COMPONENT);

        expect(result.seen).toEqual(['4']);
    });

// A pick that resolves to no page dispatches nothing: `page-change`
// carries a page number only.
test('dispatches no page-change when the pick resolves to no page',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-pager');
            el.setAttribute('total-pages', '3');
            el.setAttribute('selector-type', 'input');
            document.body.appendChild(el);

            const seen = [];
            el.addEventListener('page-change', (event) => {
                seen.push(event.detail.page);
            });

            const input = el.shadowRoot.querySelector('[part="page-input"]');
            input.value = '';
            input.dispatchEvent(new KeyboardEvent('keydown', {
                key: 'Enter', bubbles: true, composed: true
            }));

            el.setAttribute('selector-type', 'select');
            const select = el.shadowRoot.querySelector('[part="page-select"]');
            select.dispatchEvent(new Event('change', { bubbles: true }));

            return { seen };
        }, COMPONENT);

        expect(result.seen).toEqual([]);
    });
