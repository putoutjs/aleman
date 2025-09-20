import * as up from '../up.js';

export const {filter} = up;
export const commands = [
    'gg',
    '^',
];

export function listener({state, options}) {
    const {
        insideSubmenu,
        index,
        submenuIndex,
    } = state;
    
    const newState = {
        ...state,
        index: insideSubmenu ? index : 1,
        submenuIndex: insideSubmenu ? 1 : submenuIndex,
    };
    
    return up.listener({
        state: newState,
        options,
    });
}
