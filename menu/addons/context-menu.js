import {setPosition} from './set-position.js';

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

const listener = ({event, state, options, writeState}) => {
    const {name, beforeShow} = options;
    const {x, y} = {
        x: event.clientX,
        y: event.clientY,
    };
    
    const is = !beforeShow || beforeShow?.({
        ...state,
        position: {
            x,
            y,
        },
    });
    
    if (is)
        requestAnimationFrame(() => {
            writeState(setPosition(name, event));
        }, 0);
    
    const command = is ? 'show' : 'hide';
    
    return {
        command,
        position: {
            x,
            y: y - 14,
        },
    };
};
