export const createMenuHelper = (page) => ({
    async show(x = 100, y = 100) {
        await page.evaluate(({x, y}) => window.__menu.show(x, y), {x, y});
    },
    async hide() { await page.evaluate(() => window.__menu.hide()); },
    async pressKey(key) { await page.keyboard.press(key); },
    async pressKeys(...keys) {
        for (const key of keys) await page.keyboard.press(key);
    },
    isVisible: () => page.locator('ul.menu:not(.menu-hidden)').isVisible(),
    selectedText: () => page.locator('.menu-item-selected label').first().textContent(),
    selectedPath: () => page.locator('.menu-item-selected').first().getAttribute('data-menu-path'),
    firedCallbacks: () => page.evaluate(() => [...window.__fired]),
    async clearFired() { await page.evaluate(() => { window.__fired.length = 0; }); },
});
