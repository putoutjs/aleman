import {createState} from './state.js';
import {
    addGlobalListeners,
    addListeners,
    splitAddons,
} from './add-listeners.js';
import {createRender} from './render.js';

const id = (a) => a;

export const hydrate = (element, config) => {
    const {
        addons,
        options,
        state,
        rules,
        stateName = 'aleman-state',
    } = config;
    
    const render = createRender(element.innerHTML, {
        options,
        rules,
    });
    
    const {globalAddons, namedAddons} = splitAddons(addons);
    
    const listener = () => {
        const state = readState();
        const [is, result] = render(state);
        
        if (!is)
            return;
        
        element.innerHTML = result;
        addListeners({
            readState,
            writeState,
            namedAddons,
            options,
        });
    };
    
    const {readState, writeState} = createState(state, {
        stateName,
        listener,
    });
    
    addGlobalListeners({
        readState,
        writeState,
        globalAddons,
        options,
    });
    
    return {
        run: (event, addon) => {
            const state = readState();
            const newState = addon.listener({
                state,
                event,
                options,
                writeState,
            });
            
            writeState({
                ...state,
                ...newState,
            });
            
            if (addon.afterIf?.({state: newState, options}))
                requestAnimationFrame(() => {
                    writeState(addon.after({
                        event,
                        options,
                        state: newState,
                    }));
                });
        },
    };
};
