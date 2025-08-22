export const key = 'F9';

export const filter = ({state, options}) => {
    const {beforeShow} = options;
    
    if (!beforeShow)
        return true;
    
    return options.beforeShow?.({
        ...state,
        x: state.position.left,
        y: state.position.top,
    });
};

export const listener = ({options, state}) => {
    return {
        command: 'show',
        position: {
            left: 0,
            top: 0,
        },
    };
};
