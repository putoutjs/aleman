import {createMenu} from '../../menu/menu.js';

globalThis.window.__fired = globalThis.window.__fired || [];

globalThis.window.__menu = {
    show: (x, y) => {
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

        const options = {
            name: 'menu',
            infiniteScroll: true,
        };

        const {name} = document.body.dataset;
        const menu = createMenu(name, options, menuData);
        
        menu.show(x, y);
        return menu;
    },
    hide: () => {
        const stateElement = document.querySelector('[data-name="menu"]');
        if (stateElement) {
            stateElement.textContent = 'null';
        }
    },
};

globalThis.addEventListener('keydown', (event) => {
    if (event.key === 'F9')
        globalThis.window.__menu.show();
});
