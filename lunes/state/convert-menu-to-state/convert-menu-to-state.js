const {entries} = Object;
const isObject = (a) => a && typeof a === 'object';

export function convertMenuToState(menu, {submenu} = {}) {
    const result = [];
    
    for (const [key, value] of entries(menu)) {
        if (!isObject(value)) {
            result.push(key);
            continue;
        }
        
        result.push(`${key}: ${convertMenuToState(value, {
            submenu: true,
        })}`);
    }
    
    const noCursor = submenu ? '' : `'no-cursor', `;
    
    return `['off', ${noCursor} {${result.join(', ')}}]`;
}
