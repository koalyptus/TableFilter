// Component gates (#905): the <tf-status> scaffold registers an open
// shadow root that exposes the `label`/`message` parts and renders the
// `text`/`message` attributes statically. Per the theming model
// (--tf-* custom properties + ::part()), the component ships structure
// and hooks only: no invented classes and no baked-in presentational
// CSS. The ARIA status/live-region behaviour (#906) and the StatusBar
// bridge (#907) are separate tickets. Fails CI on regression.
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
        expect(result.parts).toEqual(['label', 'message']);
        expect(result.leakedToLightDom).toBe(false);
        // The component ships no classes and no presentational styles;
        // themes style the parts via --tf-* tokens and ::part().
        expect(result.classless).toBe(true);
        expect(result.styleless).toBe(true);
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

test('exposes ::part() styling hooks for theming', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-status');
        el.setAttribute('text', 'x');
        el.setAttribute('message', 'y');
        document.body.appendChild(el);

        const style = document.createElement('style');
        style.textContent = `
            tf-status::part(label) { color: rgb(1, 2, 3); }
            tf-status::part(message) { color: rgb(9, 8, 7); }
        `;
        document.head.appendChild(style);

        const label = el.shadowRoot.querySelector('[part=label]');
        const msg = el.shadowRoot.querySelector('[part=message]');
        return {
            label: getComputedStyle(label).color,
            message: getComputedStyle(msg).color
        };
    }, COMPONENT);

    expect(result.label).toBe('rgb(1, 2, 3)');
    expect(result.message).toBe('rgb(9, 8, 7)');
});
