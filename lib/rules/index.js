import * as unselectAll from './unselect-all/index.js';
import * as buildMenu from './build-menu/index.js';
import * as select from './select/index.js';
import * as unselect from './unselect/index.js';
import * as menu from './menu/index.js';
import * as removeButton from './remove-button/index.js';
import * as setValue from './set-value/index.js';

export const rules = {
    'set-value': setValue,
    'remove-button': removeButton,
    'menu': menu,
    'select': select,
    'build-menu': buildMenu,
    'unselect': unselect,
    'unselect-all': unselectAll,
};
