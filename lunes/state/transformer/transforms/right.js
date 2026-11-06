import * as enterSubmenu from '../rules/enter-submenu/index.js';

export const right = (options) => ({
    rules: {
        'enter-submenu': ['on', options],
    },
    plugins: [
        ['enter-submenu', enterSubmenu],
    ],
});
