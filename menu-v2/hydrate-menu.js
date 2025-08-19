import {hydrate} from './aleman/index.js';
import * as buildMenu from './rules/build-menu/index.js';
import * as contextMenu from './addons/context-menu.js';
import state from './state.json' with {type: 'json'};

const {assign} = Object;
const addons = [contextMenu];
const rules = {
    buildMenu,
};

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

