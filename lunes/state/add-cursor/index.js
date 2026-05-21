import {operator} from 'putout';
import {
    first,
    last,
    setCursor,
} from '../cursor.js';

const {setLiteralValue} = operator;

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
    
    const keyPath = cursorPath.get('key');
    const {name} = keyPath.node;
    
    setLiteralValue(path.node, name);
};
