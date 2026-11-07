import {jessy} from 'jessy';
import {createHooks} from './hooks.js';
import {createState} from './state/state.js';
import {getCursorPath} from './state/getter/getter.js';
import {render} from './render/render.js';
import * as actions from './actions/index.js';
import {createLoop} from './engine/engine.js';
import {createCompiler} from './compiler/compiler.js';
import {calculate} from './engine/position/calculate.js';

const isFn = (a) => typeof a === 'function';
const isCancel = (a) => Object.is(a, false);

export const hydrateMenu = (elementName, {hydrateElement, options, menu}) => {
    const {
        commit,
        read,
        isShown,
    } = createState(menu, options);
    
    const {name} = options;
    const hooks = createHooks(options);
    
    const getPosition = (event) => {
        const menuElement = hydrateElement.querySelector('ul.menu');
        
        if (!menuElement)
            return null;
        
        const {height, width} = getComputedStyle(menuElement);
        
        const {x, y} = calculate(event, {
            heightMenu: parseInt(height, 10),
            widthMenu: parseInt(width, 10),
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
        render: (state, renderOptions) => render(state, {
            ...renderOptions,
            icon: options.icon,
        }),
        getPosition,
    });
    
    const showMenu = (showOptions) => {
        const {event} = showOptions;
        const {clientX: x, clientY: y} = event;
        
        const params = {
            x,
            y,
            name,
            position: {
                x,
                y,
            },
        };
        
        if (isCancel(hooks.beforeShow(params))) {
            if (isShown())
                compile('hide');
            
            return;
        }
        
        compile('show', showOptions);
        hooks.afterShow(params);
    };
    
    const hideMenu = () => {
        if (!isShown())
            return;
        
        hooks.beforeHide();
        
        if (hooks.beforeClose())
            return;
        
        compile('hide');
        hooks.afterHide();
    };
    
    const clickItem = (fn) => {
        const isSkip = hooks.beforeClick(name);
        
        hideMenu();
        
        if (isSkip)
            return;
        
        fn();
        hooks.afterClick();
    };
    
    const dispatch = (operation, dispatchOptions) => {
        if (operation === 'show')
            return showMenu(dispatchOptions);
        
        if (operation === 'hide')
            return hideMenu();
        
        if (operation === 'run')
            return runItem(getCursorPath(read()));
        
        compile(operation, dispatchOptions);
    };
    
    const runItem = (path) => {
        const fn = path && jessy(path, menu);
        
        if (isFn(fn))
            clickItem(fn);
    };
    
    createLoop(hydrateElement, {
        compile: dispatch,
        actions,
        isShown,
        overrides: {
            isTarget: (event) => Boolean(event.target.closest(`[data-name="${elementName}"]`)),
        },
    });
    
    hydrateElement.addEventListener('click', (event) => {
        const label = event.target.closest('label[data-menu-path]');
        
        if (label)
            runItem(label.dataset.menuPath);
    });
    
    globalThis.addEventListener('click', (event) => {
        if (hydrateElement.contains(event.target))
            return;
        
        hideMenu();
    });
    
    hydrateElement.addEventListener('mouseleave', (event) => {
        if (event.target.parentElement !== hydrateElement)
            return;
        
        compile('reset');
    }, true);
    
    return {
        show: (x = 0, y = 0) => {
            showMenu({
                event: {
                    clientX: x,
                    clientY: y,
                },
            });
        },
        hide: hideMenu,
    };
};
