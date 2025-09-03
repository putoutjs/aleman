const isObject = (a) => a && typeof a === 'object';
const {values} = Object;

export const run = ({options, state}) => {
    const {index, submenuIndex} = state;
    const {menu} = options;
    
    const fn = values(menu)[index];
    
    if (isObject(fn))
        return setTimeout(values(fn)[submenuIndex]);
    
    setTimeout(fn);
};
