export const key = 'F9';

export const listener = ({options, state}) => {
    options.beforeShow?.({
        ...state,
        x: state.position.left,
        y: state.position.top,
    });
    return {
        command: 'show',
        position: {
            left: 0,
            top: 0,
        },
    };
};
