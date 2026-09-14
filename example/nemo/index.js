import {createMenu} from '../../nemo/nemo.js';

globalThis.window.__fired = globalThis.window.__fired || [];

globalThis.window.__menu = {};

const menuData = {
    hello: () => {
        globalThis.window.__fired.push('hello');
        alert('x');
    },
    world: () => {
        globalThis.window.__fired.push('world');
        alert('y');
    },
};

const menu = await createMenu(document.body, {}, menuData);
Object.assign(globalThis.window.__menu, menu);
