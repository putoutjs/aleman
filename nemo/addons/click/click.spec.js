import {test, stub} from 'supertape';
import {filter, listener} from './click.js';
import {createState, updateState} from '../../state/state.js';

const noop = () => {};
const menu = {
    Upload: noop,
    New: {
        File: noop,
    },
};

for (const command of ['hide', 'show']) {
    for (const [path, expected] of [
        ['', true],
        ['Upload', command === 'show'],
        ['New.File', command === 'show'],
        ['New', false],
    ]) {
        test(`nemo: click: filter: ${command}: ${path || 'outside'}`, (t) => {
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

test('nemo: click: clears selection and hides open submenu', (t) => {
    const state = createState({menu});
    state.command = 'show';
    updateState('down', state, {count: 2});
    updateState('right', state);
    
    const result = listener({state, options: {}});
    const expected = {
        ...createState({menu}),
        command: 'hide',
        show: false,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('nemo: click: beforeHide receives existing state before clearing', (t) => {
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
    
    listener({state, options: {beforeHide}});
    
    t.deepEqual(calls, [{
        sameState: true,
        state: expected,
    }]);
    t.end();
});

