import {stub, test} from 'supertape';
import {
    installDocument,
    installWindow,
} from './fixture/fake-dom.js';
import {createBundleMenu} from './create-bundle-menu.js';

const noop = () => {};

test('lunes: createBundleMenu: adds the style once and hydrates', (t) => {
    const doc = installDocument();
    const win = installWindow();
    const hydrateMenu = stub().returns('menu');
    
    const createMenu = createBundleMenu({
        css: '.menu {}',
        hydrateMenu,
    });
    
    createMenu('fm', {}, {
        hello: noop,
    });
    const result = createMenu('fm', {}, {
        hello: noop,
    });
    
    const styles = doc.document.elements.filter(({textContent}) => textContent);
    
    win.uninstall();
    doc.uninstall();
    
    const expected = {
        result: 'menu',
        styles: 1,
        calls: 2,
    };
    
    t.deepEqual({
        result,
        styles: styles.length,
        calls: hydrateMenu.callCount,
    }, expected);
    t.end();
});

test('lunes: createBundleMenu: passes the hydrate element, the options and the menu', (t) => {
    const doc = installDocument();
    const win = installWindow();
    const hydrateMenu = stub();
    
    const menu = {
        hello: noop,
    };
    
    const options = {
        name: 'context',
    };
    
    createBundleMenu({
        css: '',
        hydrateMenu,
    })('fm', options, menu);
    
    const [, args] = hydrateMenu.args[0];
    
    win.uninstall();
    doc.uninstall();
    
    const result = [args.options, args.menu, args.hydrateElement.dataset.name];
    const expected = [
        options,
        menu,
        'aleman-hydrate-context',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('lunes: createBundleMenu: the default name is menu', (t) => {
    const doc = installDocument();
    const win = installWindow();
    const options = {};
    
    createBundleMenu({
        css: '',
        hydrateMenu: stub(),
    })('fm', options, {});
    
    win.uninstall();
    doc.uninstall();
    
    t.equal(options.name, 'menu');
    t.end();
});
