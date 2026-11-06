import {createMenu} from '../../lunes/lunes.js';

globalThis.window.__fired = [];
globalThis.window.__hooks = [];
globalThis.window.__blockShow = false;

const hook = (name, value) => (...args) => {
    globalThis.window.__hooks.push([name, ...args]);
    return value?.();
};

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
    beforeShow: hook('beforeShow', () => !globalThis.window.__blockShow),
    afterShow: hook('afterShow'),
    beforeHide: hook('beforeHide'),
    afterHide: hook('afterHide'),
    beforeClick: hook('beforeClick'),
    afterClick: hook('afterClick'),
}, menuData);

resolveMenu(menuInstance);
