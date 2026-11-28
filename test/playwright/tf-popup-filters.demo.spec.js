// Pop-up filter bridge gate (#921): the demo page mounts the legacy
// `popup_filters` configuration on <tf-popup-filter>, so every filterable
// column gets a button trigger and its filter runs inside the element
// popup. The page lives in static/templates/ and is built into the
// gitignored demos/ by grunt build-demos; the Vite dev server that serves
// the repo root compiles the element module the page imports.
//
// The gate conditions are silent-failure paths: the element is absent from
// both published bundles, so the page imports it, and a `type="module"`
// script is deferred, so a bare tf.init() races the registration and falls
// back to legacy markup. Fails CI on regression.
const { test, expect } = require('@playwright/test');

const DEMO_PAGE = 'demos/tf-popup-filters.html';

test(`popup filters mount on <tf-popup-filter>: ${DEMO_PAGE}`,
    async ({ page }) => {
        const pageErrors = [];
        page.on('pageerror', (error) => pageErrors.push(error.message));

        await page.goto(`/${DEMO_PAGE}`);

        await page.waitForFunction(
            () => Boolean(customElements.get('tf-popup-filter')));
        await page.waitForSelector('tf-popup-filter button[slot="trigger"]',
            { timeout: 15000 });

        const initial = await page.evaluate(() => {
            const hosts = Array.from(
                document.querySelectorAll('tf-popup-filter'));
            const sortHeaders = Array.from(
                document.querySelectorAll('tf-sort-header'));
            return {
                hosts: hosts.length,
                columns: hosts.map((host) => host.closest('th').cellIndex),
                inHeader: hosts.every((host) => host.closest('thead')),
                shadowPopups: hosts.filter((host) =>
                    host.shadowRoot &&
                    host.shadowRoot.querySelector('[part="popup"]')).length,
                popupLabels: hosts.map((host) =>
                    host.getAttribute('accessible-popup-label')),
                checklist: hosts[2].querySelectorAll(
                    'input[type="checkbox"]').length,
                selectTag: hosts[1].querySelector('select').tagName,
                legacyPlaceholders:
                    document.querySelectorAll('div.popUpPlaceholder').length,
                legacyPlaceholderColumn:
                    document.querySelector('div.popUpPlaceholder')
                        .closest('th').cellIndex,
                legacyIcons: document.querySelectorAll('span.ci').length,
                sortHeaders: sortHeaders.length,
                sortHeadersInHeader: sortHeaders.every((host) =>
                    host.closest('thead'))
            };
        });

        const result = await page.evaluate(() => {
            const hosts = Array.from(
                document.querySelectorAll('tf-popup-filter'));
            const checklistHost = hosts[2];
            const container = checklistHost.querySelector('.popUpFilter');

            checklistHost.querySelector('button[slot="trigger"]').click();
            const opened = {
                hasOpen: checklistHost.hasAttribute('open'),
                popupHidden: checklistHost.shadowRoot
                    .querySelector('[part="popup"]').hidden,
                display: container.style.display
            };

            checklistHost.dispatchEvent(new KeyboardEvent('keydown', {
                key: 'Escape',
                bubbles: true,
                composed: true
            }));
            const closed = {
                hasOpen: checklistHost.hasAttribute('open'),
                display: container.style.display
            };

            const select = hosts[1].querySelector('select');
            select.value = 'RUS';
            select.dispatchEvent(new Event('change', { bubbles: true }));

            return { opened, closed };
        });

        await page.waitForFunction(() => {
            const rows = Array.from(
                document.querySelectorAll('#demo tbody tr'));
            return rows.filter((row) => row.offsetParent !== null)
                .length === 3;
        }, { timeout: 8000 });

        expect(initial).toEqual({
            hosts: 8,
            columns: [0, 1, 2, 3, 4, 5, 6, 7],
            inHeader: true,
            shadowPopups: 8,
            popupLabels: Array(8).fill('Column filter'),
            checklist: 8,
            selectTag: 'SELECT',
            // col_8 has no filter, so it keeps the legacy container and no
            // trigger.
            legacyPlaceholders: 1,
            legacyPlaceholderColumn: 8,
            legacyIcons: 0,
            sortHeaders: 9,
            sortHeadersInHeader: true
        });
        expect(result.opened).toEqual({
            hasOpen: true,
            popupHidden: false,
            display: 'block'
        });
        expect(result.closed).toEqual({
            hasOpen: false,
            display: 'none'
        });
        expect(pageErrors).toEqual([]);
    });
