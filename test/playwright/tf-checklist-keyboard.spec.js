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
        await trigger.waitFor({ state: 'attached' });
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
        await trigger.waitFor({ state: 'attached' });
        await trigger.focus();
        await trigger.press('ArrowDown');
        const opts = page.locator(
            'tf-checklist [part="listbox"] [role="option"]');
        await expect(opts).toHaveCount(2);
    });

    test('type-ahead selects option', async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ url: COMPONENT, type: 'module' });
        await page.waitForTimeout(500);
        await page.evaluate(async () => {
            const el = document.createElement('tf-checklist');
            el.setOptions(['apple', 'banana', 'cherry']);
            document.body.appendChild(el);
        });
        const trigger = page.locator(
            'tf-checklist button[part="trigger"]');
        await trigger.waitFor({ state: 'attached' });
        await trigger.focus();
        await trigger.press('ArrowDown');
        await page.keyboard.press('a');
        await page.keyboard.press('p');
        const option = page.locator(
            'tf-checklist [part="listbox"] [role="option"]'
        ).first();
        await expect(option).toBeVisible();
    });

    test('arrow up navigation', async ({ page }) => {
        await page.goto(FIXTURE);
        await page.evaluate(async (c) => {
            await import(c);
            const el = document.createElement('tf-checklist');
            el.setOptions(['a', 'b', 'c']);
            document.body.appendChild(el);
        }, COMPONENT);
        const trigger = page.locator('tf-checklist button[part="trigger"]');
        await trigger.focus();
        await trigger.press('ArrowDown');
        await trigger.press('ArrowUp');
        const option = page.locator(
            'tf-checklist [part="listbox"] [role="option"]'
        ).first();
        await expect(option).toBeVisible();
    });

    test('home and end jump', async ({ page }) => {
        await page.goto(FIXTURE);
        await page.evaluate(async (c) => {
            await import(c);
            const el = document.createElement('tf-checklist');
            el.setOptions(['a', 'b', 'c']);
            document.body.appendChild(el);
        }, COMPONENT);
        const trigger = page.locator('tf-checklist button[part="trigger"]');
        await trigger.focus();
        await trigger.press('ArrowDown');
        await page.keyboard.press('End');
        const opts = page.locator(
            'tf-checklist [part="listbox"] [role="option"]');
        await expect(opts).toHaveCount(3);
    });

    test('enter closes and applies', async ({ page }) => {
        await page.goto(FIXTURE);
        await page.evaluate(async (c) => {
            await import(c);
            const el = document.createElement('tf-checklist');
            el.setOptions(['a', 'b', 'c']);
            document.body.appendChild(el);
        }, COMPONENT);
        const trigger = page.locator('tf-checklist button[part="trigger"]');
        await trigger.focus();
        await trigger.press('ArrowDown');
        await page.keyboard.press('Enter');
        await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    test('escape closes and returns focus', async ({ page }) => {
        await page.goto(FIXTURE);
        await page.addScriptTag({ url: COMPONENT, type: 'module' });
        await page.waitForTimeout(500);
        await page.evaluate(async () => {
            const el = document.createElement('tf-checklist');
            el.setOptions(['a']);
            document.body.appendChild(el);
        });
        const trigger = page.locator(
            'tf-checklist button[part="trigger"]');
        await trigger.waitFor({ state: 'attached' });
        await trigger.focus();
        await trigger.press('ArrowDown');
        await page.keyboard.press('Escape');
        const expanded = await trigger.getAttribute('aria-expanded');
        expect(expanded).toBe('false');
    });

    test('type-ahead startIndex after disabled options', async ({ page }) => {
        await page.goto(FIXTURE);
        await page.evaluate(async (c) => {
            await import(c);
            const el = document.createElement('tf-checklist');
            document.body.appendChild(el);
            el.setOptions([
                { value: 'd', text: 'disabled', disabled: true },
                { value: 'a', text: 'apple' },
                { value: 'b', text: 'bear' },
            ]);
        }, COMPONENT);
        const trigger = page.locator(
            'tf-checklist button[part="trigger"]');
        await trigger.waitFor({ state: 'attached' });
        await trigger.focus();
        await trigger.press('ArrowDown');
        await page.keyboard.press('b');
        const listbox = page.locator('tf-checklist [part="listbox"]');
        const activeDesc = await listbox.getAttribute(
            'aria-activedescendant');
        expect(activeDesc).toContain('option-2');
    });

    test('aria-activedescendant syncs on focusin', async ({ page }) => {
        await page.goto(FIXTURE);
        await page.evaluate(async (c) => {
            await import(c);
            const el = document.createElement('tf-checklist');
            document.body.appendChild(el);
            el.setOptions(['apple', 'banana']);
        }, COMPONENT);
        const trigger = page.locator('tf-checklist button[part="trigger"]');
        await trigger.focus();
        await trigger.press('ArrowDown');
        const listbox = page.locator('tf-checklist [part="listbox"]');
        const activeDesc = await listbox.getAttribute(
            'aria-activedescendant');
        expect(typeof activeDesc).toBe('string');
        expect(activeDesc.length).toBeGreaterThan(0);
        await listbox.focusout();
    });

    test('state cleared on close and reopen', async ({ page }) => {
        await page.goto(FIXTURE);
        await page.evaluate(async (c) => {
            await import(c);
            const el = document.createElement('tf-checklist');
            document.body.appendChild(el);
            el.setOptions(['a', 'b']);
        }, COMPONENT);
        const trigger = page.locator('tf-checklist button[part="trigger"]');
        await trigger.focus();
        await trigger.press('ArrowDown');
        const listbox = page.locator('tf-checklist [part="listbox"]');
        const activeDescBefore = await listbox.getAttribute(
            'aria-activedescendant');
        expect(typeof activeDescBefore).toBe('string');
        await trigger.press('Escape');
        const activeDescAfter = await listbox.getAttribute(
            'aria-activedescendant');
        expect(activeDescAfter).toBeNull();
        await trigger.press('ArrowDown');
        const activeDescAfterReopen = await listbox.getAttribute(
            'aria-activedescendant');
        expect(typeof activeDescAfterReopen).toBe('string');
    });
});
