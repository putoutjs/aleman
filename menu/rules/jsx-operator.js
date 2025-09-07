import {operator, types} from 'putout';

const {isJSXElement} = types;
const {setLiteralValue} = operator;

export function getAttributeValue(path, attributeName) {
    if (isJSXElement(path))
        path = path.get('openingElement');
    
    const {attributes} = path.node;
    
    for (const {name, value} of attributes) {
        if (name.name === attributeName)
            return value.value;
    }
    
    return '';
}

export function getAttributeNode(node, name) {
    let result = null;
    const {attributes} = node.openingElement;
    
    for (const attr of attributes) {
        if (attr.name.name === name) {
            result = attr;
            break;
        }
    }
    
    return result;
}

export function getAttributePath(path, name) {
    if (isJSXElement(path))
        path = path.get('openingElement');
    
    let result = null;
    const attributes = path.get('attributes');
    
    for (const attr of attributes) {
        if (attr.node.name.name === name) {
            result = attr;
            break;
        }
    }
    
    return result;
}

export function appendAttributeValue(path, name, value) {
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

export function addClass(path, name) {
    appendAttributeValue(path, 'className', name);
}

export function removeClass(path, name) {
    removeAttributeValue(path, 'className', name);
}

export function containsClass(path, className) {
    const classNameValue = getAttributeValue(path, 'className');
    return classNameValue.includes(className);
}

export const checkTagName = (path, name) => path.node.openingElement.name.name === name;

export function removeAttributeValue(path, name, attributeValue) {
    if (!path)
        return;
    
    const {node} = path;
    const classAttribute = getAttributeNode(node, name);
    
    const {value} = classAttribute.value;
    
    if (value.includes(attributeValue))
        setLiteralValue(classAttribute.value, value.replace(RegExp(`\\s?${attributeValue}`), ''));
}

