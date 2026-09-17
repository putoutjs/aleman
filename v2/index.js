import {createStore} from './state.js';
import {createRender} from './render.js';
import {wireAddons} from './addons.js';
import {createVimParser} from '../aleman/vim.js';

export {createStore} from './state.js';
export {createDSL} from './dsl.js';
export {wireAddons} from './addons.js';
export {createRender} from './render.js';

export const createComponent = (element, {template, rules, commands, addons = [], state = {}, options = {}, document}) => {
    const store = createStore(state);
    const render = createRender(template, {
        rules,
        options,
    });
    
    const vim = createVimParser();
    
    store.subscribe((current) => {
        const [changed, html] = render({
            ...current,
            ...options,
        });
        
        if (!changed)
            return;
        
        element.innerHTML = html;
    });
    
    wireAddons(addons, {
        store,
        commands,
        options,
        vim,
        element,
        document,
    });
    
    // trigger initial render
    store.setState({});
    
    return {
        getState: () => store.getState(),
        setState: (patch) => store.setState(patch),
        subscribe: (fn) => store.subscribe(fn),
        run: (event, addon) => {
            const command = commands[addon];
            const current = store.getState();
            
            if (!command)
                return;
            
            store.setState(command(current, options));
        },
        show: (x, y) => store.setState(commands.show?.({
            ...store.getState(),
            x,
            y,
        }) || {}),
        hide: () => store.setState(commands.hide?.(store.getState()) || {}),
    };
};
