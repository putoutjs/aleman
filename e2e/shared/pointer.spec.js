import {test, expect} from '@playwright/test';
import {createMenuHelper} from '../helpers/menu.js';

test.describe('pointer', () => {
    test('right click opens the menu near the pointer', async ({page}) => {
        await page.goto('./');
        const menu = createMenuHelper(page);
        
        await menu.show(10, 10);
        await menu.pressKey('Escape');
        await expect(menu.topMenu()).toBeHidden();
        
        await page.mouse.click(400, 300, {
            button: 'right',
        });
        
        await expect(menu.topMenu()).toBeVisible();
        
        const box = await menu
            .topMenu()
            .boundingBox();
        
        expect(Math.abs(box.x - 400)).toBeLessThan(5);
        expect(Math.abs(box.y - 300)).toBeLessThan(30);
    });
    
    test('click on a submenu parent keeps the menu open', async ({page}) => {
        await page.goto('./');
        const menu = createMenuHelper(page);
        
        await menu.show();
        await menu
            .topMenu()
            .locator('label[data-menu-path="new"]')
            .click();
        
        await expect(menu.topMenu()).toBeVisible();
        await expect
            .poll(menu.firedCallbacks)
            .toEqual([]);
    });
});
