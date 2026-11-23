// Component gates: <tf-no-results> registers an open shadow root with the
// message-slot/message parts, renders the `text` attribute into the message
// part (or consumer content through the slot), and connects as a polite
// ARIA status region.
const { test, expect } = require('@playwright/test');

const FIXTURE = '/test/test-emitter.html';
const COMPONENT = '/src/components/tf-no-results.js';

test('registers an open shadow root with the message-slot/message parts',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const defined = Boolean(customElements.get('tf-no-results'));
            const el = document.createElement('tf-no-results');
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
        expect(result.classless).toBe(true);
        expect(result.styleless).toBe(true);
    });

test('renders the text attribute into the message part', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-no-results');
        el.setAttribute('text', 'No results');
        document.body.appendChild(el);

        const message = el.shadowRoot.querySelector('[part=message]');
        const read = () => ({
            text: message.textContent,
            hidden: message.hidden
        });
        const initial = read();

        el.setAttribute('text', 'Nothing found');
        const updated = read();

        el.removeAttribute('text');
        const cleared = read();

        el.setAttribute('text', '   ');
        const whitespace = read();

        return { initial, updated, cleared, whitespace };
    }, COMPONENT);

    expect(result.initial).toEqual({ text: 'No results', hidden: false });
    expect(result.updated).toEqual({ text: 'Nothing found', hidden: false });
    expect(result.cleared).toEqual({ text: '', hidden: false });
    expect(result.whitespace).toEqual({ text: '   ', hidden: false });
});

test('preserves host presentation attributes and external placement',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const container = document.createElement('div');
            container.id = 'external-message-container';
            document.body.appendChild(container);

            const el = document.createElement('tf-no-results');
            el.className = 'custom-message-class';
            el.style.color = 'rgb(4, 5, 6)';
            el.setAttribute('data-config', 'no_results_message');
            el.setAttribute('aria-label', 'Filter result');
            el.setAttribute('text', 'No results');
            container.appendChild(el);

            const read = () => ({
                className: el.className,
                color: el.style.color,
                config: el.getAttribute('data-config'),
                label: el.getAttribute('aria-label'),
                parentId: el.parentNode.id,
                text: el.shadowRoot.querySelector('[part=message]').textContent
            });
            const initial = read();

            el.setText('Still no results');
            return { initial, updated: read() };
        }, COMPONENT);

        expect(result.initial).toEqual({
            className: 'custom-message-class',
            color: 'rgb(4, 5, 6)',
            config: 'no_results_message',
            label: 'Filter result',
            parentId: 'external-message-container',
            text: 'No results'
        });
        expect(result.updated).toEqual({
            className: 'custom-message-class',
            color: 'rgb(4, 5, 6)',
            config: 'no_results_message',
            label: 'Filter result',
            parentId: 'external-message-container',
            text: 'Still no results'
        });
    });

test('renders a markup-valued text attribute as literal text',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-no-results');
            el.setAttribute('text',
                '<img src="x" onerror="window.__pwned = true">');
            document.body.appendChild(el);

            const message = el.shadowRoot.querySelector('[part=message]');
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

test('projects light DOM markup and hides the fallback message',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-no-results');
            el.innerHTML = '<strong class="custom-message">No match</strong>';
            el.setAttribute('text', 'fallback text');
            document.body.appendChild(el);

            const sr = el.shadowRoot;
            const slot = sr.querySelector('[part=message-slot]');
            const message = sr.querySelector('[part=message]');
            return {
                assignedText: slot.assignedNodes({ flatten: true })
                    .map((n) => (n.textContent || '').trim()),
                hidden: message.hidden,
                text: message.textContent
            };
        }, COMPONENT);

        expect(result.assignedText).toContain('No match');
        expect(result.hidden).toBe(true);
        expect(result.text).toBe('fallback text');
    });

test('projects bare text through the slot and hides the fallback message',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-no-results');
            el.textContent = 'No results\n';
            el.setAttribute('text', 'fallback text');
            document.body.appendChild(el);

            const sr = el.shadowRoot;
            return {
                assignedText: sr.querySelector('[part=message-slot]')
                    .assignedNodes({ flatten: true }).map((n) => n.textContent),
                hidden: sr.querySelector('[part=message]').hidden
            };
        }, COMPONENT);

        expect(result.assignedText.join('')).toContain('No results');
        expect(result.hidden).toBe(true);
    });

test('whitespace-only and comment-only children keep the text fallback',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-no-results');
            el.innerHTML = '\n    <!-- custom message placeholder -->\n';
            el.setAttribute('text', 'No results');
            document.body.appendChild(el);

            const message = el.shadowRoot.querySelector('[part=message]');
            return { hidden: message.hidden, text: message.textContent };
        }, COMPONENT);

        expect(result.hidden).toBe(false);
        expect(result.text).toBe('No results');
    });

test('slotchange toggles the message part', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-no-results');
        el.setAttribute('text', 'fallback text');
        document.body.appendChild(el);

        const message = el.shadowRoot.querySelector('[part=message]');
        const initiallyHidden = message.hidden;

        const strong = document.createElement('strong');
        strong.textContent = 'No match';
        el.appendChild(strong);
        await new Promise((resolve) => setTimeout(resolve, 0));
        const hiddenWithContent = message.hidden;

        strong.remove();
        await new Promise((resolve) => setTimeout(resolve, 0));
        const hiddenAfterRemoval = message.hidden;

        return { initiallyHidden, hiddenWithContent, hiddenAfterRemoval };
    }, COMPONENT);

    expect(result.initiallyHidden).toBe(false);
    expect(result.hiddenWithContent).toBe(true);
    expect(result.hiddenAfterRemoval).toBe(false);
});

test('setText() sets and clears the rendered message', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-no-results');
        document.body.appendChild(el);
        const read = () =>
            el.shadowRoot.querySelector('[part=message]').textContent;

        el.setText('No results');
        const set = read();
        el.setText('');
        const empty = read();
        el.setText();
        const missing = read();
        el.setText(0);
        const zero = read();

        return { set, empty, missing, zero };
    }, COMPONENT);

    expect(result.set).toBe('No results');
    expect(result.empty).toBe('');
    expect(result.missing).toBe('');
    expect(result.zero).toBe('0');
});

test('connects as a polite ARIA status live region', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-no-results');
        el.setAttribute('role', 'note');
        el.setAttribute('aria-live', 'off');
        el.setAttribute('aria-atomic', 'false');
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

test('reconnecting re-enforces the live-region contract',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-no-results');
            document.body.appendChild(el);
            el.setAttribute('role', 'alert');
            el.setAttribute('aria-live', 'assertive');
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

test('renders disconnected updates and keeps the contract while hidden',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-no-results');
            el.setAttribute('text', 'Initial');
            el.setAttribute('text', 'No results');
            document.body.appendChild(el);
            el.hidden = true;

            const message = el.shadowRoot.querySelector('[part=message]');
            const read = () => ({
                role: el.getAttribute('role'),
                live: el.getAttribute('aria-live'),
                atomic: el.getAttribute('aria-atomic'),
                hidden: el.hidden,
                text: message.textContent
            });
            const hidden = read();

            el.hidden = false;
            return { hidden, shown: read() };
        }, COMPONENT);

        expect(result.hidden).toEqual({
            role: 'status',
            live: 'polite',
            atomic: 'true',
            hidden: true,
            text: 'No results'
        });
        expect(result.shown).toEqual({
            role: 'status',
            live: 'polite',
            atomic: 'true',
            hidden: false,
            text: 'No results'
        });
    });

test('is exposed to assistive tech as a single status region',
    async ({ page }) => {
        await page.goto(FIXTURE);

        await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-no-results');
            el.setAttribute('text', 'No results');
            document.body.appendChild(el);
        }, COMPONENT);

        await expect(page.locator('tf-no-results')).toHaveRole('status');
        await expect(page.getByRole('status')).toHaveCount(1);
    });

test('exposes ::part() styling hooks for theming', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-no-results');
        el.setAttribute('text', 'No results');
        document.body.appendChild(el);

        const style = document.createElement('style');
        style.textContent = `
            tf-no-results::part(message-slot) { color: rgb(9, 8, 7); }
            tf-no-results::part(message) { color: rgb(1, 2, 3); }
        `;
        document.head.appendChild(style);

        const sr = el.shadowRoot;
        return {
            slot: getComputedStyle(
                sr.querySelector('[part=message-slot]')).color,
            message: getComputedStyle(sr.querySelector('[part=message]')).color
        };
    }, COMPONENT);

    expect(result.message).toBe('rgb(1, 2, 3)');
    expect(result.slot).toBe('rgb(9, 8, 7)');
});

test('two instances on one page render independently', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const first = document.createElement('tf-no-results');
        first.setAttribute('text', 'First');
        const second = document.createElement('tf-no-results');
        second.setAttribute('text', 'Second');
        document.body.append(first, second);

        const text = (el) => el.shadowRoot
            .querySelector('[part=message]').textContent;
        const before = { first: text(first), second: text(second) };

        second.appendChild(document.createElement('em'));
        await new Promise((resolve) => setTimeout(resolve, 0));

        return {
            before,
            after: { first: text(first), second: text(second) },
            separateRoots: first.shadowRoot !== second.shadowRoot,
            firstHidden: first.shadowRoot
                .querySelector('[part=message]').hidden,
            secondHidden: second.shadowRoot
                .querySelector('[part=message]').hidden
        };
    }, COMPONENT);

    expect(result.before).toEqual({ first: 'First', second: 'Second' });
    expect(result.after).toEqual({ first: 'First', second: 'Second' });
    expect(result.separateRoots).toBe(true);
    expect(result.firstHidden).toBe(false);
    expect(result.secondHidden).toBe(true);
});

test('upgrades declarative markup present before the module loads',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            document.body.innerHTML = `
                <tf-no-results text="No results">
                    <b>custom message</b>
                </tf-no-results>`;
            const before = document.querySelector('tf-no-results');
            const upgradedBefore = Boolean(before.shadowRoot);

            await import(component);

            const el = document.querySelector('tf-no-results');
            const message = el.shadowRoot.querySelector('[part=message]');
            return {
                upgradedBefore,
                upgradedAfter: Boolean(el.shadowRoot),
                text: message.textContent,
                hidden: message.hidden,
                role: el.getAttribute('role'),
                live: el.getAttribute('aria-live')
            };
        }, COMPONENT);

        expect(result.upgradedBefore).toBe(false);
        expect(result.upgradedAfter).toBe(true);
        expect(result.text).toBe('No results');
        expect(result.hidden).toBe(true);
        expect(result.role).toBe('status');
        expect(result.live).toBe('polite');
    });

test('importing the module again keeps a single definition',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const first = customElements.get('tf-no-results');
            let error = null;
            try {
                await import(component + '?duplicate=1');
            } catch (err) {
                error = err && err.message;
            }
            return {
                error,
                same: customElements.get('tf-no-results') === first
            };
        }, COMPONENT);

        expect(result.error).toBeNull();
        expect(result.same).toBe(true);
    });

test('does not replace an existing tf-no-results definition',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            class Stub extends HTMLElement {}
            customElements.define('tf-no-results', Stub);
            await import(component);
            return { kept: customElements.get('tf-no-results') === Stub };
        }, COMPONENT);

        expect(result.kept).toBe(true);
    });

test('does not define the element when customElements is unavailable',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            Object.defineProperty(window, 'customElements',
                { value: undefined, configurable: true });
            let error = null;
            try {
                await import(component);
            } catch (err) {
                error = err && err.message;
            }
            const state = {
                error,
                undefinedAfterImport: window.customElements === undefined
            };
            delete window.customElements;
            return state;
        }, COMPONENT);

        expect(result.error).toBeNull();
        expect(result.undefinedAfterImport).toBe(true);
    });

test('tolerates a shadow root without the message part', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-no-results');
        el.shadowRoot.querySelector('[part=message]').remove();
        el._messageEl = null;
        document.body.appendChild(el);

        let error = null;
        try {
            el.setText('No results');
            el.appendChild(document.createElement('em'));
            await new Promise((resolve) => setTimeout(resolve, 0));
        } catch (err) {
            error = err && err.message;
        }
        return {
            error,
            message: el.shadowRoot.querySelector('[part=message]')
        };
    }, COMPONENT);

    expect(result.error).toBeNull();
    expect(result.message).toBeNull();
});
