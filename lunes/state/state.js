import {fullstore} from 'fullstore';
import {convertMenuToState} from './convert-menu-to-state/convert-menu-to-state.js';
import {transform} from './transformer/transformer';

export const createState = (menu) => {
    const state = convertMenuToState(menu);
    const stateStore = fullstore(state);
    
    return {
        commit: createCommit(stateStore),
    };
};

const createCommit = (stateStore) => (operation) => {
    const options = {
        operation,
    };
    
    const state = stateStore();
    const newState = transform(state, operation, options);
    
    stateStore(newState);
    
    return newState;
};

