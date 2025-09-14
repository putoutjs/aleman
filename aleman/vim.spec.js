import {test} from 'supertape';
import {createVimParser} from './vim.js';

test('vim: g', (t) => {
    const parseVim = createVimParser();
    const [command] = parseVim({
        key: 'g',
    });
    
    const expected = '';
    
    t.equal(command, expected);
    t.end();
});

test('vim: j', (t) => {
    const parseVim = createVimParser();
    const [command] = parseVim({
        key: 'j',
    });
    
    const expected = 'j';
    
    t.equal(command, expected);
    t.end();
});

test('vim: k', (t) => {
    const parseVim = createVimParser();
    const [command] = parseVim({
        key: 'k',
    });
    
    const expected = 'k';
    
    t.equal(command, expected);
    t.end();
});

test('vim: 6j', (t) => {
    const parseVim = createVimParser();
    
    parseVim({
        key: '6',
    });
    
    const result = parseVim({
        key: 'j',
    });
    
    const expected = ['j', 6];
    
    t.deepEqual(result, expected);
    t.end();
});

test('vim: gg', (t) => {
    const parseVim = createVimParser();
    
    parseVim({
        key: 'g',
    });
    const [command] = parseVim({
        key: 'g',
    });
    
    const expected = 'gg';
    
    t.equal(command, expected);
    t.end();
});

test('vim: x', (t) => {
    const parseVim = createVimParser();
    const [command] = parseVim({
        key: 'x',
    });
    
    const expected = '';
    
    t.equal(command, expected);
    t.end();
});

