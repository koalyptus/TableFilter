// Component demo gate: the demo page mounts <tf-help> in a real
// TableFilter page — the dedicated template — with the trigger, the
// instructions slot and the native dialog working from declarative
// markup. The page lives in static/templates/ and is built into the
// gitignored demos/ by grunt build-demos; the Vite dev server that
// serves the repo root compiles the element module it imports. Fails
// CI on regression.
const { test, expect } = require('@playwright/test');

const DEMO_PAGE = 'demos/tf-help.html';

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
            legacyHelp: Boolean(document.querySelector('.helpBtn')) ||
                Boolean(document.querySelector('.helpCont')),
            toolbarPlaced: Boolean(host.closest('.inf')) &&
                Boolean(host.closest('.rdiv')),
            toolbarOrder: (() => {
                const right = host.closest('.rdiv');
                const clear = document.querySelector('.rdiv .reset');
                return {
                    helpBeforeClear: Boolean(clear) &&
                        host.compareDocumentPosition(clear) ===
                            Node.DOCUMENT_POSITION_FOLLOWING,
                    clearIsLast: Boolean(clear) &&
                        right.lastElementChild.contains(clear)
                };
            })(),
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
    expect(result.initial.legacyHelp).toBe(false);
    expect(result.initial.toolbarPlaced).toBe(true);
    expect(result.initial.toolbarOrder).toEqual({
        helpBeforeClear: true, clearIsLast: true
    });
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

