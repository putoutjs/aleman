import * as down from './down.js';

export const {filter} = down;
export const commands = ['k'];

export function listener({count, state, options}) {
    const {
        insideSubmenu,
        index,
        submenuIndex,
    } = state;
    
    let newIndex = insideSubmenu ? index : index - count - 1;
    let newSubmenuIndex = insideSubmenu ? submenuIndex - count - 1 : submenuIndex;
    
    if (newIndex < -1)
        newIndex = -1;
    
    if (newSubmenuIndex < -1)
        newSubmenuIndex = -1;
    
    const newState = {
        ...state,
        index: newIndex,
        submenuIndex: newSubmenuIndex,
    };
    
    return down.listener({
        state: newState,
        options,
    });
}

