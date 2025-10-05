import {test} from 'supertape';
import {listener} from './left.js';

test('aleman: menu: addons: left', (t) => {
    const result = listener();
    const expected = {
        insideSubmenu: false,
        showSubmenu: false,
        submenuIndex: -1,
    };
    
    t.deepEqual(result, expected);
    t.end();
});
