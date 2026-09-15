import {test} from 'supertape';
import {montag} from 'montag';
import {listener} from './escape.js';
import {printState} from '../../state/print-state.js';
import {parseState} from '../../state/parse-state.js';

test('nemo: addons: escape', (t) => {
    const from = montag`
        -Hello
        +World
    `;
    
    const to = montag`
        -Hello
        -World
    `;
    
    const state = parseState(from);
    const result = listener({state});
    
    t.equal(printState(result), to);
    t.end();
});

test('nemo: addons: escape: submenu', (t) => {
    const from = montag`
        -Hello
        +ABC*
            +A
            -B
    `;
    
    const to = montag`
        -Hello
        -ABC*
    `;
    
    const state = parseState(from);
    const result = listener({state});
    
    t.equal(printState(result), to);
    t.end();
});

test('nemo: addons: escape: show false', (t) => {
    const from = montag`
        -Hello
        +World
    `;
    
    const state = parseState(from);
    const result = listener({state});
    
    t.equal(result.show, false);
    t.end();
});

test('nemo: addons: escape: command hide', (t) => {
    const from = montag`
        -Hello
        +World
    `;
    
    const state = parseState(from);
    const result = listener({state});
    
    t.equal(result.command, 'hide');
    t.end();
});
