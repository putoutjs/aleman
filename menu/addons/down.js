export const keys = [
    'ArrowDown',
    'j',
];
export const preventDefault = true;

export const listener = ({state, options}) => {
    let {index} = state;
    const {menu} = options;
    const n = Object.keys(menu).length - 1;
    
    if (index < n)
        ++index;
    
    return {
        index,
    };
};
