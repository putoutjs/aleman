import {addListeners} from './add-listeners.js';
import {createRender} from './render.js';

export const hydrate = ({element, rules, addons}) => {
    element = element || document.querySelector('[data-name="hydrate"]') || document.body;
    const render = createRender(element.outerHTML, {
        rules,
        addons,
        element,
    });
    
    addListeners(render, addons);
};

