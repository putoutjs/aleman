import {stub} from 'supertape';

const createEmitter = () => {
    const listeners = {};
    
    return {
        listeners,
        addEventListener: (type, fn) => {
            listeners[type] = [...listeners[type] || [], fn];
        },
        removeEventListener: stub(),
        emit: (type, event = {}) => {
            for (const fn of listeners[type] || [])
                fn({
                    preventDefault: stub(),
                    stopPropagation: stub(),
                    ...event,
                });
        },
    };
};

export const createFakeElement = () => {
    const emitter = createEmitter();
    const menuElement = {};
    
    const element = {
        ...emitter,
        innerHTML: '',
        menuElement,
        querySelector: (selector) => selector === 'ul.menu' ? menuElement : null,
        contains: (node) => node === element,
    };
    
    return element;
};

export const installWindow = ({innerHeight = 1000, innerWidth = 1000, menuHeight = 100, menuWidth = 50} = {}) => {
    const emitter = createEmitter();
    const saved = {
        addEventListener: globalThis.addEventListener,
        removeEventListener: globalThis.removeEventListener,
        innerHeight: globalThis.innerHeight,
        innerWidth: globalThis.innerWidth,
        getComputedStyle: globalThis.getComputedStyle,
    };
    
    globalThis.addEventListener = emitter.addEventListener;
    globalThis.removeEventListener = emitter.removeEventListener;
    globalThis.innerHeight = innerHeight;
    globalThis.innerWidth = innerWidth;
    globalThis.getComputedStyle = () => ({
        height: `${menuHeight}px`,
        width: `${menuWidth}px`,
    });
    
    return {
        emit: emitter.emit,
        uninstall: () => {
            for (const [key, value] of Object.entries(saved))
                if (value === undefined)
                    delete globalThis[key];
                else
                    globalThis[key] = value;
        },
    };
};

export const tick = () => new Promise((resolve) => setTimeout(resolve, 0));

export const labelOf = (path) => ({
    closest: () => ({
        dataset: {
            menuPath: path,
        },
    }),
});

export const notLabel = {
    closest: () => null,
};

export const installDocument = () => {
    const saved = globalThis.document;
    const elements = [];
    
    const add = (element) => {
        elements.push(element);
    };
    
    const document = {
        elements,
        head: {
            appendChild: add,
            append: add,
        },
        body: {
            append: add,
        },
        querySelector: (selector) => {
            const [, name] = /\[data-name="?([^"\]]+)"?\]/.exec(selector);
            
            return elements.find((element) => element.dataset?.name === name) || null;
        },
        createElement: (tag) => ({
            ...createFakeElement(),
            tag,
            dataset: {},
            classList: {
                add: stub(),
            },
        }),
    };
    
    globalThis.document = document;
    
    return {
        document,
        uninstall: () => {
            if (saved === undefined)
                delete globalThis.document;
            else
                globalThis.document = saved;
        },
    };
};
