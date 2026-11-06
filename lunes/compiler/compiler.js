import {fullstore} from 'fullstore';

const hasPosition = (position) => typeof position?.top === 'number';

const DEFAULT_POSITION = {
    top: 0,
    left: 0,
};

const fromEvent = (event) => {
    if (typeof event?.clientX !== 'number')
        return null;
    
    return {
        top: event.clientY,
        left: event.clientX,
    };
};

const isSame = (a, b) => a.top === b.top && a.left === b.left;

export const createCompiler = (element, {commit, read, render, run, getPosition = () => null, mainOptions = fullstore()}) => (operation, options = {}) => {
    if (operation === 'run') {
        if (!run(read()))
            return;
        
        operation = 'hide';
    }
    
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
