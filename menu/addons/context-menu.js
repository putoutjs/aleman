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
            left: event.clientX,
            top: event.clientY - 14,
        },
    };
};
