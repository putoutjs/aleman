import * as applyVisibility from '../rules/apply-visibility/index.js';
import * as resetCursor from '../rules/reset-cursor/index.js';

export const hide = (options) => ({
    rules: {
        'apply-visibility': ['on', options],
        'reset-cursor': 'on',
    },
    plugins: [
        ['apply-visibility', applyVisibility],
        ['reset-cursor', resetCursor],
    ],
});
