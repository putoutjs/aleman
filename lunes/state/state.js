import {putout} from 'putout';
import {fullstore} from 'fullstore';
import {convertMenuToState} from './convert-menu-to-state/convert-menu-to-state.js';
import * as addCursor from './rules/add-cursor/index.js';
import * as moveCursor from './rules/move-cursor/index.js';
import * as applyVisibility from './rules/apply-visibility/index.js';

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
    
    const {code} = putout(stateStore(), {
        rules: {
            'add-cursor': ['on', options],
            'move-cursor': ['on', options],
            'apply-visibility': ['on', options],
        },
        plugins: [
            ['add-cursor', addCursor],
            ['move-cursor', moveCursor],
            ['apply-visibility', applyVisibility],
        ],
    });
    
    stateStore(code);
    
    return code;
};
