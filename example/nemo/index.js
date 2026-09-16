import {createMenu} from '../../nemo/nemo.js';

globalThis.window.__fired = [];

let resolveMenu = null;
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

const menuInstance = await createMenu(name, {
    infiniteScroll: true,
}, menuData);

resolveMenu(menuInstance);
