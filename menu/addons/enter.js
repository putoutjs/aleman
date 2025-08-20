const {values} = Object;

export const key = 'Enter';

export const listener = ({options, state}) => {
    const {index} = state;
    const {menu} = options;
    
    const fn = values(menu)[index];
    setTimeout(fn);
    
    return {
        command: 'hide',
        index: -1,
    };
};
