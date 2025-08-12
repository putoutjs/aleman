import * as start from './addons/start-click.js';
import * as stop from './addons/stop-click.js';
import * as inputChange from './addons/input-change.js';
import * as menuClick from './addons/menu-click.js';
import * as menu from './globals/menu.js';
import {hydrate} from './aleman/aleman.js';
import {rules} from './rules/index.js';

const addons = [
    start,
    stop,
    inputChange,
    menuClick,
];

const globals = [menu];

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
