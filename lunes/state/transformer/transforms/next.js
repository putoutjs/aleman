import * as moveCursor from '../rules/move-cursor/index.js';

export const next = (options) => ({
    rules: {
        'move-cursor': ['on', options],
    },
    plugins: [
        ['move-cursor', moveCursor],
    ],
});
