import {
    findByName,
    createHydrate,
    addStyleLink,
} from './dom.js';

const {stringify} = JSON;

export const createMenu = async (elementName, options, menu) => {
    options.name = options.name || 'menu';
    const {name} = options;
    
    const hydrateElement = createHydrate(name);
    
    await createMap();
    addStyleLink();
    
    const {hydrateMenu} = await import('./hydrate-menu.js');
    
    return hydrateMenu(elementName, {
        hydrateElement,
        options,
        menu,
    });
};

async function createMap() {
    const name = 'aleman-importmap';
    
    if (findByName(name))
        return;
    
    const script = document.createElement('script');
    
    const {importmap} = await import('./importmap.js');
    
    script.dataset.name = name;
    script.type = 'importmap';
    script.innerHTML = stringify(importmap, null, 4);
    document.body.append(script);
}
