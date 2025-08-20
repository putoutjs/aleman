import {createMenu} from '../menu/menu.js';

const menuData = {
    hello: () => alert('x'),
    world: () => alert('y'),
};

await createMenu(document.body, {}, menuData);
