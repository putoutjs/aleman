import {createMenu} from '../../menu/menu.js';

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

const options = {
    name: 'menu',
    infiniteScroll: true,
};

const {name} = document.body.dataset;

globalThis.window.__menu = {
    show: async (x, y) => (await menuReady).show(x, y),
    hide: async () => (await menuReady).hide(),
    ready: menuReady,
};

const menuInstance = await createMenu(name, options, menuData);

resolveMenu(menuInstance);

globalThis.addEventListener('keydown', (event) => {
    if (event.key === 'F9')
        menuInstance.show();
});
