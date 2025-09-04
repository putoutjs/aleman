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
    
    if (insideSubmenu && submenuIndex > 0)
        --submenuIndex;
    
    if (!insideSubmenu && index > 0)
        --index;
    
    if (index === -1)
        index = Object.keys(menu).length - 1;
    
    return {
        index,
        submenuIndex,
    };
};
