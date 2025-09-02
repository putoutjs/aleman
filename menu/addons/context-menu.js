export const createContextMenu = (name) => {
    return {
        name,
        events,
        preventDefault,
        listener,
    };
};

const events = [
    'contextmenu',
];

const preventDefault = true;

const listener = ({event, state, options}) => {
    const {beforeShow} = options;
    
    const is = !beforeShow || beforeShow?.({
        ...state,
        position: {
            x: event.clientX,
            y: event.clientY,
        },
    });
    
    const command = is ? 'show' : 'hide';
    
    return {
        command,
        position: {
            x: event.clientX,
            y: event.clientY - 10,
        },
    };
};
