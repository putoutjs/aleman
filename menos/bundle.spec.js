import {registerHooks} from 'node:module';
import {readFileSync} from 'node:fs';
import {test} from 'supertape';

// Match Rspack's asset/source rule without changing the production entry.
const hooks = registerHooks({
    load(url, context, nextLoad) {
        if (!url.endsWith('.css'))
            return nextLoad(url, context);
        
        const css = readFileSync(new URL(url), 'utf8');
        
        return {
            format: 'module',
            source: `export default ${JSON.stringify(css)}`,
            shortCircuit: true,
        };
    },
});

let createMenu;

try {
    ({createMenu} = await import('./bundle.js'));
} finally {
    hooks.deregister();
}
const createDocument = () => {
    const styles = [];
    const push = styles.push.bind(styles);
    const noop = () => {};
    
    return {
        styles,
        addEventListener: noop,
        querySelector: (selector) => selector === '[data-name="aleman-menos-style"]' ? styles[0] : null,
        createElement: () => ({
            dataset: {},
            classList: {
                add: noop,
            },
            querySelector: () => null,
            innerHTML: '',
        }),
        body: {
            append: noop,
        },
        head: {
            append: push,
        },
    };
};

for (const legacy of [true, false]) {
    test(`menos: bundle: ${legacy ? 'three' : 'two'} argument API`, (t) => {
        const original = globalThis.document;
        const document = createDocument();
        
        globalThis.document = document;
        let result;
        
        try {
            const menu = {
                hello() {
                },
            };
            const component = legacy ? createMenu('workspace', {}, menu) : createMenu('workspace', {
                menu,
            });
            
            // A second instance must reuse the stylesheet.
            createMenu('workspace');
            result = {
                names: component
                    .getState()
                    .items
                    .map(({name}) => name),
                styles: document.styles.length,
                css: document.styles[0].textContent,
            };
        } finally {
            globalThis.document = original;
        }
        const css = readFileSync(new URL('../nemo/menu.css', import.meta.url), 'utf8');
        const expected = {
            names: ['hello'],
            styles: 1,
            css,
        };
        
        t.deepEqual(result, expected);
        t.end();
    });
}
