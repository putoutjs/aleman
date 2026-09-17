// declarative list only — no logic
import {createItemClick} from './item-click.js';
import {createMouseLeave} from './mouse-leave.js';
import {createContextMenu} from './context-menu.js';
import * as escape from './escape.js';
import * as enter from './enter.js';
import * as down from './down.js';
import * as up from './up.js';
import * as left from './left.js';
import * as right from './right.js';
import * as gg from './gg.js';
import * as shiftG from './shift-g.js';

export const createAddons = (name) => [
    createContextMenu(name),
    createMouseLeave(name),
    createItemClick(name),
    ...addons,
];

export const addons = [
    escape,
    down,
    up,
    enter,
    left,
    right,
    shiftG,
    gg,
];
