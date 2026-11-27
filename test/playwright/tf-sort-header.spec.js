// Gate for <tf-sort-header> (#931): the element registers an open shadow
// root exposing a single `<button type="button">` trigger that carries the
// column label, projects header markup through the default slot and holds
// a decorative icon. The trigger is the only tab stop and its content is
// its accessible name; `accessible-label` overrides it. `aria-sort` is set
// on the surrounding `<th>` (#932). The sort extension bridge is tracked in
// #933. The parts are the styling surface
// (TF-COMPONENTS-CONVENTIONS.md §5).
const { test, expect } = require('@playwright/test');
const { scanAccessibility } = require('./axeScan');

const FIXTURE = '/test/test-emitter.html';
const COMPONENT = '/src/components/tf-sort-header.js';

// Document order, matching the shadow template.
const PARTS = ['trigger', 'text', 'icon'];

test('registers an open shadow root exposing the trigger parts',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const defined = Boolean(customElements.get('tf-sort-header'));
            const el = document.createElement('tf-sort-header');
            document.body.appendChild(el);
            const sr = el.shadowRoot;
            const nodes = sr ? Array.from(sr.querySelectorAll('*')) : [];
            const buttons = sr ? Array.from(sr.querySelectorAll('button'))
                : [];
            const trigger = sr && sr.querySelector('[part="trigger"]');
            const icon = sr && sr.querySelector('[part="icon"]');
            const slot = sr && sr.querySelector('slot');
            return {
                defined,
                hasShadow: Boolean(sr),
                mode: sr && sr.mode,
                parts: sr ? Array.from(sr.querySelectorAll('[part]'))
                    .map((n) => n.getAttribute('part')) : [],
                buttonCount: buttons.length,
                triggerTag: trigger && trigger.tagName.toLowerCase(),
                triggerType: trigger && trigger.getAttribute('type'),
                hasDefaultSlot: Boolean(slot) && !slot.hasAttribute('name'),
                iconHidden: icon && icon.getAttribute('aria-hidden'),
                iconTabindex: icon && icon.getAttribute('tabindex'),
                classless: nodes.every((n) => !n.hasAttribute('class')),
                styleless: nodes.every((n) => n.tagName !== 'STYLE')
            };
        }, COMPONENT);

        expect(result.defined).toBe(true);
        expect(result.hasShadow).toBe(true);
        expect(result.mode).toBe('open');
        expect(result.parts).toEqual(PARTS);
        expect(result.buttonCount).toBe(1);
        expect(result.triggerTag).toBe('button');
        expect(result.triggerType).toBe('button');
        expect(result.hasDefaultSlot).toBe(true);
        expect(result.iconHidden).toBe('true');
        expect(result.iconTabindex).toBeNull();
        expect(result.classless).toBe(true);
        expect(result.styleless).toBe(true);
    });

// The trigger carries no `aria-label`, `aria-labelledby`, `title` or
// `aria-sort` until the matching attributes are set.
test('invents no accessible names and renders no aria-sort',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-sort-header');
            document.body.appendChild(el);
            const trigger = el.shadowRoot.querySelector('[part="trigger"]');
            return {
                ariaLabel: trigger.getAttribute('aria-label'),
                ariaLabelledby: trigger.getAttribute('aria-labelledby'),
                title: trigger.getAttribute('title'),
                ariaSort: trigger.getAttribute('aria-sort'),
                hostAriaSort: el.getAttribute('aria-sort'),
                text: trigger.textContent.trim()
            };
        }, COMPONENT);

        expect(result.ariaLabel).toBeNull();
        expect(result.ariaLabelledby).toBeNull();
        expect(result.title).toBeNull();
        expect(result.ariaSort).toBeNull();
        expect(result.hostAriaSort).toBeNull();
        expect(result.text).toBe('');
    });

test('renders accessible names from attributes when set',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-sort-header');
            el.setAttribute('accessible-label', 'Sort by destination');
            document.body.appendChild(el);
            const trigger = el.shadowRoot.querySelector('[part="trigger"]');
            const set = trigger.getAttribute('aria-label');
            el.removeAttribute('accessible-label');
            return {
                set,
                removed: trigger.getAttribute('aria-label')
            };
        }, COMPONENT);

        expect(result.set).toBe('Sort by destination');
        expect(result.removed).toBeNull();
    });

test('renders the text attribute as text content', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-sort-header');
        el.setAttribute('text', 'Destination');
        document.body.appendChild(el);
        const text = el.shadowRoot.querySelector('[part="text"]');

        const label = text.textContent;
        el.setAttribute('text', '<b>Destination</b>');
        return {
            label,
            escaped: text.textContent,
            hasMarkup: text.children.length
        };
    }, COMPONENT);

    expect(result.label).toBe('Destination');
    expect(result.escaped).toBe('<b>Destination</b>');
    expect(result.hasMarkup).toBe(0);
});

test('projects header markup through the default slot',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-sort-header');
            el.innerHTML = '<span id="label">Destination</span>';
            document.body.appendChild(el);
            const slot = el.shadowRoot.querySelector('slot');
            const assigned = slot.assignedNodes();
            return {
                assigned: assigned.length,
                id: assigned[0] && assigned[0].id,
                projected: Boolean(
                    el.querySelector('#label').assignedSlot)
            };
        }, COMPONENT);

        expect(result.assigned).toBe(1);
        expect(result.id).toBe('label');
        expect(result.projected).toBe(true);
    });

// The `text` attribute and the default slot are two label sources: the
// projected content wins and the text part renders empty. Whitespace-only
// content counts as no content.
test('renders one label source, preferring projected content',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const textOf = (el) => el.shadowRoot
                .querySelector('[part="text"]').textContent;
            const lightTextOf = (el) => el.textContent.trim();

            const attributeOnly = document.createElement('tf-sort-header');
            attributeOnly.setAttribute('text', 'Destination');
            document.body.appendChild(attributeOnly);

            const projected = document.createElement('tf-sort-header');
            projected.setAttribute('text', 'Destination');
            projected.innerHTML = '<em>Destination</em>';
            document.body.appendChild(projected);

            const whitespace = document.createElement('tf-sort-header');
            whitespace.setAttribute('text', 'Country');
            whitespace.textContent = '   ';
            document.body.appendChild(whitespace);

            const textNode = document.createElement('tf-sort-header');
            textNode.textContent = 'Status';
            document.body.appendChild(textNode);

            const late = document.createElement('tf-sort-header');
            late.setAttribute('text', 'Region');
            document.body.appendChild(late);
            const beforeLate = textOf(late);
            late.appendChild(document.createElement('em')).textContent =
                'Region';
            await new Promise((resolve) => setTimeout(resolve, 0));
            const afterLate = textOf(late);

            return {
                attributeOnly: textOf(attributeOnly),
                projected: {
                    text: textOf(projected),
                    trigger: lightTextOf(projected)
                },
                whitespace: textOf(whitespace),
                textNode: lightTextOf(textNode),
                late: { beforeLate, afterLate }
            };
        }, COMPONENT);

        expect(result).toEqual({
            attributeOnly: 'Destination',
            projected: { text: '', trigger: 'Destination' },
            whitespace: 'Country',
            textNode: 'Status',
            late: { beforeLate: 'Region', afterLate: '' }
        });
    });

test('setText() and setLabel() update the trigger', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-sort-header');
        document.body.appendChild(el);
        const trigger = el.shadowRoot.querySelector('[part="trigger"]');
        const text = el.shadowRoot.querySelector('[part="text"]');

        el.setText('Country');
        el.setLabel('Sort by country');
        const set = {
            text: text.textContent,
            label: trigger.getAttribute('aria-label'),
            textAttr: el.getAttribute('text'),
            labelAttr: el.getAttribute('accessible-label')
        };

        el.setText(null);
        el.setLabel(null);
        return {
            set,
            cleared: {
                text: text.textContent,
                label: trigger.getAttribute('aria-label')
            }
        };
    }, COMPONENT);

    expect(result.set).toEqual({
        text: 'Country',
        label: 'Sort by country',
        textAttr: 'Country',
        labelAttr: 'Sort by country'
    });
    expect(result.cleared).toEqual({ text: '', label: null });
});

test('exposes ::part() styling hooks for theming', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-sort-header');
        document.body.appendChild(el);

        const style = document.createElement('style');
        style.textContent = `
            tf-sort-header::part(trigger) { display: flex; }
            tf-sort-header::part(icon) { color: rgb(1, 2, 3); }
        `;
        document.head.appendChild(style);

        const sr = el.shadowRoot;
        return {
            display: getComputedStyle(
                sr.querySelector('[part="trigger"]')).display,
            color: getComputedStyle(
                sr.querySelector('[part="icon"]')).color
        };
    }, COMPONENT);

    expect(result.display).toBe('flex');
    expect(result.color).toBe('rgb(1, 2, 3)');
});

// The legacy sort extension listens for clicks on the `<th>`
// (src/extensions/sort/adapterSortabletable.js). A click on the shadow
// button is composed and retargets to the host.
test('click on the trigger bubbles out of the shadow root',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const el = document.createElement('tf-sort-header');
            el.setAttribute('text', 'Destination');
            document.body.appendChild(el);

            const events = [];
            document.addEventListener('click', (evt) => {
                events.push({
                    target: evt.target.tagName.toLowerCase(),
                    composed: evt.composed
                });
            });
            el.shadowRoot.querySelector('[part="trigger"]').click();
            return events;
        }, COMPONENT);

        expect(result).toEqual([{ target: 'tf-sort-header', composed: true }]);
    });

test('Enter and Space activate the focused trigger', async ({ page }) => {
    await page.goto(FIXTURE);

    await page.evaluate(async (component) => {
        await import(component);
        const el = document.createElement('tf-sort-header');
        el.setAttribute('text', 'Destination');
        document.body.appendChild(el);
        window.__clicks = 0;
        el.addEventListener('click', () => { window.__clicks++; });
        el.shadowRoot.querySelector('[part="trigger"]').focus();
    }, COMPONENT);

    await page.keyboard.press('Enter');
    const afterEnter = await page.evaluate(() => window.__clicks);
    await page.keyboard.press('Space');
    const afterSpace = await page.evaluate(() => window.__clicks);

    expect(afterEnter).toBe(1);
    expect(afterSpace).toBe(2);
});

test('two elements keep independent state', async ({ page }) => {
    await page.goto(FIXTURE);

    const result = await page.evaluate(async (component) => {
        await import(component);
        const a = document.createElement('tf-sort-header');
        const b = document.createElement('tf-sort-header');
        a.setText('Destination');
        a.setLabel('Sort by destination');
        b.setText('Country');
        document.body.appendChild(a);
        document.body.appendChild(b);

        const state = {
            aText: a.shadowRoot.querySelector('[part="text"]').textContent,
            bText: b.shadowRoot.querySelector('[part="text"]').textContent,
            aLabel: a.shadowRoot.querySelector('[part="trigger"]')
                .getAttribute('aria-label'),
            bLabel: b.shadowRoot.querySelector('[part="trigger"]')
                .getAttribute('aria-label'),
            distinct: a.shadowRoot !== b.shadowRoot
        };

        a.remove();
        b.remove();
        return state;
    }, COMPONENT);

    expect(result).toEqual({
        aText: 'Destination',
        bText: 'Country',
        aLabel: 'Sort by destination',
        bLabel: null,
        distinct: true
    });
});

test('upgrades declarative markup present before the module loads',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            document.body.innerHTML = `
                <tf-sort-header text="Destination"
                    accessible-label="Sort by destination">
                </tf-sort-header>`;
            const before = document.querySelector('tf-sort-header');
            const upgradedBefore = Boolean(before.shadowRoot);

            await import(component);

            const el = document.querySelector('tf-sort-header');
            return {
                upgradedBefore,
                upgradedAfter: Boolean(el.shadowRoot),
                text: el.shadowRoot.querySelector('[part="text"]')
                    .textContent,
                label: el.shadowRoot.querySelector('[part="trigger"]')
                    .getAttribute('aria-label')
            };
        }, COMPONENT);

        expect(result).toEqual({
            upgradedBefore: false,
            upgradedAfter: true,
            text: 'Destination',
            label: 'Sort by destination'
        });
    });

test('importing the module again keeps a single definition',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            await import(component);
            const first = customElements.get('tf-sort-header');
            let error = null;
            try {
                await import(component + '?duplicate=1');
            } catch (err) {
                error = err && err.message;
            }
            return {
                error,
                same: customElements.get('tf-sort-header') === first
            };
        }, COMPONENT);

        expect(result.error).toBeNull();
        expect(result.same).toBe(true);
    });

test('does not replace an existing tf-sort-header definition',
    async ({ page }) => {
        await page.goto(FIXTURE);

        const result = await page.evaluate(async (component) => {
            class Stub extends HTMLElement {}
            customElements.define('tf-sort-header', Stub);
            await import(component);
            return { kept: customElements.get('tf-sort-header') === Stub };
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

// Both naming paths: the column label as content and `accessible-label`.
test('passes a scoped axe scan', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    await page.goto(FIXTURE);

    await page.evaluate(async (component) => {
        await import(component);
        const scope = document.createElement('div');
        scope.id = 'tf-sort-header-scope';
        scope.innerHTML = `
            <table>
                <thead><tr>
                    <th scope="col">
                        <tf-sort-header text="Destination">
                        </tf-sort-header>
                    </th>
                    <th scope="col">
                        <tf-sort-header accessible-label="Sort by country">
                            <em>Country</em>
                        </tf-sort-header>
                    </th>
                </tr></thead>
                <tbody><tr><td>Sydney</td><td>Australia</td></tr></tbody>
            </table>`;
        document.body.appendChild(scope);
    }, COMPONENT);

    const violations = await scanAccessibility(
        page, testInfo, 'tf-sort-header',
        { include: '#tf-sort-header-scope' }
    );

    expect(
        violations.map((v) => `${v.id}: ${v.nodes.length} node(s)`)
    ).toEqual([]);
});
