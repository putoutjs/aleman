import {test} from 'supertape';
import {createMenu} from './menos.js';

const noop = () => {};

const menu = {
    hello: noop,
    world: noop,
    new: {
        file: noop,
        directory: noop,
    },
};

const createElementNode = () => ({
    dataset: {},
    classList: {
        add: noop,
    },
    style: {},
    _html: '',
    querySelector: () => null,
    get innerHTML() {
        return this._html;
    },
    set innerHTML(value) {
        this._html = value;
    },
    append: noop,
});

const createDocument = () => ({
    addEventListener: noop,
    querySelector: () => null,
    createElement: createElementNode,
    body: {
        append: noop,
    },
    head: {
        append: noop,
    },
});

const start = (overrides = {}) => {
    globalThis.document = createDocument();
    
    return createMenu('menu', {
        menu,
        ...overrides,
    });
};

test('menos: createMenu: returns menu with show', async (t) => {
    const component = await start();
    const result = typeof component.show;
    const expected = 'function';
    
    t.equal(result, expected);
    t.end();
});

test('menos: createMenu: returns menu with hide', async (t) => {
    const component = await start();
    const result = typeof component.hide;
    const expected = 'function';
    
    t.equal(result, expected);
    t.end();
});

test('menos: createMenu: state: selects no item', async (t) => {
    const component = await start();
    
    t.equal(component.getState().index, -1);
    t.end();
});

test('menos: createMenu: state: builds menu items', async (t) => {
    const component = await start();
    const result = [];
    
    for (const {name: itemName} of component.getState().items) {
        result.push(itemName);
    }
    
    const expected = [
        'hello',
        'world',
        'new',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: createMenu: state: builds submenu', async (t) => {
    const component = await start();
    const result = [];
    
    for (const {name: itemName} of component.getState().items[2].submenu.items) {
        result.push(itemName);
    }
    
    const expected = [
        'file',
        'directory',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: createMenu: show: sets position', async (t) => {
    const component = await start();
    
    component.show(10, 20);
    
    const result = [
        component.getState().x,
        component.getState().y,
    ];
    
    const expected = [10, 20];
    
    t.deepEqual(result, expected);
    t.end();
});

test('menos: createMenu: show: sets show', async (t) => {
    const component = await start();
    
    component.show(10, 20);
    const {show} = component.getState();
    
    t.ok(show);
    t.end();
});

test('menos: createMenu: show: sets command', async (t) => {
    const component = await start();
    
    component.show(10, 20);
    
    t.equal(component.getState().command, 'show');
    t.end();
});

test('menos: createMenu: hide: hides menu', async (t) => {
    const component = await start();
    
    component.hide();
    const {show} = component.getState();
    
    t.notOk(show);
    t.end();
});

test('menos: createMenu: options: infiniteScroll', async (t) => {
    const component = await start({
        infiniteScroll: true,
    });
    
    const {infiniteScroll} = component.getState();
    
    t.ok(infiniteScroll);
    t.end();
});

test('menos: createMenu: state element: keeps state', async (t) => {
    const component = await start();
    
    component.setState({
        index: 2,
    });
    
    t.equal(component.getState().index, 2);
    t.end();
});
