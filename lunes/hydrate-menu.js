import {hydrate} from '../aleman/index.js';
import {createState} from './state/state.js';
import {createContextMenu} from './addons/context-menu/context-menu.js';
import * as click from './addons/click/click.js';
import {rules} from './rules/index.js';
import {setPosition} from './addons/context-menu/set-position/set-position.js';

const {assign} = Object;

export const hydrateMenu = (elementName, {hydrateElement, options, menu}) => {
    assign(options, {
        menu,
    });
    
    const {name} = options;
    const state = createState(options);
    const contextMenu = createContextMenu(elementName);
    
    const {run} = hydrate(hydrateElement, {
        options,
        state,
        addons: [
            contextMenu,
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
