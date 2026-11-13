// Component gate (#913): the <tf-help> element registers an open shadow
// root with a trigger button and a modal <dialog>, exposes structure
// through `part` hooks and stays free of invented classes and
// presentational CSS. Every configurable string (trigger text, button
// name, instructions text, dialog name, close text) renders only from
// its attribute, so the legacy defaults stay in the Help module and the
// bridge (#915) maps them. Focus return (#914) and the Help bridge
// (#915) are separate tickets. Fails CI on regression.
const { test, expect } = require('@playwright/test');

const FIXTURE = '/test/test-emitter.html';
const COMPONENT = '/src/components/tf-help.js';

const PARTS = [
    'trigger', 'trigger-text',
    'dialog',
    'instructions', 'instructions-text',
    'close', 'close-text'
];

test('registers an open shadow root exposing the dialog parts',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const defined = Boolean(customElements.get('tf-help'));
            const el = document.createElement('tf-help');
            document.body.appendChild(el);
            const sr = el.shadowRoot;
            const nodes = sr ? Array.from(sr.querySelectorAll('*')) : [];
            const dialog = sr ? sr.querySelector('[part="dialog"]') : null;
            const trigger = sr ? sr.querySelector('[part="trigger"]') : null;
            return {
                defined,
                hasShadow: Boolean(sr),
                mode: sr && sr.mode,
                parts: sr ? Array.from(sr.querySelectorAll('[part]'))
                    .map((n) => n.getAttribute('part')) : [],
                dialogTag: dialog && dialog.tagName,
                dialogOpen: dialog && dialog.open,
                triggerTag: trigger && trigger.tagName,
                triggerType: trigger && trigger.getAttribute('type'),
                expanded: trigger && trigger.getAttribute('aria-expanded'),
                hasPopup: trigger && trigger.getAttribute('aria-haspopup'),
                controls: trigger && trigger.getAttribute('aria-controls'),
                classless: nodes.every((n) => !n.hasAttribute('class')),
                styleless: nodes.every((n) => n.tagName !== 'STYLE')
            };
        }, COMPONENT);

        expect(result.defined).toBe(true);
        expect(result.hasShadow).toBe(true);
        expect(result.mode).toBe('open');
        expect(result.parts).toEqual(PARTS);
        expect(result.dialogTag).toBe('DIALOG');
        expect(result.dialogOpen).toBe(false);
        expect(result.triggerTag).toBe('BUTTON');
        expect(result.triggerType).toBe('button');
        expect(result.expanded).toBe('false');
        expect(result.hasPopup).toBe('dialog');
        expect(result.controls).toBe('dialog');
        expect(result.classless).toBe(true);
        expect(result.styleless).toBe(true);
    });

test('projects trigger markup through the trigger slot',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-help');
            el.innerHTML = '<a href="#" data-control>Help</a>';
            el.querySelector('[data-control]').slot = 'trigger';
            document.body.appendChild(el);
            await new Promise((resolve) => setTimeout(resolve, 0));

            const slot = el.shadowRoot
                .querySelector('slot[name="trigger"]');
            const assigned = slot.assignedElements();
            const state = {
                count: assigned.length,
                tag: assigned[0] && assigned[0].tagName
            };
            el.remove();
            return state;
        }, COMPONENT);

        expect(result.count).toBe(1);
        expect(result.tag).toBe('A');
    });

test('opens the dialog from the trigger', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-help');
        document.body.appendChild(el);
        const sr = el.shadowRoot;
        const dialog = sr.querySelector('[part="dialog"]');
        const trigger = sr.querySelector('[part="trigger"]');

        trigger.click();
        const state = {
            open: dialog.open,
            attr: el.hasAttribute('open'),
            expanded: trigger.getAttribute('aria-expanded'),
            modal: dialog.matches(':modal')
        };
        el.remove();
        return state;
    }, COMPONENT);

    expect(result.open).toBe(true);
    expect(result.attr).toBe(true);
    expect(result.expanded).toBe('true');
    expect(result.modal).toBe(true);
});

test('the close control closes the dialog', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-help');
        document.body.appendChild(el);
        const sr = el.shadowRoot;
        const dialog = sr.querySelector('[part="dialog"]');
        const trigger = sr.querySelector('[part="trigger"]');
        const close = sr.querySelector('[part="close"]');

        el.setOpen(true);
        const opened = dialog.open;
        close.click();
        const state = {
            opened,
            open: dialog.open,
            attr: el.hasAttribute('open'),
            expanded: trigger.getAttribute('aria-expanded')
        };
        el.remove();
        return state;
    }, COMPONENT);

    expect(result.opened).toBe(true);
    expect(result.open).toBe(false);
    expect(result.attr).toBe(false);
    expect(result.expanded).toBe('false');
});

test('the open attribute drives the dialog state', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-help');
        el.setAttribute('open', '');
        document.body.appendChild(el);
        const dialog = el.shadowRoot.querySelector('[part="dialog"]');

        const declared = dialog.open;

        el.removeAttribute('open');
        const closed = dialog.open;

        el.setOpen(true);
        const reopened = dialog.open;

        el.setOpen(false);
        const cleared = dialog.open;

        el.remove();
        return { declared, closed, reopened, cleared };
    }, COMPONENT);

    expect(result).toEqual({
        declared: true,
        closed: false,
        reopened: true,
        cleared: false
    });
});

test('dispatches open-change across the shadow boundary',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-help');
            document.body.appendChild(el);
            const sr = el.shadowRoot;
            const trigger = sr.querySelector('[part="trigger"]');
            const close = sr.querySelector('[part="close"]');

            const seen = [];
            document.addEventListener('open-change', (event) => seen.push({
                open: event.detail.open,
                bubbles: event.bubbles,
                composed: event.composed
            }));

            trigger.click();
            close.click();
            el.remove();
            return seen;
        }, COMPONENT);

        expect(result).toEqual([
            { open: true, bubbles: true, composed: true },
            { open: false, bubbles: true, composed: true }
        ]);
    });

test('names the dialog from dialog-label or from the trigger',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-help');
            document.body.appendChild(el);
            const dialog = () => el.shadowRoot
                .querySelector('[part="dialog"]');
            const state = () => ({
                label: dialog().getAttribute('aria-label'),
                labelledby: dialog().getAttribute('aria-labelledby')
            });

            const initial = state();

            el.setAttribute('dialog-label', 'Filter instructions');
            const configured = state();

            el.removeAttribute('dialog-label');
            const cleared = state();

            el.remove();
            return { initial, configured, cleared };
        }, COMPONENT);

        expect(result).toEqual({
            initial: { label: null, labelledby: 'trigger' },
            configured: {
                label: 'Filter instructions', labelledby: null
            },
            cleared: { label: null, labelledby: 'trigger' }
        });
    });

test('renders the trigger text and accessible name from attributes',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-help');
            document.body.appendChild(el);
            const sr = el.shadowRoot;
            const trigger = () => sr.querySelector('[part="trigger"]');
            const text = () => sr.querySelector('[part="trigger-text"]')
                .textContent;

            const initial = {
                text: text(),
                label: trigger().getAttribute('aria-label')
            };

            el.setAttribute('label', 'Help');
            el.setTriggerText('?');
            const configured = {
                text: text(),
                label: trigger().getAttribute('aria-label')
            };

            el.setAttribute('label', '');
            el.setTriggerText('');
            const cleared = {
                text: text(),
                label: trigger().getAttribute('aria-label')
            };

            el.remove();
            return { initial, configured, cleared };
        }, COMPONENT);

        expect(result.initial).toEqual({ text: '', label: null });
        expect(result.configured).toEqual({ text: '?', label: 'Help' });
        expect(result.cleared).toEqual({ text: '', label: null });
    });

test('renders instructions text as text content', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-help');
        document.body.appendChild(el);
        const node = () =>
            el.shadowRoot.querySelector('[part="instructions-text"]');

        const initial = node().textContent;

        el.setAttribute('instructions-text', '<b>Use</b> operators');
        const configured = node().textContent;
        const markup = node().querySelector('b');

        el.removeAttribute('instructions-text');
        const cleared = node().textContent;

        el.remove();
        return {
            initial, configured, markup: Boolean(markup), cleared
        };
    }, COMPONENT);

    expect(result.initial).toBe('');
    expect(result.configured).toBe('<b>Use</b> operators');
    expect(result.markup).toBe(false);
    expect(result.cleared).toBe('');
});

test('projects instructions markup through the instructions slot',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-help');
            el.innerHTML = '<p data-instructions><b>Operators</b></p>';
            el.querySelector('[data-instructions]').slot = 'instructions';
            document.body.appendChild(el);
            await new Promise((resolve) => setTimeout(resolve, 0));

            const slot = el.shadowRoot
                .querySelector('slot[name="instructions"]');
            const assigned = slot.assignedElements();
            el.remove();
            return {
                count: assigned.length,
                tag: assigned[0] && assigned[0].tagName,
                html: assigned[0] && assigned[0].innerHTML
            };
        }, COMPONENT);

        expect(result.count).toBe(1);
        expect(result.tag).toBe('P');
        expect(result.html).toBe('<b>Operators</b>');
    });

test('renders the close control text from the attribute',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-help');
            document.body.appendChild(el);
            const node = () =>
                el.shadowRoot.querySelector('[part="close-text"]');

            const initial = node().textContent;
            el.setAttribute('close-text', 'Dismiss');
            const configured = node().textContent;
            el.removeAttribute('close-text');
            const cleared = node().textContent;

            el.remove();
            return { initial, configured, cleared };
        }, COMPONENT);

        expect(result).toEqual({
            initial: '',
            configured: 'Dismiss',
            cleared: ''
        });
    });

test('disabled prevents the trigger from opening the dialog',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-help');
            document.body.appendChild(el);
            const sr = el.shadowRoot;
            const dialog = sr.querySelector('[part="dialog"]');
            const trigger = sr.querySelector('[part="trigger"]');

            el.setAttribute('disabled', '');
            const disabled = trigger.hasAttribute('disabled');
            trigger.click();
            const blocked = dialog.open;

            el.removeAttribute('disabled');
            trigger.click();
            const opened = dialog.open;

            el.remove();
            return { disabled, blocked, opened };
        }, COMPONENT);

        expect(result.disabled).toBe(true);
        expect(result.blocked).toBe(false);
        expect(result.opened).toBe(true);
    });

test('exposes ::part() styling hooks for the dialog', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-help');
        document.body.appendChild(el);

        const style = document.createElement('style');
        style.textContent = `
            tf-help::part(trigger) { color: rgb(1, 2, 3); }
            tf-help::part(dialog) { color: rgb(9, 8, 7); }
            tf-help::part(close-text) { color: rgb(4, 5, 6); }
        `;
        document.head.appendChild(style);

        const sr = el.shadowRoot;
        const colorOf = (part) => getComputedStyle(
            sr.querySelector(`[part="${part}"]`)).color;
        const state = {
            trigger: colorOf('trigger'),
            dialog: colorOf('dialog'),
            close: colorOf('close-text')
        };
        el.remove();
        return state;
    }, COMPONENT);

    expect(result).toEqual({
        trigger: 'rgb(1, 2, 3)',
        dialog: 'rgb(9, 8, 7)',
        close: 'rgb(4, 5, 6)'
    });
});

test('removing the element closes an open dialog', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-help');
        document.body.appendChild(el);
        el.setOpen(true);
        const dialog = el.shadowRoot.querySelector('[part="dialog"]');
        const opened = dialog.open;
        el.remove();
        return { opened, closed: dialog.open };
    }, COMPONENT);

    expect(result.opened).toBe(true);
    expect(result.closed).toBe(false);
});
