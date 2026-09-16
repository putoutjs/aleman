import {test, expect} from '@playwright/test';
import {createMenuHelper} from '../helpers/menu.js';

const SUBMENU_SHOWN = 'li.menu-submenu.menu-submenu-show';

const selectSubmenuItem = async (menu) => {
    await menu.pressKey('G');
    await expect(menu.selectedText()).resolves.toBe('new');
};

test.describe('submenu', () => {
    test('right opens submenu, left closes it', async ({page}) => {
        await page.goto('./');
        const menu = createMenuHelper(page);
        
        await menu.show();
        await menu
            .topMenu()
            .waitFor({
                state: 'visible',
            });
        
        await selectSubmenuItem(menu);
        const submenu = menu
            .topMenu()
            .locator('li.menu-submenu > ul.menu');
        await expect(submenu).toBeHidden();
        await menu.pressKey('ArrowRight');
        await expect(page.locator(SUBMENU_SHOWN)).toHaveCount(1);
        await expect(submenu).toBeVisible();
        await expect(submenu.locator('li > label')).toHaveText(['file', 'directory']);
        
        await menu.pressKey('ArrowLeft');
        await expect(page.locator(SUBMENU_SHOWN)).toHaveCount(0);
        await expect(submenu).toBeHidden();
    });
    
    test('l opens submenu, h closes it', async ({page}) => {
        await page.goto('./');
        const menu = createMenuHelper(page);
        
        await menu.show();
        await menu
            .topMenu()
            .waitFor({
                state: 'visible',
            });
        
        await selectSubmenuItem(menu);
        const submenu = menu
            .topMenu()
            .locator('li.menu-submenu > ul.menu');
        await menu.pressKey('l');
        await expect(page.locator(SUBMENU_SHOWN)).toHaveCount(1);
        await expect(submenu).toBeVisible();
        
        await menu.pressKey('h');
        await expect(page.locator(SUBMENU_SHOWN)).toHaveCount(0);
        await expect(submenu).toBeHidden();
    });
    
    test('right on leaf item does nothing', async ({page}) => {
        await page.goto('./');
        const menu = createMenuHelper(page);
        
        await menu.show();
        await page.waitForSelector('ul.menu:not(.menu-hidden)');
        
        await menu.pressKey('j');
        await expect(menu.selectedText()).resolves.toBe('hello');
        
        await menu.pressKey('ArrowRight');
        
        await expect(page.locator(SUBMENU_SHOWN)).toHaveCount(0);
    });
    
    test('right with no selection does nothing', async ({page}) => {
        await page.goto('./');
        const menu = createMenuHelper(page);
        
        await menu.show();
        await page.waitForSelector('ul.menu:not(.menu-hidden)');
        
        await menu.pressKey('ArrowRight');
        
        await expect(page.locator(SUBMENU_SHOWN)).toHaveCount(0);
    });
});
