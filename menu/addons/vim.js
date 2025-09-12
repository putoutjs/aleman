import * as up from './up.js';

export const createVim = () => {
    const buffer = [];
    
    return {
        events,
        filter,
        listener: createListener(buffer),
    };
};

const events = ['keydown'];

const filter = ({state}) => state.command === 'show';

const createListener = (buffer) => ({event, state, options}) => {
    const {key} = event;
    
    if (!buffer.length && key === 'g') {
        buffer.push('g');
        return null;
    }
    
    if (buffer[0] === 'g' && key === 'g') {
        buffer = [];
        return up.listener({
            state: {
                ...state,
                index: 1,
            },
            options,
        });
    }
};
