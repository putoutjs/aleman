import {rules} from './rules/index.js';
import {hydrate} from '../aleman/index.js';
import {initState} from './state.js';
import {addons} from './addons/index.js';
import {createMouseEnter} from './addons/mouse-enter.js';
import {createItemClick} from './addons/item-click.js';

const {assign} = Object;

export const hydrateMenu = (element, options, menu) => {
    assign(options, {
        menu,
    });
    
    const state = initState(options);
    const {run} = hydrate(element, {
        options,
        state,
        addons: [
            createMouseEnter(options.name),
            createItemClick(options.name),
            ...addons,
        ],
        rules,
        stateName: `aleman-state-${options.name}`,
    });
    
    const show = run.bind(null, {
        command: 'show',
    });
    
    const hide = run.bind(null, {
        command: 'hide',
    });
    
    return {
        show,
        hide,
    };
};
