import * as start from './addons/start-click.js';
import * as stop from './addons/stop-click.js';
import * as inputChange from './addons/input-change.js';
import * as menuClick from './addons/menu-click.js';
import * as menuItemClick from './addons/menu-item-click.js';
import * as menuMouseOver from './addons/menu-mouse-over.js';
import * as menuEnter from './globals/menu-enter.js';
import * as menuEscape from './globals/menu-escape.js';
import * as menuF9 from './globals/menu-f9.js';
import * as menuUp from './globals/menu-up.js';
import * as menuDown from './globals/menu-down.js';
import {hydrate} from './aleman/aleman.js';
import {rules} from './rules/index.js';

const addons = [
    start,
    stop,
    inputChange,
    menuClick,
    menuItemClick,
    menuMouseOver,
];

const globals = [
    menuEnter,
    menuEscape,
    menuF9,
    menuUp,
    menuDown,
];

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
