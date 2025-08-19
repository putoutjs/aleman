import {createState} from './state.js';
import {addListeners} from './add-listeners.js';
import {createRender} from './render.js';

export const hydrate = (element, {addons, options, state, rules, stateName = 'aleman-state'}) => {
    const render = createRender(element.innerHTML, {
        options,
        rules,
    });
    const listener = () => {
        const state = readState();
        const [is, result] = render(state);
        
        if (!is)
            return;
        
        element.innerHTML = result;
        addListeners({
            readState,
            writeState,
            addons,
        });
    };
    
    const {readState, writeState} = createState(state, {
        stateName,
        listener,
    });
    
    addListeners({
        readState,
        writeState,
        addons,
    });
};
