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
    for await (const [operations, cursor] of listen(actions)) {
        for (const operation of operations)
            compile(operation, cursor);
    }
};
