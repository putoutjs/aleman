export const createMenuHelper = (page) => {
    const waitForMenu = () => page.waitForFunction(() => Boolean(globalThis.__menu?.show));
    
    return {
        topMenu: () => page.locator('section[data-name^="aleman-hydrate-"] > ul.menu'),
        async show(x = 100, y = 100) {
            await waitForMenu();
            await page.evaluate(({x, y}) => globalThis.__menu.show(x, y), {
                x,
                y,
            });
        },
        async hide() {
            await waitForMenu();
            await page.evaluate(() => globalThis.__menu.hide());
        },
        async pressKey(key) {
            await page.keyboard.press(key);
        },
        async pressKeys(...keys) {
            for (const key of keys)
                await page.keyboard.press(key);
        },
        isVisible: () => page
            .locator('ul.menu:not(.menu-hidden)')
            .isVisible(),
        selectedText: async () => {
            const text = await page
                .locator('.menu-item-selected label')
                .first()
                .textContent();
            
            return text?.trim();
        },
        selectedPath: () => page
            .locator('.menu-item-selected')
            .first()
            .getAttribute('data-menu-path'),
        firedCallbacks: () => page.evaluate(() => [
            ...globalThis.__fired,
        ]),
        async clearFired() {
            await page.evaluate(() => {
                globalThis.__fired.length = 0;
            });
        },
    };
};
