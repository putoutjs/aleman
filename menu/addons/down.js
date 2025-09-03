import {getSubmenu} from './submenu/index.js';

export const keys = [
    'ArrowDown',
    'j',
];
export const preventDefault = true;

export const listener = ({state, options}) => {
    let {
        index,
        insideSubmenu,
        submenuIndex,
    } = state;
    
    const {menu} = options;
    const n = Object.keys(menu).length - 1;
    const submenu = getSubmenu({
        state,
        options,
    });
    const submenuCount = Object.keys(submenu).length - 1;
    
    if (!insideSubmenu && index < n)
        ++index;
    
    if (insideSubmenu && submenuIndex < submenuCount)
        ++submenuIndex;
    
    return {
        index,
        submenuIndex,
    };
};
