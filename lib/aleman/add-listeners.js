const isFn = (a) => typeof a === 'function';
const {addEventListener} = globalThis.document || {};

const filterKey = (filter, key) => (a) => a.event.key === key && filter(a);

export function addGlobalKeyListener({render, state, keys, storage}) {
    const listeners = {};
    
    for (const {key, listener, filter} of keys) {
        listeners[key] = createListener({
            name: 'document',
            filter,
            render,
            listener,
            storage,
            state,
        });
    }
    
    addEventListener('keydown', (event) => {
        listeners[event.key]?.(event);
    });
}

export function addGlobalListeners({render, state, globals, storage}) {
    for (const {events, listener, filter} of globals) {
        for (const event of events) {
            addEventListener(event, createListener({
                filter,
                name: 'document',
                render,
                listener,
                storage,
                state,
            }));
        }
    }
}

const success = () => true;

const createListener = ({name, filter = success, state, render, listener, storage}) => (event) => {
    const is = filter({
        event,
        state,
    });
    
    if (!is)
        return;
    
    listener({
        render: render(name),
        event,
        element: createElement(name, storage),
        state,
        storage,
    });
};

export function addListeners({render, addons, storage, state}) {
    for (const {name, events, listener, filter} of addons) {
        for (const event of events) {
            const element = document.querySelector(`[data-name='${name}']`);
            
            if (!element)
                continue;
            
            element.addEventListener(event, createListener({
                name,
                render,
                listener,
                filter,
                storage,
                state,
            }));
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

