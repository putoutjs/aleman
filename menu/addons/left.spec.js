import {test} from 'supertape';
import {listener, filter} from './left.js';

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

test('aleman: menu: addons: left: filter: hide', (t) => {
    const result = filter({
        state: {
            command: 'hide',
        },
    });
    
    t.notOk(result);
    t.end();
});

test('aleman: menu: addons: left: filter: show', (t) => {
    const result = filter({
        state: {
            command: 'show',
        },
    });
    
    t.ok(result);
    t.end();
});
