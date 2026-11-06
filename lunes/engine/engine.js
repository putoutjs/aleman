import {listen} from './listen.js';

export const createLoop = (element, {actions, compile, isShown, overrides = {}}) => {
    const iterator = listen(actions, {
        ...overrides,
        isShown,
    })[Symbol.asyncIterator]();
    
    loop(iterator, compile);
    
    return () => iterator.return();
};

const loop = async (iterator, compile) => {
    const iterable = {
        [Symbol.asyncIterator]: () => iterator,
    };
    
    for await (const [operations, options] of iterable) {
        for (const operation of operations)
            compile(operation, options);
    }
};
