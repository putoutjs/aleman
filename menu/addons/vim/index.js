import {k} from './k.js';
import {gg} from './gg.js';
import {j} from './j.js';

const isNumber = (a) => !Number.isNaN(a) && typeof a === 'number';

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
    
    if (!buffer.length && /\d/.test(key)) {
        buffer.push(Number(key));
        return null;
    }
    
    if (!buffer.length && key === 'j')
        buffer.push(1);
    
    if (!buffer.length && key === 'k')
        buffer.push(1);
    
    const [count] = buffer;
    
    if (isNumber(count) && key === 'j') {
        buffer = [];
        return j({
            count,
            state,
            options,
        });
    }
    
    if (isNumber(count) && key === 'k') {
        buffer = [];
        return k({
            count,
            state,
            options,
        });
    }
    
    if (count === 'g' && key === 'g') {
        buffer = [];
        return gg({
            state,
            options,
        });
    }
    
    buffer = [];
};
