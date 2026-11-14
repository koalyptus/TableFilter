// Component demo gate: the demo pages mount <tf-help> in real
// TableFilter pages — the dedicated template and the existing
// pagination demo — with the trigger, the instructions slot and the
// native dialog working from declarative markup. The pages live in
// static/templates/ and are built into the gitignored demos/ by grunt
// build-demos; the Vite dev server that serves the repo root compiles
// the element module they import. Fails CI on regression.
const { test, expect } = require('@playwright/test');

const DEMO_PAGE = 'demos/tf-help.html';
const EXISTING_DEMO_PAGE = 'demos/pagination.html';

test(`help mounts declaratively: ${DEMO_PAGE}`, async ({ page }) => {
    const pageErrors = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));

    await page.goto(`/${DEMO_PAGE}`);

    // Waits until the deferred module registers the element.
    await page.waitForFunction(
        () => Boolean(customElements.get('tf-help'))
    );

    await page.waitForSelector('tf-help [part="trigger"]', {
        timeout: 15000
    });

    const result = await page.evaluate(() => {
        const host = document.querySelector('tf-help');
        const sr = host.shadowRoot;
        const trigger = sr.querySelector('[part="trigger"]');
        const dialog = sr.querySelector('[part="dialog"]');
        const slot = sr.querySelector('slot[name="instructions"]');
        const instructions = slot.assignedElements()[0];

        const initial = {
            defined: Boolean(customElements.get('tf-help')),
            triggerText:
                sr.querySelector('[part="trigger-text"]').textContent,
            dialogName: dialog.getAttribute('aria-label'),
            instructions: instructions.textContent
                .replace(/\s+/g, ' ').trim().length > 0,
            footer: instructions.textContent.includes('TableFilter v') &&
                instructions.textContent.includes('www.tablefilter.com') &&
                Boolean(instructions.querySelector('a.close')),
            open: dialog.open
        };

        trigger.click();
        const opened = {
            open: dialog.open,
            modal: dialog.matches(':modal'),
            attr: host.hasAttribute('open')
        };

        // Clicking inside the instructions container closes the dialog.
        sr.querySelector('[part="instructions"]').click();
        const dismissed = { open: dialog.open };

        trigger.click();
        sr.querySelector('[part="close"]').click();
        const closed = {
            open: dialog.open,
            attr: host.hasAttribute('open')
        };

        trigger.click();
        sr.querySelector('slot[name="instructions"]')
            .assignedElements()[0].querySelector('a.close').click();
        const footerClosed = {
            open: dialog.open,
            attr: host.hasAttribute('open')
        };

        return { initial, opened, dismissed, closed, footerClosed };
    });

    expect(result.initial.defined).toBe(true);
    expect(result.initial.triggerText).toBe('?');
    expect(result.initial.dialogName).toBe('Help instructions');
    expect(result.initial.instructions).toBe(true);
    expect(result.initial.footer).toBe(true);
    expect(result.initial.open).toBe(false);
    expect(result.opened).toEqual({
        open: true, modal: true, attr: true
    });
    expect(result.dismissed).toEqual({ open: false });
    expect(result.closed).toEqual({ open: false, attr: false });
    expect(result.footerClosed).toEqual({ open: false, attr: false });
    expect(pageErrors).toEqual([]);
});

test(`help mounts declaratively in an existing demo: ${EXISTING_DEMO_PAGE}`,
    async ({ page }) => {
        const pageErrors = [];
        page.on('pageerror', (error) => pageErrors.push(error.message));

        await page.goto(`/${EXISTING_DEMO_PAGE}`);

        await page.waitForFunction(
            () => Boolean(customElements.get('tf-help'))
        );

        // TableFilter initialised next to the element.
        await page.waitForSelector('#demo .fltrow', {
            state: 'attached',
            timeout: 15000
        });

        const result = await page.evaluate(() => {
            const host = document.querySelector('tf-help');
            const sr = host.shadowRoot;
            const trigger = sr.querySelector('[part="trigger"]');
            const dialog = sr.querySelector('[part="dialog"]');
            const instructions = sr
                .querySelector('slot[name="instructions"]')
                .assignedElements()[0];

            trigger.click();
            const opened = {
                open: dialog.open,
                modal: dialog.matches(':modal'),
                attr: host.hasAttribute('open')
            };

            sr.querySelector('[part="close"]').click();
            const closed = {
                open: dialog.open,
                attr: host.hasAttribute('open')
            };

            trigger.click();
            instructions.querySelector('a.close').click();
            const footerClosed = {
                open: dialog.open,
                attr: host.hasAttribute('open')
            };

            return {
                initial: {
                    triggerHidden: trigger.hidden,
                    triggerText:
                        sr.querySelector('[part="trigger-text"]').textContent,
                    dialogName: dialog.getAttribute('aria-label'),
                    instructions: instructions.textContent
                        .replace(/\s+/g, ' ').trim().length > 0,
                    footer: instructions.textContent
                        .includes('TableFilter v') &&
                        instructions.textContent
                            .includes('www.tablefilter.com') &&
                        instructions.querySelector('a.close').textContent ===
                        'Close'
                },
                opened,
                closed,
                footerClosed
            };
        });

        expect(result.initial.triggerHidden).toBe(false);
        expect(result.initial.triggerText).toBe('?');
        expect(result.initial.dialogName).toBe('Help instructions');
        expect(result.initial.instructions).toBe(true);
        expect(result.initial.footer).toBe(true);
        expect(result.opened).toEqual({
            open: true, modal: true, attr: true
        });
        expect(result.closed).toEqual({ open: false, attr: false });
        expect(result.footerClosed).toEqual({ open: false, attr: false });
        expect(pageErrors).toEqual([]);
    });
