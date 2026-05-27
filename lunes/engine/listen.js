import {emitBefore} from '../../aleman/emit.js';
import {createVimParser} from './vim.js';

const maybeEvents = ({events}) => {
    if (events)
        return events;
    
    return ['keydown'];
};

export const listen = (actions = [], overrides = {}) => ({
    [Symbol.asyncIterator]() {
        const {
            addEventListener = globalThis.addEventListener,
            removeEventListener = globalThis.removeEventListener,
            parseVim = createVimParser(),
        } = overrides;
        
        const queue = [];
        let resolveNext;
        const handlers = [];
        
        for (const action of actions) {
            const events = maybeEvents(action);
            
            for (const event of events) {
                const {
                    preventDefault,
                    stopPropagation,
                    operations,
                } = action;
                
                const fn = (event) => {
                    const [isEmitBefore, count] = emitBefore(action, {
                        event,
                        parseVim,
                    });
                    
                    if (!isEmitBefore)
                        return;
                    
                    if (preventDefault)
                        event.preventDefault();
                    
                    if (stopPropagation)
                        event.stopPropagation();
                    
                    if (resolveNext) {
                        resolveNext({
                            value: [
                                operations, {
                                    count,
                                    position: {},
                                },
                            ],
                            done: false,
                        });
                        resolveNext = null;
                        
                        return;
                    }
                    
                    queue.push(event);
                };
                
                addEventListener(event, fn);
                
                handlers.push({
                    event,
                    fn,
                });
            }
        }
        
        const cleanup = () => {
            for (const {event, fn} of handlers) {
                removeEventListener(event, fn);
            }
        };
        
        return {
            next() {
                if (queue.length)
                    return Promise.resolve({
                        value: queue.shift(),
                        done: false,
                    });
                
                return new Promise((resolve) => {
                    resolveNext = resolve;
                });
            },
            
            return() {
                cleanup();
                return Promise.resolve({
                    done: true,
                });
            },
        };
    },
});
