export const events = [
    'contextmenu',
];

export const preventDefault = true;

export const listener = ({event, state, options}) => {
    options.beforeShow?.({
        ...state,
        x: state.position.left,
        y: state.position.top,
    });
    return {
        command: 'show',
        position: {
            x: event.clientX,
            y: event.clientY - 14,
        },
    };
};
