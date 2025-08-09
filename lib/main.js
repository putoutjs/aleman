import {
    parse,
    transform,
    print,
} from 'https://esm.sh/@putout/bundle';
import {escape} from 'https://esm.sh/html-escaper';
import htmlToJsx from 'https://esm.sh/node-html-to-jsx';
import * as start from './addons/start-click.js';
import * as stop from './addons/stop-click.js';
import * as inputChange from './addons/input-change.js';
import * as plugin from './plugins/html/lib/index.js';

const {entries, assign} = Object;
const isFn = (a) => typeof a === 'function';
const source = htmlToJsx(document.body.outerHTML);
const ast = parse(source);

const render = createRender(entries(plugin.rules));
const addons = [
    start,
    stop,
    inputChange,
];

addListeners(addons);

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

const createApply = (name) => (target, thisArg, args) => {
    const element = document.querySelector(`[data-name='${name}']`);
    return element[key](...args);
};

const createElement = (name) => {
    const get = createGet(name);
    const set = createSet(name);
    const apply = createApply(name);
    
    return new Proxy({}, {
        get,
        set,
        apply,
    });
};

function addListeners(addons) {
    for (const {name, events, listener} of addons) {
        for (const event of events) {
            const element = document.querySelector(`[data-name='${name}']`);
            
            element?.addEventListener(event, (event) => {
                if (listener.running)
                    return;
                
                listener.running = true;
                
                listener({
                    ast,
                    render,
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

function createRender(plugins) {
    return (ast, names, options = {}) => {
        assign(options, {
            escape,
        });
        
        const currentPlugins = [];
        const rules = {};
        
        for (const [name, plugin] of plugins) {
            for (const currentName of names) {
                if (name === currentName) {
                    currentPlugins.push([name, plugin]);
                    rules[name] = ['on', options];
                }
            }
        }
        
        transform(ast, '', {
            rules,
            plugins: currentPlugins,
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
        addListeners(addons);
    };
}
