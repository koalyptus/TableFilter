// Component gate: the <tf-help> element registers an open shadow root
// with a trigger control and a modal <dialog>, exposes structure through
// `part` hooks and stays free of classes and presentational CSS. A
// slotted trigger control is the control; with no slotted control the
// element renders its own button. Fails CI on regression.
const { test, expect } = require('@playwright/test');
const { scanAccessibility } = require('./axeScan');

const FIXTURE = '/test/test-emitter.html';
const COMPONENT = '/src/components/tf-help.js';

const PARTS = [
    'trigger-slot', 'trigger', 'trigger-text',
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

test('projects trigger markup as the trigger control',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-help');
            el.innerHTML = '<a href="#" data-control>Help</a>';
            el.querySelector('[data-control]').slot = 'trigger';
            document.body.appendChild(el);
            await new Promise((resolve) => setTimeout(resolve, 0));

            const sr = el.shadowRoot;
            const slot = sr.querySelector('slot[name="trigger"]');
            const assigned = slot.assignedElements();
            const button = sr.querySelector('[part="trigger"]');
            const dialog = sr.querySelector('[part="dialog"]');

            const before = {
                count: assigned.length,
                tag: assigned[0] && assigned[0].tagName,
                slotWrapped: Boolean(slot.closest('button')),
                buttonHidden: button.hidden
            };

            assigned[0].click();
            const after = { open: dialog.open, attr: el.hasAttribute('open') };

            assigned[0].click();
            const toggled = dialog.open;

            el.remove();
            return { before, after, toggled };
        }, COMPONENT);

        expect(result.before).toEqual({
            count: 1,
            tag: 'A',
            slotWrapped: false,
            buttonHidden: true
        });
        expect(result.after).toEqual({ open: true, attr: true });
        expect(result.toggled).toBe(false);
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
            el.setText('?');
            const configured = {
                text: text(),
                label: trigger().getAttribute('aria-label')
            };

            el.setAttribute('label', '');
            el.setText('');
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

test('replacing the instructions slot content swaps the dialog body',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-help');
            el.innerHTML = '<p slot="instructions">First</p>';
            document.body.appendChild(el);
            await new Promise((resolve) => setTimeout(resolve, 0));

            const slot = el.shadowRoot
                .querySelector('slot[name="instructions"]');
            const before = slot.assignedElements()[0].textContent;

            el.innerHTML = '<div slot="instructions"><b>Second</b></div>';
            await new Promise((resolve) => setTimeout(resolve, 0));
            const assigned = slot.assignedElements();
            const after = assigned[0].textContent;
            const textHidden = el.shadowRoot
                .querySelector('[part="instructions-text"]').hidden;

            el.remove();
            return { before, after, count: assigned.length, textHidden };
        }, COMPONENT);

        expect(result).toEqual({
            before: 'First',
            after: 'Second',
            count: 1,
            textHidden: true
        });
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

test('remove and re-append while open keeps the dialog open',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const host = document.createElement('div');
            document.body.appendChild(host);
            const el = document.createElement('tf-help');
            host.appendChild(el);
            el.setOpen(true);
            el.remove();
            host.appendChild(el);
            await new Promise((resolve) => setTimeout(resolve, 0));
            const dialog = el.shadowRoot.querySelector('[part="dialog"]');
            const state = { open: dialog.open, attr: el.hasAttribute('open') };
            el.remove();
            host.remove();
            return state;
        }, COMPONENT);

        expect(result).toEqual({ open: true, attr: true });
    });

test('hides the text siblings when the slots have assigned nodes',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-help');
            el.setAttribute('trigger-text', '?');
            el.setAttribute('instructions-text', 'Use the operator list');
            el.innerHTML = '<a slot="trigger" href="#">Help</a>' +
                '<p slot="instructions">Operators</p>';
            document.body.appendChild(el);
            const sr = el.shadowRoot;
            const button = sr.querySelector('[part="trigger"]');
            const instrText = sr.querySelector('[part="instructions-text"]');
            await new Promise((resolve) => setTimeout(resolve, 0));
            const projected = {
                buttonHidden: button.hidden,
                instrTextHidden: instrText.hidden
            };

            for (const node of Array.from(el.children)) {
                node.remove();
            }
            await new Promise((resolve) => setTimeout(resolve, 0));
            const cleared = {
                buttonHidden: button.hidden,
                instrTextHidden: instrText.hidden
            };

            el.remove();
            return { projected, cleared };
        }, COMPONENT);

        expect(result.projected).toEqual({
            buttonHidden: true,
            instrTextHidden: true
        });
        expect(result.cleared).toEqual({
            buttonHidden: false,
            instrTextHidden: false
        });
    });

test('renders the element button as the control without slotted content',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-help');
            el.setAttribute('trigger-text', '?');
            document.body.appendChild(el);
            const sr = el.shadowRoot;
            const button = sr.querySelector('[part="trigger"]');
            const slot = sr.querySelector('slot[name="trigger"]');
            const state = {
                buttonHidden: button.hidden,
                hasPopup: button.getAttribute('aria-haspopup'),
                controls: button.getAttribute('aria-controls'),
                slotHasPopup: slot.getAttribute('aria-haspopup'),
                slotTabIndex: slot.getAttribute('tabindex'),
                slotRole: slot.getAttribute('role')
            };
            el.remove();
            return state;
        }, COMPONENT);

        expect(result).toEqual({
            buttonHidden: false,
            hasPopup: 'dialog',
            controls: 'dialog',
            slotHasPopup: null,
            slotTabIndex: null,
            slotRole: null
        });
    });

// Scans four configurations: trigger-named closed, dialog-labelled
// closed, trigger-named open and dialog-labelled open.
test('passes a scoped axe scan', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    await page.goto(FIXTURE);

    await page.evaluate(async (component) => {
        await import(component);
        const scope = document.createElement('div');
        scope.id = 'tf-help-scope';
        document.body.appendChild(scope);

        const labelled = document.createElement('tf-help');
        labelled.id = 'help-named';
        labelled.setAttribute('trigger-text', '?');
        labelled.setAttribute('label', 'Help');
        labelled.setAttribute('close-text', 'Close');
        scope.appendChild(labelled);

        const defaultNamed = document.createElement('tf-help');
        defaultNamed.id = 'help-dialog-named';
        defaultNamed.setAttribute('trigger-text', '?');
        defaultNamed.setAttribute('label', 'Help');
        defaultNamed.setAttribute('dialog-label', 'Help instructions');
        defaultNamed.setAttribute('close-text', 'Close');
        defaultNamed.setAttribute('instructions-text',
            'Use the operators');
        scope.appendChild(defaultNamed);

        const openTriggerNamed = document.createElement('tf-help');
        openTriggerNamed.id = 'help-open-trigger-named';
        openTriggerNamed.setAttribute('trigger-text', '?');
        openTriggerNamed.setAttribute('label', 'Help');
        openTriggerNamed.setAttribute('close-text', 'Close');
        openTriggerNamed.setAttribute('instructions-text',
            'Use the operators');
        openTriggerNamed.setAttribute('open', '');
        scope.appendChild(openTriggerNamed);

        const expanded = document.createElement('tf-help');
        expanded.id = 'help-open-dialog-named';
        expanded.setAttribute('trigger-text', '?');
        expanded.setAttribute('label', 'Help');
        expanded.setAttribute('dialog-label', 'Help instructions');
        expanded.setAttribute('close-text', 'Close');
        expanded.setAttribute('instructions-text',
            'Use the operators');
        expanded.setAttribute('open', '');
        scope.appendChild(expanded);
    }, COMPONENT);

    const violations = await scanAccessibility(
        page, testInfo, 'tf-help',
        { include: '#tf-help-scope' }
    );

    expect(
        violations.map((v) => `${v.id}: ${v.nodes.length} node(s)`)
    ).toEqual([]);

    const names = await page.evaluate(() => {
        const el = document.getElementById('help-open-trigger-named');
        const sr = el.shadowRoot;
        const dialog = sr.querySelector('[part="dialog"]');
        const trigger = sr.querySelector('[part="trigger"]');
        return {
            labelledby: dialog.getAttribute('aria-labelledby'),
            triggerLabel: trigger.getAttribute('aria-label'),
            closeText:
                sr.querySelector('[part="close"]').textContent.trim()
        };
    });

    expect(names).toEqual({
        labelledby: 'trigger',
        triggerLabel: 'Help',
        closeText: 'Close'
    });
});

test('clicking the dialog content keeps the dialog open',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-help');
            el.setAttribute('instructions-text', 'Use the operators');
            document.body.appendChild(el);
            el.setOpen(true);
            const dialog = el.shadowRoot.querySelector('[part="dialog"]');
            el.shadowRoot.querySelector('[part="instructions"]')
                .dispatchEvent(new MouseEvent('click', { bubbles: true }));
            const state = {
                open: dialog.open,
                attr: el.hasAttribute('open')
            };
            el.remove();
            return state;
        }, COMPONENT);

        expect(result).toEqual({ open: true, attr: true });
    });

test('clicking the dialog backdrop closes the dialog',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-help');
            document.body.appendChild(el);
            el.setOpen(true);
            const dialog = el.shadowRoot.querySelector('[part="dialog"]');
            dialog.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            const state = {
                open: dialog.open,
                attr: el.hasAttribute('open')
            };
            el.remove();
            return state;
        }, COMPONENT);

        expect(result).toEqual({ open: false, attr: false });
    });

test('disabled blocks a slotted trigger control',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-help');
            el.setAttribute('disabled', '');
            el.innerHTML = '<button data-control slot="trigger">Help</button>';
            document.body.appendChild(el);
            await new Promise((resolve) => setTimeout(resolve, 0));
            el.querySelector('[data-control]').click();
            const dialog = el.shadowRoot.querySelector('[part="dialog"]');
            const state = {
                open: dialog.open,
                attr: el.hasAttribute('open')
            };
            el.remove();
            return state;
        }, COMPONENT);

        expect(result).toEqual({ open: false, attr: false });
    });

test('clicking the trigger toggles the dialog closed',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-help');
            document.body.appendChild(el);
            const sr = el.shadowRoot;
            const dialog = sr.querySelector('[part="dialog"]');
            const trigger = sr.querySelector('[part="trigger"]');

            trigger.click();
            const opened = dialog.open;
            trigger.click();
            const closed = dialog.open;
            const attr = el.hasAttribute('open');

            el.remove();
            return { opened, closed, attr };
        }, COMPONENT);

        expect(result).toEqual({ opened: true, closed: false, attr: false });
    });

test('Escape closes the dialog and syncs the host attribute',
    async ({ page }) => {
        await page.goto(FIXTURE);

        await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-help');
            el.id = 'escape-help';
            el.setAttribute('trigger-text', '?');
            el.setAttribute('label', 'Help');
            document.body.appendChild(el);
            el.setOpen(true);
        }, COMPONENT);

        const opened = await page.evaluate(() => {
            const el = document.getElementById('escape-help');
            const dialog = el.shadowRoot.querySelector('[part="dialog"]');
            return { open: dialog.open, attr: el.hasAttribute('open') };
        });

        await page.keyboard.press('Escape');

        await page.waitForFunction(() => {
            const el = document.getElementById('escape-help');
            return el && !el.hasAttribute('open');
        });

        const result = await page.evaluate(() => {
            const el = document.getElementById('escape-help');
            const dialog = el.shadowRoot.querySelector('[part="dialog"]');
            const state = {
                open: dialog.open,
                attr: el.hasAttribute('open')
            };
            el.remove();
            return state;
        });
        expect(opened).toEqual({ open: true, attr: true });
        expect(result).toEqual({ open: false, attr: false });
    });

test('open-change does not fire on instructions content click',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-help');
            document.body.appendChild(el);
            const sr = el.shadowRoot;
            const instructions = sr.querySelector('[part="instructions"]');

            const seen = [];
            document.addEventListener('open-change', (event) => seen.push(
                event.detail.open));

            el.setOpen(true);
            instructions.click();
            el.remove();
            return seen;
        }, COMPONENT);

        expect(result).toEqual([true]);
    });

test('open-change fires on dialog backdrop dismissal',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-help');
            document.body.appendChild(el);
            const sr = el.shadowRoot;
            const dialog = sr.querySelector('[part="dialog"]');

            const seen = [];
            document.addEventListener('open-change', (event) => seen.push(
                event.detail.open));

            el.setOpen(true);
            dialog.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            el.remove();
            return seen;
        }, COMPONENT);

        expect(result).toEqual([true, false]);
    });

test('setLabel, setDialogLabel and setInstructionsText set their attributes',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-help');
            document.body.appendChild(el);

            el.setLabel('Help');
            const labelled = el.getAttribute('label');

            el.setDialogLabel('Filter instructions');
            const named = el.getAttribute('dialog-label');

            el.setInstructionsText('Use the operators');
            const instructed = el.getAttribute('instructions-text');

            el.remove();
            return { labelled, named, instructed };
        }, COMPONENT);

        expect(result).toEqual({
            labelled: 'Help',
            named: 'Filter instructions',
            instructed: 'Use the operators'
        });
    });

// Mounts a <tf-help> with light-DOM markup and attributes. The element
// gets the id `tf-help-focus` unless `id` is given, so several
// instances can share one page.
async function mountHelp(page, markup, attrs, id) {
    await page.evaluate(async ({ markup, attrs, component, id }) => {
        await import(component);
        const el = document.createElement('tf-help');
        el.id = id || 'tf-help-focus';
        for (const [name, value] of Object.entries(attrs)) {
            el.setAttribute(name, value);
        }
        if (markup) {
            el.innerHTML = markup;
        }
        document.body.appendChild(el);
    }, { markup, attrs, component: COMPONENT, id });
}

function readFocusState(page) {
    return page.evaluate(() => {
        const el = document.getElementById('tf-help-focus');
        return {
            open: el.shadowRoot.querySelector('[part="dialog"]').open,
            onTrigger: el.shadowRoot.activeElement === el.shadowRoot
                .querySelector('[part="trigger"]')
        };
    });
}

test('Escape returns focus to the element-rendered trigger',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await mountHelp(page, '', {});

        await page.evaluate(() => {
            document.getElementById('tf-help-focus').shadowRoot
                .querySelector('[part="trigger"]').click();
        });
        await page.keyboard.press('Escape');
        await page.waitForFunction(() => {
            const el = document.getElementById('tf-help-focus');
            return el && !el.hasAttribute('open') &&
                el.shadowRoot.activeElement ===
                    el.shadowRoot.querySelector('[part="trigger"]');
        });

        const result = await readFocusState(page);
        await page.evaluate(() => {
            document.getElementById('tf-help-focus').remove();
        });

        expect(result).toEqual({ open: false, onTrigger: true });
    });

test('the close control returns focus to the trigger', async ({ page }) => {
    await page.goto(FIXTURE);
    await mountHelp(page, '', {});

    await page.evaluate(() => {
        const el = document.getElementById('tf-help-focus');
        el.shadowRoot.querySelector('[part="trigger"]').click();
        el.shadowRoot.querySelector('[part="close"]').click();
    });

    await page.waitForFunction(() => {
        const el = document.getElementById('tf-help-focus');
        return el && !el.hasAttribute('open') &&
            el.shadowRoot.activeElement ===
                el.shadowRoot.querySelector('[part="trigger"]');
    });

    const result = await readFocusState(page);
    await page.evaluate(() => {
        document.getElementById('tf-help-focus').remove();
    });

    expect(result).toEqual({ open: false, onTrigger: true });
});

test('the backdrop dismissal returns focus to the trigger',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await mountHelp(page, '', {});

        await page.evaluate(() => {
            const el = document.getElementById('tf-help-focus');
            el.shadowRoot.querySelector('[part="trigger"]').click();
            el.shadowRoot.querySelector('[part="dialog"]').dispatchEvent(
                new MouseEvent('click', { bubbles: true }));
        });

        await page.waitForFunction(() => {
            const el = document.getElementById('tf-help-focus');
            return el && !el.hasAttribute('open') &&
                el.shadowRoot.activeElement ===
                    el.shadowRoot.querySelector('[part="trigger"]');
        });

        const result = await readFocusState(page);
        await page.evaluate(() => {
            document.getElementById('tf-help-focus').remove();
        });

        expect(result).toEqual({ open: false, onTrigger: true });
    });

test('clicking the dialog content keeps the dialog open and focus in it',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await mountHelp(page, '', {});

        await page.evaluate(() => {
            const el = document.getElementById('tf-help-focus');
            el.shadowRoot.querySelector('[part="trigger"]').click();
            el.shadowRoot.querySelector('[part="instructions"]')
                .dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        const result = await page.evaluate(() => {
            const el = document.getElementById('tf-help-focus');
            const dialog = el.shadowRoot.querySelector('[part="dialog"]');
            return {
                open: dialog.open,
                attr: el.hasAttribute('open'),
                inDialog: Boolean(el.shadowRoot.activeElement) &&
                    dialog.contains(el.shadowRoot.activeElement)
            };
        });

        expect(result).toEqual({ open: true, attr: true, inDialog: true });

        await page.evaluate(() => {
            document.getElementById('tf-help-focus').remove();
        });
    });

test('the trigger toggle returns focus to the element button',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await mountHelp(page, '', {});

        await page.evaluate(() => {
            const el = document.getElementById('tf-help-focus');
            el.shadowRoot.querySelector('[part="trigger"]').click();
            el.shadowRoot.querySelector('[part="trigger"]').click();
        });

        await page.waitForFunction(() => {
            const el = document.getElementById('tf-help-focus');
            return el && !el.hasAttribute('open') &&
                el.shadowRoot.activeElement ===
                    el.shadowRoot.querySelector('[part="trigger"]');
        });

        const result = await readFocusState(page);
        await page.evaluate(() => {
            document.getElementById('tf-help-focus').remove();
        });

        expect(result).toEqual({ open: false, onTrigger: true });
    });

test('closing returns focus to a slotted trigger control',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await mountHelp(page,
            '<button data-control slot="trigger">Help</button>', {});

        await page.evaluate(() => {
            const el = document.getElementById('tf-help-focus');
            el.querySelector('[data-control]').click();
            el.querySelector('[data-control]').click();
        });

        await page.waitForFunction(() => {
            const el = document.getElementById('tf-help-focus');
            return el &&
                !el.shadowRoot.querySelector('[part="dialog"]').open &&
                document.activeElement === el.querySelector('[data-control]');
        });

        const result = await page.evaluate(() => {
            const el = document.getElementById('tf-help-focus');
            const state = {
                open: el.shadowRoot.querySelector('[part="dialog"]').open,
                onControl: document.activeElement ===
                    el.querySelector('[data-control]')
            };
            el.remove();
            return state;
        });

        expect(result).toEqual({ open: false, onControl: true });
    });

test('closing returns focus to the host for non-focusable slotted markup',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await mountHelp(page, '<span slot="trigger">Help</span>', {});

        await page.evaluate(() => {
            document.getElementById('tf-help-focus')
                .querySelector('[slot="trigger"]').click();
        });
        await page.keyboard.press('Escape');
        await page.waitForFunction(() => {
            const el = document.getElementById('tf-help-focus');
            return el && !el.hasAttribute('open') &&
                document.activeElement === el;
        });

        await page.evaluate(() => {
            document.getElementById('tf-help-focus').remove();
        });
    });

test('a programmatic close keeps the platform focus restore',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await mountHelp(page, '', {});

        await page.evaluate(() => {
            const outside = document.createElement('button');
            outside.id = 'outside-focus';
            document.body.appendChild(outside);
            outside.focus();
            document.getElementById('tf-help-focus').setOpen(true);
        });

        await page.evaluate(() => {
            document.getElementById('tf-help-focus').setOpen(false);
        });

        await page.waitForFunction(() => document.activeElement ===
            document.getElementById('outside-focus'));

        await page.evaluate(() => {
            document.getElementById('tf-help-focus').remove();
            document.getElementById('outside-focus').remove();
        });
    });

test('removing an open element does not move focus', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-help');
        document.body.appendChild(el);
        el.setOpen(true);
        const trigger = el.shadowRoot.querySelector('[part="trigger"]');
        el.remove();
        return { active: document.activeElement === document.body,
            triggerDetached: !trigger.isConnected };
    }, COMPONENT);

    expect(result).toEqual({ active: true, triggerDetached: true });
});

test('two instances on one page open and close independently',
    async ({ page }) => {
        await page.goto(FIXTURE);
        await mountHelp(page, '', {}, 'tf-help-a');
        await mountHelp(page,
            '<button data-control slot="trigger">Help</button>',
            {}, 'tf-help-b');

        await page.evaluate(() => {
            document.getElementById('tf-help-a').shadowRoot
                .querySelector('[part="trigger"]').click();
        });

        const afterOpenA = await page.evaluate(() => ({
            a: document.getElementById('tf-help-a').shadowRoot
                .querySelector('[part="dialog"]').open,
            b: document.getElementById('tf-help-b').shadowRoot
                .querySelector('[part="dialog"]').open,
            bExpanded: document.getElementById('tf-help-b').shadowRoot
                .querySelector('[part="trigger"]')
                .getAttribute('aria-expanded')
        }));
        expect(afterOpenA).toEqual({ a: true, b: false, bExpanded: 'false' });

        await page.keyboard.press('Escape');

        await page.waitForFunction(() => {
            const a = document.getElementById('tf-help-a');
            return !a.shadowRoot.querySelector('[part="dialog"]').open &&
                a.shadowRoot.activeElement ===
                    a.shadowRoot.querySelector('[part="trigger"]');
        });

        await page.evaluate(() => {
            document.getElementById('tf-help-b')
                .querySelector('[data-control]').click();
        });

        const afterOpenB = await page.evaluate(() => ({
            a: document.getElementById('tf-help-a').shadowRoot
                .querySelector('[part="dialog"]').open,
            b: document.getElementById('tf-help-b').shadowRoot
                .querySelector('[part="dialog"]').open
        }));
        expect(afterOpenB).toEqual({ a: false, b: true });

        await page.evaluate(() => {
            document.getElementById('tf-help-b').shadowRoot
                .querySelector('[part="close"]').click();
        });

        await page.waitForFunction(() => {
            const b = document.getElementById('tf-help-b');
            return !b.shadowRoot.querySelector('[part="dialog"]').open &&
                document.activeElement === b.querySelector('[data-control]');
        });

        const final = await page.evaluate(() => {
            const a = document.getElementById('tf-help-a');
            const b = document.getElementById('tf-help-b');
            const state = {
                a: a.shadowRoot.querySelector('[part="dialog"]').open,
                b: b.shadowRoot.querySelector('[part="dialog"]').open,
                aExpanded: a.shadowRoot.querySelector('[part="trigger"]')
                    .getAttribute('aria-expanded'),
                bAttr: b.hasAttribute('open')
            };
            a.remove();
            b.remove();
            return state;
        });
        expect(final).toEqual({
            a: false, b: false, aExpanded: 'false', bAttr: false
        });
    });
