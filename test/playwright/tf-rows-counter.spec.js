// Component gate (#909): the <tf-rows-counter> element registers an
// open shadow root exposing the `label`/`count` parts and renders the
// `text`/`count` attributes statically. Per the theming model
// (--tf-* custom properties + ::part()), it ships structure and hooks
// only: no invented classes and no baked-in presentational CSS. The
// RowsCounter bridge (#910) is a separate ticket. Fails CI on regression.
const { test, expect } = require('@playwright/test');

const FIXTURE = '/test/test-emitter.html';
const COMPONENT = '/src/components/tf-rows-counter.js';

test('registers an open shadow root exposing the label/count parts',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const defined = Boolean(customElements.get('tf-rows-counter'));
            const el = document.createElement('tf-rows-counter');
            document.body.appendChild(el);
            const sr = el.shadowRoot;
            const nodes = sr ? Array.from(sr.querySelectorAll('*')) : [];
            return {
                defined,
                hasShadow: Boolean(sr),
                mode: sr && sr.mode,
                parts: sr ? Array.from(sr.querySelectorAll('[part]'))
                    .map((n) => n.getAttribute('part')) : [],
                leakedToLightDom: el.querySelector('[part=label]') !== null,
                classless: nodes.every((n) => !n.hasAttribute('class')),
                styleless: nodes.every((n) => n.tagName !== 'STYLE')
            };
        }, COMPONENT);

        expect(result.defined).toBe(true);
        expect(result.hasShadow).toBe(true);
        expect(result.mode).toBe('open');
        expect(result.parts).toEqual(['label', 'count']);
        expect(result.leakedToLightDom).toBe(false);
        expect(result.classless).toBe(true);
        expect(result.styleless).toBe(true);
    });

test('renders the text and count attributes into the shadow parts',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-rows-counter');
            el.setAttribute('text', 'Rows:');
            el.setAttribute('count', '7');
            document.body.appendChild(el);

            const sr = el.shadowRoot;
            const read = () => ({
                label: sr.querySelector('[part=label]').textContent,
                count: sr.querySelector('[part=count]').textContent
            });
            const initial = read();

            el.setAttribute('count', '4');
            const updated = read();

            el.removeAttribute('text');
            const cleared = read();

            return { initial, updated, cleared };
        }, COMPONENT);

        expect(result.initial).toEqual({ label: 'Rows:', count: '7' });
        expect(result.updated).toEqual({ label: 'Rows:', count: '4' });
        expect(result.cleared).toEqual({ label: '', count: '4' });
    });

test('setCount() sets and clears the rendered count', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-rows-counter');
        document.body.appendChild(el);
        const count = () =>
            el.shadowRoot.querySelector('[part=count]').textContent;

        el.setCount('Filtering...');
        const set = count();
        el.setCount('');
        const empty = count();
        el.setCount();
        const missing = count();
        el.setCount(0);
        const zero = count();

        return { set, empty, missing, zero };
    }, COMPONENT);

    expect(result.set).toBe('Filtering...');
    expect(result.empty).toBe('');
    expect(result.missing).toBe('');
    expect(result.zero).toBe('0');
});

test('exposes ::part() styling hooks for theming', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-rows-counter');
        el.setAttribute('text', 'x');
        el.setAttribute('count', 'y');
        document.body.appendChild(el);

        const style = document.createElement('style');
        style.textContent = `
            tf-rows-counter::part(label) { color: rgb(1, 2, 3); }
            tf-rows-counter::part(count) { color: rgb(9, 8, 7); }
        `;
        document.head.appendChild(style);

        const label = el.shadowRoot.querySelector('[part=label]');
        const cnt = el.shadowRoot.querySelector('[part=count]');
        return {
            label: getComputedStyle(label).color,
            count: getComputedStyle(cnt).color
        };
    }, COMPONENT);

    expect(result.label).toBe('rgb(1, 2, 3)');
    expect(result.count).toBe('rgb(9, 8, 7)');
});

// Live region: the counter announces count changes (ROADMAP: live region).
test('connects as a polite ARIA status live region', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-rows-counter');
        el.setAttribute('aria-live', 'off');
        document.body.appendChild(el);
        return {
            role: el.getAttribute('role'),
            live: el.getAttribute('aria-live'),
            atomic: el.getAttribute('aria-atomic'),
            nestedAria: el.shadowRoot.querySelectorAll(
                '[role], [aria-live], [aria-atomic]'
            ).length
        };
    }, COMPONENT);

    expect(result.role).toBe('status');
    expect(result.live).toBe('polite');
    expect(result.atomic).toBe('true');
    expect(result.nestedAria).toBe(0);
});

test('is exposed to assistive tech as one status region', async ({ page }) => {
    await page.goto(FIXTURE);

    await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-rows-counter');
        el.setAttribute('text', 'Rows:');
        el.setAttribute('count', '42');
        document.body.appendChild(el);
    }, COMPONENT);

    await expect(page.locator('tf-rows-counter')).toHaveRole('status');
    const statusRegions = page.getByRole('status');
    await expect(statusRegions).toHaveCount(1);
});
