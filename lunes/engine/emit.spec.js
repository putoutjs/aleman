import {test, stub} from 'supertape';
import {emitBefore} from './emit.js';

test('lunes: emitBefore: no keys, no commands', (t) => {
    const parseVim = stub().returns(['', 2]);
    
    const result = emitBefore({}, {
        event: {
            key: 'j',
        },
        parseVim,
    });
    
    const expected = [true, 2];
    
    t.deepEqual(result, expected);
    t.end();
});

test('lunes: emitBefore: key is not listed', (t) => {
    const parseVim = stub().returns(['']);
    
    const result = emitBefore({
        keys: ['k'],
    }, {
        event: {
            key: 'j',
        },
        parseVim,
    });
    
    const expected = [false];
    
    t.deepEqual(result, expected);
    t.end();
});

test('lunes: emitBefore: command is not listed', (t) => {
    const parseVim = stub().returns(['j']);
    
    const result = emitBefore({
        commands: ['k'],
    }, {
        event: {
            key: 'j',
        },
        parseVim,
    });
    
    const expected = [false];
    
    t.deepEqual(result, expected);
    t.end();
});

test('lunes: emitBefore: key and command are listed', (t) => {
    const parseVim = stub().returns(['j', 3]);
    
    const result = emitBefore({
        keys: ['j'],
        commands: ['j'],
    }, {
        event: {
            key: 'j',
        },
        parseVim,
    });
    
    const expected = [true, 3];
    
    t.deepEqual(result, expected);
    t.end();
});
