const isObject = (a) => a && typeof a === 'object';

export function getSubmenu({index, options}) {
    const {menu} = options;
    const currentName = Object.keys(menu)[index];
    const submenu = menu[currentName];
    
    if (isObject(submenu))
        return submenu;
    
    return {};
}
