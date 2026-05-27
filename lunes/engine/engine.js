import {listen} from './listen.js';

export const createLoop = (element, {actions, compile}) => {
    setTimeout(async () => {
        await loop({
            actions,
            compile,
        });
    });
};

const loop = async ({actions, compile}) => {
    for await (const [operation, cursor] of listen(actions)) {
        compile(operation, cursor);
    }
};
