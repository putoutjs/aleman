import {setTimeout} from 'node:timers/promises';
import {test, stub} from 'supertape';
import {createItemClick} from './item-click.js';
import {createState, updateState} from '../../state/state.js';
import {emit} from '../../../aleman/emit.js';
import {createVimParser} from '../../../aleman/vim.js';

const noop = () => {};
const addon = createItemClick('menu');
const {filter, listener} = addon;
const menu = {
    View: noop,
    Upload: {
        drive: noop,
    },
};

for (const command of ['hide', 'show']) {
    for (const [path, expected] of [
        ['View', true],
        ['Upload.drive', true],
        ['Upload', false],
    ]) {
        test(`nemo: item-click: filter: ${command}: ${path}`, (t) => {
            const state = createState({menu});
            state.command = command;
            state.show = command === 'show';
            const getMenuPath = stub().returns(path);
            const result = filter({
                event: {},
                state,
                options: {
                    menu,
                    getMenuPath,
                },
            });
            
            t.equal(result, expected);
            t.end();
        });
    }
}

test('nemo: item-click: keydown leaves state unchanged', (t) => {
    const state = createState({menu});
    updateState('down', state);
    
    const expected = structuredClone(state);
    const result = emit(addon, {
        event: {type: 'keydown'},
        parseVim: createVimParser(),
        state,
        options: {
            menu,
            getMenuPath: stub().returns('View'),
        },
    });
    
    t.deepEqual(result, expected);
    t.end();
});

for (const path of ['View', 'Upload.drive']) {
    test(`nemo: item-click: callback once with no arguments: ${path}`, async (t) => {
        const fn = stub();
        const menu = {
            View: path === 'View' ? fn : noop,
            Upload: {
                drive: path === 'Upload.drive' ? fn : noop,
            },
        };
        const state = createState({menu});
        
        updateState('down', state);
        
        listener({
            event: {},
            state,
            options: {
                menu,
                getMenuPath: stub().returns(path),
            },
        });
        await setTimeout(0);
        
        t.deepEqual(fn.args, [[]]);
        t.end();
    });
}

test('nemo: item-click: clears selection and hides open submenu', async (t) => {
    const state = createState({menu});
    state.command = 'show';
    updateState('down', state, {count: 2});
    updateState('right', state);
    
    const result = listener({
        event: {},
        state,
        options: {
            menu,
            getMenuPath: stub().returns('Upload.drive'),
        },
    });
    const expected = {
        ...createState({menu}),
        command: 'hide',
        show: false,
    };
    await setTimeout(0);
    
    t.deepEqual(result, expected);
    t.end();
});

test('nemo: item-click: beforeHide receives existing state before clearing', async (t) => {
    const state = createState({menu});
    state.command = 'show';
    updateState('down', state, {count: 2});
    updateState('right', state);
    
    const expected = structuredClone(state);
    const calls = [];
    const beforeHide = stub((current) => {
        calls.push({
            sameState: current === state,
            state: structuredClone(current),
        });
    });
    
    listener({
        event: {},
        state,
        options: {
            menu,
            beforeHide,
            getMenuPath: stub().returns('Upload.drive'),
        },
    });
    await setTimeout(0);
    
    t.deepEqual(calls, [{
        sameState: true,
        state: expected,
    }]);
    t.end();
});

