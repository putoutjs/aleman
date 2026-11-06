import * as putCursor from '../rules/put-cursor/index.js';

export const first = () => ({
    rules: {
        'put-cursor': ['on', {
            operation: 'first',
        }],
    },
    plugins: [
        ['put-cursor', putCursor],
    ],
});
