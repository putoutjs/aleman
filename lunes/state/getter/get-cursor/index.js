import {types} from 'putout';

const {isArrayExpression} = types;

export const report = (path) => {
    if (isArrayExpression(path.parentPath))
        return path.parentPath.parentPath.node.key.name;
    
    return path.parentPath.node.key.name;
};

export const include = () => [
    '"cursor"',
];

export const fix = () => {};
