const {entries} = Object;
const isObject = (a) => a && typeof a === 'object';
const isIdentifier = (a) => /^[a-z_$][\w$]*$/i.test(a);
const quote = (a) => `'${a.replaceAll('\\', '\\\\').replaceAll(`'`, `\\'`)}'`;
const getKey = (a) => isIdentifier(a) ? a : quote(a);

export function convertMenuToState(menu, {submenu} = {}) {
    const result = [];
    
    for (const [key, value] of entries(menu)) {
        if (!isObject(value)) {
            result.push(isIdentifier(key) ? key : `${quote(key)}: null`);
            continue;
        }
        
        result.push(`${getKey(key)}: ${convertMenuToState(value, {
            submenu: true,
        })}`);
    }
    
    const noCursor = submenu ? '' : `'no-cursor', `;
    
    return `['off', ${noCursor} {${result.join(', ')}}]`;
}
