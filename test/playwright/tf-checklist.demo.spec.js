// Checklist bridge gate (#930): the demo page mounts the checklist filter
// of the first column on <tf-checklist>, using the legacy div/ul/li
// structure nowhere. The page lives in static/templates/ and is built
// into the gitignored demos/ by grunt build-demos; the Vite dev server
// that serves the repo root compiles the element module it imports.
//
// The gate conditions are silent-failure paths: the element is absent
// from both published bundles, so the page imports it; a
// `type="module"` script is deferred, so a bare tf.init() races the
// registration and falls back to legacy markup
// (src/modules/checkList.js, TODO #965). Fails CI on regression.
const { test, expect } = require('@playwright/test');

const DEMO_PAGE = 'demos/tf-checklist.html';

test(`checklist mounts on <tf-checklist>: ${DEMO_PAGE}`,
    async ({ page }) => {
        const pageErrors = [];
        page.on('pageerror', (error) => pageErrors.push(error.message));

        await page.goto(`/${DEMO_PAGE}`);

        // The element registered, so the deferred module loaded.
        await page.waitForFunction(
            () => Boolean(customElements.get('tf-checklist'))
        );

        // The feature routed through the bridge: the host is in the DOM
        // with its open shadow root, not the legacy div/ul/li structure.
        await page.waitForSelector('tf-checklist [part="trigger"]', {
            timeout: 15000
        });

        const result = await page.evaluate(() => {
            const host = document.querySelector('tf-checklist');
            const sr = host.shadowRoot;
            const trigger = sr.querySelector('[part="trigger"]');
            const listbox = sr.querySelector('[part="listbox"]');

            const option = (text) => Array.from(
                sr.querySelectorAll('[part~="option"]')
            ).find((el) =>
                el.querySelector('[part="option-text"]').textContent === text);

            const rows = () => Array.from(
                document.querySelectorAll('#demo tbody tr')
            );

            const totalRows = rows().length;
            const before = {
                triggerText: host.getAttribute('trigger-text'),
                listboxLabel: host.getAttribute('listbox-label'),
                expanded: trigger.getAttribute('aria-expanded'),
                role: listbox.getAttribute('role'),
                multiselectable: listbox.getAttribute('aria-multiselectable')
            };

            // Expand the listbox first so the open-change path (and its
            // aria-expanded reflection) is exercised; then select Angola.
            trigger.click();
            const expandedAfterTrigger =
                trigger.getAttribute('aria-expanded');

            // Angola is one of the first countries in the table; the
            // feature filters the table to Angola's rows (checkList.js:139).
            option('Angola').click();
            const visibleRows = rows().filter(
                (row) => row.offsetParent !== null
            );
            const countries = new Set(visibleRows.map(
                (row) => row.cells[0].textContent
            ));

            const after = {
                expandedAfterTrigger,
                values: host.getSelectedValues(),
                triggerText: host.getAttribute('trigger-text'),
                selected: option('Angola').getAttribute('aria-selected'),
                visible: visibleRows.length,
                countries: Array.from(countries)
            };

            // The host carries the legacy container class
            // (v1-webcomponents-investigation.md:247-289), so exclude it:
            // no legacy checklist was rendered beside it.
            const legacyLeftovers = host.parentElement.querySelectorAll(
                '.div_checklist:not(tf-checklist), ul.flt_checklist'
            ).length;

            return {
                hostTag: host.tagName,
                hostId: host.id,
                col: host.getAttribute('col'),
                totalRows,
                before,
                after,
                legacyLeftovers
            };
        });

        expect(result.hostTag).toBe('TF-CHECKLIST');
        expect(result.hostId).toBe('flt0_demo');
        expect(result.col).toBe('0');
        expect(result.totalRows).toBe(1176);
        expect(result.before.triggerText).toBe('country');
        expect(result.before.listboxLabel).toBe('country options');
        expect(result.before.expanded).toBe('false');
        expect(result.before.role).toBe('listbox');
        expect(result.before.multiselectable).toBe('true');
        expect(result.after.values).toEqual(['Angola']);
        expect(result.after.triggerText).toBe('country (1)');
        expect(result.after.expandedAfterTrigger).toBe('true');
        expect(result.after.selected).toBe('true');
        expect(result.after.visible).toBeLessThan(result.totalRows);
        expect(result.after.countries).toEqual(['Angola']);
        expect(result.legacyLeftovers).toBe(0);
        expect(pageErrors).toEqual([]);
    });
