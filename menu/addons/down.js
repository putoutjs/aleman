import {getSubmenu} from './submenu/index.js';

export const keys = ['ArrowDown'];
export const preventDefault = true;

export const filter = ({state}) => state.command === 'show';

export const listener = ({state, options}) => {
    let {
        index,
        insideSubmenu,
        submenuIndex,
    } = state;
    
    const {menu} = options;
    const n = Object.keys(menu).length - 1;
    
    if (!insideSubmenu && index < n)
        ++index;
    
    const submenu = getSubmenu({
        index,
        options,
    });
    
    const submenuCount = Object.keys(submenu).length - 1;
    
    if (insideSubmenu && submenuIndex < submenuCount)
        ++submenuIndex;
    
    const showSubmenu = submenuCount > -1;
    
    return {
        index,
        submenuIndex,
        showSubmenu,
    };
};
