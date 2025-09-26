import {setTimeout} from 'node:timers/promises';
import {stub} from 'supertape';
import {createTest} from '#test';
import {createItemClick} from './item-click.js';
import {rules} from '../../rules/index.js';
import {initState} from '../../state.js';

const noop = () => {};
const addon = createItemClick('menu');

const test = createTest(import.meta.url, addon, {
    rules,
    options: {
        menu: {
            View: noop,
            Edit: noop,
            Upload: {
                drive: noop,
            },
        },
    },
    state: initState({
        name: 'menu',
    }),
});

test('aleman: menu: addons: item-click: no click', (t) => {
    const getMenuPath = stub().returns('Upload');
    
    t.noReportOnRender('no-click', {
        event: 'keydown',
        options: {
            getMenuPath,
        },
    });
    t.end();
});

test('aleman: menu: addons: item-click: not-fn', (t) => {
    const getMenuPath = stub().returns('Upload');
    
    t.noReportOnRender('not-fn', {
        event: 'click',
        options: {
            getMenuPath,
        },
        state: {
            index: 2,
        },
    });
    t.end();
});

test('aleman: menu: addons: item-click: hide', (t) => {
    const getMenuPath = stub().returns('Edit');
    
    t.render('item-click', {
        event: 'click',
        options: {
            getMenuPath,
        },
        state: {
            index: 1,
        },
    });
    t.end();
});

test('aleman: menu: addons: item-click: beforeHide', (t) => {
    const getMenuPath = stub().returns('Edit');
    const beforeHide = stub();
    const args = [{
        command: 'show',
        index: 1,
        insideSubmenu: false,
        name: 'menu',
        position: {
            x: 0,
            y: 20,
        },
        showSubmenu: false,
        submenuIndex: 0,
    }];
    
    t.render('item-click', {
        event: 'click',
        options: {
            beforeHide,
            getMenuPath,
        },
        state: {
            index: 1,
            command: 'show',
        },
    });
    
    t.calledWith(beforeHide, args);
    t.end();
}, {
    checkAssertionsCount: false,
});

test('aleman: menu: addons: item-click: run', async (t) => {
    const getMenuPath = stub().returns('View');
    const View = stub();
    
    t.render('run', {
        event: 'click',
        options: {
            getMenuPath,
            menu: {
                View,
            },
        },
        state: {
            index: 0,
            command: 'show',
        },
    });
    await setTimeout(1000);
    t.calledWithNoArgs(View);
    t.end();
}, {
    checkAssertionsCount: false,
});
