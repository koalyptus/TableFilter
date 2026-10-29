import { test, expect } from '@playwright/test';

test.describe('tf-checklist keyboard', () => {
    test('arrow and enter close', async ({ page }) => {
        await page.goto('/test/test-checklist.html');
        const trigger = page.locator(
            'tf-checklist button[part="trigger"]');
        await trigger.focus();
        await trigger.press('ArrowDown');
        const option = page.locator(
            'tf-checklist [part="listbox"] [role="option"]').first();
        await expect(option).toHaveFocus();
        await option.press('Enter');
        await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
});
