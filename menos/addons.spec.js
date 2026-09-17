import {test} from 'supertape';
import {createVimParser} from '../aleman/vim.js';
import {createAddons} from './addons.js';
import {contextMenu} from './context-menu.js';
import * as down from './down.js';
import * as up from './up.js';
import * as gg from './gg.js';
import {filter as enterFilter} from './enter.js';

for (const [name, addon, key, sequence] of [[
    'down',
    down,
    'ArrowDown',
    ['j'],
], [
    'up',
    up,
    'ArrowUp',
    ['k'],
], [
    'gg',
    gg,
    '^',
    ['g', 'g'],
]]) {
    test(`menos: ${name}: direct key`, (t) => {
        const result = addon.filter({
            event: {
                key,
            },
        });
        
        t.ok(result);
        t.end();
    });
    
    test(`menos: ${name}: vim sequence`, (t) => {
        const vim = createVimParser();
        const result = [];
        
        for (const key of sequence) {
            result.push(addon.filter({
                event: {
                    key,
                },
                vim,
            }));
        }
        
        const expected = sequence.map((key, index) => index === sequence.length - 1);
        
        t.deepEqual(result, expected);
        t.end();
    });
    
    test(`menos: ${name}: unrelated vim key`, (t) => {
        const result = addon.filter({
            event: {
                key: 'z',
            },
            vim: createVimParser(),
        });
        
        t.notOk(result);
        t.end();
    });
}

for (const [name, state, expected] of [
    ['submenu child', {insideSubmenu: true}, true],
    ['leaf', {items: [{}], index: 0}, true],
    ['submenu parent', {items: [{submenu: {}}], index: 0}, false],
    ['no selection', {items: [], index: -1}, false],
]) {
    test(`menos: enter filter: ${name}`, (t) => {
        const result = Boolean(enterFilter({
            state,
        }));
        
        t.equal(result, expected);
        t.end();
    });
}

for (const [name, show, inside, expected] of [[
    'outside',
    true,
    false,
    true,
], [
    'inside',
    true,
    true,
    false,
], [
    'hidden',
    false,
    false,
    false,
]]) {
    test(`menos: outside click filter: ${name}`, (t) => {
        const [addon] = createAddons('menu');
        const event = {
            target: {
                closest: () => inside,
            },
        };
        const result = addon.filter({
            event,
            state: {
                show,
            },
        });
        
        t.equal(result, expected);
        t.end();
    });
}

for (const [name, beforeShow, show] of [['no hook', undefined, true], ['allowed', () => true, true], ['vetoed', () => false, false]]) {
    test(`menos: context menu: ${name}`, (t) => {
        const result = contextMenu({
            event: {
                clientX: 40,
                clientY: 80,
            },
            state: {
                index: 2,
            },
            options: {
                beforeShow,
            },
        });
        
        const expected = {
            index: 2,
            command: show ? 'show' : 'hide',
            show,
            x: 40,
            y: 66,
        };
        
        t.deepEqual(result, expected);
        t.end();
    });
}

test('menos: context menu: hook receives coordinates and current state', (t) => {
    const calls = [];
    const push = calls.push.bind(calls);
    
    contextMenu({
        event: {
            clientX: 40,
            clientY: 80,
        },
        state: {
            index: 2,
        },
        options: {
            beforeShow: push,
        },
    });
    const result = calls;
    const expected = [{
        index: 2,
        x: 40,
        y: 80,
    }];
    
    t.deepEqual(result, expected);
    t.end();
});
