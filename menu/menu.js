const {stringify} = JSON;

export const createMenu = async (element, options, menuData) => {
    const hydrateElement = createHydrate();
    
    await createMap();
    await createLink();
    
    createStateElement();
    const {hydrateMenu} = await import('./hydrate-menu.js');
    
    return hydrateMenu(hydrateElement, options, menuData);
};

async function createLink() {
    const name = 'aleman-menu-style';
    
    if (findByName(name))
        return;
    
    const style = document.createElement('style');
    
    style.dataset.name = name;
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
    const name = 'aleman-hydrate-menu';
    const hydrateElement = findByName(name);
    
    if (hydrateElement)
        return hydrateElement;
    
    const section = document.createElement('section');
    
    section.dataset.name = name;
    section.innerHTML = `<ul data-name="menu" class="menu menu-hidden"></ul>`;
    document.body.append(section);
    
    return section;
}

function createStateElement() {
    const name = 'aleman-state-menu';
    
    if (findByName(name))
        return;
    
    const section = document.createElement('section');
    
    section.dataset.name = name;
    section.classList.add('menu-hidden');
    section.dataset.name = 'aleman-state-menu';
    document.body.append(section);
}

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

function findByName(name) {
    return document.querySelector(`[data-name=${name}]`);
}
