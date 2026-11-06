import {test, expect} from '@playwright/test';
import {createMenuHelper} from '../helpers/menu.js';

test.describe('hover', () => {
    test('hover over a submenu parent shows the submenu', async ({page}) => {
        await page.goto('./');
        const menu = createMenuHelper(page);
        
        await menu.show();
        
        const parent = menu
            .topMenu()
            .locator('li.menu-submenu')
            .first();
        
        const submenu = parent.locator('> ul.menu');
        
        await expect(submenu).toBeHidden();
        
        await parent
            .locator('> label')
            .hover();
        
        await expect(submenu).toBeVisible();
    });
    
    test('leaving the submenu parent hides the submenu', async ({page}) => {
        await page.goto('./');
        const menu = createMenuHelper(page);
        
        await menu.show();
        
        const parent = menu
            .topMenu()
            .locator('li.menu-submenu')
            .first();
        
        await parent
            .locator('> label')
            .hover();
        await page.mouse.move(700, 500);
        
        await expect(parent.locator('> ul.menu')).toBeHidden();
    });
    
    test('hover over an item does not fire its callback', async ({page}) => {
        await page.goto('./');
        const menu = createMenuHelper(page);
        
        await menu.show();
        await menu
            .topMenu()
            .locator('li.menu-item:not(.menu-submenu) > label')
            .first()
            .hover();
        
        await expect
            .poll(menu.firedCallbacks)
            .toEqual([]);
    });
});
