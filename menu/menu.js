export const createMenu = async () => {
    createHydrate();
    createMap();
    
    await createLink();
    const {hydrateMenu} = await import('../lib/main.js');
    
    hydrateMenu(hydrateMenu);
};

async function createLink() {
    const style = document.createElement('style');
    const content = await import('https://esm.sh/aleman/menu/style.css', {
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
