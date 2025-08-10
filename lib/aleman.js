import htmlToJsx from 'https://esm.sh/node-html-to-jsx';

import {addListeners} from './add-listeners.js';
import {createRender} from './render.js';

export const hydrate = ({element, rules, addons}) => {
    element = element || document.querySelector('[data-name="hydrate"]') || document.body;
    const source = htmlToJsx(element.innerHTML);
    const render = createRender(source, {
        rules,
        addons,
        element,
    });
    
    addListeners(render, addons);
};

