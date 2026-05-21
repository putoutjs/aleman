import {operator} from 'putout';
import {
    first,
    last,
    setCursor,
} from '../cursor.js';

const {remove} = operator;

const operations = {
    last,
    first,
};

export const report = () => `Add cursor`;

export const include = () => [
    '"no-cursor"',
];

export const filter = (path, {options}) => {
    const {operation} = options;
    return operations[operation];
};

export const fix = (path, {options}) => {
    const {operation} = options;
    
    const getCursor = operations[operation];
    const cursorPath = getCursor(path);
    
    setCursor(cursorPath);
    remove(path);
};
