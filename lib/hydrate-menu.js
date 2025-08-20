import {rules} from './rules/index.js';
import {hydrate} from './aleman/index.js';
import * as contextMenu from './addons/context-menu.js';
import * as click from './addons/click.js';
import state from './state.json' with {
    type: 'json',
};

const {assign} = Object;
const addons = [contextMenu, click];

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
