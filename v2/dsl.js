export const createDSL = ({marks, suffixes, indent = '    '}) => {
    const parse = (source) => {
        const lines = source.split('\n');
        const items = [];
        
        for (const line of lines) {
            if (!line.trim())
                continue;
            
            if (line.startsWith(indent)) {
                addChild(items, line.trim());
                continue;
            }
            
            items.push(parseItem(line));
        }
        
        return {
            items,
        };
    };
    
    const print = ({items}) => {
        const result = [];
        
        for (const item of items) {
            result.push(printItem(item));
            
            if (item.submenu?.show)
                for (const child of item.submenu.items)
                    result.push(`${indent}${printItem(child)}`);
        }
        
        return result.join('\n');
    };
    
    return {
        parse,
        print,
    };
    
    function addChild(items, line) {
        const current = items.at(-1);
        
        if (!current?.submenu)
            return;
        
        current.submenu.items.push(parseItem(line));
    }
    
    function parseItem(line) {
        const [mark] = line;
        const rest = line.slice(1);
        
        const item = {
            name: rest,
            selected: mark === marks.selected,
        };
        
        if (rest.endsWith(suffixes.submenuOpen)) {
            item.name = rest.slice(0, -1);
            item.submenu = {
                show: true,
                items: [],
            };
            
            return item;
        }
        
        if (rest.endsWith(suffixes.submenuClosed)) {
            item.name = rest.slice(0, -1);
            item.submenu = {
                show: false,
                items: [],
            };
        }
        
        return item;
    }
    
    function printItem({name, selected, submenu}) {
        const mark = selected ? marks.selected : marks.unselected;
        let line = `${mark}${name}`;
        
        if (submenu)
            line += submenu.show ? suffixes.submenuOpen : suffixes.submenuClosed;
        
        return line;
    }
};
