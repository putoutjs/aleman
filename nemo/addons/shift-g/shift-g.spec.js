import {test} from 'supertape';
import {montag} from 'montag';
import {listener, filter} from './shift-g.js';
import {printState} from '../../state/print-state.js';
import {parseState} from '../../state/parse-state.js';

test('nemo: addons: shift-g', (t) => {
    const from = montag`
        +Hello
        -World
    `;
    
    const to = montag`
        -Hello
        +World
    `;
    
    const state = parseState(from);
    const result = listener({state});
    
    t.equal(printState(result), to);
    t.end();
});

test('nemo: addons: shift-g: no selection', (t) => {
    const from = montag`
        -Hello
        -World
    `;
    
    const to = montag`
        -Hello
        +World
    `;
    
    const state = parseState(from);
    const result = listener({state});
    
    t.equal(printState(result), to);
    t.end();
});

test('nemo: addons: shift-g: submenu', (t) => {
    const from = montag`
        -Hello
        +ABC>
            -A
            -B
    `;
    
    const to = montag`
        -Hello
        +ABC*
    `;
    
    const state = parseState(from);
    const result = listener({state});
    
    t.equal(printState(result), to);
    t.end();
});

test('nemo: addons: shift-g: filter: show', (t) => {
    const result = filter({state: {command: 'show'}});
    
    t.ok(result);
    t.end();
});

test('nemo: addons: shift-g: filter: hide', (t) => {
    const result = filter({state: {command: 'hide'}});
    
    t.notOk(result);
    t.end();
});
