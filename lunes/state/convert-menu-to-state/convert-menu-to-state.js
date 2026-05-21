const {entries} = Object;
const isObject = (a) => a && typeof a === 'object';

export function convertMenuToState(menu) {
    const result = [];
    
    for (const [key, value] of entries(menu)) {
        if (!isObject(value)) {
            result.push(key);
            continue;
        }
        
        result.push(`${key}: ${convertMenuToState(value)}`);
    }
    
    return `['close',{${result.join(',')}}]`;
}
