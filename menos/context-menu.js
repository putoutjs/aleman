export const createContextMenu = (name) => ({
    name,
    event: 'contextmenu',
    command: 'context-menu',
});

export const contextMenu = ({event, state, options}) => {
    const {beforeShow} = options;
    const {x, y} = {
        x: event.clientX,
        y: event.clientY,
    };
    
    const is = !beforeShow || beforeShow?.({
        ...state,
        x,
        y,
    });
    
    return {
        ...state,
        command: is ? 'show' : 'hide',
        show: is,
        x,
        y: y - 14,
    };
};
