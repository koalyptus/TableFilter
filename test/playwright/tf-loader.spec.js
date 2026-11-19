// Component gates (#916 scaffold): the <tf-loader> element registers an
// open shadow root exposing the `message-slot`/`message` parts and renders
// the `text` attribute statically (or consumer content through the slot),
// and its host connects as a polite ARIA status region. Per the theming
// model (--tf-* custom properties + ::part()), it ships structure and hooks
// only: no invented classes and no baked-in presentational CSS. The Loader
// bridge (#917) is a separate ticket. Fails CI on regression.
const { test, expect } = require('@playwright/test');

const FIXTURE = '/test/test-emitter.html';
const COMPONENT = '/src/components/tf-loader.js';

test('registers an open shadow root exposing the message-slot/message parts',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const defined = Boolean(customElements.get('tf-loader'));
            const el = document.createElement('tf-loader');
            document.body.appendChild(el);
            const sr = el.shadowRoot;
            const nodes = sr ? Array.from(sr.querySelectorAll('*')) : [];
            return {
                defined,
                hasShadow: Boolean(sr),
                mode: sr && sr.mode,
                parts: sr ? Array.from(sr.querySelectorAll('[part]'))
                    .map((n) => n.getAttribute('part')) : [],
                leakedToLightDom: el.querySelector('[part=message-slot]')
                    !== null,
                classless: nodes.every((n) => !n.hasAttribute('class')),
                styleless: nodes.every((n) => n.tagName !== 'STYLE')
            };
        }, COMPONENT);

        expect(result.defined).toBe(true);
        expect(result.hasShadow).toBe(true);
        expect(result.mode).toBe('open');
        expect(result.parts).toEqual(['message-slot', 'message']);
        expect(result.leakedToLightDom).toBe(false);
        // The component ships no classes and no presentational styles;
        // themes style the parts via --tf-* tokens and ::part().
        expect(result.classless).toBe(true);
        expect(result.styleless).toBe(true);
    });

test('renders the text attribute into the message part',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-loader');
            el.setAttribute('text', 'Loading...');
            document.body.appendChild(el);

            const sr = el.shadowRoot;
            const read = () => ({
                message: sr.querySelector('[part=message]').textContent,
                messageVisible: !sr.querySelector('[part=message]').hidden
            });
            const initial = read();

            el.setAttribute('text', 'Working');
            const updated = read();

            el.removeAttribute('text');
            const cleared = read();

            return { initial, updated, cleared };
        }, COMPONENT);

        expect(result.initial).toEqual({
            message: 'Loading...',
            messageVisible: true
        });
        expect(result.updated).toEqual({
            message: 'Working',
            messageVisible: true
        });
        expect(result.cleared).toEqual({
            message: '',
            messageVisible: true
        });
    });

test('projects light DOM content through the slot and hides the message part',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-loader');
            el.innerHTML = '<strong class="loading-markup">Loading</strong>';
            el.setAttribute('text', 'fallback text');
            document.body.appendChild(el);

            const sr = el.shadowRoot;
            const slot = sr.querySelector('[part=message-slot]');
            const message = sr.querySelector('[part=message]');
            const assigned = slot.assignedNodes({ flatten: true });
            const hasMarkup = el.innerHTML.indexOf('loading-markup') !== -1;

            return {
                assignedText: assigned.map((n) => (n.textContent || '').trim()),
                hasMarkup,
                messageHidden: message.hidden,
                messageText: message.textContent
            };
        }, COMPONENT);

        expect(result.hasMarkup).toBe(true);
        expect(result.assignedText).toContain('Loading');
        // The element-rendered fallback hides when slotted content is
        // present.
        expect(result.messageHidden).toBe(true);
        // The attribute text is still reflected on the part for the
        // bridge and tests that read it.
        expect(result.messageText).toBe('fallback text');
    });

test('setText() sets and clears the rendered message',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-loader');
            document.body.appendChild(el);
            const msg = () =>
                el.shadowRoot.querySelector('[part=message]').textContent;

            el.setText('Filtering...');
            const set = msg();
            el.setText('');
            const empty = msg();
            el.setText();
            const missing = msg();
            // A falsy non-string must render, not be dropped.
            el.setText(0);
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
        const el = document.createElement('tf-loader');
        el.setAttribute('text', 'x');
        document.body.appendChild(el);

        const style = document.createElement('style');
        style.textContent = `
            tf-loader::part(message) { color: rgb(1, 2, 3); }
        `;
        document.head.appendChild(style);

        const message = el.shadowRoot.querySelector('[part=message]');
        return {
            message: getComputedStyle(message).color
        };
    }, COMPONENT);

    expect(result.message).toBe('rgb(1, 2, 3)');
});

// The host is the live region. `role="status"` implies polite and
// atomic, so they are set (not defaulted) on connect and a consumer's
// value is corrected; the shadow parts stay ARIA-free so a message
// change is announced once, not twice.
test('connects as a polite ARIA status live region', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-loader');
        // Enforcement, not a default: a wrong consumer value is fixed.
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

test('is exposed to assistive tech as a single status region',
    async ({ page }) => {
        await page.goto(FIXTURE);

        await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-loader');
            el.setAttribute('text', 'Loading...');
            document.body.appendChild(el);
        }, COMPONENT);

        await expect(page.locator('tf-loader')).toHaveRole('status');
        await expect(page.getByRole('status')).toHaveCount(1);
    });
