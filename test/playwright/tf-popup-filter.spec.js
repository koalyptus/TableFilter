// Component gate: <tf-popup-filter> registers an open shadow root, exposes a
// trigger and a non-modal dialog popup through `part` hooks, projects the
// filter content and the trigger control, and manages focus and Escape.
// Fails CI on regression.
const { test, expect } = require('@playwright/test');
const { scanAccessibility } = require('./axeScan');

const FIXTURE = '/test/test-emitter.html';
const COMPONENT = '/src/components/tf-popup-filter.js';

const PARTS = [
    'trigger-slot', 'trigger', 'trigger-text',
    'popup', 'content-slot'
];

test('registers an open shadow root exposing the popup parts',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const defined = Boolean(customElements.get('tf-popup-filter'));
            const el = document.createElement('tf-popup-filter');
            document.body.appendChild(el);
            const sr = el.shadowRoot;
            const nodes = sr ? Array.from(sr.querySelectorAll('*')) : [];
            const trigger = sr && sr.querySelector('[part="trigger"]');
            const popup = sr && sr.querySelector('[part="popup"]');
            const state = {
                defined,
                hasShadow: Boolean(sr),
                mode: sr && sr.mode,
                parts: sr ? Array.from(sr.querySelectorAll('[part]'))
                    .map((n) => n.getAttribute('part')) : [],
                triggerTag: trigger && trigger.tagName,
                triggerType: trigger && trigger.getAttribute('type'),
                expanded: trigger && trigger.getAttribute('aria-expanded'),
                hasPopup: trigger && trigger.getAttribute('aria-haspopup'),
                controls: trigger && trigger.getAttribute('aria-controls'),
                popupTag: popup && popup.tagName,
                popupRole: popup && popup.getAttribute('role'),
                labelledby: popup && popup.getAttribute('aria-labelledby'),
                popupHidden: popup && popup.hidden,
                controlsTarget: popup && trigger &&
                    trigger.getAttribute('aria-controls') === popup.id,
                classless: nodes.every((n) => !n.hasAttribute('class')),
                styleless: nodes.every((n) => n.tagName !== 'STYLE')
            };
            el.remove();
            return state;
        }, COMPONENT);

        expect(result.defined).toBe(true);
        expect(result.hasShadow).toBe(true);
        expect(result.mode).toBe('open');
        expect(result.parts).toEqual(PARTS);
        expect(result.triggerTag).toBe('BUTTON');
        expect(result.triggerType).toBe('button');
        expect(result.expanded).toBe('false');
        expect(result.hasPopup).toBe('dialog');
        expect(result.controls).toBe('popup');
        expect(result.popupTag).toBe('DIV');
        expect(result.popupRole).toBe('dialog');
        expect(result.labelledby).toBe('trigger');
        expect(result.popupHidden).toBe(true);
        expect(result.controlsTarget).toBe(true);
        expect(result.classless).toBe(true);
        expect(result.styleless).toBe(true);
    });

test('the element button toggles the popup and moves focus into it',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-popup-filter');
            document.body.appendChild(el);
            const sr = el.shadowRoot;
            const trigger = sr.querySelector('[part="trigger"]');
            const popup = sr.querySelector('[part="popup"]');

            trigger.click();
            const opened = {
                attr: el.hasAttribute('open'),
                hidden: popup.hidden,
                expanded: trigger.getAttribute('aria-expanded'),
                focused: sr.activeElement === popup
            };

            trigger.click();
            const closed = {
                attr: el.hasAttribute('open'),
                hidden: popup.hidden,
                expanded: trigger.getAttribute('aria-expanded')
            };
            el.remove();
            return { opened, closed };
        }, COMPONENT);

        expect(result.opened).toEqual({
            attr: true,
            hidden: false,
            expanded: 'true',
            focused: true
        });
        expect(result.closed).toEqual({
            attr: false,
            hidden: true,
            expanded: 'false'
        });
    });

test('projects a trigger control and hides the element button',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-popup-filter');
            el.innerHTML = '<button type="button" slot="trigger">' +
                'Filter</button>';
            document.body.appendChild(el);
            await new Promise((resolve) => setTimeout(resolve, 0));

            const sr = el.shadowRoot;
            const slot = sr.querySelector('slot[name="trigger"]');
            const button = sr.querySelector('[part="trigger"]');
            const assigned = slot.assignedElements();
            const before = {
                count: assigned.length,
                tag: assigned[0] && assigned[0].tagName,
                hidden: button.hidden,
                slotWrapped: Boolean(slot.closest('button'))
            };
            assigned[0].click();
            const after = {
                open: el.hasAttribute('open'),
                hidden: sr.querySelector('[part="popup"]').hidden
            };
            el.remove();
            return { before, after };
        }, COMPONENT);

        expect(result.before).toEqual({
            count: 1,
            tag: 'BUTTON',
            hidden: true,
            slotWrapped: false
        });
        expect(result.after).toEqual({ open: true, hidden: false });
    });

test('projects the filter container and focuses its first control',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-popup-filter');
            el.innerHTML = '<div data-filter>' +
                '<input aria-label="Filter value"><select></select></div>';
            document.body.appendChild(el);
            await new Promise((resolve) => setTimeout(resolve, 0));

            const slot = el.shadowRoot
                .querySelector('slot[part="content-slot"]');
            const assigned = slot.assignedElements();
            const linked = Boolean(el.querySelector('input'));
            el.setOpen(true);
            const state = {
                count: assigned.length,
                linked,
                focused: document.activeElement.tagName,
                focusLabel: document.activeElement.getAttribute('aria-label')
            };
            el.remove();
            return state;
        }, COMPONENT);

        expect(result).toEqual({
            count: 1,
            linked: true,
            focused: 'INPUT',
            focusLabel: 'Filter value'
        });
    });

test('focuses the popup when projected content cannot take focus',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-popup-filter');
            el.innerHTML = '<div class="popUpFilter">' +
                '<input aria-label="Filter value"></div>';
            document.body.appendChild(el);
            await new Promise((resolve) => setTimeout(resolve, 0));

            el.setOpen(true);
            const state = {
                focused: el.shadowRoot.activeElement ===
                    el.shadowRoot.querySelector('[part="popup"]')
            };
            el.remove();
            return state;
        }, COMPONENT);

        expect(result).toEqual({ focused: true });
    });

test('Escape closes the popup and returns focus to the element trigger',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-popup-filter');
            document.body.appendChild(el);
            const sr = el.shadowRoot;
            const trigger = sr.querySelector('[part="trigger"]');
            const popup = sr.querySelector('[part="popup"]');

            trigger.click();
            const focused = sr.activeElement === popup;
            popup.dispatchEvent(new KeyboardEvent('keydown', {
                key: 'Escape', bubbles: true, composed: true
            }));
            const state = {
                focused,
                open: el.hasAttribute('open'),
                hidden: popup.hidden,
                triggerFocused: sr.activeElement === trigger
            };
            el.remove();
            return state;
        }, COMPONENT);

        expect(result).toEqual({
            focused: true,
            open: false,
            hidden: true,
            triggerFocused: true
        });
    });

test('Escape returns focus to a slotted trigger control',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-popup-filter');
            el.innerHTML = '<button type="button" slot="trigger">' +
                'Filter</button><input aria-label="Filter value">';
            document.body.appendChild(el);
            await new Promise((resolve) => setTimeout(resolve, 0));

            const trigger = el.querySelector('button');
            const input = el.querySelector('input');
            trigger.click();
            const focused = document.activeElement === input;
            input.dispatchEvent(new KeyboardEvent('keydown', {
                key: 'Escape', bubbles: true, composed: true
            }));
            const state = {
                focused,
                open: el.hasAttribute('open'),
                triggerFocused: document.activeElement === trigger
            };
            el.remove();
            return state;
        }, COMPONENT);

        expect(result).toEqual({
            focused: true,
            open: false,
            triggerFocused: true
        });
    });

test('a pointer press outside the host closes the popup',
    async ({ page }) => {
        await page.goto(FIXTURE);

        await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-popup-filter');
            el.id = 'outside-popup';
            el.innerHTML = '<input aria-label="Filter value">';
            document.body.appendChild(el);
            el.setOpen(true);
        }, COMPONENT);

        const inside = await page.evaluate(() => {
            const el = document.getElementById('outside-popup');
            el.querySelector('input').dispatchEvent(
                new PointerEvent('pointerdown', {
                    bubbles: true, composed: true
                }));
            return el.hasAttribute('open');
        });
        expect(inside).toBe(true);

        await page.mouse.click(1, 1);
        const outside = await page.evaluate(() => {
            const el = document.getElementById('outside-popup');
            const state = {
                open: el.hasAttribute('open'),
                hidden: el.shadowRoot
                    .querySelector('[part="popup"]').hidden
            };
            el.remove();
            return state;
        });
        expect(outside).toEqual({ open: false, hidden: true });
    });

test('the open attribute drives the popup state', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-popup-filter');
        el.setAttribute('open', '');
        document.body.appendChild(el);
        const popup = el.shadowRoot.querySelector('[part="popup"]');
        const trigger = el.shadowRoot.querySelector('[part="trigger"]');
        const declared = {
            hidden: popup.hidden,
            expanded: trigger.getAttribute('aria-expanded')
        };

        el.removeAttribute('open');
        const cleared = popup.hidden;

        el.setOpen(true);
        const reopened = popup.hidden;

        el.setOpen(false);
        const closed = popup.hidden;
        el.remove();
        return { declared, cleared, reopened, closed };
    }, COMPONENT);

    expect(result).toEqual({
        declared: { hidden: false, expanded: 'true' },
        cleared: true,
        reopened: false,
        closed: true
    });
});

test('dispatches open-change across the shadow boundary',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-popup-filter');
            document.body.appendChild(el);
            const seen = [];
            document.addEventListener('open-change', (event) => {
                seen.push({
                    open: event.detail.open,
                    bubbles: event.bubbles,
                    composed: event.composed
                });
            });
            const trigger = el.shadowRoot
                .querySelector('[part="trigger"]');
            trigger.click();
            el.shadowRoot.querySelector('[part="popup"]')
                .dispatchEvent(new KeyboardEvent('keydown', {
                    key: 'Escape', bubbles: true, composed: true
                }));
            el.remove();
            return seen;
        }, COMPONENT);

        expect(result).toEqual([
            { open: true, bubbles: true, composed: true },
            { open: false, bubbles: true, composed: true }
        ]);
    });

test('names the trigger and popup from the accessible attributes',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-popup-filter');
            document.body.appendChild(el);
            const trigger = () => el.shadowRoot
                .querySelector('[part="trigger"]');
            const popup = () => el.shadowRoot
                .querySelector('[part="popup"]');
            const state = () => ({
                label: trigger().getAttribute('aria-label'),
                popupLabel: popup().getAttribute('aria-label'),
                labelledby: popup().getAttribute('aria-labelledby')
            });

            const initial = state();
            el.setLabel('Column filter');
            el.setPopupLabel('Filter results');
            const configured = state();
            el.setAttribute('accessible-label', '');
            el.setAttribute('accessible-popup-label', '');
            const cleared = state();
            el.remove();
            return { initial, configured, cleared };
        }, COMPONENT);

        expect(result.initial).toEqual({
            label: null,
            popupLabel: null,
            labelledby: 'trigger'
        });
        expect(result.configured).toEqual({
            label: 'Column filter',
            popupLabel: 'Filter results',
            labelledby: null
        });
        expect(result.cleared).toEqual(result.initial);
    });

test('renders the trigger text as text content', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-popup-filter');
        document.body.appendChild(el);
        const node = () => el.shadowRoot
            .querySelector('[part="trigger-text"]');

        const initial = node().textContent;
        el.setText('<b>Filter</b>');
        const configured = node().textContent;
        const markup = Boolean(node().querySelector('b'));
        el.setText(null);
        const cleared = node().textContent;
        el.remove();
        return { initial, configured, markup, cleared };
    }, COMPONENT);

    expect(result).toEqual({
        initial: '',
        configured: '<b>Filter</b>',
        markup: false,
        cleared: ''
    });
});

test('disabled blocks both trigger controls', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-popup-filter');
        el.innerHTML = '<button type="button" slot="trigger">' +
            'Filter</button>';
        document.body.appendChild(el);
        await new Promise((resolve) => setTimeout(resolve, 0));
        const trigger = el.shadowRoot.querySelector('[part="trigger"]');
        const slotted = el.querySelector('button');

        el.setAttribute('disabled', '');
        const disabled = trigger.hasAttribute('disabled');
        slotted.click();
        const blocked = el.hasAttribute('open');

        el.removeAttribute('disabled');
        slotted.click();
        const opened = el.hasAttribute('open');
        el.remove();
        return { disabled, blocked, opened };
    }, COMPONENT);

    expect(result).toEqual({
        disabled: true,
        blocked: false,
        opened: true
    });
});

test('exposes ::part() styling hooks for the popup', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-popup-filter');
        document.body.appendChild(el);

        const style = document.createElement('style');
        style.textContent = `
            tf-popup-filter::part(trigger) { color: rgb(1, 2, 3); }
            tf-popup-filter::part(trigger-text) { color: rgb(4, 5, 6); }
            tf-popup-filter::part(popup) { color: rgb(9, 8, 7); }
        `;
        document.head.appendChild(style);

        const sr = el.shadowRoot;
        const colorOf = (part) => getComputedStyle(
            sr.querySelector(`[part="${part}"]`)).color;
        const state = {
            trigger: colorOf('trigger'),
            text: colorOf('trigger-text'),
            popup: colorOf('popup')
        };
        style.remove();
        el.remove();
        return state;
    }, COMPONENT);

    expect(result).toEqual({
        trigger: 'rgb(1, 2, 3)',
        text: 'rgb(4, 5, 6)',
        popup: 'rgb(9, 8, 7)'
    });
});

test('keeps popup state independent between instances',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const first = document.createElement('tf-popup-filter');
            const second = document.createElement('tf-popup-filter');
            first.setText('First');
            second.setText('Second');
            document.body.appendChild(first);
            document.body.appendChild(second);

            first.setOpen(true);
            const before = {
                first: first.hasAttribute('open'),
                second: second.hasAttribute('open'),
                firstText: first.shadowRoot
                    .querySelector('[part="trigger-text"]').textContent,
                secondText: second.shadowRoot
                    .querySelector('[part="trigger-text"]').textContent,
                separateRoots: first.shadowRoot !== second.shadowRoot
            };
            second.innerHTML = '<input aria-label="Second filter">';
            await new Promise((resolve) => setTimeout(resolve, 0));
            second.setOpen(true);
            const after = {
                first: first.hasAttribute('open'),
                second: second.hasAttribute('open'),
                firstHidden: first.shadowRoot
                    .querySelector('[part="popup"]').hidden,
                secondHidden: second.shadowRoot
                    .querySelector('[part="popup"]').hidden
            };
            first.remove();
            second.remove();
            return { before, after };
        }, COMPONENT);

        expect(result.before).toEqual({
            first: true,
            second: false,
            firstText: 'First',
            secondText: 'Second',
            separateRoots: true
        });
        expect(result.after).toEqual({
            first: true,
            second: true,
            firstHidden: false,
            secondHidden: false
        });
    });

test('removing and re-appending an open element keeps its state',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const host = document.createElement('div');
            document.body.appendChild(host);
            const el = document.createElement('tf-popup-filter');
            host.appendChild(el);
            el.setOpen(true);
            el.remove();
            host.appendChild(el);
            await new Promise((resolve) => setTimeout(resolve, 0));
            const state = {
                open: el.hasAttribute('open'),
                hidden: el.shadowRoot
                    .querySelector('[part="popup"]').hidden
            };
            el.remove();
            host.remove();
            return state;
        }, COMPONENT);

        expect(result).toEqual({ open: true, hidden: false });
    });

test('upgrades declarative markup present before the module loads',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            document.body.innerHTML = `
                <tf-popup-filter trigger-text="Filter" open>
                    <input aria-label="Filter value">
                </tf-popup-filter>`;
            const before = document.querySelector('tf-popup-filter');
            const upgradedBefore = Boolean(before.shadowRoot);

            await import(component);

            const el = document.querySelector('tf-popup-filter');
            const popup = el.shadowRoot.querySelector('[part="popup"]');
            return {
                upgradedBefore,
                upgradedAfter: Boolean(el.shadowRoot),
                hidden: popup.hidden,
                text: el.shadowRoot
                    .querySelector('[part="trigger-text"]').textContent
            };
        }, COMPONENT);

        expect(result).toEqual({
            upgradedBefore: false,
            upgradedAfter: true,
            hidden: false,
            text: 'Filter'
        });
    });

test('importing the module again keeps a single definition',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const first = customElements.get('tf-popup-filter');
            let error = null;
            try {
                await import(component + '?duplicate=1');
            } catch (err) {
                error = err && err.message;
            }
            return {
                error,
                same: customElements.get('tf-popup-filter') === first
            };
        }, COMPONENT);

        expect(result.error).toBeNull();
        expect(result.same).toBe(true);
    });

test('does not replace an existing tf-popup-filter definition',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            class Stub extends HTMLElement {}
            customElements.define('tf-popup-filter', Stub);
            await import(component);
            return { kept: customElements.get('tf-popup-filter') === Stub };
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

// Scans a closed named trigger and two open popups: one named by the
// attribute and one named by a slotted trigger control.
test('passes a scoped axe scan', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    await page.goto(FIXTURE);

    await page.evaluate(async (component) => {
        await import(component);
        const scope = document.createElement('div');
        scope.id = 'tf-popup-filter-scope';
        document.body.appendChild(scope);

        // The fixture sizes the targets the shipped stylesheet supplies.
        const style = document.createElement('style');
        style.textContent = `
            #tf-popup-filter-scope button,
            #tf-popup-filter-scope input { min-height: 24px; }
            #tf-popup-filter-scope tf-popup-filter::part(trigger) {
                min-height: 24px;
            }
        `;
        scope.appendChild(style);

        const closed = document.createElement('tf-popup-filter');
        closed.id = 'popup-closed';
        closed.setAttribute('trigger-text', 'Filter');
        closed.setLabel('Filter');
        scope.appendChild(closed);

        const named = document.createElement('tf-popup-filter');
        named.setAttribute('trigger-text', 'Filter');
        named.setLabel('Filter');
        named.setPopupLabel('Column filter');
        named.innerHTML = '<input aria-label="Filter value">';
        scope.appendChild(named);
        named.setOpen(true);

        const slotted = document.createElement('tf-popup-filter');
        slotted.setPopupLabel('Column filter');
        slotted.innerHTML = '<button slot="trigger" type="button">' +
            'Filter</button><input aria-label="Filter value">';
        scope.appendChild(slotted);
        slotted.setOpen(true);
        await new Promise((resolve) => setTimeout(resolve, 0));
    }, COMPONENT);

    const violations = await scanAccessibility(
        page, testInfo, 'tf-popup-filter',
        { include: '#tf-popup-filter-scope' }
    );

    expect(
        violations.map((v) => `${v.id}: ${v.nodes.length} node(s)`)
    ).toEqual([]);
});
