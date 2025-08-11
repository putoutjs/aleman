import {
    addListeners,
    addGlobalListeners,
} from './add-listeners.js';
import {createRender} from './render.js';

export const hydrate = ({element, rules, addons, globals}) => {
    element = element || document.querySelector('[data-name="hydrate"]') || document.body;
    const html = `<section>${element.innerHTML}</section>`;
    const storage = new Map();
    const state = {};
    
    const render = createRender(html, {
        rules,
        addons,
        element,
        storage,
        state,
    });
    
    addListeners({render, addons, storage, state});
    addGlobalListeners({render, globals, storage, state});
};
