import * as applyVisibility from '../rules/apply-visibility/index.js';

export const show = (options) => ({
    rules: {
        'apply-visibility': ['on', options],
    },
    plugins: [
        ['apply-visibility', applyVisibility],
    ],
});
