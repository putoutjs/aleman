import {stub} from 'supertape';
import {createTest} from '#test';
import * as addon from './escape.js';
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

test('aleman: menu: addons: escape: command: show', (t) => {
    t.render('escape', {
        state: {
            command: 'hide',
            index: 1,
        },
        command: 'Escape',
    });
    t.end();
});

test('aleman: menu: addons: escape', (t) => {
    const beforeHide = stub();
    const state = {
        command: 'hide',
        index: 1,
        insideSubmenu: false,
        name: 'menu',
        position: {
            x: 0,
            y: 20,
        },
        showSubmenu: false,
        submenuIndex: 0,
    };
    
    t.render('escape', {
        options: {
            beforeHide,
        },
        state: {
            command: 'hide',
            index: 1,
        },
        key: 'Escape',
    });
    
    t.calledWith(beforeHide, [state]);
    t.end();
}, {
    checkAssertionsCount: false,
});
