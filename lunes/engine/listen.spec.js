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
    
    const actions = [{
        keys: ['ArrowUp'],
        preventDefault: true,
        operations: ['prev'],
    }];
    
    const loop = async () => {
        for await (const [operations] of listen(actions, overrides)) {
            result.push(operations);
            
            if (operations.includes('prev'))
                break;
        }
    };
    
    const timeout = () => {
        fn({
            key: 'ArrowUp',
            preventDefault: stub(),
        });
    };
    
    await Promise.all([
        loop(),
        timeout(),
    ]);
    
    const expected = [
        ['prev'],
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('listen: for-of: preventDefault', async (t) => {
    let fn;
    
    const addEventListener = (event, f) => {
        fn = f;
    };
    
    const removeEventListener = stub();
    
    const overrides = {
        addEventListener,
        removeEventListener,
    };
    
    const actions = [{
        keys: ['ArrowUp'],
        preventDefault: true,
        operations: ['prev'],
    }];
    
    const loop = async () => {
        for await (const [operations] of listen(actions, overrides)) {
            if (operations.includes('prev'))
                break;
        }
    };
    
    const preventDefault = stub();
    
    const timeout = () => fn({
        key: 'ArrowUp',
        preventDefault,
    });
    
    await Promise.all([
        loop(),
        timeout(),
    ]);
    
    t.calledWithNoArgs(preventDefault);
    t.end();
});

test('listen: for-of: preventDefault: no', async (t) => {
    let fn;
    
    const addEventListener = (event, f) => {
        fn = f;
    };
    
    const removeEventListener = stub();
    
    const overrides = {
        addEventListener,
        removeEventListener,
    };
    
    const actions = [{
        keys: ['ArrowUp'],
        operations: ['prev'],
    }];
    
    const loop = async () => {
        for await (const [operations] of listen(actions, overrides)) {
            if (operations.includes('prev'))
                break;
        }
    };
    
    const preventDefault = stub();
    
    const timeout = () => {
        fn({
            key: 'ArrowUp',
            preventDefault,
        });
    };
    
    await Promise.all([
        loop(),
        timeout(),
    ]);
    
    t.notCalled(preventDefault);
    t.end();
});
