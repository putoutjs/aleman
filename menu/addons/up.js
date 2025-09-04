import {getSubmenu} from './submenu/index.js';

export const keys = [
    'ArrowUp',
    'k',
];

export const preventDefault = true;

export const listener = ({state, options}) => {
    const {menu} = options;
    let {
        index,
        insideSubmenu,
        submenuIndex,
    } = state;
    
    const count = Object.keys(menu).length;
    
    if (insideSubmenu && submenuIndex > 0)
        --submenuIndex;
    
    if (!insideSubmenu && index > 0)
        --index;
    
    if (index === -1)
        index = count - 1;
    
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
