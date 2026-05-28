import * as moveCursor from '#lunes/state/rules/move-cursor';

export const next = (options) => ({
    rules: {
        'move-cursor': ['on', options],
    },
    plugins: [
        ['move-cursor', moveCursor],
    ],
});
