import {rules} from './rules/index.js';
import {hydrate} from './aleman/index.js';
import state from './state.json' with {
    type: 'json',
};
import {addons} from './addons/index.js';

const {assign} = Object;

export const hydrateMenu = (element, options, menu) => {
    assign(options, {
        menu,
    });
    
    hydrate(element, {
        options,
        state,
        addons,
        rules,
        stateName: 'aleman-state-menu',
    });
};
