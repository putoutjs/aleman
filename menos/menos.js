import {createComponent} from '../v2/index.js';
import {createState} from './state.js';
import {commands} from './commands.js';
import {rules} from './rules/index.js';
import {createAddons} from './addons.js';

const {stringify} = JSON;

export const createMenu = (elementName, options) => {
    const {name = 'menu'} = options;
    
    const hydrateElement = findByName(`aleman-hydrate-${name}`) || createElement(name);
    const stateElement = findByName(`aleman-state-${name}`) || createStateElement(name);
    
    const menu = createComponent(hydrateElement, {
        template: hydrateElement.innerHTML,
        rules,
        commands,
        addons: createAddons(name),
        state: createState(options),
        options,
    });
    
    hydrateState(stateElement, menu);
    
    return menu;
};

const hydrateState = (element, {getState, subscribe}) => {
    subscribe((state) => {
        element.textContent = stringify(state, null, 4);
    });
    
    element.textContent = stringify(getState(), null, 4);
};

const createElement = (name) => {
    const section = document.createElement('section');
    
    section.dataset.name = `aleman-hydrate-${name}`;
    section.innerHTML = `<ul data-name="${name}" class="menu menu-hidden"></ul>`;
    document.body.append(section);
    
    return section;
};

const createStateElement = (name) => {
    const section = document.createElement('section');
    
    section.dataset.name = `aleman-state-${name}`;
    section.classList.add('menu-hidden');
    document.body.append(section);
    
    return section;
};

const findByName = (name) => document.querySelector(`[data-name="${name}"]`);
