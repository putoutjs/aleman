import {test} from 'supertape';
import {createVim} from './vim.js';

test('aleman: menu: addons: vim', (t) => {
    const {listener} = createVim();
    const state = {};
    const options = {};
    
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
