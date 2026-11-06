import {test} from 'supertape';
import {installDocument} from './fixture/fake-dom.js';
import {
    findByName,
    createHydrate,
    addStyleText,
    addStyleLink,
} from './dom.js';

test('lunes: dom: findByName: nothing', (t) => {
    const {uninstall} = installDocument();
    
    const result = findByName('hello');
    
    uninstall();
    
    t.notOk(result);
    t.end();
});

test('lunes: dom: createHydrate: creates the section with hidden ul', (t) => {
    const {uninstall, document} = installDocument();
    
    const section = createHydrate('menu');
    
    uninstall();
    
    const result = {
        name: section.dataset.name,
        html: section.innerHTML,
        inBody: document.elements.includes(section),
    };
    const expected = {
        name: 'aleman-hydrate-menu',
        html: '<ul data-name="menu" class="menu menu-hidden"></ul>',
        inBody: true,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('lunes: dom: createHydrate: reuses the existing element', (t) => {
    const {uninstall} = installDocument();
    
    const first = createHydrate('menu');
    
    first.dataset.name = 'menu';
    
    const second = createHydrate('menu');
    
    uninstall();
    
    t.equal(second, first);
    t.end();
});

test('lunes: dom: addStyleText: adds one style', (t) => {
    const {uninstall, document} = installDocument();
    
    addStyleText('.menu {}');
    addStyleText('.menu {}');
    
    uninstall();
    const result = [];
    
    for (const {textContent} of document.elements) {
        result.push(textContent);
    }
    
    const expected = ['.menu {}'];
    
    t.deepEqual(result, expected);
    t.end();
});

test('lunes: dom: addStyleLink: adds one link', (t) => {
    const {uninstall, document} = installDocument();
    
    addStyleLink();
    addStyleLink();
    
    const [link] = document.elements;
    
    uninstall();
    
    const result = {
        count: document.elements.length,
        rel: link.rel,
        href: link.href.endsWith('/lunes/menu.css'),
    };
    const expected = {
        count: 1,
        rel: 'stylesheet',
        href: true,
    };
    
    t.deepEqual(result, expected);
    t.end();
});
