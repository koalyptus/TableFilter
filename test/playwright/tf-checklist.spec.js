// Gate for <tf-checklist>: the element registers an open shadow root
// exposing a button trigger and a multi-select listbox per the WAI-ARIA
// APG combobox pattern. The trigger carries aria-haspopup, aria-expanded
// and aria-controls; the listbox carries role, aria-multiselectable and
// aria-labelledby; the open attribute keeps the two in sync and trigger
// clicks dispatch open-change. Per the theming model (--tf-* custom
// properties + ::part()), it ships structure and hooks only: no invented
// classes and no baked-in presentational CSS. Fails CI on regression.
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

test('dispatches open-change across the shadow boundary',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-checklist');
            document.body.appendChild(el);
            const trigger = el.shadowRoot.querySelector('[part="trigger"]');

            const onHost = [];
            const onDocument = [];
            el.addEventListener('open-change',
                (e) => onHost.push(e.detail));
            document.addEventListener('open-change',
                (e) => onDocument.push(e.detail));

            trigger.click();
            trigger.click();
            // Programmatic state changes do not dispatch.
            el.setOpen(true);
            const afterSetOpen = onHost.length;

            return { onHost, onDocument, afterSetOpen };
        }, COMPONENT);

        expect(result.onHost).toEqual([
            { open: true },
            { open: false }
        ]);
        expect(result.onDocument).toEqual(result.onHost);
        expect(result.afterSetOpen).toBe(2);
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

test('mounts in a custom container', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const host = document.createElement('div');
        host.id = 'tf-checklist-host';
        document.body.appendChild(host);

        const el = document.createElement('tf-checklist');
        el.setAttribute('trigger-text', 'Category');
        host.appendChild(el);

        const openChanges = [];
        host.addEventListener('open-change', (e) => openChanges.push(e.detail));
        el.shadowRoot.querySelector('[part="trigger"]').click();

        return {
            mounted: el.parentElement === host,
            triggerText: el.shadowRoot
                .querySelector('[part="trigger-text"]').textContent,
            listbox: Boolean(el.shadowRoot.querySelector('[part="listbox"]')),
            open: el.hasAttribute('open'),
            openChanges
        };
    }, COMPONENT);

    expect(result).toEqual({
        mounted: true,
        triggerText: 'Category',
        listbox: true,
        open: true,
        openChanges: [{ open: true }]
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
        let openChanges = 0;
        el.addEventListener('open-change', () => { openChanges++; });
        const read = () => ({
            attribute: el.hasAttribute('disabled'),
            disabled: trigger.hasAttribute('disabled')
        });

        const enabled = read();
        el.setAttribute('disabled', '');
        const disabled = read();
        trigger.click();
        const afterClick = {
            open: el.hasAttribute('open'),
            openChanges
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
    expect(result.afterClick).toEqual({ open: false, openChanges: 0 });
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

test('exposes ::part() state tokens for selection and disabled',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-checklist');
            el.setOptions([
                { value: 'a', text: 'A', selected: true },
                { value: 'b', text: 'B', disabled: true }
            ]);
            document.body.appendChild(el);

            const style = document.createElement('style');
            style.textContent = [
                'tf-checklist::part(option option-selected) {',
                '  color: rgb(9, 8, 7); }',
                'tf-checklist::part(option option-disabled) {',
                '  opacity: 0.5; }'
            ].join(' ');
            document.head.appendChild(style);

            const options = Array.from(
                el.shadowRoot.querySelector('[part="listbox"]')
                    .querySelectorAll('[part~="option"]'));
            return {
                selectedColor: getComputedStyle(options[0]).color,
                disabledOpacity: getComputedStyle(options[1]).opacity,
                unselectedPart: options[0].getAttribute('part'),
                disabledPart: options[1].getAttribute('part')
            };
        }, COMPONENT);

        expect(result.unselectedPart).toBe('option option-selected');
        expect(result.disabledPart).toBe('option option-disabled');
        expect(result.selectedColor).toBe('rgb(9, 8, 7)');
        expect(result.disabledOpacity).toBe('0.5');
    });

test('renders options as listbox options with aria-selected',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-checklist');
            el.setOptions([
                'Electronics',
                { value: 'furniture', text: 'Furniture' }
            ]);
            document.body.appendChild(el);
            const options = Array.from(
                el.shadowRoot.querySelector('[part="listbox"]')
                    .querySelectorAll('[part~="option"]'));
            return {
                count: options.length,
                roles: options.map((o) => o.getAttribute('role')),
                parts: options.map((o) => o.getAttribute('part')),
                tabindex: options.map((o) => o.getAttribute('tabindex')),
                selected:
                    options.map((o) => o.getAttribute('aria-selected')),
                disabled:
                    options.map((o) => o.getAttribute('aria-disabled')),
                texts: options.map(
                    (o) =>
                        o.querySelector('[part="option-text"]').textContent),
                checkboxParts: options.map((o) =>
                    o.querySelector('[part="option-checkbox"]')
                        .getAttribute('part')),
                checkboxTags: options.map((o) =>
                    o.querySelector('[part="option-checkbox"]').tagName
                        .toLowerCase()),
                checkboxHidden: options.map((o) =>
                    o.querySelector('[part="option-checkbox"]')
                        .getAttribute('aria-hidden'))
            };
        }, COMPONENT);

        expect(result.count).toBe(2);
        expect(result.roles).toEqual(['option', 'option']);
        expect(result.parts).toEqual(['option', 'option']);
        expect(result.tabindex).toEqual(['-1', '-1']);
        expect(result.selected).toEqual(['false', 'false']);
        expect(result.disabled).toEqual([null, null]);
        expect(result.texts).toEqual(['Electronics', 'Furniture']);
        expect(result.checkboxParts).toEqual(
            ['option-checkbox', 'option-checkbox']);
        expect(result.checkboxTags).toEqual(['span', 'span']);
        expect(result.checkboxHidden).toEqual(['true', 'true']);
    });

test('renders disabled and preselected option entries', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-checklist');
        el.setOptions([
            { value: 'a', text: 'A', selected: true },
            { value: 'b', text: 'B', disabled: true }
        ]);
        document.body.appendChild(el);
        const options = Array.from(
            el.shadowRoot.querySelector('[part="listbox"]')
                .querySelectorAll('[part~="option"]'));
        return {
            selected: options.map((o) => o.getAttribute('aria-selected')),
            disabled: options.map((o) => o.getAttribute('aria-disabled')),
            parts: options.map((o) => o.getAttribute('part')),
            values: el.getSelectedValues()
        };
    }, COMPONENT);

    expect(result.selected).toEqual(['true', 'false']);
    expect(result.disabled).toEqual([null, 'true']);
    expect(result.parts).toEqual(['option option-selected',
        'option option-disabled']);
    expect(result.values).toEqual(['a']);
});

test('toggles an option on click and dispatches selection-change',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-checklist');
            el.setOptions(['Australia', 'New Zealand', 'Canada']);
            document.body.appendChild(el);

            const options = Array.from(
                el.shadowRoot.querySelector('[part="listbox"]')
                    .querySelectorAll('[part~="option"]'));
            const onHost = [];
            const onDocument = [];
            el.addEventListener('selection-change',
                (e) => onHost.push(e.detail.values));
            document.addEventListener('selection-change',
                (e) => onDocument.push(e.detail.values));

            options[1].click();
            const afterFirst = {
                selected: options.map(
                    (o) => o.getAttribute('aria-selected')),
                values: el.getSelectedValues()
            };
            options[2].click();
            const afterSecond = {
                selected: options.map(
                    (o) => o.getAttribute('aria-selected')),
                values: el.getSelectedValues()
            };
            options[1].click();
            const afterThird = el.getSelectedValues();

            return {
                afterFirst,
                afterSecond,
                afterThird,
                onHost,
                onDocument
            };
        }, COMPONENT);

        expect(result.afterFirst).toEqual({
            selected: ['false', 'true', 'false'],
            values: ['New Zealand']
        });
        expect(result.afterSecond).toEqual({
            selected: ['false', 'true', 'true'],
            values: ['New Zealand', 'Canada']
        });
        expect(result.afterThird).toEqual(['Canada']);
        expect(result.onHost).toEqual([
            ['New Zealand'],
            ['New Zealand', 'Canada'],
            ['Canada']
        ]);
        expect(result.onDocument).toEqual(result.onHost);
    });

test('clicking the checkbox hook toggles the option once', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-checklist');
        el.setOptions(['Australia']);
        document.body.appendChild(el);

        const option =
            el.shadowRoot.querySelector('[part~="option"]');
        const checkbox =
            option.querySelector('[part="option-checkbox"]');
        let changes = 0;
        el.addEventListener('selection-change', () => { changes++; });

        checkbox.click();
        const afterCheck = {
            selected: option.getAttribute('aria-selected'),
            values: el.getSelectedValues(),
            changes
        };
        checkbox.click();
        const afterUncheck = {
            selected: option.getAttribute('aria-selected'),
            values: el.getSelectedValues(),
            changes
        };

        return { afterCheck, afterUncheck };
    }, COMPONENT);

    expect(result.afterCheck).toEqual({
        selected: 'true',
        values: ['Australia'],
        changes: 1
    });
    expect(result.afterUncheck).toEqual({
        selected: 'false',
        values: [],
        changes: 2
    });
});

test('ignores clicks on disabled options', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-checklist');
        el.setOptions([{ value: 'a', text: 'A', disabled: true }]);
        document.body.appendChild(el);

        const option = el.shadowRoot.querySelector('[part~="option"]');
        let changes = 0;
        el.addEventListener('selection-change', () => { changes++; });
        option.click();

        return {
            selected: option.getAttribute('aria-selected'),
            values: el.getSelectedValues(),
            changes
        };
    }, COMPONENT);

    expect(result).toEqual({
        selected: 'false',
        values: [],
        changes: 0
    });
});

test('setSelectedValues() selects by value without dispatching',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-checklist');
            el.setOptions(['a', 'b', 'c']);
            document.body.appendChild(el);

            const options = Array.from(
                el.shadowRoot.querySelector('[part="listbox"]').children);
            let changes = 0;
            el.addEventListener('selection-change', () => { changes++; });

            el.setSelectedValues(['c', 'missing', 'a']);
            const selected = options.map(
                (o) => o.getAttribute('aria-selected'));
            const values = el.getSelectedValues();

            el.setSelectedValues([]);
            const cleared = {
                selected: options.map(
                    (o) => o.getAttribute('aria-selected')),
                values: el.getSelectedValues()
            };

            return { selected, values, cleared, changes };
        }, COMPONENT);

        expect(result.selected).toEqual(['true', 'false', 'true']);
        expect(result.values).toEqual(['a', 'c']);
        expect(result.cleared).toEqual({
            selected: ['false', 'false', 'false'],
            values: []
        });
        expect(result.changes).toBe(0);
    });

test('setOptions() replaces the list and clears the selection',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-checklist');
            el.setOptions(['a', 'b']);
            document.body.appendChild(el);
            el.setSelectedValues(['a']);
            let changes = 0;
            el.addEventListener('selection-change', () => { changes++; });

            el.setOptions(['c', { value: 'd', text: 'D' }]);
            const options = Array.from(
                el.shadowRoot.querySelector('[part="listbox"]').children);

            return {
                count: options.length,
                texts: options.map(
                    (o) => o.querySelector('[part="option-text"]').textContent),
                selected: options.map(
                    (o) => o.getAttribute('aria-selected')),
                values: el.getSelectedValues(),
                changes
            };
        }, COMPONENT);

        expect(result).toEqual({
            count: 2,
            texts: ['c', 'D'],
            selected: ['false', 'false'],
            values: [],
            changes: 0
        });
    });

test('renders option text as text content', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-checklist');
        el.setOptions([{ value: '<b>A</b>', text: '<b>A</b>' }]);
        document.body.appendChild(el);
        const text =
            el.shadowRoot.querySelector('[part="option-text"]');
        return {
            text: text.textContent,
            hasElement: Boolean(text.querySelector('b')),
            html: text.innerHTML
        };
    }, COMPONENT);

    expect(result.text).toBe('<b>A</b>');
    expect(result.hasElement).toBe(false);
    expect(result.html).toBe('&lt;b&gt;A&lt;/b&gt;');
});

// The open element carries a representative option so the scan reaches
// the expanded listbox; the closed elements cover the trigger's naming
// paths.
test('observes the col attribute (column mapping)', async ({ page }) => {
    await page.goto(FIXTURE);
    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-checklist');
        el.setAttribute('col', '2');
        document.body.appendChild(el);
        return { col: el.getAttribute('col'), observed: true };
    }, COMPONENT);
    expect(result.col).toBe('2');
});

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
        expanded.setOptions([
            'Australia',
            { value: 'canada', text: 'Canada', selected: true },
            { value: 'france', text: 'France', disabled: true }
        ]);
        scope.appendChild(expanded);
    }, COMPONENT);

    const violations = await scanAccessibility(
        page, testInfo, 'tf-checklist',
        { include: '#tf-checklist-scope' }
    );

    expect(
        violations.map((v) => `${v.id}: ${v.nodes.length} node(s)`)
    ).toEqual([]);
});
