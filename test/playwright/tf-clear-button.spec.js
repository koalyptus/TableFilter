// Component gate (#911): the <tf-clear-button> element registers an
// open shadow root exposing a semantic button via the `button` part,
// with an accessible name and native keyboard activation. Per the
// theming model (--tf-* custom properties + ::part()), it ships
// structure and hooks only: no invented classes and no baked-in
// presentational CSS. The ClearButton bridge (#912) is a separate
// ticket. Fails CI on regression.
const { test, expect } = require('@playwright/test');

const FIXTURE = '/test/test-emitter.html';
const COMPONENT = '/src/components/tf-clear-button.js';

test('registers an open shadow root exposing the button part',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const defined = Boolean(customElements.get('tf-clear-button'));
            const el = document.createElement('tf-clear-button');
            document.body.appendChild(el);
            const sr = el.shadowRoot;
            const nodes = sr ? Array.from(sr.querySelectorAll('*')) : [];
            const button = sr ? sr.querySelector('button') : null;
            return {
                defined,
                hasShadow: Boolean(sr),
                mode: sr && sr.mode,
                parts: sr ? Array.from(sr.querySelectorAll('[part]'))
                    .map((n) => n.getAttribute('part')) : [],
                hasButton: Boolean(button),
                type: button && button.getAttribute('type'),
                classless: nodes.every((n) => !n.hasAttribute('class')),
                styleless: nodes.every((n) => n.tagName !== 'STYLE')
            };
        }, COMPONENT);

        expect(result.defined).toBe(true);
        expect(result.hasShadow).toBe(true);
        expect(result.mode).toBe('open');
        expect(result.parts).toEqual(['button']);
        expect(result.hasButton).toBe(true);
        expect(result.type).toBe('button');
        expect(result.classless).toBe(true);
        expect(result.styleless).toBe(true);
    });

test('renders an accessible name from attributes and text content',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-clear-button');
            el.setAttribute('label', 'Clear filters');
            document.body.appendChild(el);
            const button = el.shadowRoot.querySelector('button');

            const fromLabel = button.getAttribute('aria-label');

            el.removeAttribute('label');
            el.setAttribute('text', 'Clear');
            const fromText = button.textContent;

            return { fromLabel, fromText };
        }, COMPONENT);

        expect(result.fromLabel).toBe('Clear filters');
        expect(result.fromText).toBe('Clear');
    });

test('setLabel() and setText() update the button', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-clear-button');
        document.body.appendChild(el);
        const button = () => el.shadowRoot.querySelector('button');

        el.setLabel('Reset');
        const label = button().getAttribute('aria-label');
        el.setText('Clear all');
        const text = button().textContent;

        return { label, text };
    }, COMPONENT);

    expect(result.label).toBe('Reset');
    expect(result.text).toBe('Clear all');
});

test('exposes ::part() styling hooks for theming', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-clear-button');
        document.body.appendChild(el);

        const style = document.createElement('style');
        style.textContent = `
            tf-clear-button::part(button) { color: rgb(1, 2, 3); }
        `;
        document.head.appendChild(style);

        const button = el.shadowRoot.querySelector('button');
        return getComputedStyle(button).color;
    }, COMPONENT);

    expect(result).toBe('rgb(1, 2, 3)');
});

test('disabled attribute is reflected onto the button', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-clear-button');
        document.body.appendChild(el);
        const button = () => el.shadowRoot.querySelector('button');

        const initial = button().hasAttribute('disabled');
        el.setAttribute('disabled', '');
        const set = button().hasAttribute('disabled');
        el.removeAttribute('disabled');
        const removed = button().hasAttribute('disabled');

        return { initial, set, removed };
    }, COMPONENT);

    expect(result.initial).toBe(false);
    expect(result.set).toBe(true);
    expect(result.removed).toBe(false);
});
