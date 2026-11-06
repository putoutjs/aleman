import {test} from 'supertape';
import {importmap} from './importmap.js';

test('lunes: importmap: imports putout, jessy and fullstore', (t) => {
    const result = Object.keys(importmap.imports);
    const expected = [
        'putout',
        '@putout/processor-html',
        'fullstore',
        'jessy',
        '#aleman',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});
