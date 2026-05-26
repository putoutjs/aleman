/*
import {listen} from './listen.js';
export const hydrate = async (element, config) => {
    const {
        options,
        state,
        actions,
    } = config;
    
    for await (const ops of listen('editor', actions, {
        emitBefore,
        emitIf,
        emitRun,
        createVimParser,
    })) {
        const state = commit(ops);
        updateDOM(render(state));
    }
};
 */
