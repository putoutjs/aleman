export const events = [
    'contextmenu',
];

export const preventDefault = true;

export const filter = ({event, state, options}) => {
    return options.beforeShow?.({
        ...state,
        x: state.position.left,
        y: state.position.top,
    });
};

export const listener = ({event, state, options}) => {
    return {
        command: 'show',
        position: {
            x: event.clientX,
            y: event.clientY - 14,
        },
    };
};
