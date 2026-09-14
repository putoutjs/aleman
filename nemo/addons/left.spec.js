import {test} from 'supertape';
import {listener} from './left.js';

test('nemo: addons: left', (t) => {
    const result = listener();
    const expected = {
        insideSubmenu: false,
        showSubmenu: false,
        submenuIndex: -1,
    };
    
    t.deepEqual(result, expected);
    t.end();
});
