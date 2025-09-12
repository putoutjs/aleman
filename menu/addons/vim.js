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
        const {
            insideSubmenu,
            index,
            submenuIndex,
        } = state;
        
        const newState = {
            ...state,
            index: insideSubmenu ? index : 1,
            submenuIndex: insideSubmenu ? 1 : submenuIndex,
        };
        
        return up.listener({
            state: newState,
            options,
        });
    }
    
    buffer = [];
};
