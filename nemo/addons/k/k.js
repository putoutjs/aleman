import * as up from '../up.js';

export const {filter} = up;
export const commands = ['k'];

export function listener({count, state, options}) {
    const {
        insideSubmenu,
        index,
        submenuIndex,
    } = state;
    
    let newIndex = insideSubmenu ? index : index - count + 1;
    let newSubmenuIndex = insideSubmenu ? submenuIndex - count + 1 : submenuIndex;
    
    const {infiniteScroll} = options;
    
    if (newIndex <= 0)
        newIndex = infiniteScroll ? -1 : 0;
    
    if (newSubmenuIndex < -1)
        newSubmenuIndex = -1;
    
    const newState = {
        ...state,
        index: newIndex,
        submenuIndex: newSubmenuIndex,
    };
    
    return up.listener({
        state: newState,
        options,
    });
}
