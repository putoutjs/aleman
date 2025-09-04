import {setPosition} from './set-position.js';

export const createContextMenu = (name) => ({
    name,
    events,
    preventDefault,
    after,
    afterIf,
    listener,
});

const events = [
    'contextmenu',
];

const preventDefault = true;

const listener = ({event, state, options}) => {
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
        showSubmenu: false,
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

const afterIf = ({state}) => state.command === 'show';
