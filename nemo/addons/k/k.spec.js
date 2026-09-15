import {test} from 'supertape';
import {montag} from 'montag';
import {listener} from './k.js';
import {printState} from '../../state/print-state.js';
import {parseState} from '../../state/parse-state.js';

test('nemo: addons: k', (t) => {
    const from = montag`
        -Hello
        +World
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

test('nemo: addons: k: count', (t) => {
    const from = montag`
        -Hello
        -World
        +ABC
    `;
    
    const to = montag`
        +Hello
        -World
        -ABC
    `;
    
    const state = parseState(from);
    const result = listener({count: 2, state});
    
    t.equal(printState(result), to);
    t.end();
});

test('nemo: addons: k: first', (t) => {
    const from = montag`
        +Hello
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

test('nemo: addons: k: infiniteScroll', (t) => {
    const from = montag`
        +Hello
        -World
    `;
    
    const to = montag`
        -Hello
        +World
    `;
    
    const state = parseState(from);
    const result = listener({count: 1, state, options: {infiniteScroll: true}});
    
    t.equal(printState(result), to);
    t.end();
});
