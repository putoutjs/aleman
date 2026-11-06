import {jessy} from 'jessy';
import {createState} from './state/state.js';
import {getCursorPath} from './state/getter/getter.js';
import {render} from './render/render.js';
import * as actions from './actions/index.js';
import {createLoop} from './engine/engine.js';
import {createCompiler} from './compiler/compiler.js';
import {calculate} from './engine/position/calculate.js';

const isFn = (a) => typeof a === 'function';

export const hydrateMenu = (elementName, {hydrateElement, options, menu}) => {
    const {
        commit,
        read,
        isShown,
    } = createState(menu, options);
    
    const run = (state) => {
        const path = getCursorPath(state);
        const fn = path && jessy(path, menu);
        
        if (!isFn(fn))
            return false;
        
        fn();
        
        return true;
    };
    
    const getPosition = (event) => {
        const menuElement = hydrateElement.querySelector('ul.menu');
        
        if (!menuElement)
            return null;
        
        const {height, width} = menuElement.getBoundingClientRect();
        
        const {x, y} = calculate(event, {
            heightMenu: height,
            widthMenu: width,
            innerHeight: globalThis.innerHeight,
            innerWidth: globalThis.innerWidth,
        });
        
        return {
            top: y,
            left: x,
        };
    };
    
    const compile = createCompiler(hydrateElement, {
        commit,
        read,
        render,
        run,
        getPosition,
    });
    
    createLoop(hydrateElement, {
        compile,
        actions,
        isShown,
    });
    
    hydrateElement.addEventListener('click', (event) => {
        const label = event.target.closest('label[data-menu-path]');
        const fn = label && jessy(label.dataset.menuPath, menu);
        
        if (!isFn(fn))
            return;
        
        fn();
        compile('hide');
    });
    
    globalThis.addEventListener('click', (event) => {
        if (!isShown() || hydrateElement.contains(event.target))
            return;
        
        compile('hide');
    });
    
    hydrateElement.addEventListener('mouseleave', (event) => {
        if (event.target.parentElement !== hydrateElement)
            return;
        
        compile('reset');
    }, true);
    
    return {
        show: (x = 0, y = 0) => {
            compile('show', {
                position: {
                    top: y,
                    left: x,
                },
            });
        },
        hide: () => {
            compile('hide');
        },
    };
};
