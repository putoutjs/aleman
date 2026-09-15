import {test} from 'supertape';
import {montag} from 'montag';
import {listener, filter} from './j.js';
import {printState} from '../../state/print-state.js';
import {parseState} from '../../state/parse-state.js';

test('nemo: addons: j', (t) => {
    const from = montag`
        +Hello
        -World
    `;
    
    const to = montag`
        -Hello
        +World
    `;
    
    const state = parseState(from);
    const result = listener({count: 1, state});
    
    t.equal(printState(result), to);
    t.end();
});

test('nemo: addons: j: no selection', (t) => {
    const from = montag`
        -Hello
        -World
    `;
    
    const to = montag`
        +Hello
        -World
    `;
    
    const state = parseState(from);
    const result = listener({count: 1, state});
    
    t.equal(printState(result), to);
    t.end();
});

test('nemo: addons: j: count', (t) => {
    const from = montag`
        +Hello
        -World
        -ABC
    `;
    
    const to = montag`
        -Hello
        -World
        +ABC
    `;
    
    const state = parseState(from);
    const result = listener({count: 2, state});
    
    t.equal(printState(result), to);
    t.end();
});

test('nemo: addons: j: last', (t) => {
    const from = montag`
        -Hello
        +World
    `;
    
    const to = montag`
        -Hello
        +World
    `;
    
    const state = parseState(from);
    const result = listener({count: 1, state});
    
    t.equal(printState(result), to);
    t.end();
});

test('nemo: addons: j: infiniteScroll', (t) => {
    const from = montag`
        -Hello
        +World
    `;
    
    const to = montag`
        +Hello
        -World
    `;
    
    const state = {
        ...parseState(from),
        infiniteScroll: true,
    };
    const result = listener({count: 1, state});
    
    t.equal(printState(result), to);
    t.end();
});

test('nemo: addons: j: filter: show', (t) => {
    const result = filter({state: {show: true}});
    
    t.ok(result);
    t.end();
});

test('nemo: addons: j: filter: hidden', (t) => {
    const result = filter({state: {show: false}});
    
    t.notOk(result);
    t.end();
});
