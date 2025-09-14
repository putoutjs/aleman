import {test} from 'supertape';
import {listener} from './enter.js';

const noop = () => {};

test('aleman: menu: enter: listener: submenu name', (t) => {
    const state = {
        index: 0,
        submenuIndex: -1,
    };
    
    const result = listener({
        state,
        options: {
            menu: {
                hello: {
                    world: noop,
                },
            },
        },
    });
    
    const expected = {
        insideSubmenu: true,
        showSubmenu: true,
        submenuIndex: 0,
    };
    
    t.deepEqual(result, expected);
    t.end();
});
