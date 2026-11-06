import * as resetCursor from '../rules/reset-cursor/index.js';

export const reset = () => ({
    rules: {
        'reset-cursor': 'on',
    },
    plugins: [
        ['reset-cursor', resetCursor],
    ],
});
