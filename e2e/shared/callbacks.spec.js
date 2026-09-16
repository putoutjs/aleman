import {test, expect} from '@playwright/test';
import {createMenuHelper} from '../helpers/menu.js';

test.describe('callbacks', () => {
    test('clicking a leaf calls it once and hides the menu', async ({page}) => {
        await page.goto('./');
        const menu = createMenuHelper(page);
        
        await menu.show();
        await expect(menu.topMenu()).toBeVisible();
        await menu.topMenu().locator('label[data-menu-path="hello"]').click();
        
        await expect.poll(menu.firedCallbacks).toEqual(['hello']);
        await expect(menu.topMenu()).toBeHidden();
    });
    test('Enter calls selected leaf and hides', async ({page}) => {
        await page.goto('./');
        const menu = createMenuHelper(page);
        await menu.show();
        await menu.pressKey('j');
        await menu.pressKey('Enter');
        await expect.poll(menu.firedCallbacks).toEqual(['hello']);
        await expect(menu.topMenu()).toBeHidden();
    });

    test('submenu child click calls only the child', async ({page}) => {
        await page.goto('./');
        const menu = createMenuHelper(page);
        await menu.show();
        await menu.pressKey('G');
        await menu.pressKey('ArrowRight');
        await menu.topMenu().locator('label[data-menu-path="new.file"]').click();
        await expect.poll(menu.firedCallbacks).toEqual(['file']);
        await expect(menu.topMenu()).toBeHidden();
    });

    test('outside click hides without callbacks', async ({page}) => {
        await page.goto('./');
        const menu = createMenuHelper(page);
        await menu.show();
        await expect(menu.topMenu()).toBeVisible();
        await page.mouse.click(900, 600);
        await expect(menu.topMenu()).toBeHidden();
        await expect.poll(menu.firedCallbacks).toEqual([]);
    });

    test('mouse leave clears selection without callbacks', async ({page}) => {
        await page.goto('./');
        const menu = createMenuHelper(page);
        await menu.show();
        await menu.pressKey('j');
        await expect(menu.topMenu().locator(':scope > .menu-item-selected')).toHaveCount(1);
        await menu.topMenu().dispatchEvent('mouseleave');
        await expect(menu.topMenu().locator('.menu-item-selected')).toHaveCount(0);
        await expect(menu.topMenu()).toBeVisible();
        await expect.poll(menu.firedCallbacks).toEqual([]);
    });

});
