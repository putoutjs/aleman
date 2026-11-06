import {test} from 'supertape';
import {
    installDocument,
    installWindow,
} from './fixture/fake-dom.js';
import {createMenu} from './lunes.js';
import {importmap} from './importmap.js';

const noop = () => {};

const setup = () => {
    const doc = installDocument();
    const win = installWindow();
    
    return {
        document: doc.document,
        uninstall: () => {
            doc.uninstall();
            win.uninstall();
        },
    };
};

const names = (document) => document.elements.map(({dataset}) => dataset.name);

test('lunes: createMenu: returns show and hide', async (t) => {
    const {uninstall} = setup();
    
    const menu = await createMenu('fm', {}, {
        hello: noop,
    });
    
    uninstall();
    const result = Object.keys(menu);
    const expected = [
        'show',
        'hide',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('lunes: createMenu: creates the hydrate element, the import map and the style', async (t) => {
    const {uninstall, document} = setup();
    
    await createMenu('fm', {}, {
        hello: noop,
    });
    
    uninstall();
    const result = names(document).sort();
    const expected = [
        'aleman-hydrate-menu',
        'aleman-importmap',
        'aleman-menu-style',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('lunes: createMenu: the import map contains putout', async (t) => {
    const {uninstall, document} = setup();
    
    await createMenu('fm', {}, {
        hello: noop,
    });
    
    const script = document.elements.find(({dataset}) => dataset.name === 'aleman-importmap');
    
    uninstall();
    const result = JSON.parse(script.innerHTML);
    const expected = importmap;
    
    t.deepEqual(result, expected);
    t.end();
});

test('lunes: createMenu: the second menu reuses the import map and the style', async (t) => {
    const {uninstall, document} = setup();
    
    await createMenu('fm', {name: 'one'}, {
        hello: noop,
    });
    await createMenu('fm', {name: 'two'}, {
        hello: noop,
    });
    
    uninstall();
    const result = names(document).filter((name) => name.startsWith('aleman-') && !name.includes('hydrate'));
    const expected = [
        'aleman-importmap',
        'aleman-menu-style',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('lunes: createMenu: the default name is menu', async (t) => {
    const {uninstall} = setup();
    const options = {};
    
    await createMenu('fm', options, {
        hello: noop,
    });
    
    uninstall();
    
    t.equal(options.name, 'menu');
    t.end();
});

test('lunes: createMenu: the given name is kept', async (t) => {
    const {uninstall} = setup();
    const options = {
        name: 'context',
    };
    
    await createMenu('fm', options, {
        hello: noop,
    });
    
    uninstall();
    
    t.equal(options.name, 'context');
    t.end();
});
