import {getSubmenu} from '../submenu/index.js';

export const keys = ['ArrowDown'];
export const preventDefault = true;

export const filter = ({state}) => state.command === 'show';

export const listener = ({state, options}) => {
    let {
        index,
        insideSubmenu,
        submenuIndex,
    } = state;
    
    const {menu, infiniteScroll} = options;
    const n = Object.keys(menu).length - 1;
    
    if (!insideSubmenu && (infiniteScroll && index === n || index < n))
        ++index;
    
    if (!insideSubmenu && infiniteScroll && index > n)
        index -= n + 1;
    
    const submenu = getSubmenu({
        index,
        options,
    });
    
    const submenuCount = Object.keys(submenu).length - 1;
    
    if (insideSubmenu)
        if (submenuIndex < submenuCount)
            ++submenuIndex;
        else if (infiniteScroll && submenuIndex === submenuCount)
            submenuIndex = 0;
    
    const showSubmenu = submenuCount > -1;
    
    return {
        index,
        submenuIndex,
        showSubmenu,
    };
};
