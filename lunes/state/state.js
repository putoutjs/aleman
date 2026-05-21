import {putout} from 'putout';
import {convertMenuToState} from './convert-menu-to-state/convert-menu-to-state.js';
import * as addCursor from './add-cursor/index.js';
import * as moveCursor from './move-cursor/index.js';

export const createState = (menu) => {
    const state = convertMenuToState(menu);
    
    return {
        updateState: createUpdateState(state),
    };
};

function createUpdateState(state, options) {
    const {code} = putout(state, {
        rules: {
            'add-cursor': ['on', options],
            'move-cursor': ['on', options],
        },
        plugins: [
            ['add-cursor', addCursor],
            ['move-cursor', moveCursor],
        ],
    });
    
    return code;
}
