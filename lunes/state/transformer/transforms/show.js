import * as applyVisibility from '#lunes/state/rules/apply-visibility';
export const show = (options) => ({
    rules: {
        'apply-visibility': ['on', options],
    },
    plugins: [
        ['apply-visibility', applyVisibility],
    ],
});
