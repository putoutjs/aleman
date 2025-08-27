export const events = [
    'contextmenu',
];

export const preventDefault = true;

export const listener = ({event, state, options}) => {
    const {beforeShow} = options;
    
    const is = !beforeShow || beforeShow?.({
        ...state,
        position: {
            x: event.clientX,
            y: event.clientY - 10,
        },
    });
    
    const command = is ? 'show' : 'hide';
    return {
        command,
        position: {
            x: event.clientX,
            y: event.clientY - 14,
        },
    };
};
