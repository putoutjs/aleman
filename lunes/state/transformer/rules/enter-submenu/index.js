import {types, operator} from 'putout';
import {setCursor, isCursorPath} from '../cursor.js';

const {
    isArrayExpression,
    stringLiteral,
} = types;

const {remove} = operator;

export const report = () => `Enter submenu`;

export const include = () => [
    '"cursor"',
];

export const filter = (path, {options}) => isArrayExpression(path.parentPath) && isCursorPath(path, options);

export const fix = (path) => {
    const array = path.parentPath;
    const properties = array.get('elements').at(-1)
        .get('properties');
    
    if (!properties.length)
        return;
    
    remove(path);
    array.node.elements[0] = stringLiteral('on');
    setCursor(properties.at(0));
};
