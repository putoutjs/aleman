import {test} from 'supertape';
import {montag} from 'montag';
import {printState} from '../state/print-state.js';
import {parseState} from '../state/parse-state.js';
import {updateState} from '../state/state.js';
import {listener} from './left.js';

test('nemo: addons: left', (t) => {
    const from = montag`
        -Hello
        +World>
    `;
    
    const to = montag`
        -Hello
        +World*
    `;
    
    const state = parseState(from);
    const result = listener({
        state,
        options: {},
    });
    
    t.equal(printState(result), to);
    t.end();
});

test('nemo: addons: left: leaf', (t) => {
    const from = montag`
        -Hello
        +World
    `;
    
    const state = parseState(from);
    const result = listener({
        state,
        options: {},
    });
    
    t.equal(printState(result), from);
    t.end();
});

test('nemo: addons: left: insideSubmenu', (t) => {
    const state = parseState('+World*');
    const result = listener({
        state,
        options: {},
    });
    
    t.notOk(result.insideSubmenu);
    t.end();
});

test('nemo: addons: left: submenuIndex', (t) => {
    const state = parseState('+World*');
    const result = listener({
        state,
        options: {},
    });
    
    t.equal(result.submenuIndex, -1);
    t.end();
});

test('nemo: addons: left: updateState parity', (t) => {
    const from = montag`
        -Hello
        +World>
    `;
    
    const viaAddon = listener({
        state: parseState(from),
        options: {},
    });
    const viaCommand = updateState('left', parseState(from));
    const result = printState(viaAddon);
    const expected = printState(viaCommand);
    
    t.equal(result, expected);
    t.end();
});
