import {stub, test} from 'supertape';
import {createLoop} from './engine.js';

test('lunes: engine: createLoop: adds listeners before the first tick', (t) => {
    const addEventListener = stub();
    
    createLoop(null, {
        actions: [{
            keys: ['j'],
            operations: ['next'],
        }],
        compile: stub(),
        overrides: {
            addEventListener,
            removeEventListener: stub(),
        },
    });
    
    t.calledCount(addEventListener, 1);
    t.end();
});

test('lunes: engine: createLoop: compiles the operations of an event', async (t) => {
    let fn;
    const compile = stub();
    
    createLoop(null, {
        actions: [{
            keys: ['j'],
            commands: ['j'],
            operations: ['next'],
        }],
        compile,
        overrides: {
            addEventListener: (event, f) => {
                fn = f;
            },
            removeEventListener: stub(),
        },
    });
    
    const event = {
        key: 'j',
    };
    
    fn(event);
    
    await new Promise(setTimeout);
    
    const args = ['next', {
        count: 1,
        position: {},
        event,
    }];
    
    t.calledWith(compile, args);
    t.end();
});

test('lunes: engine: createLoop: returns stop that removes the listeners', async (t) => {
    const removeEventListener = stub();
    
    const stop = createLoop(null, {
        actions: [{
            keys: ['j'],
            operations: ['next'],
        }],
        compile: stub(),
        overrides: {
            addEventListener: stub(),
            removeEventListener,
        },
    });
    
    await stop();
    await new Promise((resolve) => setTimeout(resolve, 0));
    
    t.calledCount(removeEventListener, 1);
    t.end();
});
