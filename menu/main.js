import * as menuClick from '../lib//addons/show-menu-click.js';
import * as menuItemClick from '../lib/addons/menu-item-click.js';
import * as menuMouseOver from '../lib/addons/menu-mouse-over.js';
import menu from '../lib/globals/menu.js';
import {hydrate} from '../lib/aleman/aleman.js';
import {rules} from '../lib/rules/index.js';

export function hydrateMenu(element, options, menuData) {
    const addons = [
        menuClick,
        menuItemClick,
        menuMouseOver,
    ];
    
    const globals = [...menu];
    
    const state = {
        'menu-toggler': {
            command: 'hide',
        },
        'menu': {
            data: menuData,
        },
    };
    
    hydrate({
        element,
        state,
        rules,
        addons,
        globals,
    });
}
