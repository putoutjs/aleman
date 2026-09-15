import {test, expect} from '@playwright/test';
import {createMenuHelper} from '../helpers/menu.js';

test.describe('show-hide', () => {
    test('menu shows and hides with Escape', async ({page}) => {
        await page.goto('./');
        const menu = createMenuHelper(page);
        
        await menu.show();
        await expect(page.locator('ul.menu:not(.menu-hidden)')).toBeVisible();
        
        await menu.pressKey('Escape');
        
        await expect(page.locator('ul.menu')).toHaveClass(/menu-hidden/);
    });
});
