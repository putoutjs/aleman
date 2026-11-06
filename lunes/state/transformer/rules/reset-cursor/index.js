import {
    findRoot,
    closeSubmenus,
    clearCursor,
    markNoCursor,
} from '../cursor.js';

export const report = () => `Reset cursor`;

export const include = () => [
    '"cursor"',
];

export const fix = (path) => {
    const root = findRoot(path);
    
    clearCursor(path);
    closeSubmenus(root);
    markNoCursor(root);
};
