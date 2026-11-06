import {types, operator} from 'putout';

const isUndefined = (a) => typeof a === 'undefined';
const {remove} = operator;

const {
    stringLiteral,
    isArrayExpression,
    isIdentifier,
    identifier,
    isObjectProperty,
    isExpressionStatement,
    isNullLiteral,
    nullLiteral,
} = types;

export const getKeyName = ({key}) => key.name || key.value;

export const itemOf = ({parentPath}) => {
    if (isArrayExpression(parentPath))
        return parentPath.parentPath;
    
    return parentPath;
};

export const pathOf = (path) => {
    const names = [];
    
    for (let current = itemOf(path); current; current = current.parentPath)
        if (isObjectProperty(current))
            names.unshift(getKeyName(current.node));
    
    return names.join('.');
};

export const isCursorPath = (path, {cursorPath}) => isUndefined(cursorPath) || pathOf(path) === cursorPath;

export const siblings = (item) => item.parentPath.get('properties');

export const first = (path) => path
    .getNextSibling()
    .get('properties')
    .at(0);

export const last = (path) => path
    .getNextSibling()
    .get('properties')
    .at(-1);

export const next = (item, {infiniteScroll}) => {
    const nextItem = item.getNextSibling();
    
    if (nextItem.node)
        return nextItem;
    
    return infiniteScroll ? siblings(item).at(0) : item;
};

export const prev = (item, {infiniteScroll}) => {
    const prevItem = item.getPrevSibling();
    
    if (prevItem.node)
        return prevItem;
    
    return infiniteScroll ? siblings(item).at(-1) : item;
};

export const findRoot = (path) => path.findParent((current) => {
    return isArrayExpression(current) && isExpressionStatement(current.parentPath);
});

export const rootProperties = (root) => root.get('elements').at(-1)
    .get('properties');

export function setCursor(path) {
    const valuePath = path.get('value');
    
    if (isIdentifier(valuePath) || isNullLiteral(valuePath)) {
        path.node.value = stringLiteral('cursor');
        path.node.shorthand = false;
        
        return;
    }
    
    if (isArrayExpression(valuePath))
        valuePath.node.elements.splice(1, 0, stringLiteral('cursor'));
}

export function clearCursor(path) {
    const {parentPath} = path;
    
    if (isObjectProperty(parentPath)) {
        const {key} = parentPath.node;
        
        if (isIdentifier(key)) {
            parentPath.node.value = identifier(key.name);
            parentPath.node.shorthand = true;
            
            return;
        }
        
        parentPath.node.value = nullLiteral();
        
        return;
    }
    
    if (isArrayExpression(parentPath))
        remove(path);
}

export const closeSubmenus = (root) => {
    root.traverse({
        ArrayExpression(path) {
            path.node.elements[0] = stringLiteral('off');
        },
    });
};

export const markNoCursor = (root) => {
    root.node.elements.splice(1, 0, stringLiteral('no-cursor'));
};
