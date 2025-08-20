import * as menuClick from '../menu-v1/addons/show-menu-click.js';
import * as menuItemClick from '../menu-v1/addons/menu-item-click.js';
import * as menuMouseOver from '../menu-v1/addons/menu-mouse-over.js';
import menu from '../menu-v1/globals/menu.js';
import {hydrate} from '../menu-v1/aleman/aleman.js';
import {rules} from '../menu-v1/rules/index.js';

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
