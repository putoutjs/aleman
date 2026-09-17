import {setTimeout as delay} from 'node:timers/promises';
import {test} from 'supertape';
import {
    createItemClick,
    run,
    runByIndex,
} from './item-click.js';
import {enter} from './enter.js';

for (const [name, element] of [['label', {dataset: {menuPath: 'hello'}}], ['item', {dataset: {}, querySelector: () => ({dataset: {menuPath: 'hello'}})}], ['empty item', {dataset: {}, querySelector: () => null}]]) {
    test(`menos: item click filter: ${name}`, (t) => {
        const original = globalThis.document;
        const points = [];
        
        globalThis.document = {
            elementFromPoint: (x, y) => {
                points.push([x, y]);
                return element;
            },
        };
        let accepted;
        
        try {
            accepted = createItemClick('menu').filter({
                event: {
                    clientX: 10,
                    clientY: 20,
                },
                options: {
                    menu: {hello() {},
                    },
                },
            });
        } finally {
            globalThis.document = original;
        }
        const result = {
            accepted,
            points,
        };
        const expected = {
            accepted: name !== 'empty item',
            points: [
                [10, 20],
            ],
        };
        
        t.deepEqual(result, expected);
        t.end();
    });
}

test('menos: run: schedules callback and hides', async (t) => {
    const calls = [];
    const result = run({show: true, index: 0}, {
        menu: {
            hello: () => calls.push('hello'),
        },
        getMenuPath: () => 'hello',
    }, {});
    
    await delay(10);
    const expected = {
        result: {
            show: false,
            index: 0,
            command: 'hide',
        },
        calls: ['hello'],
    };
    
    t.deepEqual({result, calls}, expected);
    t.end();
});

for (const [name, index, insideSubmenu, submenuIndex, expectedCalls] of [
    [
        'leaf',
        0,
        false,
        -1,
        ['hello'],
    ],
    [
        'child',
        1,
        true,
        0,
        ['file'],
    ],
    [
        'parent',
        1,
        false,
        -1,
        [],
    ],
    [
        'no selection',
        -1,
        false,
        -1,
        [],
    ],
    [
        'no child selection',
        1,
        true,
        -1,
        [],
    ],
]) {
    test(`menos: runByIndex: ${name}`, async (t) => {
        const calls = [];
        const state = {
            show: true,
            index,
            insideSubmenu,
            submenuIndex,
        };
        
        const result = runByIndex(state, {
            menu: {
                hello: () => calls.push('hello'),
                new: {
                    file: () => calls.push('file'),
                },
            },
        });
        
        await delay(10);
        const expected = expectedCalls.length ? {
            ...state,
            show: false,
            command: 'hide',
        } : state;
        
        t.deepEqual({result, calls}, {
            result: expected,
            calls: expectedCalls,
        });
        t.end();
    });
}

test('menos: enter delegates to keyboard callback', async (t) => {
    const calls = [];
    const result = enter({
        state: {
            show: true,
            index: 0,
        },
        options: {
            menu: {
                hello: () => calls.push('hello'),
            },
        },
    });
    
    await delay(10);
    const expected = {
        result: {
            show: false,
            index: 0,
            command: 'hide',
        },
        calls: ['hello'],
    };
    
    t.deepEqual({result, calls}, expected);
    t.end();
});
