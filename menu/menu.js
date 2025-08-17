export const createMenu = async () => {
    createHydrate();
    createMap();
    
    createLink();
    const {hydrateMenu} = await import('./main.js');
    
    hydrateMenu();
};

function createLink() {
    const style = document.createElement('link');
    
    style.rel = 'stylesheet';
    style.href = 'https://esm.sh/aleman@1.0.12/menu/menu.css';
    document.head.appendChild(style);
}

function createHydrate() {
    const section = document.createElement('section');
    
    section.dataset.name = 'hydrate';
    section.innerHTML = `<ul data-name="menu" class="menu menu-hidden" style="left: 0; top: 20px;">
        </ul>`;
    document.body.append(section);
}

function createMap() {
    const script = document.createElement('script');
    
    script.type = 'importmap';
    script.innerHTML = `
        {
            "imports": {
                "putout": "https://esm.sh/@putout/bundle",
                "@putout/processor-html": "https://esm.sh/@putout/processor-html",
                "html-escaper": "https://esm.sh/html-escaper",
                "once": "https://esm.sh/once"
            }
        }
    `;
    document.body.append(script);
}
