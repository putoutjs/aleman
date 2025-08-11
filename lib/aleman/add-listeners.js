const isFn = (a) => typeof a === 'function';

export function addListeners({render, addons, storage}) {
    for (const {name, events, listener} of addons) {
        for (const event of events) {
            let element;
            
            if (name)
                element = document.querySelector(`[data-name='${name}']`);
            else
                element = document;
            
            element?.addEventListener(event, (event) => {
                if (listener.running)
                    return;
                
                listener.running = true;
                
                listener({
                    render: render(name),
                    event,
                    element: createElement(name, storage),
                });
                
                listener.running = false;
            });
        }
    }
}

const createSet = (name, storage) => (target, key, value) => {
    const element = document.querySelector(`[data-name='${name}']`);
    
    if (!element) {
        storage.set(key, value);
        return true;
    }
    
    element[key] = value;
    
    return true;
};

const createGet = (name, storage) => (target, key) => {
    const element = document.querySelector(`[data-name='${name}']`);
    
    if (!element)
        return storage.get(key);
    
    const result = element[key];
    
    if (!result)
        return element.getAttribute(key) || '';
    
    if (isFn(result))
        return result.bind(element);
    
    return result;
};

const createElement = (name, storage) => {
    const get = createGet(name, storage);
    const set = createSet(name, storage);
    
    return new Proxy({}, {
        get,
        set,
    });
};

