import * as selectNext from './select-next/index.js';
import * as menu from './menu/index.js';
import * as removeButton from './remove-button/index.js';
import * as setValue from './set-value/index.js';

export const rules = {
    'set-value': setValue,
    'remove-button': removeButton,
    'menu': menu,
    'select-next': selectNext,
};
