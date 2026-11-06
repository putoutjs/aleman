import {operator} from 'putout';
import {
    findRoot,
    rootProperties,
    closeSubmenus,
    clearCursor,
    setCursor,
} from '../cursor.js';

const {remove} = operator;

export const report = () => `Put cursor`;

export const include = () => [
    '"cursor"',
    '"no-cursor"',
];

export const filter = (path, {options}) => ['first', 'last'].includes(options.operation);

export const fix = (path, {options}) => {
    const {operation} = options;
    const root = findRoot(path);
    const properties = rootProperties(root);
    const target = operation === 'first' ? properties.at(0) : properties.at(-1);
    
    if (path.node.value === 'no-cursor')
        remove(path);
    else
        clearCursor(path);
    
    closeSubmenus(root);
    setCursor(target);
};
