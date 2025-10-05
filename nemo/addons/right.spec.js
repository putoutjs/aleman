import {test} from 'supertape';
import {filter} from './right.js';

const noop = () => {};

test('aleman: menu: addons: right', (t) => {
    const state = {
        index: 0,
    };
    
    const options = {
        menu: {
            hello: {
                world: noop,
            },
        },
    };
    
    const result = filter({
        state,
        options,
    });
    
    t.ok(result);
    t.end();
});

test('aleman: menu: addons: right: filter: no', (t) => {
    const state = {
        index: 1,
    };
    
    const options = {
        menu: {
            hello: {
                world: noop,
            },
        },
    };
    
    const result = filter({
        state,
        options,
    });
    
    t.notOk(result);
    t.end();
});
