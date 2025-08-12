import {
    addListeners,
    addGlobalListeners,
    addGlobalKeyListener,
} from './add-listeners.js';
import {createRender} from './render.js';

const isKey = ({key}) => key;
const notKey = ({key}) => !key;

export const hydrate = ({element, rules, addons, globals, state = {}}) => {
    element = element || document.querySelector('[data-name="hydrate"]') || document.body;
    const html = `<section>${element.innerHTML}</section>`;
    const storage = new Map();
    
    const render = createRender(html, {
        rules,
        addons,
        element,
        storage,
        state,
    });
    
    addListeners({
        render,
        addons,
        storage,
        state,
    });
    
    const keys = globals.filter(isKey);
    const other = globals.filter(notKey);
    
    addGlobalListeners({
        render,
        globals: other,
        storage,
        state,
    });
    
    addGlobalKeyListener({
        render,
        keys,
        storage,
        state,
    });
};
