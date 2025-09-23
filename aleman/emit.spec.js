import {test, stub} from 'supertape';
import {emit} from './emit.js';

test('aleman: emit', (t) => {
    const parseVim = stub().returns([]);
    const addon = {
        listener: ({state}) => ({
            index: state.index + 1,
        }),
    };
    
    const result = emit(addon, {
        state: {
            index: 0,
        },
        parseVim,
    });
    
    const expected = {
        index: 1,
    };
    
    t.deepEqual(result, expected);
    t.end();
});
