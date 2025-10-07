const {assign} = Object;

export const parseState = (source) => {
    const lines = source.split('\n');
    const items = [];
    const state = {
        index: -1,
        submenuIndex: -1,
        insideSubmenu: false,
        show: true,
        position: {
            x: 0,
            y: 20,
        },
        items,
    };
    
    for (let index = 0; index < lines.length; index++) {
        const line = lines[index];
        const {
            mark,
            name,
            hasSubmenu,
            show,
        } = parseLine(line);
        
        const selected = mark === '+';
        
        if (selected)
            state.index = index;
        
        const current = {
            selected,
            name,
            path: name,
        };
        
        if (hasSubmenu) {
            assign(current, {
                submenu: {
                    show,
                    items: [],
                },
            });
            
            for (;index < lines.length; index++) {
                const line = lines[index];
                const {
                    mark,
                    name: submenuName,
                } = parseLine(line);
                
                const selected = mark === '+';
                
                if (selected)
                    state.index = index;
                
                current.submenu.items.push({
                    selected,
                    name,
                    path: `${name}.${submenuName}`,
                });
            }
        }
        
        items.push(current);
    }
    
    return state;
};

function parseLine(line) {
    let hasSubmenu = false;
    let show = false;
    
    if (line.endsWith('*')) {
        line = line.slice(0, -1);
        hasSubmenu = true;
    } else if (line.endsWith('>')) {
        line = line.slice(0, -1);
        hasSubmenu = true;
        show = true;
    }
    
    const [mark, ...nameChars] = line;
    const name = nameChars.join('');
    
    return {
        mark,
        name,
        hasSubmenu,
        show,
    };
}

