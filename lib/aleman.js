import {
    parse,
    transform,
    print,
} from 'https://esm.sh/@putout/bundle';
import {escape} from 'https://esm.sh/html-escaper';
import * as start from './addons/start-click.js';
import * as stop from './addons/stop-click.js';
import * as inputChange from './addons/input-change.js';

const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];
const {assign, entries} = Object;
const isFn = (a) => typeof a === 'function';

const addons = [
    start,
    stop,
    inputChange,
];

export const hydrate = (source, {rules, addons}) => {
    const state = {};
    const render = createRender(source, state, rules);
    
    addListeners(render, addons);
};

const createSet = (name) => (target, key, value) => {
    const element = document.querySelector(`[data-name='${name}']`);
    
    element[key] = value;
    
    return true;
};

const createGet = (name) => (target, key) => {
    const element = document.querySelector(`[data-name='${name}']`);
    const result = element[key];
    
    if (isFn(result))
        return result.bind(element);
    
    return result;
};

const createElement = (name) => {
    const get = createGet(name);
    const set = createSet(name);
    
    return new Proxy({}, {
        get,
        set,
    });
};

function addListeners(render, addons) {
    for (const {name, events, listener} of addons) {
        for (const event of events) {
            const element = document.querySelector(`[data-name='${name}']`);
            
            element?.addEventListener(event, (event) => {
                if (listener.running)
                    return;
                
                listener.running = true;
                
                listener({
                    render: render(name),
                    set: createSet(name),
                    get: createGet(name),
                    event,
                    element: createElement(name),
                });
                
                listener.running = false;
            });
        }
    }
}

const createRender = (source, state, rules) => {
    const ast = parse(source);
    return function render(elementName) {
        return (names, options = {}) => {
            assign(state, {
                [elementName]: options,
            });
            assign(options, {
                escape,
            });
            
            const plugins = [];
            const currentRules = {};
            
            for (const [name, rule] of entries(rules)) {
                for (const currentName of maybeArray(names)) {
                    if (name === currentName) {
                        plugins.push([name, rule]);
                        currentRules[name] = ['on', options];
                    }
                }
            }
            
            transform(ast, '', {
                rules: currentRules,
                plugins,
            });
            
            const code = print(ast, {
                printer: ['putout', {
                    format: {
                        newline: '',
                        endOfFile: '',
                    },
                }],
            });
            
            document.body.innerHTML = code.slice(0, -1);
            addListeners(render, addons);
            restoreState(state);
        };
    };
};

function restoreState(state) {
    for (const [name, options] of entries(state)) {
        const el = document.querySelector(`[data-name='${name}']`);
        
        if (!el) {
            delete state[name];
            continue;
        }
        
        assign(el, options);
    }
}
