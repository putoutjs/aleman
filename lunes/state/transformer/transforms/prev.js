import * as moveCursor from '../rules/move-cursor/index.js';
import * as addCursor from '../rules/add-cursor/index.js';

export const prev = (options) => ({
    rules: {
        'add-cursor': ['on', {
            operation: 'last',
        }],
        'move-cursor': ['on', options],
    },
    plugins: [
        ['move-cursor', moveCursor],
        ['add-cursor', addCursor],
    ],
});
