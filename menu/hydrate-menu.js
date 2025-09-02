import {rules} from './rules/index.js';
import {hydrate} from '../aleman/index.js';
import {initState} from './state.js';
import {addons} from './addons/index.js';
import {createMouseEnter} from './addons/mouse-enter.js';
import {createItemClick} from './addons/item-click.js';
import * as contextMenu from './addons/context-menu.js';
import * as click from './addons/click.js';
import {createContextMenu} from './addons/context-menu.js';

const {assign} = Object;

export const hydrateMenu = (name, {hydrateElement, options, menu}) => {
    assign(options, {
        menu,
    });
    
    const state = initState(options);
    const contextMenu = createContextMenu(name);
    const {run} = hydrate(hydrateElement, {
        options,
        state,
        addons: [
            contextMenu,
            createMouseEnter(options.name),
            createItemClick(options.name),
            ...addons,
        ],
        rules,
        stateName: `aleman-state-${options.name}`,
    });
    
    return {
        show: (clientX, clientY) => {
            const event = {
                clientX,
                clientY,
            };
            
            run(event, contextMenu.listener, options.beforeShow);
        },
        hide: () => run({}, click.listener, options.beforeHide),
    };
};
