import {test, expect} from '@playwright/test';
import {createMenuHelper} from '../helpers/menu.js';

test.describe('show-hide', () => {
    test('menu shows and hides with Escape', async ({page}) => {
        await page.goto('/');
        const menu = createMenuHelper(page);
        
        await menu.show();
        await page.waitForSelector('ul.menu:not(.menu-hidden)');
        
        const isVisible = await menu.isVisible();
        expect(isVisible).toBe(true);
        
        await menu.pressKey('Escape');
        await page.waitForSelector('ul.menu.menu-hidden');
        
        const isHidden = await menu.isVisible();
        expect(isHidden).toBe(false);
    });
});
