import * as down from '../down.js';
import {getSubmenu} from '../submenu/index.js';

export const {filter} = down;
export const commands = ['j'];

export function listener({count, state, options}) {
    const {
        index,
        insideSubmenu,
        submenuIndex,
    } = state;
    
    const menuCount = Object.keys(options.menu).length;
    const submenuCount = Object.keys(getSubmenu({
        index,
        options,
    })).length;
    
    let newIndex = insideSubmenu ? index : index + count - 1;
    let newSubmenuIndex = insideSubmenu ? submenuIndex + count : submenuIndex;
    
    if (newIndex > menuCount - 1)
        newIndex = menuCount - 1;
    
    if (newSubmenuIndex > submenuCount - 1)
        newSubmenuIndex = submenuCount - 1;
    
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
