const isObject = (a) => a && typeof a === 'object';
const {values} = Object;

export const run = ({options, state}) => {
    const {index, submenuIndex} = state;
    const {menu} = options;
    
    const fn = values(menu)[index];
    
    if (isObject(fn) && submenuIndex === -1)
        return [false];
    
    if (isObject(fn))
        return [true, setTimeout(values(fn)[submenuIndex])];
    
    return [true, setTimeout(fn)];
};
