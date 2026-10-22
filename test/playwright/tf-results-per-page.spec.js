// Component gate (#925): the <tf-results-per-page> element registers an
// open shadow root exposing a <label> that wraps the label text and a
// native <select>, so the rendered text is the select's accessible name
// and activating the text focuses it. Legacy keeps the text in a sibling
// <span> and names the select nowhere (paging.js:662-669). Per the
// theming model (--tf-* custom properties + ::part()), it ships structure
// and hooks only: no invented classes and no baked-in presentational
// CSS. The option list and all page-length arithmetic stay with the
// host (#926). Fails CI on regression.
const { test, expect } = require('@playwright/test');
const { scanAccessibility } = require('./axeScan');

const FIXTURE = '/test/test-emitter.html';
const COMPONENT = '/src/components/tf-results-per-page.js';

// Document order, matching the shadow template.
const PARTS = ['results-label', 'results-text', 'results-select'];

test('registers an open shadow root exposing the label parts',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const defined = Boolean(customElements.get('tf-results-per-page'));
            const el = document.createElement('tf-results-per-page');
            document.body.appendChild(el);
            const sr = el.shadowRoot;
            const nodes = sr ? Array.from(sr.querySelectorAll('*')) : [];
            const label = sr.querySelector('[part="results-label"]');
            const select = sr.querySelector('[part="results-select"]');
            return {
                defined,
                hasShadow: Boolean(sr),
                mode: sr && sr.mode,
                parts: sr ? Array.from(sr.querySelectorAll('[part]'))
                    .map((n) => n.getAttribute('part')) : [],
                labelTag: label.tagName.toLowerCase(),
                selectTag: select.tagName.toLowerCase(),
                wraps: label.contains(select),
                classless: nodes.every((n) => !n.hasAttribute('class')),
                styleless: nodes.every((n) => n.tagName !== 'STYLE')
            };
        }, COMPONENT);

        expect(result.defined).toBe(true);
        expect(result.hasShadow).toBe(true);
        expect(result.mode).toBe('open');
        expect(result.parts).toEqual(PARTS);
        expect(result.labelTag).toBe('label');
        expect(result.selectTag).toBe('select');
        expect(result.wraps).toBe(true);
        expect(result.classless).toBe(true);
        expect(result.styleless).toBe(true);
    });

test('names the select from the text its label renders',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-results-per-page');
            el.setAttribute('results-text', 'Records: ');
            document.body.appendChild(el);
            el.setPageLengths([10, 25]);

            const sr = el.shadowRoot;
            const label = sr.querySelector('[part="results-label"]');
            const textEl = sr.querySelector('[part="results-text"]');
            const select = sr.querySelector('[part="results-select"]');
            // The label is the select's own label only when it contains
            // the control, which is what makes the text its accessible
            // name and makes the text focus it.
            label.click();
            // Option text sits inside the select and contributes nothing
            // to the name, so measure the label without that subtree.
            const withoutSelect = label.cloneNode(true);
            withoutSelect.querySelector('select').remove();
            return {
                text: textEl.textContent,
                stray: withoutSelect.textContent
                    .split(textEl.textContent).join(''),
                wraps: label.contains(select),
                focused: sr.activeElement === select,
                ariaLabel: select.getAttribute('aria-label')
            };
        }, COMPONENT);

        expect(result.text).toBe('Records: ');
        expect(result.stray.trim()).toBe('');
        expect(result.wraps).toBe(true);
        expect(result.focused).toBe(true);
        // The visible text is the name, so nothing overrides it.
        expect(result.ariaLabel).toBeNull();
    });

test('falls back to the default name when no label text is set',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-results-per-page');
            document.body.appendChild(el);
            const select = el.shadowRoot.querySelector(
                '[part="results-select"]');
            const read = () => select.getAttribute('aria-label');

            const unset = read();
            el.setAttribute('results-text', '');
            const empty = read();
            el.setText('Records: ');
            const text = read();
            el.setAttribute('results-text', '');
            const cleared = read();

            return { unset, empty, text, cleared };
        }, COMPONENT);

        expect(result.unset).toBe('Rows per page');
        expect(result.empty).toBe('Rows per page');
        expect(result.text).toBeNull();
        expect(result.cleared).toBe('Rows per page');
    });

test('renders results-text as text content', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-results-per-page');
        el.setAttribute('results-text', '<b>Records</b>');
        document.body.appendChild(el);

        const sr = el.shadowRoot;
        const textEl = sr.querySelector('[part="results-text"]');
        return {
            text: textEl.textContent,
            hasElement: Boolean(textEl.querySelector('b')),
            html: textEl.innerHTML
        };
    }, COMPONENT);

    expect(result.text).toBe('<b>Records</b>');
    expect(result.hasElement).toBe(false);
    expect(result.html).toBe('&lt;b&gt;Records&lt;/b&gt;');
});

test('builds the options from the host-supplied page lengths',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-results-per-page');
            document.body.appendChild(el);
            // Legacy option model: value and text are both the number
            // (paging.js:681).
            el.setPageLengths([10, 25, 50]);
            const select = el.shadowRoot.querySelector(
                '[part="results-select"]');
            const options = Array.from(select.querySelectorAll('option'));
            return {
                count: options.length,
                texts: options.map((o) => o.textContent),
                values: options.map((o) => o.value)
            };
        }, COMPONENT);

        expect(result.count).toBe(3);
        expect(result.texts).toEqual(['10', '25', '50']);
        expect(result.values).toEqual(['10', '25', '50']);
    });

test('clears the option list for a non-array passed to setPageLengths()',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-results-per-page');
            document.body.appendChild(el);
            const count = () => el.shadowRoot
                .querySelector('[part="results-select"]')
                .querySelectorAll('option').length;
            const counts = [];
            el.setPageLengths([10, 25]);
            counts.push(count());
            el.setPageLengths('10,25');
            counts.push(count());
            el.setPageLengths(null);
            counts.push(count());
            return { counts };
        }, COMPONENT);

        // A valid list renders, and each non-array call clears it rather
        // than leaving a stale or half-built list behind.
        expect(result.counts).toEqual([2, 0, 0]);
    });

test('selects the option matching page-length', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-results-per-page');
        el.setAttribute('page-length', '25');
        document.body.appendChild(el);
        el.setPageLengths([10, 25, 50]);
        const select = el.shadowRoot.querySelector('[part="results-select"]');
        return {
            selectedIndex: select.selectedIndex,
            value: select.value
        };
    }, COMPONENT);

    expect(result.selectedIndex).toBe(1);
    expect(result.value).toBe('25');
});

test('selects the first option when page-length is empty or unmatched',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const empty = document.createElement('tf-results-per-page');
            document.body.appendChild(empty);
            empty.setPageLengths([10, 25, 50]);

            const unmatched = document.createElement('tf-results-per-page');
            unmatched.setAttribute('page-length', '999');
            document.body.appendChild(unmatched);
            unmatched.setPageLengths([10, 25, 50]);

            const read = (el) => {
                const select = el.shadowRoot.querySelector(
                    '[part="results-select"]');
                return {
                    selectedIndex: select.selectedIndex,
                    value: select.value,
                    pageLength: el.getAttribute('page-length')
                };
            };
            return { empty: read(empty), unmatched: read(unmatched) };
        }, COMPONENT);

        expect(result.empty.selectedIndex).toBe(0);
        expect(result.empty.value).toBe('10');
        expect(result.unmatched.selectedIndex).toBe(0);
        expect(result.unmatched.value).toBe('10');
        // The option that ended up selected is reflected back, so the
        // attribute and the control cannot disagree.
        expect(result.empty.pageLength).toBe('10');
        expect(result.unmatched.pageLength).toBe('10');
    });

test('keeps a picked length across a later render', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-results-per-page');
        el.setAttribute('page-length', '10');
        document.body.appendChild(el);
        el.setPageLengths([10, 25, 50]);
        const select = el.shadowRoot.querySelector('[part="results-select"]');

        let picked = null;
        el.addEventListener('page-length-change',
            (e) => { picked = e.detail; });
        select.value = '25';
        select.dispatchEvent(new Event('change'));
        const afterPick = {
            pageLength: el.getAttribute('page-length'),
            value: select.value
        };

        // Any later render must not discard the pick.
        el.setAttribute('results-text', 'Records: ');
        const afterRender = {
            pageLength: el.getAttribute('page-length'),
            value: select.value
        };

        return { picked, afterPick, afterRender };
    }, COMPONENT);

    expect(result.picked).toEqual({ pageLength: '25' });
    expect(result.afterPick).toEqual({ pageLength: '25', value: '25' });
    expect(result.afterRender).toEqual({ pageLength: '25', value: '25' });
});

test('setText() and setPageLength() update the element', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-results-per-page');
        document.body.appendChild(el);
        el.setPageLengths([10, 25, 50]);
        el.setText('Rows per page');
        el.setPageLength(50);
        const sr = el.shadowRoot;
        const select = sr.querySelector('[part="results-select"]');
        return {
            text: sr.querySelector('[part="results-text"]').textContent,
            selectedIndex: select.selectedIndex,
            value: select.value
        };
    }, COMPONENT);

    expect(result.text).toBe('Rows per page');
    expect(result.selectedIndex).toBe(2);
    expect(result.value).toBe('50');
});

test('dispatches page-length-change across the shadow boundary',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-results-per-page');
            document.body.appendChild(el);
            el.setPageLengths([10, 25, 50]);

            let onHost = null;
            let onDocument = null;
            el.addEventListener('page-length-change',
                (e) => { onHost = e.detail; });
            document.addEventListener('page-length-change',
                (e) => { onDocument = e.detail; });

            const select = el.shadowRoot.querySelector(
                '[part="results-select"]');
            select.value = '25';
            select.dispatchEvent(new Event('change'));

            return { onHost, onDocument };
        }, COMPONENT);

        // The native `change` event is not composed, so the composed
        // CustomEvent is what lets the host observe a pick.
        expect(result.onHost).toEqual({ pageLength: '25' });
        expect(result.onDocument).toEqual({ pageLength: '25' });
    });

test('exposes ::part() styling hooks for theming', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-results-per-page');
        document.body.appendChild(el);

        const style = document.createElement('style');
        style.textContent = `
            tf-results-per-page::part(results-label) { display: flex; }
            tf-results-per-page::part(results-select) {
                color: rgb(1, 2, 3);
            }
        `;
        document.head.appendChild(style);

        const sr = el.shadowRoot;
        return {
            display: getComputedStyle(
                sr.querySelector('[part=results-label]')).display,
            color: getComputedStyle(
                sr.querySelector('[part=results-select]')).color
        };
    }, COMPONENT);

    expect(result.display).toBe('flex');
    expect(result.color).toBe('rgb(1, 2, 3)');
});

// The element exists to name its select, so a scan over both name paths
// (host-supplied text and the default) is what fails CI if a refactor
// drops the label. Scoped to its own wrapper so unrelated page findings
// do not mask a regression here.
test('passes a scoped axe scan', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    await page.goto(FIXTURE);

    await page.evaluate(async (component) => {
        await import(component);
        const scope = document.createElement('div');
        scope.id = 'tf-rpp-scope';
        document.body.appendChild(scope);

        const labelled = document.createElement('tf-results-per-page');
        labelled.setAttribute('results-text', 'Records: ');
        scope.appendChild(labelled);
        labelled.setPageLengths([10, 25, 50]);

        const unlabelled = document.createElement('tf-results-per-page');
        scope.appendChild(unlabelled);
        unlabelled.setPageLengths([10, 25, 50]);
    }, COMPONENT);

    const violations = await scanAccessibility(
        page, testInfo, 'tf-results-per-page',
        { include: '#tf-rpp-scope' }
    );

    expect(
        violations.map((v) => `${v.id}: ${v.nodes.length} node(s)`)
    ).toEqual([]);
});
