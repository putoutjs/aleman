import {getSubmenu} from './submenu/index.js';

export const keys = ['G', '$'];

export const preventDefault = true;

export const listener = ({state, options}) => {
    const {menu} = options;
    let {
        index,
        insideSubmenu,
        submenuIndex,
    } = state;
    
    const menuValues = Object.values(menu);
    
    const submenu = getSubmenu({
        index,
        options,
    });
    
    const submenuCount = Object.keys(submenu).length;
    
    if (insideSubmenu)
        submenuIndex = submenuCount - 1;
    else
        index = menuValues.length - 1;
    
    const showSubmenu = submenuCount > 0;
    
    return {
        index,
        submenuIndex,
        showSubmenu,
    };
};
