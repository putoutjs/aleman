import {types, operator} from 'putout';
import {
    next,
    prev,
    setCursor,
    clearCursor,
} from '../cursor.js';

const {setLiteralValue} = operator;
const operations = {
    prev,
    next,
};

const {
    isArrayExpression,
    isExpressionStatement,
} = types;

export const report = () => `Move cursor`;

export const include = () => [
    '"cursor"',
];

export const filter = (path, {options}) => {
    const {operation = 'next'} = options;
    const {parentPath} = path;
    const cursor = getCursorLink(path).node.value;
    
    if (!operations[operation])
        return false;
    
    if (isArrayExpression(parentPath))
        return parentPath.parentPath.node.key.name === cursor;
    
    return parentPath.node.key.name === cursor;
};

export const fix = (path, options) => {
    const {
        operation = 'next',
        count = 1,
    } = options;
    
    const getCursor = operations[operation];
    let cursorPath = path.parentPath;
    
    for (let i = 0; i < count; i++)
        cursorPath = getCursor(cursorPath);
    
    clearCursor(path);
    setCursor(cursorPath);
    
    const cursor = getNextCursorValue(cursorPath);
    const cursorLink = getCursorLink(path);
    
    setLiteralValue(cursorLink, cursor);
};

function getNextCursorValue(path) {
    const keyPath = path.get('key');
    return keyPath.node.name;
}

function getCursorLink(path) {
    const expressionPath = path.find(isExpressionStatement);
    return expressionPath.get('expression.elements.1');
}
