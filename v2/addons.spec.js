import {test, stub} from 'supertape';
import {wireAddons} from './addons.js';
import {createStore} from './state.js';

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

const createElement = (children = {}) => ({
    querySelector: (selector) => children[selector],
});

const start = ({addons, commands = {}, state = {}, options = {}, vim, element, document}) => {
    const store = createStore(state);
    
    wireAddons(addons, {
        store,
        commands,
        options,
        vim,
        element,
        document,
    });
    
    return store;
};

test('v2: addons: key: runs command', (t) => {
    const document = createTarget();
    const store = start({
        addons: [{
            keys: ['j'],
            command: 'down',
        }],
        commands: {
            down: (state) => ({
                ...state,
                index: state.index + 1,
            }),
        },
        state: {
            index: 0,
        },
        element: createElement(),
        document,
    });
    
    document.dispatch({
        key: 'j',
    });
    
    const result = store.getState().index;
    
    t.equal(result, 1);
    t.end();
});

test('v2: addons: key: other key ignored', (t) => {
    const document = createTarget();
    const store = start({
        addons: [{
            keys: ['j'],
            command: 'down',
        }],
        commands: {
            down: (state) => ({
                ...state,
                index: state.index + 1,
            }),
        },
        state: {
            index: 0,
        },
        element: createElement(),
        document,
    });
    
    document.dispatch({
        key: 'k',
    });
    
    const result = store.getState().index;
    
    t.equal(result, 0);
    t.end();
});

test('v2: addons: no keys: runs on any key', (t) => {
    const document = createTarget();
    const store = start({
        addons: [{
            command: 'down',
        }],
        commands: {
            down: (state) => ({
                ...state,
                index: state.index + 1,
            }),
        },
        state: {
            index: 0,
        },
        element: createElement(),
        document,
    });
    
    document.dispatch({
        key: 'x',
    });
    
    const result = store.getState().index;
    
    t.equal(result, 1);
    t.end();
});

test('v2: addons: vim: matching command runs', (t) => {
    const document = createTarget();
    const store = start({
        addons: [{
            vim: 'gg',
            command: 'gg',
        }],
        commands: {
            gg: (state) => ({
                ...state,
                index: 0,
            }),
        },
        state: {
            index: 3,
        },
        vim: stub().returns(['gg']),
        element: createElement(),
        document,
    });
    
    document.dispatch({
        key: 'g',
    });
    
    const result = store.getState().index;
    
    t.equal(result, 0);
    t.end();
});

test('v2: addons: vim: other command ignored', (t) => {
    const document = createTarget();
    const vim = stub().returns(['']);
    
    const store = start({
        addons: [{
            vim: 'gg',
            command: 'gg',
        }],
        commands: {
            gg: (state) => ({
                ...state,
                index: 0,
            }),
        },
        state: {
            index: 3,
        },
        vim,
        element: createElement(),
        document,
    });
    
    document.dispatch({
        key: 'g',
    });
    
    const result = [vim.callCount, store.getState().index];
    const expected = [1, 3];
    
    t.deepEqual(result, expected);
    t.end();
});

test('v2: addons: filter: true runs command', (t) => {
    const document = createTarget();
    const store = start({
        addons: [{
            filter: () => true,
            command: 'esc',
        }],
        commands: {
            esc: (state) => ({
                ...state,
                show: false,
            }),
        },
        state: {
            show: true,
        },
        element: createElement(),
        document,
    });
    
    document.dispatch({
        key: 'Escape',
    });
    
    const result = store.getState().show;
    
    t.notOk(result);
    t.end();
});

test('v2: addons: filter: false skips command', (t) => {
    const document = createTarget();
    const store = start({
        addons: [{
            filter: () => false,
            command: 'esc',
        }],
        commands: {
            esc: (state) => ({
                ...state,
                show: false,
            }),
        },
        state: {
            show: true,
        },
        element: createElement(),
        document,
    });
    
    document.dispatch({
        key: 'Escape',
    });
    
    const result = store.getState().show;
    
    t.ok(result);
    t.end();
});

test('v2: addons: unknown command: ignored', (t) => {
    const document = createTarget();
    const store = start({
        addons: [{
            keys: ['j'],
            command: 'unknown',
        }],
        commands: {},
        state: {
            index: 0,
        },
        element: createElement(),
        document,
    });
    
    document.dispatch({
        key: 'j',
    });
    
    const result = store.getState().index;
    
    t.equal(result, 0);
    t.end();
});

test('v2: addons: command: gets state', (t) => {
    const document = createTarget();
    const command = stub((state) => ({
        ...state,
        index: 1,
    }));
    
    start({
        addons: [{
            keys: ['j'],
            command: 'down',
        }],
        commands: {
            down: command,
        },
        state: {
            index: 0,
        },
        element: createElement(),
        document,
    });
    
    document.dispatch({
        key: 'j',
    });
    
    const expected = {
        index: 0,
    };
    
    const [result] = command.args[0];
    
    t.deepEqual(result, expected);
    t.end();
});

test('v2: addons: command: gets options', (t) => {
    const document = createTarget();
    const command = stub((state) => state);
    
    const options = {
        infiniteScroll: true,
    };
    
    start({
        addons: [{
            keys: ['j'],
            command: 'down',
        }],
        commands: {
            down: command,
        },
        options,
        state: {},
        element: createElement(),
        document,
    });
    
    document.dispatch({
        key: 'j',
    });
    
    const [, result] = command.args[0];
    
    t.deepEqual(result, options);
    t.end();
});

test('v2: addons: named: dispatches to element', (t) => {
    const document = createTarget();
    const target = createTarget();
    
    const element = createElement({
        '[data-name="menu"]': target,
    });
    
    const store = start({
        addons: [{
            name: 'menu',
            event: 'click',
            command: 'hide',
        }],
        commands: {
            hide: (state) => ({
                ...state,
                show: false,
            }),
        },
        state: {
            show: true,
        },
        element,
        document,
    });
    
    target.dispatch({}, 'click');
    
    const result = store.getState().show;
    
    t.notOk(result);
    t.end();
});

test('v2: addons: named: missing element: no crash', (t) => {
    const document = createTarget();
    const element = createElement();
    
    const addons = [{
        name: 'menu',
        command: 'hide',
    }];
    
    const result = () => start({
        addons,
        commands: {
            hide: (state) => state,
        },
        state: {},
        element,
        document,
    });
    
    t.notOk(result().called);
    t.end();
});

test('v2: addons: custom event', (t) => {
    const document = createTarget();
    const store = start({
        addons: [{
            event: 'contextmenu',
            command: 'show',
        }],
        commands: {
            show: (state) => ({
                ...state,
                show: true,
            }),
        },
        state: {
            show: false,
        },
        element: createElement(),
        document,
    });
    
    document.dispatch({}, 'contextmenu');
    
    const result = store.getState().show;
    
    t.ok(result);
    t.end();
});

test('v2: addons: keydown does not fire custom event addon', (t) => {
    const document = createTarget();
    const store = start({
        addons: [{
            event: 'contextmenu',
            command: 'show',
        }],
        commands: {
            show: (state) => ({
                ...state,
                show: true,
            }),
        },
        state: {
            show: false,
        },
        element: createElement(),
        document,
    });
    
    document.dispatch({
        key: 'j',
    });
    
    const result = store.getState().show;
    
    t.notOk(result);
    t.end();
});

test('v2: addons: events: attaches every event', (t) => {
    const document = createTarget();
    const store = start({
        addons: [{
            events: ['keydown', 'click'],
            command: 'down',
        }],
        commands: {
            down: (state) => ({
                ...state,
                index: state.index + 1,
            }),
        },
        state: {
            index: 0,
        },
        element: createElement(),
        document,
    });
    
    document.dispatch({}, 'click');
    
    const result = store.getState().index;
    
    t.equal(result, 1);
    t.end();
});
