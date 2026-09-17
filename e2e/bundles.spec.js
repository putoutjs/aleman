import {test, expect} from '@playwright/test';

const openBundlePage = async (page, url) => {
    const errors = [];
    
    page.on('pageerror', (error) => errors.push(error.message));
    await page.route('**/*', (route) => {
        const {hostname} = new URL(route.request().url());
        
        if (hostname === 'localhost')
            return route.continue();
        
        errors.push(`Unexpected remote request: ${route.request().url()}`);
        return route.abort();
    });
    await page.goto(url);
    await page.waitForFunction(() => Boolean(globalThis.__menu?.ready));
    
    return errors;
};

const clickHello = async (page) => {
    const ul = page.locator('[data-name="aleman-hydrate-menu"] > ul.menu');
    
    await page.evaluate(() => globalThis.__menu.show(100, 100));
    await expect(ul).toBeVisible();
    await ul.locator('label[data-menu-path="hello"]').click();
    await expect.poll(() => page.evaluate(() => globalThis.__fired)).toEqual(['hello']);
    await expect(ul).toBeHidden();
    await page.evaluate(() => globalThis.__menu.show(100, 100));
    await expect(ul).toBeVisible();
    await page.evaluate(() => globalThis.__menu.hide());
    await expect(ul).toBeHidden();
};

test.describe('bundles', () => {
    test('menu.bundle.js renders and fires callbacks', async ({page}) => {
        const errors = await openBundlePage(page, '/example/menu/bundle.html');
        
        await clickHello(page);
        expect(errors).toEqual([]);
    });
    
    test('menos.bundle.js renders and fires callbacks', async ({page}) => {
        const errors = await openBundlePage(page, '/example/menos/bundle.html');
        
        await clickHello(page);
        expect(errors).toEqual([]);
    });
    
    test('menos.js with external putout renders and fires callbacks', async ({page}) => {
        const errors = await openBundlePage(page, '/example/menos/external.html');
        
        await clickHello(page);
        expect(errors).toEqual([]);
    });
});
