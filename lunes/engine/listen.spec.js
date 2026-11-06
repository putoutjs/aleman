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

const createListen = (actions, overrides = {}) => {
    const handlers = [];
    const iterator = listen(actions, {
        addEventListener: (event, fn) => handlers.push({
            event,
            fn,
        }),
        removeEventListener: stub(),
        ...overrides,
    })[Symbol.asyncIterator]();
    
    return {
        handlers,
        iterator,
    };
};

test('listen: events of an action', (t) => {
    const {handlers} = createListen([{
        events: ['click', 'contextmenu'],
        operations: ['show'],
    }]);
    
    const result = [];
    
    for (const {event} of handlers) {
        result.push(event);
    }
    
    const expected = [
        'click',
        'contextmenu',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('listen: actions as a namespace', (t) => {
    const {handlers} = createListen({
        down: {
            default: {
                keys: ['ArrowDown'],
                operations: ['next'],
            },
        },
    });
    
    t.equal(handlers.length, 1);
    t.end();
});

test('listen: key is not listed: nothing is queued', async (t) => {
    const {handlers, iterator} = createListen([{
        keys: ['ArrowDown'],
        operations: ['next'],
    }]);
    
    handlers[0].fn({
        key: 'x',
        preventDefault: stub(),
    });
    
    const result = await Promise.race([
        iterator.next(),
        new Promise((resolve) => setTimeout(resolve, 10, 'nothing')),
    ]);
    
    t.equal(result, 'nothing');
    t.end();
});

test('listen: stopPropagation', (t) => {
    const stopPropagation = stub();
    const {handlers} = createListen([{
        keys: ['ArrowDown'],
        stopPropagation: true,
        operations: ['next'],
    }]);
    
    handlers[0].fn({
        key: 'ArrowDown',
        stopPropagation,
    });
    
    t.calledCount(stopPropagation, 1);
    t.end();
});

test('listen: default isShown: action with when shown is accepted', async (t) => {
    const addEventListener = (event, fn) => {
        fn({
            key: 'ArrowDown',
        });
    };
    
    const iterator = listen([{
        keys: ['ArrowDown'],
        when: 'shown',
        operations: ['next'],
    }], {
        addEventListener,
        removeEventListener: stub(),
    })[Symbol.asyncIterator]();
    
    const {value} = await iterator.next();
    
    t.deepEqual(value[0], ['next']);
    t.end();
});

test('listen: return resolves the pending next as done', async (t) => {
    const {iterator} = createListen([{
        keys: ['ArrowDown'],
        operations: ['next'],
    }]);
    
    const pending = iterator.next();
    
    await iterator.return();
    
    const {done} = await pending;
    
    t.ok(done);
    t.end();
});

test('listen: scoped: event outside of the target is ignored', (t) => {
    const preventDefault = stub();
    const {handlers} = createListen([{
        scoped: true,
        preventDefault: true,
        events: ['contextmenu'],
        operations: ['show'],
    }], {
        isTarget: () => false,
    });
    
    handlers[0].fn({
        preventDefault,
    });
    
    t.notOk(preventDefault.called);
    t.end();
});

test('listen: scoped: event inside of the target is emitted', async (t) => {
    const preventDefault = stub();
    const {handlers, iterator} = createListen([{
        scoped: true,
        preventDefault: true,
        events: ['contextmenu'],
        operations: ['show'],
    }], {
        isTarget: () => true,
    });
    
    handlers[0].fn({
        preventDefault,
    });
    
    const {value} = await iterator.next();
    const result = [value[0], preventDefault.called];
    const expected = [
        ['show'],
        true,
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('listen: scoped: without isTarget every event is emitted', async (t) => {
    const {handlers, iterator} = createListen([{
        scoped: true,
        events: ['contextmenu'],
        operations: ['show'],
    }]);
    
    handlers[0].fn({});
    
    const {value} = await iterator.next();
    
    t.deepEqual(value[0], ['show']);
    t.end();
});
