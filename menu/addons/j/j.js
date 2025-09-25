import * as down from '../down/down.js';
import {getSubmenu} from '../submenu/index.js';

export const {filter} = down;
export const commands = ['j'];

export function listener({count, state, options}) {
    const {menu, infiniteScroll} = options;
    const {
        index,
        insideSubmenu,
        submenuIndex,
    } = state;
    
    const menuCount = Object.keys(menu).length;
    
    const submenuCount = Object.keys(getSubmenu({
        index,
        options,
    })).length;
    
    let newIndex = insideSubmenu ? index : index + count;
    let newSubmenuIndex = insideSubmenu ? submenuIndex + count : submenuIndex;
    
    if (newIndex > menuCount - 1)
        newIndex = infiniteScroll ? 0 : menuCount - 1;
    
    if (infiniteScroll && newSubmenuIndex === submenuCount)
        newSubmenuIndex = 0;
    else if (newSubmenuIndex > submenuCount - 1)
        newSubmenuIndex = submenuCount - 1;
    
    const showSubmenu = submenuCount > -1;
    
    return {
        index: newIndex,
        submenuIndex: newSubmenuIndex,
        showSubmenu,
    };
}
