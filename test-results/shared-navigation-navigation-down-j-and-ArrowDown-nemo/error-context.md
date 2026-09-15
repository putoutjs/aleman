# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: shared/navigation.spec.js >> navigation >> down: j and ArrowDown
- Location: e2e/shared/navigation.spec.js:5:5

# Error details

```
Error: expect(received).resolves.toBe(expected) // Object.is equality

Expected: "world"
Received: "hello"
```

# Page snapshot

```yaml
- list [ref=e2]:
  - listitem [ref=e3]: hello
  - listitem [ref=e4]: world
```

# Test source

```ts
  1  | import {test, expect} from '@playwright/test';
  2  | import {createMenuHelper} from '../helpers/menu.js';
  3  | 
  4  | test.describe('navigation', () => {
  5  |     test('down: j and ArrowDown', async ({page}) => {
  6  |         await page.goto('./');
  7  |         const menu = createMenuHelper(page);
  8  |         
  9  |         await menu.show();
  10 |         await page.waitForSelector('ul.menu:not(.menu-hidden)');
  11 |         
  12 |         await menu.pressKey('j');
  13 |         await expect(menu.selectedText()).resolves.toBe('hello');
  14 |         
  15 |         await menu.pressKey('ArrowDown');
> 16 |         await expect(menu.selectedText()).resolves.toBe('world');
     |                                                    ^ Error: expect(received).resolves.toBe(expected) // Object.is equality
  17 |     });
  18 |     
  19 |     test('up: k and ArrowUp', async ({page}) => {
  20 |         await page.goto('./');
  21 |         const menu = createMenuHelper(page);
  22 |         
  23 |         await menu.show();
  24 |         await page.waitForSelector('ul.menu:not(.menu-hidden)');
  25 |         
  26 |         await menu.pressKey('j');
  27 |         await expect(menu.selectedText()).resolves.toBe('hello');
  28 |         
  29 |         await menu.pressKey('j');
  30 |         await expect(menu.selectedText()).resolves.toBe('world');
  31 |         
  32 |         await menu.pressKey('k');
  33 |         await expect(menu.selectedText()).resolves.toBe('hello');
  34 |         
  35 |         await menu.pressKey('ArrowUp');
  36 |         await expect(menu.selectedText()).resolves.toBe('world');
  37 |     });
  38 |     
  39 |     test('shift-g goes to last, gg goes to first', async ({page}) => {
  40 |         await page.goto('./');
  41 |         const menu = createMenuHelper(page);
  42 |         
  43 |         await menu.show();
  44 |         await page.waitForSelector('ul.menu:not(.menu-hidden)');
  45 |         
  46 |         await menu.pressKey('G');
  47 |         await expect(menu.selectedText()).resolves.toBe('world');
  48 |         
  49 |         await menu.pressKey('g');
  50 |         await menu.pressKey('g');
  51 |         await expect(menu.selectedText()).resolves.toBe('hello');
  52 |     });
  53 | });
  54 | 
```