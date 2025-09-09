import {operator} from 'putout';

const {setLiteralValue} = operator;

export function getAttributeValue(path, attributeName) {
    const attribute = getAttributeNode(path, attributeName);
    
    if (!attribute)
        return '';
    
    return attribute.value.value;
}

export function getAttributeNode(path, name) {
    let result = null;
    
    const node = path.node || path;
    const {attributes} = node.openingElement;
    
    for (const attr of attributes) {
        if (attr.name.name === name) {
            result = attr;
            break;
        }
    }
    
    return result;
}

export function addAttributeValue(path, name, value) {
    const node = path.node || path;
    const attributeNode = getAttributeNode(node, name);
    
    if (attributeNode.value.value.includes(value))
        return;
    
    setLiteralValue(attributeNode.value, `${attributeNode.value.value} ${value}`);
}

export function setAttributeValue(node, name, value) {
    node = node.node || node;
    
    const attributeNode = getAttributeNode(node, name);
    
    if (attributeNode)
        setLiteralValue(attributeNode.value, value);
}

export function addClassName(path, name) {
    addAttributeValue(path, 'className', name);
}

export function getClassName(path) {
    return getAttributeValue(path, 'className');
}

export function removeClassName(path, name) {
    removeAttributeValue(path, 'className', name);
}

export function containsClassName(path, className) {
    const classNameValue = getClassName(path);
    return classNameValue.includes(className);
}

export function removeAttributeValue(path, name, attributeValue) {
    if (!path)
        return;
    
    const {node} = path;
    const classAttribute = getAttributeNode(node, name);
    
    const {value} = classAttribute.value;
    
    if (value.includes(attributeValue))
        setLiteralValue(classAttribute.value, value.replace(RegExp(`\\s?${attributeValue}`), ''));
}

export function hasDataName(path, value = '') {
    const attribute = getAttributeValue(path, 'data-name');
    return attribute === value;
}
