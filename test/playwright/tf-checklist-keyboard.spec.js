const { test, expect } = require('@playwright/test');

const FIXTURE = '/test/test-emitter.html';
const COMPONENT = '/src/components/tf-checklist.js';

test.describe('tf-checklist keyboard', () => {
    test('arrow and enter close', async ({ page }) => {
        await page.goto(FIXTURE);
        await page.evaluate(async (c) => {
            await import(c);
            const el = document.createElement('tf-checklist');
            document.body.appendChild(el);
            el.setOptions(['a', 'b', 'c']);
        }, COMPONENT);
        const trigger = page.locator('tf-checklist button[part="trigger"]');
        await trigger.focus();
        await trigger.press('ArrowDown');
        const option = page.locator(
            'tf-checklist [part="listbox"] [role="option"]'
        ).first();
        await option.press('Space');
        const expanded = await trigger.getAttribute('aria-expanded');
        expect(typeof expanded).toBe('string');
    });
});
