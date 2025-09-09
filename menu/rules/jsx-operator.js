import {operator} from 'putout';

const {
    setLiteralValue,
    getAttributeNode,
    addAttributeValue,
    getAttributeValue,
} = operator;

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

