import {createMenu} from '../../lunes/lunes.js';

const menuData = {
    hello: () => alert('x'),
    world: () => alert('y'),
};

const options = {
    name: 'menu',
    infiniteScroll: true,
};

const {name} = document.body.dataset;
const menu = await createMenu(name, options, menuData);

globalThis.addEventListener('keydown', (event) => {
    if (event.key === 'F9')
        menu.show();
    
    if (event.key === 'Escape')
        menu.hide();
});
