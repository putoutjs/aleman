import {
    parse,
    transform,
    print,
} from 'https://esm.sh/@putout/bundle';
import {escape} from 'https://esm.sh/html-escaper';
import {addListeners} from './add-listeners.js';
const DIV_OPEN = 5;
const DIV_CLOSE = -7;

const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];
const {assign, entries} = Object;

export const createRender = (source, {rules, addons, element}) => {
    const ast = parse(source);
    const state = {};
    
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
            
            element.innerHTML = code.slice(DIV_OPEN, DIV_CLOSE);
            addListeners(render, addons);
            restoreState(state, element);
        };
    };
};

function restoreState(state, element) {
    for (const [name, options] of entries(state)) {
        const el = element.querySelector(`[data-name='${name}']`);
        
        if (!el) {
            delete state[name];
            continue;
        }
        
        assign(el, options);
    }
}

