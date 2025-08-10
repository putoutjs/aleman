const isFn = (a) => typeof a === 'function';

export function addListeners(render, addons) {
    for (const {name, events, listener} of addons) {
        for (const event of events) {
            const element = document.querySelector(`[data-name='${name}']`);
            
            element?.addEventListener(event, (event) => {
                if (listener.running)
                    return;
                
                listener.running = true;
                
                listener({
                    render: render(name),
                    set: createSet(name),
                    get: createGet(name),
                    event,
                    element: createElement(name),
                });
                
                listener.running = false;
            });
        }
    }
}

const createSet = (name) => (target, key, value) => {
    const element = document.querySelector(`[data-name='${name}']`);
    
    element[key] = value;
    
    return true;
};

const createGet = (name) => (target, key) => {
    const element = document.querySelector(`[data-name='${name}']`);
    const result = element[key];
    
    if (isFn(result))
        return result.bind(element);
    
    return result;
};

const createElement = (name) => {
    const get = createGet(name);
    const set = createSet(name);
    
    return new Proxy({}, {
        get,
        set,
    });
};
