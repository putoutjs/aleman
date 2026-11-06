import {types} from 'putout';
import {
    next,
    prev,
    itemOf,
    setCursor,
    clearCursor,
    getKeyName,
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
        return getKeyName(parentPath.parentPath.node) === cursor;
    
    return getKeyName(parentPath.node) === cursor;
};

export const fix = (path, {options}) => {
    const {
        operation = 'next',
        count = 1,
        infiniteScroll = false,
    } = options;
    
    const move = operations[operation];
    const from = itemOf(path);
    let item = from;
    
    for (let i = 0; i < count; i++)
        item = move(item, {
            infiniteScroll,
        });
    
    if (item === from)
        return;
    
    clearCursor(path);
    setCursor(item);
};
