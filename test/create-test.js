import {createTest as create} from '@putout/test';
import {emit} from '../aleman/emit.js';
import {createVimParser} from '../aleman/vim.js';
import {createRender} from '../aleman/render.js';

const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];

function lint(source, {rules, plugins}) {
    const [, options] = rules.aleman;
    const render = createRender(source, {
        type: 'jsx',
        options,
        rules: plugins[0][1].rules,
    });
    
    const [transformed, code, places] = render(options);
    
    if (!transformed)
        return {
            code: source,
            places,
        };
    
    return {
        code,
        places,
    };
}

export const createTest = (dir, addon, {rules, state, options}) => {
    const parseVim = createVimParser();
    const testOptions = {
        lint,
        plugins: [
            ['aleman', {
                rules,
            }],
        ],
    };
    
    return create(dir, testOptions, {
        render: (operator) => (name, overrides = {}) => {
            const {
                key = '',
                command = '',
                event = createEvent(key, command),
                options: newOptions = {},
                state: newState,
            } = overrides;
            
            let currentState = state;
            
            for (const currentEvent of maybeArray(event)) {
                currentState = emit(addon, {
                    event: currentEvent,
                    parseVim,
                    state: {
                        ...state,
                        ...newState,
                    },
                    options: {
                        ...options,
                        ...newOptions,
                    },
                });
            }
            
            const rulesOptions = {
                ...options,
                ...newOptions,
                ...state,
                ...newState,
                ...currentState,
            };
            
            return operator.transformWithOptions(name, rulesOptions);
        },
        noReportOnRender: (operator) => (name, overrides = {}) => {
            let currentState = state;
            const {
                command = '',
                event = createEvent(command),
                options: newOptions = {},
                state: newState,
            } = overrides;
            
            for (const currentEvent of maybeArray(event)) {
                currentState = emit(addon, {
                    event: currentEvent,
                    parseVim,
                    state: {
                        ...state,
                        ...newState,
                        ...currentState,
                    },
                    options: {
                        ...options,
                        ...newOptions,
                    },
                });
            }
            
            const rulesOptions = {
                ...options,
                ...newOptions,
                ...state,
                ...newState,
                ...currentState,
            };
            
            return operator.noReportWithOptions(name, rulesOptions);
        },
    });
};

function createEvent(key, command) {
    const events = [];
    
    if (key)
        return [{
            key,
        }];
    
    for (const key of command.split('')) {
        events.push({
            key,
        });
    }
    
    return events;
}
