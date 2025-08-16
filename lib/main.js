import * as start from './addons/additional/start-click.js';
import * as stop from './addons/additional/stop-click.js';
import * as inputChange from './addons/additional/input-change.js';
import * as menuClick from './addons/show-menu-click.js';
import * as menuItemClick from './addons/menu-item-click.js';
import * as menuMouseOver from './addons/menu-mouse-over.js';
import menu from './globals/menu.js';
import {hydrate} from './aleman/aleman.js';
import {rules} from './rules/index.js';

export function createMenu() {
    const addons = [
        start,
        stop,
        inputChange,
        menuClick,
        menuItemClick,
        menuMouseOver,
    ];
    
    const globals = [...menu];
    
    const state = {
        'menu-toggler': {
            command: 'hide',
        },
    };
    
    hydrate({
        state,
        rules,
        addons,
        globals,
    });
}
