import {hydrate} from './aleman/index.js';
import * as click from './addons/click.js';
import {setButtonName} from './rules/button.js';

const addons = [click];
const rules = [setButtonName];

const state = {
    index: 0,
};

const buttonElement = document.querySelector('[data-name="hello"]');

hydrate(buttonElement, {
    state,
    addons,
    rules,
});
