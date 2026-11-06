export const findByName = (name) => document.querySelector(`[data-name=${name}]`);

export const createHydrate = (name) => {
    const hydrateElement = findByName(name);
    
    if (hydrateElement)
        return hydrateElement;
    
    const section = document.createElement('section');
    
    section.dataset.name = `aleman-hydrate-${name}`;
    section.innerHTML = `<ul data-name="${name}" class="menu menu-hidden"></ul>`;
    document.body.append(section);
    
    return section;
};

export const addStyleText = (css) => {
    const name = 'aleman-menu-style';
    
    if (findByName(name))
        return;
    
    const style = document.createElement('style');
    
    style.dataset.name = name;
    style.textContent = css;
    document.head.appendChild(style);
};

export const addStyleLink = () => {
    const name = 'aleman-menu-style';
    
    if (findByName(name))
        return;
    
    const link = document.createElement('link');
    
    link.dataset.name = name;
    link.rel = 'stylesheet';
    link.href = new URL('menu.css', import.meta.url).pathname;
    document.head.appendChild(link);
};
