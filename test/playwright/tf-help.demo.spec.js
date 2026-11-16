// Component demo gate: the demo page mounts <tf-help> through the Help
// bridge in a real TableFilter page — the dedicated template — with the
// trigger, the instructions slot and the native dialog working from
// config. The page lives in static/templates/ and is built into the
// gitignored demos/ by grunt build-demos; the Vite dev server that
// serves the repo root compiles the element module it imports. Fails
// CI on regression.
const { test, expect } = require('@playwright/test');

const DEMO_PAGE = 'demos/tf-help.html';

test(`help mounts through the bridge: ${DEMO_PAGE}`, async ({ page }) => {
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
            triggerLabel: trigger.getAttribute('aria-label'),
            dialogLabelledby: dialog.getAttribute('aria-labelledby'),
            closeText:
                sr.querySelector('[part="close-text"]').textContent,
            instructions: instructions.textContent
                .replace(/\s+/g, ' ').trim().length > 0,
            footer: instructions.textContent.includes('TableFilter v') &&
                instructions.textContent.includes('www.tablefilter.com') &&
                Boolean(instructions.querySelector('.helpFooter')),
            open: dialog.open
        };

        trigger.click();
        const opened = {
            open: dialog.open,
            modal: dialog.matches(':modal'),
            attr: host.hasAttribute('open')
        };

        // Clicking content inside the dialog body keeps it open.
        sr.querySelector('slot[name="instructions"]')
            .assignedElements()[0].querySelector('a').click();
        const contentKeptOpen = { open: dialog.open };

        trigger.click();
        sr.querySelector('[part="close"]').click();
        const closed = {
            open: dialog.open,
            attr: host.hasAttribute('open')
        };

        // The projected footer keeps no close link; the element close
        // control is the only one in the dialog.
        const footerLink =
            instructions.querySelector('a.close') !== null;

        return { initial, opened, contentKeptOpen, closed, footerLink };
    });

    expect(result.initial.defined).toBe(true);
    expect(result.initial.legacyHelp).toBe(false);
    expect(result.initial.toolbarPlaced).toBe(true);
    expect(result.initial.toolbarOrder).toEqual({
        helpBeforeClear: true, clearIsLast: true
    });
    expect(result.initial.triggerText).toBe('?');
    expect(result.initial.triggerLabel).toBe('Help');
    expect(result.initial.dialogLabelledby).toBe('trigger');
    expect(result.initial.closeText).toBe('Close');
    expect(result.initial.instructions).toBe(true);
    expect(result.initial.footer).toBe(true);
    expect(result.initial.open).toBe(false);
    expect(result.opened).toEqual({
        open: true, modal: true, attr: true
    });
    expect(result.contentKeptOpen).toEqual({ open: true });
    expect(result.closed).toEqual({ open: false, attr: false });
    expect(result.footerLink).toBe(false);
    expect(pageErrors).toEqual([]);
});

