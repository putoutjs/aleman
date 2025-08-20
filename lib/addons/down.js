const {keys} = Object;

export const key = 'ArrowDown';

export const listener = ({state, options}) => {
    let {index} = state;
    const {menu} = options;
    const n = keys(menu).length - 1;
    
    if (index < n)
        ++index;
    
    return {
        index,
    };
};
