const {values} = Object;

export const key = 'Enter';

export const filter = ({state}) => state.command === 'show';

export const stopPropagation = true;

export const listener = ({options, state}) => {
    const {index} = state;
    const {menu} = options;
    
    const fn = values(menu)[index];
    setTimeout(fn);
    options.beforeHide?.(state);
    
    return {
        command: 'hide',
        index: -1,
    };
};
