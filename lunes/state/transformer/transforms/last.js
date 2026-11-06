import * as putCursor from '../rules/put-cursor/index.js';

export const last = () => ({
    rules: {
        'put-cursor': ['on', {
            operation: 'last',
        }],
    },
    plugins: [
        ['put-cursor', putCursor],
    ],
});
