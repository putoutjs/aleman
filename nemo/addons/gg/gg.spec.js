import {test} from 'supertape';
import {montag} from 'montag';
import {listener} from './gg.js';
import {printState} from '../../state/print-state.js';
import {parseState} from '../../state/parse-state.js';

test('nemo: addons: gg', (t) => {
    const from = montag`
        -Hello
        +World
    `;
    
    const to = montag`
        +Hello
        -World
    `;
    
    const state = parseState(from);
    const result = listener({state});
    
    t.equal(printState(result), to);
    t.end();
});

test('nemo: addons: gg: no selection', (t) => {
    const from = montag`
        -Hello
        -World
    `;
    
    const to = montag`
        +Hello
        -World
    `;
    
    const state = parseState(from);
    const result = listener({state});
    
    t.equal(printState(result), to);
    t.end();
});

test('nemo: addons: gg: submenu', (t) => {
    const from = montag`
        -Hello
        +ABC>
            -A
            -B
    `;
    
    const to = montag`
        +Hello
        -ABC*
    `;
    
    const state = parseState(from);
    const result = listener({state});
    
    t.equal(printState(result), to);
    t.end();
});
