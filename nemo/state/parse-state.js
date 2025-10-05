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
    
    for (const [index, line] of lines.entries()) {
        const {
            mark,
            name,
            hasSubmenu,
        } = parseLine(line);
        
        const selected = mark === '+';
        
        if (selected)
            state.index = index;
        
        const current = {
            selected,
            name,
            path: name,
        };
        
        if (hasSubmenu)
            assign(current, {
                submenu: {
                    show: false,
                    items: [],
                },
            });
        
        items.push(current);
    }
    
    return state;
};

function parseLine(line) {
    let hasSubmenu = false;
    
    if (line.endsWith('*')) {
        line = line.slice(0, -1);
        hasSubmenu = true;
    }
    
    const [mark, ...nameChars] = line;
    const name = nameChars.join('');
    
    return {
        mark,
        name,
        hasSubmenu,
    };
}

