import {
    parse,
    transform,
    print,
} from 'putout';
import {branch, merge} from '@putout/processor-html';
import {escape} from 'html-escaper';
import {addListeners} from './add-listeners.js';

const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];
const {assign, entries} = Object;

export const createRender = (html, {headless, state, storage, rules, addons, element}) => {
    const {source} = branch(html)[0];
    const ast = parse(source);
    
    return function render(elementName = 'document') {
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
            
            const prefix = '<section>';
            const suffix = '<\\section>';
            
            element.innerHTML = merge('', [code]).slice(prefix.length, -suffix.length);
            
            if (headless)
                return;
            
            addListeners({
                render,
                addons,
                storage,
                state,
            });
            
            restoreState({
                state,
                element,
                storage,
            });
        };
    };
};

function restoreState({state, element, storage}) {
    for (const [name, options] of entries(state)) {
        const el = element.querySelector(`[data-name='${name}']`);
        
        if (!el && name === 'document')
            for (const [key, value] of entries(options)) {
                storage.set(key, value);
            }
        
        if (!el) {
            delete state[name];
            continue;
        }
        
        assign(el, options);
    }
}
