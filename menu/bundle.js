import css from './menu.css';
import {hydrateMenu} from './hydrate-menu.js';

export const createMenu = (elementName, options, menu) => {
    options.name = options.name || 'menu';
    const {name} = options;
    const hydrateElement = createHydrate(name);
    
    loadStyle();
    createStateElement(name);
    
    return hydrateMenu(elementName, {
        hydrateElement,
        options,
        menu,
    });
};

function loadStyle() {
    const name = 'aleman-menu-style';
    
    if (findByName(name))
        return;
    
    const style = document.createElement('style');
    
    style.dataset.name = name;
    style.textContent = css;
    document.head.appendChild(style);
}

function createHydrate(name) {
    const hydrateElement = findByName(name);
    
    if (hydrateElement)
        return hydrateElement;
    
    const section = document.createElement('section');
    
    section.dataset.name = `aleman-hydrate-${name}`;
    section.innerHTML = `<ul data-name="${name}" class="menu menu-hidden"></ul>`;
    document.body.append(section);
    
    return section;
}

function createStateElement(name) {
    const elementName = `aleman-state-${name}`;
    
    if (findByName(elementName))
        return;
    
    const section = document.createElement('section');
    
    section.dataset.name = elementName;
    section.classList.add('menu-hidden');
    document.body.append(section);
}

function findByName(name) {
    return document.querySelector(`[data-name=${name}]`);
}
