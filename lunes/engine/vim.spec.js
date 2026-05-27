import {test} from 'supertape';
import {createVimParser} from './vim.js';

test('lunes: vim: g', (t) => {
    const parseVim = createVimParser();
    const [command] = parseVim({
        key: 'g',
    });
    
    const expected = '';
    
    t.equal(command, expected);
    t.end();
});

test('lunes: vim: j', (t) => {
    const parseVim = createVimParser();
    const [command] = parseVim({
        key: 'j',
    });
    
    const expected = 'j';
    
    t.equal(command, expected);
    t.end();
});

test('lunes: vim: k', (t) => {
    const parseVim = createVimParser();
    const [command] = parseVim({
        key: 'k',
    });
    
    const expected = 'k';
    
    t.equal(command, expected);
    t.end();
});

test('lunes: vim: 6j', (t) => {
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

test('lunes: vim: gg', (t) => {
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

test('lunes: vim: x', (t) => {
    const parseVim = createVimParser();
    const [command] = parseVim({
        key: 'x',
    });
    
    const expected = '';
    
    t.equal(command, expected);
    t.end();
});

test('lunes: vim: $', (t) => {
    const parseVim = createVimParser();
    const [command] = parseVim({
        key: '$',
    });
    
    const expected = '$';
    
    t.equal(command, expected);
    t.end();
});

test('lunes: vim: ^', (t) => {
    const parseVim = createVimParser();
    const [command] = parseVim({
        key: '^',
    });
    
    const expected = '^';
    
    t.equal(command, expected);
    t.end();
});

test('lunes: vim: F9 j', (t) => {
    const parseVim = createVimParser();
    
    parseVim({
        key: 'F9',
    });
    const [command] = parseVim({
        key: 'j',
    });
    
    const expected = 'j';
    
    t.equal(command, expected);
    t.end();
});
