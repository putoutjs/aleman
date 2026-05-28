import * as applyVisibility from '#lunes/state/rules/apply-visibility';
export const hide = (options) => ({
    rules: {
        'apply-visibility': ['on', options],
    },
    plugins: [
        ['apply-visibility', applyVisibility],
    ],
});
