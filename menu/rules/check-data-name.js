import {getAttributeValue} from './jsx-operator.js';

export function checkDataName(path, value = 'menu') {
    const attribute = getAttributeValue(path, 'data-name');
    
    return attribute === value;
}
