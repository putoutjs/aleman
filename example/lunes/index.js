import {createMenu} from '../../lunes/lunes.js';

const menuData = {
    hello: () => alert('x'),
    world: () => alert('y'),
};

await createMenu(document.body, {}, menuData);
