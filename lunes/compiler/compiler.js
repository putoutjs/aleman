import {fullstore} from 'fullstore';

const isNumber = (a) => !Number.isNaN(a) && typeof a === 'number';

const hasPosition = (position) => {
    if (!position)
        return false;
    
    return isNumber(position.top);
};

const DEFAULT_POSITION = {
    top: 0,
    left: 0,
};

const fromEvent = (event) => {
    if (!event)
        return null;
    
    if (!isNumber(event.clientX))
        return null;
    
    return {
        top: event.clientY,
        left: event.clientX,
    };
};

const isSame = (a, b) => a.top === b.top && a.left === b.left;

export const createCompiler = (element, overrides) => {
    const {
        commit,
        render,
        getPosition = () => null,
        mainOptions = fullstore(),
    } = overrides;
    
    return (operation, options = {}) => {
        const {event} = options;
        const state = commit(operation, options);
        const saved = mainOptions() || {};
        const isShow = operation === 'show';
        
        const position = hasPosition(options.position) ? options.position : isShow && fromEvent(event) || saved.position || DEFAULT_POSITION;
        
        element.innerHTML = render(state, {
            ...options,
            position,
        });
        
        const fixed = isShow && event && getPosition(event);
        
        if (fixed && !isSame(fixed, position))
            element.innerHTML = render(state, {
                ...options,
                position: fixed,
            });
        
        mainOptions({
            position: fixed || position,
        });
    };
};
