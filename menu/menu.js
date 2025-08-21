import {importmap} from './importmap.js';
import {hydrateMenu} from './hydrate-menu.js';

const {stringify} = JSON;

export const createMenu = async (element, options, menuData) => {
    const hydrateElement = createHydrate();
    
    createMap();
    await createLink();
    
    createStateElement();
    
    hydrateMenu(hydrateElement, options, menuData);
};

async function createLink() {
    const style = document.createElement('style');
    const content = await import('./menu.css', {
        with: {
            type: 'css',
        },
    });
    
    for (const rule of content.default.cssRules) {
        style.innerHTML += rule.cssText;
    }
    
    document.head.appendChild(style);
}

function createHydrate() {
    const section = document.createElement('section');
    
    section.dataset.name = 'aleman-hydrate-menu';
    section.innerHTML = `<ul data-name="menu" class="menu menu-hidden"></ul>`;
    document.body.append(section);
    
    return section;
}

function createStateElement() {
    const section = document.createElement('section');
    
    section.classList.add('menu-hidden');
    section.dataset.name = 'aleman-state-menu';
    document.body.append(section);
}

function createMap() {
    const script = document.createElement('script');
    
    script.type = 'importmap';
    script.innerHTML = stringify(importmap, null, 4);
    document.body.append(script);
}
