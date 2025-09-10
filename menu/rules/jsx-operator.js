import {operator} from 'putout';

const {
    setLiteralValue,
    getAttributeNode,
    addAttributeValue,
    getAttributeValue,
    removeAttributeValue,
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

export function hasDataName(path, value = '') {
    const attribute = getAttributeValue(path, 'data-name');
    return attribute === value;
}

