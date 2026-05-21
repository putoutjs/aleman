import {types} from 'putout';

const {stringLiteral} = types;
const {isIdentifier} = types;
const {identifier} = types;
const {isArrayExpression} = types;

import {next, prev, setCursor, clearCursor} from '../cursor.js';

export const report = () => `Move cursor`;

export const include = () => [
    '"cursor"',
];

export const filter = (path, {options}) => {
    const {
        operation = 'next',
        cursor = 'view',
    } = options;
     
    const {parentPath} = path;
    
    if (!operations[operation])
        return false;
    
    if (isArrayExpression(parentPath))
        return parentPath.parentPath.node.key.name === cursor;
    
    return parentPath.node.key.name === cursor;
};

const operations = {
    prev,
    next,
};

export const fix = (path, options) => {
    const {
        operation = 'next',
        count = 1,
        cursor,
    } = options;
    
    const getCursor = operations[operation];
    
    let cursorPath = path.parentPath;
    
    for (let i = 0; i < count; i++)
        cursorPath = getCursor(cursorPath);
    
    clearCursor(path);
    setCursor(cursorPath);
};
