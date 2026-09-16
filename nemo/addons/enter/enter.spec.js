import {setTimeout} from 'node:timers/promises';
import {test, stub} from 'supertape';
import {filter, listener} from './enter.js';
import {createState, updateState} from '../../state/state.js';

const noop = () => {};
const menu = {
    Upload: noop,
    New: {
        File: noop,
    },
};

for (const command of ['hide', 'show']) {
    for (const count of [1, 2]) {
        test(`nemo: enter: filter: ${command}: item ${count}`, (t) => {
            const state = createState({menu});
            updateState('down', state, {count});
            state.command = command;
            state.show = command === 'show';
            
            const result = filter({state});
            
            t.equal(result, command === 'show');
            t.end();
        });
    }
}

test('nemo: enter: submenu name opens submenu and returns full state', (t) => {
    const state = createState({menu});
    state.command = 'show';
    updateState('down', state, {count: 2});
    
    const expected = structuredClone(state);
    
    expected.items[1].submenu.show = true;
    expected.insideSubmenu = true;
    expected.submenuIndex = 0;
    
    const result = listener({state, options: {menu}});
    
    t.deepEqual(result, expected);
    t.end();
});

test('nemo: enter: opening submenu does not call beforeHide', (t) => {
    const state = createState({menu});
    updateState('down', state, {count: 2});
    const beforeHide = stub();
    
    listener({state, options: {menu, beforeHide}});
    
    t.notCalled(beforeHide);
    t.end();
});

for (const submenu of [false, true]) {
    test(`nemo: enter: callback once with no arguments: submenu ${submenu}`, async (t) => {
        const fn = stub();
        const menu = submenu ? {New: {File: fn}} : {Upload: fn};
        const state = createState({menu});
        
        updateState('down', state);
        
        if (submenu)
            updateState('right', state);
        
        listener({state, options: {menu}});
        await setTimeout(0);
        
        t.deepEqual(fn.args, [[]]);
        t.end();
    });
    
    test(`nemo: enter: clears selection and hides: submenu ${submenu}`, async (t) => {
        const state = createState({menu});
        state.command = 'show';
        updateState('down', state, {count: submenu ? 2 : 1});
        
        if (submenu)
            updateState('right', state);
        
        const result = listener({state, options: {menu}});
        const expected = {
            ...createState({menu}),
            command: 'hide',
            show: false,
        };
        await setTimeout(0);
        
        t.deepEqual(result, expected);
        t.end();
    });
}

test('nemo: enter: beforeHide receives existing state before clearing', async (t) => {
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
    
    listener({state, options: {menu, beforeHide}});
    await setTimeout(0);
    
    t.deepEqual(calls, [{
        sameState: true,
        state: expected,
    }]);
    t.end();
});

