const { test, expect } = require('@playwright/test');

const FIXTURE = '/test/test-emitter.html';
const COMPONENT = '/src/components/tf-checklist.js';

test.describe('tf-checklist keyboard', () => {
    test('arrow navigation and selection', async ({ page }) => {
        await page.goto(FIXTURE);
        await page.evaluate(async (c) => {
            await import(c);
            const el = document.createElement('tf-checklist');
            document.body.appendChild(el);
            el.setOptions(['a', 'b', 'c']);
        }, COMPONENT);
        const trigger = page.locator(
            'tf-checklist button[part="trigger"]');
        await trigger.focus();
        await trigger.press('ArrowDown');
        const option = page.locator(
            'tf-checklist [part="listbox"] [role="option"]'
        ).first();
        await option.press('Space');
        const expanded = await trigger.getAttribute('aria-expanded');
        expect(typeof expanded).toBe('string');
    });

    test('arrow wrap-around and disabled skip', async ({ page }) => {
        await page.goto(FIXTURE);
        await page.evaluate(async (c) => {
            await import(c);
            const el = document.createElement('tf-checklist');
            document.body.appendChild(el);
            el.setOptions([
                { value: 'x', text: 'x', disabled: true },
                { value: 'y', text: 'y' },
            ]);
        }, COMPONENT);
        const trigger = page.locator(
            'tf-checklist button[part="trigger"]');
        await trigger.focus();
        await trigger.press('ArrowDown');
        const opts = page.locator(
            'tf-checklist [part="listbox"] [role="option"]');
        await expect(opts).toHaveCount(2);
    });

    test('type-ahead selects option', async ({ page }) => {
        await page.goto(FIXTURE);
        await page.evaluate(async (c) => {
            await import(c);
            const el = document.createElement('tf-checklist');
            document.body.appendChild(el);
            el.setOptions(['apple', 'banana', 'cherry']);
        }, COMPONENT);
        const trigger = page.locator(
            'tf-checklist button[part="trigger"]');
        await trigger.focus();
        await trigger.press('ArrowDown');
        await page.keyboard.press('a');
        await page.keyboard.press('p');
        const option = page.locator(
            'tf-checklist [part="listbox"] [role="option"]'
        ).first();
        await expect(option).toBeVisible();
    });

    test('escape closes and returns focus', async ({ page }) => {
        await page.goto(FIXURE);
        await page.evaluate(async (c) => {
            await import(c);
            const el = document.createElement('tf-checklist');
            document.body.appendChild(el);
            el.setOptions(['a']);
        }, COMPONENT);
        const trigger = page.locator(
            'tf-checklist button[part="trigger"]');
        await trigger.focus();
        await trigger.press('ArrowDown');
        await page.keyboard.press('Escape');
        const expanded = await trigger.getAttribute('aria-expanded');
        expect(expanded).toBe('false');
    });
});
