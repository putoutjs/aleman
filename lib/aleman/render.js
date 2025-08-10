import {
    parse,
    transform,
    print,
} from 'https://esm.sh/@putout/bundle';

import {branch, merge} from 'https://esm.sh/@putout/processor-html';
import {escape} from 'https://esm.sh/html-escaper';
import {addListeners} from './add-listeners.js';

const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];
const {assign, entries} = Object;

export const createRender = (html, {rules, addons, element}) => {
    const {source} = branch(html)[0];
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
            
            element.innerHTML = merge('', [code]);
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

