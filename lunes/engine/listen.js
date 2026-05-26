export const listen = (events = ['click'], overrides = {}) => ({
    [Symbol.asyncIterator]() {
        const {
            addEventListener = globalThis.addEventListener,
            removeEventListener = globalThis.removeEventListener,
        } = overrides;
        
        const queue = [];
        let resolveNext;
        
        const handlers = events.map((event) => {
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
            
            return {
                event,
                fn,
            };
        });
        
        const cleanup = () => {
            for (const h of handlers) {
                removeEventListener(h.event, h.fn);
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
