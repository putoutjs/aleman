import {createHydrate, addStyleText} from './dom.js';

export const createBundleMenu = ({css, hydrateMenu}) => (elementName, options, menu) => {
    options.name = options.name || 'menu';
    
    const hydrateElement = createHydrate(options.name);
    
    addStyleText(css);
    
    return hydrateMenu(elementName, {
        hydrateElement,
        options,
        menu,
    });
};
