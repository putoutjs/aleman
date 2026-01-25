import {createMenu} from '../nemo/nemo.js';

const menuData = {
    hello: () => alert('x'),
    world: () => alert('y'),
};

await createMenu(document.body, {}, menuData);
