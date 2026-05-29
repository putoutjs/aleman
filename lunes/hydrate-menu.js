import {createState} from './state/state.js';
import {render} from './render/render.js';
import {actions} from './actions/index.js';
import {createLoop} from './engine/engine.js';
import {createCompiler} from './compiler/compiler.js';

export const hydrateMenu = (elementName, {hydrateElement, menu}) => {
    const {commit} = createState(menu);
    const compile = createCompiler(hydrateElement, {
        commit,
        render,
    });
    
    createLoop(hydrateElement, {
        compile,
        actions,
    });
    
    return {
        show: (top = 0, left = 0) => {
            compile('show', {
                position: {
                    top,
                    left,
                },
            });
        },
        hide: () => {
            compile('hide');
        },
    };
};
