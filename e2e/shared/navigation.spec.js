import {test, expect} from '@playwright/test';
import {createMenuHelper} from '../helpers/menu.js';

test.describe('navigation', () => {
    test('down: j and ArrowDown', async ({page}) => {
        await page.goto('./');
        const menu = createMenuHelper(page);
        
        await menu.show();
        await page.waitForSelector('ul.menu:not(.menu-hidden)');
        
        await menu.pressKey('j');
        await expect(menu.selectedText()).resolves.toBe('hello');
        
        await menu.pressKey('ArrowDown');
        await expect(menu.selectedText()).resolves.toBe('world');
    });
    
    test('up: k and ArrowUp', async ({page}) => {
        await page.goto('./');
        const menu = createMenuHelper(page);
        
        await menu.show();
        await page.waitForSelector('ul.menu:not(.menu-hidden)');
        
        await menu.pressKey('j');
        await expect(menu.selectedText()).resolves.toBe('hello');
        
        await menu.pressKey('j');
        await expect(menu.selectedText()).resolves.toBe('world');
        
        await menu.pressKey('k');
        await expect(menu.selectedText()).resolves.toBe('hello');
        
        await menu.pressKey('ArrowUp');
        await expect(menu.selectedText()).resolves.toBe('new');
    });
    
    test('shift-g goes to last, gg goes to first', async ({page}) => {
        await page.goto('./');
        const menu = createMenuHelper(page);
        
        await menu.show();
        await page.waitForSelector('ul.menu:not(.menu-hidden)');
        
        await menu.pressKey('G');
        await expect(menu.selectedText()).resolves.toBe('new');
        
        await menu.pressKey('g');
        await menu.pressKey('g');
        await expect(menu.selectedText()).resolves.toBe('hello');
    });
});
