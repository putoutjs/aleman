import {createState} from './state.js';
import {
    addGlobalListeners,
    addListeners,
    splitAddons,
} from './add-listeners.js';
import {createRender} from './render.js';

export const hydrate = (element, {addons, options, state, rules, stateName = 'aleman-state'}) => {
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
        run: (partialState) => {
            const state = {
                ...readState(),
                ...partialState,
            };
            
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
        },
    };
};
