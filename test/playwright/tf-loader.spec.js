// Component gates: the <tf-loader> element registers an
// open shadow root exposing the `message-slot`/`message` parts, renders
// the `text` attribute into the `message` part (or consumer content
// through the slot), and connects as a polite ARIA status region.
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
        // No classes or <style> nodes in the shadow root.
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

            return {
                assignedText: assigned.map((n) => (n.textContent || '').trim()),
                messageHidden: message.hidden,
                messageText: message.textContent
            };
        }, COMPONENT);

        expect(result.assignedText).toContain('Loading');
        // The message part hides while the slot carries element content.
        expect(result.messageHidden).toBe(true);
        // The `text` attribute still renders into the message part.
        expect(result.messageText).toBe('fallback text');
    });

test('renders a markup-valued text attribute as literal text',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-loader');
            el.setAttribute('text',
                '<img src="x" onerror="window.__pwned = true">');
            document.body.appendChild(el);

            const message =
                el.shadowRoot.querySelector('[part=message]');
            return {
                text: message.textContent,
                elements: message.querySelectorAll('*').length,
                pwned: window.__pwned === true
            };
        }, COMPONENT);

        expect(result.text)
            .toBe('<img src="x" onerror="window.__pwned = true">');
        expect(result.elements).toBe(0);
        expect(result.pwned).toBe(false);
    });

test('projects bare text through the slot and hides the fallback part',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-loader');
            el.textContent = 'Still loading\n';
            el.setAttribute('text', 'fallback text');
            document.body.appendChild(el);

            const slot =
                el.shadowRoot.querySelector('[part=message-slot]');
            const message =
                el.shadowRoot.querySelector('[part=message]');
            return {
                assignedText: slot.assignedNodes({ flatten: true })
                    .map((n) => n.textContent),
                hidden: message.hidden
            };
        }, COMPONENT);

        expect(result.assignedText.join('')).toContain('Still loading');
        expect(result.hidden).toBe(true);
    });

test('reconnecting re-enforces the live-region contract',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-loader');
            document.body.appendChild(el);
            el.setAttribute('role', 'note');
            el.setAttribute('aria-live', 'off');
            el.setAttribute('aria-atomic', 'false');
            el.remove();
            document.body.appendChild(el);
            return {
                role: el.getAttribute('role'),
                live: el.getAttribute('aria-live'),
                atomic: el.getAttribute('aria-atomic')
            };
        }, COMPONENT);

        expect(result.role).toBe('status');
        expect(result.live).toBe('polite');
        expect(result.atomic).toBe('true');
    });

test('whitespace-only and comment-only children render the text fallback',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-loader');
            el.innerHTML = '\n    <!-- loader.html placeholder -->\n';
            el.setAttribute('text', 'Loading...');
            document.body.appendChild(el);

            const message =
                el.shadowRoot.querySelector('[part=message]');
            return {
                hidden: message.hidden,
                text: message.textContent
            };
        }, COMPONENT);

        expect(result.hidden).toBe(false);
        expect(result.text).toBe('Loading...');
    });

test('slotchange toggles the message part as projected content changes',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-loader');
            el.setAttribute('text', 'fallback text');
            document.body.appendChild(el);

            const message =
                el.shadowRoot.querySelector('[part=message]');
            const visibleBefore = message.hidden;

            const strong = document.createElement('strong');
            strong.textContent = 'Loading';
            el.appendChild(strong);
            await new Promise((resolve) => setTimeout(resolve, 0));
            const hiddenWithSlot = message.hidden;

            strong.remove();
            await new Promise((resolve) => setTimeout(resolve, 0));
            const visibleAfter = message.hidden;

            return { visibleBefore, hiddenWithSlot, visibleAfter };
        }, COMPONENT);

        expect(result.visibleBefore).toBe(false);
        expect(result.hiddenWithSlot).toBe(true);
        expect(result.visibleAfter).toBe(false);
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
            // setText(0) renders '0'.
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
            tf-loader::part(message-slot) { color: rgb(9, 8, 7); }
            tf-loader::part(message) { color: rgb(1, 2, 3); }
        `;
        document.head.appendChild(style);

        const message = el.shadowRoot.querySelector('[part=message]');
        const slot = el.shadowRoot.querySelector('[part=message-slot]');
        return {
            message: getComputedStyle(message).color,
            slot: getComputedStyle(slot).color
        };
    }, COMPONENT);

    expect(result.message).toBe('rgb(1, 2, 3)');
    expect(result.slot).toBe('rgb(9, 8, 7)');
});

// The host is the live region; the shadow parts carry no ARIA
// attributes.
test('connects as a polite ARIA status live region', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-loader');
        // A consumer-set aria-live=off is corrected to polite on connect.
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
