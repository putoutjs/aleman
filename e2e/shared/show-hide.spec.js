import {test, expect} from '@playwright/test';
import {createMenuHelper} from '../helpers/menu.js';

test.describe('show-hide', () => {
    test('menu shows and hides with Escape', async ({page}) => {
        await page.goto('./');
        const menu = createMenuHelper(page);
        
        await menu.show();
        await expect(menu.topMenu()).toBeVisible();
        
        await menu.pressKey('Escape');
        
        await expect(menu.topMenu()).toHaveClass(/menu-hidden/);
        await expect(menu.topMenu()).toBeHidden();
    });
});
