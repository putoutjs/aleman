export const listen = (events = ['click'], overrides = {}) => ({
    [Symbol.asyncIterator]() {
        const {
            addEventListener = globalThis.addEventListener,
            removeEventListener = globalThis.removeEventListener,
        } = overrides;
        
        const queue = [];
        let resolveNext;
        const handlers = [];
        
        for (const event of events) {
            const fn = () => {
                if (resolveNext) {
                    resolveNext({
                        value: event,
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
