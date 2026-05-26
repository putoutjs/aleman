import {stub, test} from 'supertape';
import {listen} from './listen.js';

test('listen: for-of', async (t) => {
    const result = [];
    let fn;
    
    const addEventListener = (event, f) => {
        fn = f;
    };
    
    const removeEventListener = stub();
    
    const overrides = {
        addEventListener,
        removeEventListener,
    };
    
    const loop = async () => {
        for await (const a of listen(['click'], overrides)) {
            result.push(a);
            
            if (a === 'click')
                break;
        }
    };
    
    const timeout = () => {
        fn({
            name: 'click',
        });
    };
    
    await Promise.all([
        loop(),
        timeout(),
    ]);
    
    const expected = ['click'];
    
    t.deepEqual(result, expected);
    t.end();
});
