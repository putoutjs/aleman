import * as submenu from './submenu/index.js';
import * as setPosition from './set-position/index.js';
import * as buildMenu from './build-menu/index.js';
import * as menu from './menu/index.js';
import * as select from './select/index.js';

export const rules = {
    'menu': menu,
    'build-menu': buildMenu,
    'set-position': setPosition,
    'select': select,
    'submenu': submenu,
};
