import {test} from 'supertape';
import {createVim} from './vim.js';

const noop = () => {};

test('aleman: menu: addons: vim: filter', (t) => {
    const {filter} = createVim();
    const state = {};
    const result = filter({state});
    
    t.notOk(result);
    t.end();
});

test('aleman: menu: addons: vim: filter: show', (t) => {
    const {filter} = createVim();
    const state = {
        command: 'show',
    };
    const result = filter({state});
    
    t.ok(result);
    t.end();
});

test('aleman: menu: addons: vim', (t) => {
    const {listener} = createVim();
    const state = {};
    const options = {
        menu: {},
    };
    
    const event = {
        key: 'x',
    };
    
    const result = listener({
        event,
        state,
        options,
    });
    
    t.notOk(result);
    t.end();
});

test('aleman: menu: addons: vim: j', (t) => {
    const {listener} = createVim();
    const state = {
        index: 0,
        submenuIndex: 0,
    };
    
    const options = {
        menu: {
            hello: noop,
            world: noop,
        },
    };
    
    const result = listener({
        event: {
            key: 'j',
        },
        state,
        options,
    });
    
    const expected = {
        index: 1,
        showSubmenu: false,
        submenuIndex: -1,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('aleman: menu: addons: vim: 1-0 + j', (t) => {
    const {listener} = createVim();
    const state = {
        index: 0,
        submenuIndex: 0,
    };
    
    const options = {
        menu: {
            hello: noop,
            world: noop,
        },
    };
    
    listener({
        event: {
            key: '5',
        },
        state,
        options,
    });
    const result = listener({
        event: {
            key: 'j',
        },
        state,
        options,
    });
    
    const expected = {
        index: 1,
        showSubmenu: false,
        submenuIndex: -1,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('aleman: menu: addons: vim: 1-0 + k', (t) => {
    const {listener} = createVim();
    const state = {
        index: 0,
        submenuIndex: 0,
    };
    
    const options = {
        menu: {
            hello: noop,
            world: noop,
        },
    };
    
    listener({
        event: {
            key: '5',
        },
        state,
        options,
    });
    const result = listener({
        event: {
            key: 'k',
        },
        state,
        options,
    });
    
    const expected = {
        index: 0,
        showSubmenu: false,
        submenuIndex: 0,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('aleman: menu: addons: vim: gg', (t) => {
    const {listener} = createVim();
    const state = {
        submenuIndex: 0,
    };
    
    const options = {
        menu: {},
    };
    
    const event = {
        key: 'g',
    };
    
    listener({
        event,
        state,
        options,
    });
    const result = listener({
        event,
        state,
        options,
    });
    
    const expected = {
        index: 0,
        showSubmenu: false,
        submenuIndex: 0,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('aleman: menu: addons: vim: gg: insideSubmenu', (t) => {
    const {listener} = createVim();
    const state = {
        index: 0,
        submenuIndex: 5,
        insideSubmenu: true,
    };
    
    const options = {
        menu: {},
    };
    
    const event = {
        key: 'g',
    };
    
    listener({
        event,
        state,
        options,
    });
    const result = listener({
        event,
        state,
        options,
    });
    
    const expected = {
        index: 0,
        showSubmenu: false,
        submenuIndex: 0,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('aleman: menu: addons: vim: g, x, g', (t) => {
    const {listener} = createVim();
    const state = {
        submenuIndex: 0,
    };
    
    const options = {
        menu: {},
    };
    
    const event = {
        key: 'g',
    };
    
    listener({
        event,
        state,
        options,
    });
    listener({
        event: {
            key: 'x',
        },
        state,
        options,
    });
    const result = listener({
        event,
        state,
        options,
    });
    
    t.notOk(result);
    t.end();
});

test('aleman: menu: addons: vim: k', (t) => {
    const {listener} = createVim();
    const state = {
        index: 1,
        submenuIndex: 0,
    };
    
    const options = {
        menu: {
            hello: noop,
            world: noop,
        },
    };
    
    const result = listener({
        event: {
            key: 'k',
        },
        state,
        options,
    });
    
    const expected = {
        index: 0,
        showSubmenu: false,
        submenuIndex: 0,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('aleman: menu: addons: vim: k: insideSubmenu', (t) => {
    const {listener} = createVim();
    const state = {
        index: 1,
        submenuIndex: 0,
        insideSubmenu: true,
    };
    
    const options = {
        menu: {
            hello: noop,
            world: noop,
        },
    };
    
    const result = listener({
        event: {
            key: 'k',
        },
        state,
        options,
    });
    
    const expected = {
        index: 1,
        showSubmenu: false,
        submenuIndex: -1,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('aleman: menu: addons: vim: j: insideSubmenu', (t) => {
    const {listener} = createVim();
    const state = {
        index: 1,
        submenuIndex: 0,
        insideSubmenu: true,
    };
    
    const options = {
        menu: {
            hello: noop,
            world: noop,
        },
    };
    
    const result = listener({
        event: {
            key: 'j',
        },
        state,
        options,
    });
    
    const expected = {
        index: 1,
        showSubmenu: false,
        submenuIndex: -1,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

