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

test('listen: queue: events before the consumer keep their operations', async (t) => {
    const handlers = [];
    const overrides = {
        addEventListener: (event, fn) => handlers.push(fn),
        removeEventListener: stub(),
    };
    
    const actions = [{
        keys: ['ArrowDown'],
        operations: ['next'],
    }, {
        keys: ['ArrowUp'],
        operations: ['prev'],
    }];
    
    const iterator = listen(actions, overrides)[Symbol.asyncIterator]();
    const [down, up] = handlers;
    
    down({
        key: 'ArrowDown',
    });
    up({
        key: 'ArrowUp',
    });
    
    const first = await iterator.next();
    const second = await iterator.next();
    const result = [first.value[0], second.value[0]];
    const expected = [
        ['next'],
        ['prev'],
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('listen: when shown: ignores the action while the menu is hidden', async (t) => {
    const handlers = [];
    const overrides = {
        isShown: () => false,
        addEventListener: (event, fn) => handlers.push(fn),
        removeEventListener: stub(),
    };
    
    const actions = [{
        keys: ['j'],
        commands: ['j'],
        when: 'shown',
        operations: ['next'],
    }, {
        keys: ['k'],
        commands: ['k'],
        operations: ['prev'],
    }];
    
    const iterator = listen(actions, overrides)[Symbol.asyncIterator]();
    const [j, k] = handlers;
    
    j({
        key: 'j',
    });
    k({
        key: 'k',
    });
    
    const {value} = await iterator.next();
    
    t.deepEqual(value[0], ['prev']);
    t.end();
});
