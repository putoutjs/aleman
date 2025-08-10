import {addListeners} from './add-listeners.js';
import {createRender} from './render.js';

export const hydrate = ({element, rules, addons}) => {
    element = element || document.querySelector('[data-name="hydrate"]') || document.body;
    const html = `<section>${element.innerHTML}</section>`;
    
    const render = createRender(html, {
        rules,
        addons,
        element,
    });
    
    addListeners(render, addons);
};
