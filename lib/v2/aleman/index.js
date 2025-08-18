import {createState} from './state.js';

export const hydrate = (element, {addons, state, rules}) => {
    const {readState, writeState} = createState(state, rules);
    
    for (const {listener} of addons) {
        element.addEventListener('click', (event) => {
            const state = readState();
            const newState = listener({
                event,
                state,
            });
            
            writeState(newState);
        });
    }
};

