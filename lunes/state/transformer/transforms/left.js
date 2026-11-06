import * as leaveSubmenu from '../rules/leave-submenu/index.js';

export const left = (options) => ({
    rules: {
        'leave-submenu': ['on', options],
    },
    plugins: [
        ['leave-submenu', leaveSubmenu],
    ],
});
