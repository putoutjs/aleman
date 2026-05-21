import {types} from 'putout';

const {
    stringLiteral,
    isArrayExpression,
    isIdentifier,
    identifier,
} = types;

export function last(path) {
    return path
        .getNextSibling()
        .get('properties')
        .at(-1);
}

export function first(path) {
    return path
        .getNextSibling()
        .get('properties')
        .at(0);
}

export function setCursor(path) {
    const valuePath = path.get('value');
    
    if (isIdentifier(valuePath)) {
        path.node.value = stringLiteral('cursor');
        path.node.shorthand = false;
        
        return;
    }
    
    if (isArrayExpression(valuePath))
        valuePath.node.elements.unshift(stringLiteral('cursor'));
}

export function prev(path) {
    const nextCursor = path.getNextSibling();
    
    if (nextCursor.node)
        return nextCursor;
    
    return path.parentPath.get('properties.0');
}

export function next(path) {
    const prevCursor = path.getPrevSibling();
    
    if (prevCursor.node)
        return prevCursor;
    
    return path.parentPath
        .get('properties')
        .at(-1);
}

export function clearCursor({parentPath}) {
    parentPath.node.value = identifier(parentPath.node.key.name);
    parentPath.node.shorthand = true;
}
