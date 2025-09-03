export const keys = [
    'ArrowUp',
    'k',
];

export const preventDefault = true;

export const listener = ({state}) => {
    let {
        index,
        insideSubmenu,
        submenuIndex,
    } = state;
    
    if (insideSubmenu)
        --submenuIndex;
    else
        --index;
    
    return {
        index,
        submenuIndex,
    };
};
