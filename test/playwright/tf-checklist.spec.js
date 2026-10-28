// Component gate (#927): the <tf-checklist> element registers an open
// shadow root exposing a button trigger and a multi-select listbox per
// the WAI-ARIA APG combobox pattern: the trigger carries
// aria-haspopup/aria-expanded/aria-controls, the listbox carries
// role/aria-multiselectable/aria-labelledby and the open attribute keeps
// the two in sync. Option rendering (#928), keyboard navigation (#929)
// and the CheckList bridge (#930) are separate tickets. Per the theming
// model (--tf-* custom properties + ::part()), it ships structure and
// hooks only: no invented classes and no baked-in presentational CSS.
// Fails CI on regression.
const { test, expect } = require('@playwright/test');
const { scanAccessibility } = require('./axeScan');

const FIXTURE = '/test/test-emitter.html';
const COMPONENT = '/src/components/tf-checklist.js';

// Document order, matching the shadow template.
const PARTS = ['trigger', 'trigger-text', 'listbox'];

test('registers an open shadow root exposing the combobox parts',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const defined = Boolean(customElements.get('tf-checklist'));
            const el = document.createElement('tf-checklist');
            document.body.appendChild(el);
            const sr = el.shadowRoot;
            const nodes = sr ? Array.from(sr.querySelectorAll('*')) : [];
            const trigger = sr.querySelector('[part="trigger"]');
            const listbox = sr.querySelector('[part="listbox"]');
            return {
                defined,
                hasShadow: Boolean(sr),
                mode: sr && sr.mode,
                parts: sr ? Array.from(sr.querySelectorAll('[part]'))
                    .map((n) => n.getAttribute('part')) : [],
                triggerTag: trigger.tagName.toLowerCase(),
                triggerType: trigger.getAttribute('type'),
                listboxRole: listbox.getAttribute('role'),
                multiselectable:
                    listbox.getAttribute('aria-multiselectable'),
                hasTriggerSlot:
                    Boolean(sr.querySelector('slot[name="trigger"]')),
                classless: nodes.every((n) => !n.hasAttribute('class')),
                styleless: nodes.every((n) => n.tagName !== 'STYLE')
            };
        }, COMPONENT);

        expect(result.defined).toBe(true);
        expect(result.hasShadow).toBe(true);
        expect(result.mode).toBe('open');
        expect(result.parts).toEqual(PARTS);
        expect(result.triggerTag).toBe('button');
        expect(result.triggerType).toBe('button');
        expect(result.listboxRole).toBe('listbox');
        expect(result.multiselectable).toBe('true');
        expect(result.hasTriggerSlot).toBe(true);
        expect(result.classless).toBe(true);
        expect(result.styleless).toBe(true);
    });

test('wires the trigger to the listbox through ARIA attributes',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-checklist');
            document.body.appendChild(el);
            const sr = el.shadowRoot;
            const trigger = sr.querySelector('[part="trigger"]');
            const listbox = sr.querySelector('[part="listbox"]');
            return {
                haspopup: trigger.getAttribute('aria-haspopup'),
                expanded: trigger.getAttribute('aria-expanded'),
                controls: trigger.getAttribute('aria-controls'),
                listboxId: listbox.id,
                labelledby: listbox.getAttribute('aria-labelledby'),
                triggerId: trigger.id,
                tabindex: listbox.getAttribute('tabindex'),
                hidden: listbox.hasAttribute('hidden')
            };
        }, COMPONENT);

        expect(result.haspopup).toBe('listbox');
        expect(result.expanded).toBe('false');
        // aria-controls and aria-labelledby resolve inside the shadow
        // root, where both ids are unique per instance.
        expect(result.controls).toBe(result.listboxId);
        expect(result.labelledby).toBe(result.triggerId);
        expect(result.tabindex).toBe('-1');
        expect(result.hidden).toBe(true);
    });

test('toggles the popover from the trigger and reflects open',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-checklist');
            document.body.appendChild(el);
            const sr = el.shadowRoot;
            const trigger = sr.querySelector('[part="trigger"]');
            const listbox = sr.querySelector('[part="listbox"]');
            const read = () => ({
                open: el.hasAttribute('open'),
                expanded: trigger.getAttribute('aria-expanded'),
                hidden: listbox.hasAttribute('hidden')
            });

            const closed = read();
            trigger.click();
            const opened = read();
            trigger.click();
            const closedAgain = read();

            return { closed, opened, closedAgain };
        }, COMPONENT);

        expect(result.closed).toEqual(
            { open: false, expanded: 'false', hidden: true });
        expect(result.opened).toEqual(
            { open: true, expanded: 'true', hidden: false });
        expect(result.closedAgain).toEqual(
            { open: false, expanded: 'false', hidden: true });
    });

test('setOpen() and the open attribute drive the expanded state',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-checklist');
            document.body.appendChild(el);
            const sr = el.shadowRoot;
            const trigger = sr.querySelector('[part="trigger"]');
            const listbox = sr.querySelector('[part="listbox"]');
            const read = () => ({
                open: el.hasAttribute('open'),
                expanded: trigger.getAttribute('aria-expanded'),
                hidden: listbox.hasAttribute('hidden')
            });

            el.setOpen(true);
            const methodOpen = read();
            el.setOpen(false);
            const methodClosed = read();
            el.setAttribute('open', '');
            const attributeOpen = read();
            el.removeAttribute('open');
            const attributeClosed = read();

            return { methodOpen, methodClosed, attributeOpen,
                attributeClosed };
        }, COMPONENT);

        expect(result.methodOpen).toEqual(
            { open: true, expanded: 'true', hidden: false });
        expect(result.methodClosed).toEqual(
            { open: false, expanded: 'false', hidden: true });
        expect(result.attributeOpen).toEqual(
            { open: true, expanded: 'true', hidden: false });
        expect(result.attributeClosed).toEqual(
            { open: false, expanded: 'false', hidden: true });
    });

test('invents no accessible names by default', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-checklist');
        document.body.appendChild(el);
        const sr = el.shadowRoot;
        const trigger = sr.querySelector('[part="trigger"]');
        const listbox = sr.querySelector('[part="listbox"]');
        return {
            trigger: trigger.getAttribute('aria-label'),
            listbox: listbox.getAttribute('aria-label'),
            labelledby: listbox.getAttribute('aria-labelledby')
        };
    }, COMPONENT);

    // The trigger is named by the text the host supplies, and the
    // listbox reuses that name through aria-labelledby.
    expect(result.trigger).toBeNull();
    expect(result.listbox).toBeNull();
    expect(result.labelledby).toBe('trigger');
});

test('renders accessible names from attributes when set',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-checklist');
            el.setAttribute('label', 'Filter Category, 2 items selected');
            el.setAttribute('listbox-label', 'Filter Category options');
            document.body.appendChild(el);
            const sr = el.shadowRoot;
            const trigger = sr.querySelector('[part="trigger"]');
            const listbox = sr.querySelector('[part="listbox"]');
            return {
                trigger: trigger.getAttribute('aria-label'),
                listbox: listbox.getAttribute('aria-label'),
                labelledby: listbox.getAttribute('aria-labelledby')
            };
        }, COMPONENT);

        expect(result.trigger).toBe('Filter Category, 2 items selected');
        expect(result.listbox).toBe('Filter Category options');
        // An explicit listbox name replaces the trigger reference.
        expect(result.labelledby).toBeNull();
    });

test('setLabel() and setListboxLabel() set and clear the names',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-checklist');
            document.body.appendChild(el);
            const sr = el.shadowRoot;
            const trigger = sr.querySelector('[part="trigger"]');
            const listbox = sr.querySelector('[part="listbox"]');

            el.setLabel('Category');
            el.setListboxLabel('Category options');
            const set = {
                trigger: trigger.getAttribute('aria-label'),
                listbox: listbox.getAttribute('aria-label'),
                labelledby: listbox.getAttribute('aria-labelledby')
            };

            el.setLabel('');
            el.setListboxLabel('');
            const cleared = {
                trigger: trigger.getAttribute('aria-label'),
                listbox: listbox.getAttribute('aria-label'),
                labelledby: listbox.getAttribute('aria-labelledby')
            };

            return { set, cleared };
        }, COMPONENT);

        expect(result.set).toEqual({
            trigger: 'Category',
            listbox: 'Category options',
            labelledby: null
        });
        expect(result.cleared).toEqual({
            trigger: null,
            listbox: null,
            labelledby: 'trigger'
        });
    });

test('projects markup through the trigger slot', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-checklist');
        el.innerHTML = '<span data-icon="category"></span>';
        el.querySelector('[data-icon=category]').slot = 'trigger';
        document.body.appendChild(el);
        const slot = el.shadowRoot.querySelector('slot[name="trigger"]');
        return slot.assignedNodes()
            .filter((n) => n.nodeType === Node.ELEMENT_NODE)
            .map((n) => n.getAttribute('data-icon'));
    }, COMPONENT);

    expect(result).toEqual(['category']);
});

test('two elements keep independent state and ids', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const first = document.createElement('tf-checklist');
        const second = document.createElement('tf-checklist');
        document.body.appendChild(first);
        document.body.appendChild(second);

        const read = (el) => {
            const sr = el.shadowRoot;
            const trigger = sr.querySelector('[part="trigger"]');
            const listbox = sr.querySelector('[part="listbox"]');
            return {
                open: el.hasAttribute('open'),
                expanded: trigger.getAttribute('aria-expanded'),
                controlsResolve: sr.getElementById(
                    trigger.getAttribute('aria-controls')) === listbox,
                labelledbyResolve: sr.getElementById(
                    listbox.getAttribute('aria-labelledby')) === trigger
            };
        };

        first.shadowRoot.querySelector('[part="trigger"]').click();
        return { first: read(first), second: read(second) };
    }, COMPONENT);

    expect(result.first).toEqual({
        open: true,
        expanded: 'true',
        controlsResolve: true,
        labelledbyResolve: true
    });
    expect(result.second).toEqual({
        open: false,
        expanded: 'false',
        controlsResolve: true,
        labelledbyResolve: true
    });
});

test('renders trigger-text as text content', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-checklist');
        el.setAttribute('trigger-text', '<b>Category</b>');
        document.body.appendChild(el);
        const textEl = el.shadowRoot.querySelector('[part="trigger-text"]');
        return {
            text: textEl.textContent,
            hasElement: Boolean(textEl.querySelector('b')),
            html: textEl.innerHTML
        };
    }, COMPONENT);

    expect(result.text).toBe('<b>Category</b>');
    expect(result.hasElement).toBe(false);
    expect(result.html).toBe('&lt;b&gt;Category&lt;/b&gt;');
});

test('setText() updates the trigger text', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-checklist');
        document.body.appendChild(el);
        el.setText('Category');
        const textEl = el.shadowRoot.querySelector('[part="trigger-text"]');
        return {
            text: textEl.textContent,
            attribute: el.getAttribute('trigger-text')
        };
    }, COMPONENT);

    expect(result.text).toBe('Category');
    expect(result.attribute).toBe('Category');
});

test('disables the trigger while disabled is set', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-checklist');
        document.body.appendChild(el);
        const trigger = el.shadowRoot.querySelector('[part="trigger"]');
        const read = () => ({
            attribute: el.hasAttribute('disabled'),
            disabled: trigger.hasAttribute('disabled')
        });

        const enabled = read();
        el.setAttribute('disabled', '');
        const disabled = read();
        trigger.click();
        const afterClick = {
            open: el.hasAttribute('open')
        };
        el.removeAttribute('disabled');
        const reenabled = read();

        return { enabled, disabled, afterClick, reenabled };
    }, COMPONENT);

    expect(result.enabled).toEqual(
        { attribute: false, disabled: false });
    expect(result.disabled).toEqual(
        { attribute: true, disabled: true });
    // A disabled button fires no click, so the popover stays closed.
    expect(result.afterClick).toEqual({ open: false });
    expect(result.reenabled).toEqual(
        { attribute: false, disabled: false });
});

test('exposes ::part() styling hooks for theming', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-checklist');
        document.body.appendChild(el);

        const style = document.createElement('style');
        style.textContent = `
            tf-checklist::part(trigger) { display: flex; }
            tf-checklist::part(listbox) { color: rgb(1, 2, 3); }
        `;
        document.head.appendChild(style);

        const sr = el.shadowRoot;
        return {
            display: getComputedStyle(
                sr.querySelector('[part=trigger]')).display,
            color: getComputedStyle(
                sr.querySelector('[part=listbox]')).color
        };
    }, COMPONENT);

    expect(result.display).toBe('flex');
    expect(result.color).toBe('rgb(1, 2, 3)');
});

// The open listbox has no option children until #928, so the open-state
// element gets a representative option for the scan to reach the expanded
// shell. The closed element covers the trigger's naming paths.
test('passes a scoped axe scan', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    await page.goto(FIXTURE);

    await page.evaluate(async (component) => {
        await import(component);
        const scope = document.createElement('div');
        scope.id = 'tf-checklist-scope';
        document.body.appendChild(scope);

        const labelled = document.createElement('tf-checklist');
        labelled.setAttribute('trigger-text', 'Category');
        labelled.setAttribute('label', 'Filter Category');
        labelled.setAttribute('listbox-label', 'Filter Category options');
        scope.appendChild(labelled);

        const defaultNamed = document.createElement('tf-checklist');
        defaultNamed.setAttribute('trigger-text', 'Status');
        scope.appendChild(defaultNamed);

        const expanded = document.createElement('tf-checklist');
        expanded.setAttribute('trigger-text', 'Country');
        expanded.setAttribute('open', '');
        scope.appendChild(expanded);
        const listbox = expanded.shadowRoot.querySelector('[part=listbox]');
        const option = document.createElement('div');
        option.setAttribute('role', 'option');
        option.setAttribute('aria-selected', 'false');
        option.textContent = 'Australia';
        listbox.appendChild(option);
    }, COMPONENT);

    const violations = await scanAccessibility(
        page, testInfo, 'tf-checklist',
        { include: '#tf-checklist-scope' }
    );

    expect(
        violations.map((v) => `${v.id}: ${v.nodes.length} node(s)`)
    ).toEqual([]);
});
