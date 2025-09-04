import {getAttributeValue} from './operator.js';

export function checkDataName(path, value = 'menu') {
    const attribute = getAttributeValue(path, 'data-name');
    
    return attribute === value;
}
