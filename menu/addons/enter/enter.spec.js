import {setTimeout} from 'node:timers/promises';
import {stub} from 'supertape';
import {createTest} from '#test';
import {filter, listener} from './enter.js';
import * as addon from '../escape/escape.js';
import {rules} from '../../rules/index.js';
import {initState} from '../../state.js';

const noop = () => {};

const test = createTest(import.meta.url, addon, {
    rules,
    options: {
        menu: {
            Upload: noop,
            New: {
                File: noop,
                Directory: noop,
            },
        },
    },
    state: initState({
        name: 'menu',
    }),
});

test('aleman: menu: enter: run', (t) => {
    t.render('enter', {
        state: {
            index: 1,
        },
    });
    t.end();
});

test('aleman: menu: enter: filter: no', (t) => {
    const result = filter({
        state: {
            command: 'hide',
        },
    });
    
    t.notOk(result);
    t.end();
});

test('aleman: menu: enter: listener: submenu name', (t) => {
    const state = {
        index: 0,
        submenuIndex: -1,
    };
    
    const result = listener({
        state,
        options: {
            menu: {
                hello: {
                    world: noop,
                },
            },
        },
    });
    
    const expected = {
        insideSubmenu: true,
        showSubmenu: true,
        submenuIndex: 0,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('aleman: menu: enter: listener: run', async (t) => {
    const state = {
        index: 0,
        submenuIndex: 0,
    };
    
    const fn = stub();
    
    listener({
        state,
        options: {
            menu: {
                hello: fn,
            },
        },
    });
    
    await setTimeout(0);
    
    t.calledWithNoArgs(fn);
    t.end();
});

test('aleman: menu: enter: listener: options: beforeHide', (t) => {
    const beforeHide = stub();
    const state = {
        index: 0,
        submenuIndex: 0,
    };
    
    const fn = stub();
    
    listener({
        state,
        options: {
            beforeHide,
            menu: {
                hello: fn,
            },
        },
    });
    
    t.calledWith(beforeHide, [state]);
    t.end();
});

