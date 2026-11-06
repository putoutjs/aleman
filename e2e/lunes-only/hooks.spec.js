import {test, expect} from '@playwright/test';
import {createMenuHelper} from '../helpers/menu.js';

const hooksOf = (page) => page.evaluate(() => globalThis.__hooks.map(([name]) => name));

test.describe('hooks', () => {
    test('show and hide call the hooks', async ({page}) => {
        await page.goto('./');
        const menu = createMenuHelper(page);
        
        await menu.show();
        await menu.pressKey('Escape');
        await expect(menu.topMenu()).toBeHidden();
        
        const result = await hooksOf(page);
        const expected = [
            'beforeShow',
            'afterShow',
            'beforeHide',
            'afterHide',
        ];
        
        expect(result).toEqual(expected);
    });
    
    test('beforeShow returning false keeps the menu hidden', async ({page}) => {
        await page.goto('./');
        const menu = createMenuHelper(page);
        
        await page.evaluate(() => {
            globalThis.__blockShow = true;
        });
        await menu.show();
        await page.mouse.click(400, 300, {
            button: 'right',
        });
        
        await expect(menu.topMenu()).toBeHidden();
        
        const result = await hooksOf(page);
        const expected = [
            'beforeShow',
            'beforeShow',
        ];
        
        expect(result).toEqual(expected);
    });
    
    test('click on an item calls beforeClick, then the item, then afterClick', async ({page}) => {
        await page.goto('./');
        const menu = createMenuHelper(page);
        
        await menu.show();
        await menu
            .topMenu()
            .locator('label[data-menu-path="hello"]')
            .click();
        
        await expect
            .poll(menu.firedCallbacks)
            .toEqual(['hello']);
        
        const result = await hooksOf(page);
        const expected = [
            'beforeShow',
            'afterShow',
            'beforeClick',
            'beforeHide',
            'afterHide',
            'afterClick',
        ];
        
        expect(result).toEqual(expected);
    });
});
