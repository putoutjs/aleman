import {setPosition} from './set-position.js';

export const createContextMenu = (name) => {
    return {
        name,
        events,
        preventDefault,
        after,
        listener,
        conditionAfter,
    };
};

const events = [
    'contextmenu',
];

const preventDefault = true;

const listener = ({event, state, options, writeState}) => {
    const {beforeShow} = options;
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
    
    const command = is ? 'show' : 'hide';
    
    return {
        command,
        position: {
            x,
            y: y - 14,
        },
    };
};

const after = ({event, options}) => {
    const {name} = options;
    return setPosition(name, event);
};

const conditionAfter = ({state}) => {
    return state.command === 'show';
};
