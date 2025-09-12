import {getSubmenu} from './submenu/index.js';

export const keys = ['G'];

export const preventDefault = true;

export const listener = ({state, options}) => {
    const {menu} = options;
    let {
        index,
        insideSubmenu,
        submenuIndex,
    } = state;
    
    const menuValues = Object.values(menu);
    
    if (insideSubmenu && submenuIndex > 0)
        submenuIndex = 0;
    
    if (!insideSubmenu)
        index = menuValues.length - 1;
    
    const submenu = getSubmenu({
        index,
        options,
    });
    
    const submenuCount = Object.keys(submenu).length;
    const showSubmenu = submenuCount > 0;
    
    return {
        index,
        submenuIndex,
        showSubmenu,
    };
};
