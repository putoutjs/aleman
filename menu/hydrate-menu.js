import {rules} from './rules/index.js';
import {hydrate} from '../aleman/index.js';
import {initState} from './state.js';
import {addons} from './addons/index.js';
import {createMouseEnter} from './addons/mouse-enter.js';
import {createItemClick} from './addons/item-click.js';
import * as click from './addons/click.js';
import {createContextMenu} from './addons/context-menu.js';
import {setPosition} from './addons/set-position.js';

const {assign} = Object;

export const hydrateMenu = (elementName, {hydrateElement, options, menu}) => {
    assign(options, {
        menu,
    });
    
    const {name} = options;
    const state = initState(options);
    const contextMenu = createContextMenu(elementName);
    
    const {run} = hydrate(hydrateElement, {
        options,
        state,
        addons: [
            contextMenu,
            createMouseEnter(name),
            createItemClick(name),
            ...addons,
        ],
        rules,
        afterHydrate: setPosition,
        stateName: `aleman-state-${name}`,
    });
    
    return {
        show: (clientX, clientY) => {
            const event = {
                clientX,
                clientY,
            };
            
            run(event, contextMenu);
        },
        hide: () => run({}, click),
    };
};
