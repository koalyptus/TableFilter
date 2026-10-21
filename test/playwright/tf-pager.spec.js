// Component gate (#923): the <tf-pager> element registers an open
// shadow root exposing a `nav` landmark with four semantic buttons —
// first, prev, next and last — each via its own part and each with an
// accessible name. Per the theming model (--tf-* custom properties +
// ::part()), it ships structure and hooks only: no invented classes and
// no baked-in presentational CSS. Page-number state (#924), the
// results-per-page select (#925) and the Paging bridge (#926) are
// separate tickets. Fails CI on regression.
const { test, expect } = require('@playwright/test');

const FIXTURE = '/test/test-emitter.html';
const COMPONENT = '/src/components/tf-pager.js';

const PARTS = [
    'nav',
    'first', 'first-text',
    'prev', 'prev-text',
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

test('names the landmark and every button by default',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-pager');
            document.body.appendChild(el);
            const sr = el.shadowRoot;
            const labelOf = (part) =>
                sr.querySelector(`[part="${part}"]`)
                    .getAttribute('aria-label');
            return {
                nav: labelOf('nav'),
                first: labelOf('first'),
                prev: labelOf('prev'),
                next: labelOf('next'),
                last: labelOf('last')
            };
        }, COMPONENT);

        expect(result.nav).toBe('Table pagination');
        expect(result.first).toBe('First page');
        expect(result.prev).toBe('Previous page');
        expect(result.next).toBe('Next page');
        expect(result.last).toBe('Last page');
    });

test('accessible names are overridable from attributes',
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
                next: labelOf('next')
            };
        }, COMPONENT);

        expect(result.nav).toBe('Table pages');
        expect(result.first).toBe('Go to first page');
        expect(result.next).toBe('Go to next page');
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
