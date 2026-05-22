import {types} from 'putout';
import {
    next,
    prev,
    setCursor,
    clearCursor,
} from '../cursor.js';

const operations = {
    prev,
    next,
};

const {isArrayExpression} = types;

export const report = () => `Move cursor`;

export const include = () => [
    '"cursor"',
];

export const filter = (path, {options}) => {
    const {operation = 'next', cursor} = options;
    const {parentPath} = path;
    
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
};
