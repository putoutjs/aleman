export const key = 'F9';

export const filter = ({state, options}) => {
    const {beforeShow} = options;
    
    if (!beforeShow)
        return true;
    
    return options.beforeShow?.(state);
};

export const listener = ({options, state}) => {
    return {
        command: 'show',
    };
};
