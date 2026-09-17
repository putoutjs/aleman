/* eslint-disable n/no-unpublished-import -- imports a generated browser bundle */

import {createMenu} from '/dist/menos.bundle.js';

globalThis.window.__fired = [];

let resolveMenu;
const menuReady = new Promise((resolve) => {
    resolveMenu = resolve;
});

const menuData = {
    hello: () => {
        globalThis.window.__fired.push('hello');
    },
    world: () => {
        globalThis.window.__fired.push('world');
    },
    new: {
        file: () => {
            globalThis.window.__fired.push('file');
        },
        directory: () => {
            globalThis.window.__fired.push('directory');
        },
    },
};

globalThis.window.__menu = {
    show: async (x, y) => (await menuReady).show(x, y),
    hide: async () => (await menuReady).hide(),
    ready: menuReady,
};

const {name} = document.body.dataset;

resolveMenu(createMenu(name, {
    name,
    infiniteScroll: true,
}, menuData));
