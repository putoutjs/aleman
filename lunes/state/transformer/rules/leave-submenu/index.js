import {types} from 'putout';
import {
    itemOf,
    setCursor,
    clearCursor,
    isCursorPath,
} from '../cursor.js';

const {
    isArrayExpression,
    isExpressionStatement,
    stringLiteral,
} = types;

const submenuOf = (path) => itemOf(path).parentPath.parentPath;

export const report = () => `Leave submenu`;

export const include = () => [
    '"cursor"',
];

export const filter = (path, {options}) => {
    const array = submenuOf(path);
    
    return isArrayExpression(array) && !isExpressionStatement(array.parentPath) && isCursorPath(path, options);
};

export const fix = (path) => {
    const array = submenuOf(path);
    
    clearCursor(path);
    array.node.elements[0] = stringLiteral('off');
    setCursor(array.parentPath);
};
