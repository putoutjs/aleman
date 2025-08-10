import * as start from './addons/start-click.js';
import * as stop from './addons/stop-click.js';
import * as inputChange from './addons/input-change.js';
import {hydrate} from './aleman.js';
import {rules} from './rules/index.js';

const addons = [
    start,
    stop,
    inputChange,
];

hydrate({
    rules,
    addons,
});
