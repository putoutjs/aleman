import {putout, parse, transform, print} from 'https://esm.sh/@putout/bundle';
import * as start from './addons/start-click.js';
import * as stop from './addons/stop-click.js';

const source = document.body.outerHTML;
const ast = parse(source)

const plugins = [
    ['remove-button-start', {
        report: () => '',
        replace: () => ({
            '<button __jsx_attributes>hello</button>': '',
        }),
    }],
    ['remove-button-stop', {
        report: () => '',
        replace: () => ({
            '<button __jsx_attributes>world</button>': '',
        }),
    }]
]

const render = createRender(plugins);
const addons = [start, stop];

addListeners(addons);

function addListeners(addons) {
    for (const {name, events, listener} of addons) {
        for (const event of events) {
            const element = document.querySelector(`[data-name='${name}']`)
            element?.addEventListener(event, () => {
                listener({
                    ast,
                    render
                });
                const code = print(ast, {
                    printer: ['putout', {
                        format: {
                            newline: '',
                            endOfFile: '',
                        }
                    }]
                });
                document.body.outerHTML = code.slice(0, -1);
                addListeners(addons);
            });
        }
    }
}

function createRender(plugins) {
    return (ast, names) => {
        const currentPlugins = [];
        
        for (const [name, plugin] of plugins) {
            for (const currentName of names) {
                if (name === currentName)
                    currentPlugins.push([name, plugin])
            }
        }
        
        transform(ast, '', {
            plugins: currentPlugins,
        })
    }
}
