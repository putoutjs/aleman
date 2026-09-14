import {test} from 'supertape';
import {montag} from 'montag';
import {parseState} from './parse-state.js';
import {printState} from './print-state.js';

test('state: parseState: submenu round-trip', (t) => {
    const source = montag`
        -Hello
        -World>
            +File
            -Dir
    `;
    t.equal(printState(parseState(source)), source);
    t.end();
});
