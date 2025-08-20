import {rules} from './rules/index.js';
import {hydrate} from '../aleman/index.js';
import {initState} from './state.js';
import {addons} from './addons/index.js';

const {assign} = Object;

export const hydrateMenu = (element, options, menu) => {
    assign(options, {
        menu,
    });
    
    const state = initState(options);
    
    hydrate(element, {
        options,
        state,
        addons,
        rules,
        stateName: 'aleman-state-menu',
    });
};
