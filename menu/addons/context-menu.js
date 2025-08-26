export const events = [
    'contextmenu',
];

export const preventDefault = true;

export const filter = ({event, state, options}) => {
    const {beforeShow} = options;
    
    if (!beforeShow)
        return true;
    
    return beforeShow?.({
        ...state,
        position: {
            x: event.clientX,
            y: event.clientY - 10,
        },
    });
};

export const listener = ({event}) => {
    return {
        command: 'show',
        position: {
            x: event.clientX,
            y: event.clientY - 14,
        },
    };
};
