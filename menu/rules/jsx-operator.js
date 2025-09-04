import {operator} from 'putout';

const {setLiteralValue} = operator;

export function getAttributeValue(path, attributeName) {
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

export function appendAttributeValue(node, name, value) {
    const attributeNode = getAttributeNode(node, name);
    
    if (!attributeNode)
        return;
    
    if (attributeNode.value.value.includes(value))
        return;
    
    setLiteralValue(attributeNode.value, `${attributeNode.value.value} ${value}`);
}

export function setAttributeValue(node, name, value) {
    const attributeNode = getAttributeNode(node, name);
    
    if (attributeNode)
        setLiteralValue(attributeNode.value, value);
}

export function removeAttributeValue(path, name, attributeValue) {
    if (!path)
        return;
    
    const node = path.node || path;
    const classAttribute = getAttributeNode(node, name);
    
    if (!classAttribute)
        return;
    
    const {value} = classAttribute.value;
    
    if (value.includes(attributeValue))
        setLiteralValue(classAttribute.value, value.replace(RegExp(`\\s?${attributeValue}`), ''));
}
