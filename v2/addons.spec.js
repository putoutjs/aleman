import {test} from 'supertape';
import {createStore} from './state.js';
import {createVimParser} from '../aleman/vim.js';
import {wireAddons} from './addons.js';

const createTarget = () => {
    const listeners = {};
    
    return {
        addEventListener: (event, fn) => {
            listeners[event] = listeners[event] || [];
            listeners[event].push(fn);
        },
        dispatch: (event, type = 'keydown') => {
            for (const listener of listeners[type] || [])
                listener(event);
        },
    };
};

const down = (state) => ({
    ...state,
    index: state.index + 1,
});

const commands = {
    down,
};

const wire = (addons, overrides = {}) => {
    const store = createStore({
        index: -1,
    });
    const document = createTarget();
    const element = createTarget();
    
    wireAddons(addons, {
        store,
        commands,
        options: {},
        vim: createVimParser(),
        document,
        element,
        ...overrides,
    });
    
    return {
        store,
        document,
        element,
    };
};

test('v2: addons: key triggers command', (t) => {
    const {store, document} = wire([{
        keys: ['ArrowDown'],
        command: 'down',
    }]);
    
    document.dispatch({
        key: 'ArrowDown',
    });
    
    t.equal(store.getState().index, 0);
    t.end();
});

test('v2: addons: key not listed: ignored', (t) => {
    const {store, document} = wire([{
        keys: ['ArrowDown'],
        command: 'down',
    }]);
    
    document.dispatch({
        key: 'ArrowUp',
    });
    
    t.equal(store.getState().index, -1);
    t.end();
});

test('v2: addons: no keys: any key triggers', (t) => {
    const {store, document} = wire([{
        command: 'down',
    }]);
    
    document.dispatch({
        key: 'x',
    });
    
    t.equal(store.getState().index, 0);
    t.end();
});

test('v2: addons: vim: match runs command', (t) => {
    const {store, document} = wire([{
        keys: ['g'],
        vim: 'gg',
        command: 'down',
    }]);
    
    document.dispatch({
        key: 'g',
    });
    document.dispatch({
        key: 'g',
    });
    
    t.equal(store.getState().index, 0);
    t.end();
});

test('v2: addons: vim: mismatch ignored', (t) => {
    const {store, document} = wire([{
        keys: ['g'],
        vim: 'gg',
        command: 'down',
    }]);
    
    document.dispatch({
        key: 'g',
    });
    
    t.equal(store.getState().index, -1);
    t.end();
});

test('v2: addons: filter: false ignored', (t) => {
    const {store, document} = wire([{
        command: 'down',
        filter: () => false,
    }]);
    
    document.dispatch({
        key: 'ArrowDown',
    });
    
    t.equal(store.getState().index, -1);
    t.end();
});

test('v2: addons: filter: true runs', (t) => {
    const {store, document} = wire([{
        command: 'down',
        filter: () => true,
    }]);
    
    document.dispatch({
        key: 'ArrowDown',
    });
    
    t.equal(store.getState().index, 0);
    t.end();
});

test('v2: addons: unknown command: ignored', (t) => {
    const {store, document} = wire([{
        command: 'nope',
    }]);
    
    document.dispatch({
        key: 'ArrowDown',
    });
    
    t.equal(store.getState().index, -1);
    t.end();
});

test('v2: addons: command receives state and options', (t) => {
    const calls = [];
    const {document} = wire([{
        command: 'down',
    }], {
        commands: {
            down: (state, options) => {
                calls.push({
                    state,
                    options,
                });
                
                return state;
            },
        },
        options: {
            name: 'menu',
        },
    });
    
    document.dispatch({
        key: 'ArrowDown',
    });
    const result = calls;
    const expected = [{
        state: {
            index: -1,
        },
        options: {
            name: 'menu',
        },
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('v2: addons: named: child runs command', (t) => {
    const child = createTarget();
    const element = {
        querySelector: (selector) => selector === '[data-name="menu"]' ? child : null,
    };
    
    const {store, document} = wire([{
        name: 'menu',
        command: 'down',
    }], {
        element,
    });
    
    document.dispatch({
        key: 'ArrowDown',
    });
    
    t.equal(store.getState().index, -1);
    t.end();
});

test('v2: addons: named: child dispatch runs', (t) => {
    const child = createTarget();
    const element = {
        querySelector: (selector) => selector === '[data-name="menu"]' ? child : null,
    };
    
    const {store} = wire([{
        name: 'menu',
        command: 'down',
    }], {
        element,
    });
    
    child.dispatch({
        key: 'ArrowDown',
    });
    
    t.equal(store.getState().index, 0);
    t.end();
});

test('v2: addons: named: missing child: no crash', (t) => {
    const element = {
        querySelector: () => null,
    };
    
    const {store} = wire([{
        name: 'nope',
        command: 'down',
    }], {
        element,
    });
    
    t.equal(store.getState().index, -1);
    t.end();
});

test('v2: addons: custom event: runs on click', (t) => {
    const child = createTarget();
    const element = {
        querySelector: () => child,
    };
    
    const {store} = wire([{
        name: 'menu',
        event: 'click',
        command: 'down',
    }], {
        element,
    });
    
    child.dispatch({}, 'click');
    
    t.equal(store.getState().index, 0);
    t.end();
});

test('v2: addons: custom event: keydown ignored', (t) => {
    const child = createTarget();
    const element = {
        querySelector: () => child,
    };
    
    const {store} = wire([{
        name: 'menu',
        event: 'click',
        command: 'down',
    }], {
        element,
    });
    
    child.dispatch({
        key: 'ArrowDown',
    });
    
    t.equal(store.getState().index, -1);
    t.end();
});
