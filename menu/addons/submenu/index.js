const isObject = (a) => a && typeof a === 'object';

export function getSubmenu({state, options}) {
    const {index} = state;
    const {menu} = options;
    const currentName = Object.keys(menu)[index];
    const submenu = menu[currentName];
    
    if (isObject(submenu))
        return submenu;
    
    return {};
}
