// Component gates (#905): the <tf-status> scaffold registers an open
// shadow root that exposes the `label`/`message` parts and renders the
// `text`/`message` attributes statically. The ARIA status/live-region
// behaviour (#906) and the StatusBar bridge (#907) are separate
// tickets. Fails CI on regression.
const { test, expect } = require('@playwright/test');

const FIXTURE = '/test/test-emitter.html';
const COMPONENT = '/src/components/tf-status.js';

test('registers an open shadow root exposing the label/message parts',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const defined = Boolean(customElements.get('tf-status'));
            const el = document.createElement('tf-status');
            // The container class is configurable (status_bar.css_class,
            // default 'status') and supplied on the host by the bridge,
            // never invented in the shadow (#907).
            el.className = 'status';
            document.body.appendChild(el);
            const sr = el.shadowRoot;
            return {
                defined,
                hasShadow: Boolean(sr),
                mode: sr && sr.mode,
                parts: sr ? Array.from(sr.querySelectorAll('[part]'))
                    .map((n) => n.getAttribute('part')) : [],
                leakedToLightDom: el.querySelector('[part=label]') !== null,
                shadowHasClass: sr ?
                    Array.from(sr.querySelectorAll('*'))
                        .some((n) => n.hasAttribute('class')) : true,
                hostClass: el.className
            };
        }, COMPONENT);

        expect(result.defined).toBe(true);
        expect(result.hasShadow).toBe(true);
        expect(result.mode).toBe('open');
        expect(result.parts).toEqual(['label', 'message']);
        expect(result.leakedToLightDom).toBe(false);
        expect(result.shadowHasClass).toBe(false);
        expect(result.hostClass).toBe('status');
    });

test('renders the text and message attributes into the shadow parts',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-status');
            el.setAttribute('text', 'Rows:');
            el.setAttribute('message', '1 176');
            document.body.appendChild(el);

            const sr = el.shadowRoot;
            const read = () => ({
                label: sr.querySelector('[part=label]').textContent,
                message: sr.querySelector('[part=message]').textContent
            });
            const initial = read();

            el.setAttribute('message', '42');
            const updated = read();

            el.removeAttribute('text');
            const cleared = read();

            return { initial, updated, cleared };
        }, COMPONENT);

        expect(result.initial).toEqual({ label: 'Rows:', message: '1 176' });
        expect(result.updated).toEqual({ label: 'Rows:', message: '42' });
        expect(result.cleared).toEqual({ label: '', message: '42' });
    });

test('setMessage() sets and clears the rendered message',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-status');
            document.body.appendChild(el);
            const msg = () =>
                el.shadowRoot.querySelector('[part=message]').textContent;

            el.setMessage('Filtering...');
            const set = msg();
            el.setMessage('');
            const empty = msg();
            el.setMessage();
            const missing = msg();
            // A falsy non-string must render, not be dropped.
            el.setMessage(0);
            const zero = msg();

            return { set, empty, missing, zero };
        }, COMPONENT);

        expect(result.set).toBe('Filtering...');
        expect(result.empty).toBe('');
        expect(result.missing).toBe('');
        expect(result.zero).toBe('0');
    });

test('exposes ::part() styling hooks', async ({ page }) => {
    await page.goto(FIXTURE);

    const color = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-status');
        el.setAttribute('text', 'x');
        document.body.appendChild(el);

        const style = document.createElement('style');
        style.textContent =
            'tf-status::part(label) { color: rgb(1, 2, 3); }';
        document.head.appendChild(style);

        const label = el.shadowRoot.querySelector('[part=label]');
        return getComputedStyle(label).color;
    }, COMPONENT);

    expect(color).toBe('rgb(1, 2, 3)');
});

test('honours the --tf-status-color custom property', async ({ page }) => {
    await page.goto(FIXTURE);

    const color = await page.evaluate(async (component) => {
        await import(component);
        document.body.style.setProperty('--tf-status-color', 'rgb(9, 8, 7)');
        const el = document.createElement('tf-status');
        el.setAttribute('message', 'x');
        document.body.appendChild(el);
        const msg = el.shadowRoot.querySelector('[part=message]');
        return getComputedStyle(msg).color;
    }, COMPONENT);

    expect(color).toBe('rgb(9, 8, 7)');
});
