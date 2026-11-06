import {fullstore} from 'fullstore';
import {convertMenuToState} from './convert-menu-to-state/convert-menu-to-state.js';
import {transform} from './transformer/transformer.js';
import {getCursorPath} from './getter/getter.js';

const SHOWN = /^\[\s*'on'/;
const ALWAYS = [
    'show',
    'hide',
];

export const isShown = (state) => SHOWN.test(state);

export const createState = (menu, {infiniteScroll = false} = {}) => {
    const state = convertMenuToState(menu);
    const stateStore = fullstore(state);
    
    return {
        read: stateStore,
        isShown: () => isShown(stateStore()),
        commit: createCommit(stateStore, {
            infiniteScroll,
        }),
    };
};

const createCommit = (stateStore, {infiniteScroll}) => (operation, options = {}) => {
    const state = stateStore();
    
    if (!ALWAYS.includes(operation) && !isShown(state))
        return state;
    
    const cursorPath = getCursorPath(state);
    
    const newState = transform(state, operation, {
        infiniteScroll,
        ...options,
        operation,
        cursorPath,
        cursor: cursorPath
            .split('.')
            .at(-1),
    });
    
    stateStore(newState);
    
    return newState;
};
