import {fullstore} from 'fullstore';
import {convertMenuToState} from './convert-menu-to-state/convert-menu-to-state.js';
import {transform} from './transformer/transformer.js';
import {getCursor} from './getter/getter.js';

export const createState = (menu) => {
    const state = convertMenuToState(menu);
    const stateStore = fullstore(state);
    
    return {
        commit: createCommit(stateStore),
    };
};

const createCommit = (stateStore) => (operation) => {
    const state = stateStore();
    const options = {
        operation,
        cursor: getCursor(state),
    };
    
    const newState = transform(state, operation, options);
    
    stateStore(newState);
    
    return newState;
};
