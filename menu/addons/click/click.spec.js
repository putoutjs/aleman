import {stub} from 'supertape';
import {createTest} from '#test';
import * as addon from './click.js';
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

test('aleman: menu: addons: click: no report: no fn', (t) => {
    const getMenuPath = stub().returns('New');
    
    t.noReportOnRender('not-fn', {
        state: {
            command: 'hide',
        },
        options: {
            getMenuPath,
        },
        event: 'click',
    });
    t.end();
});

test('aleman: menu: addons: click: no report: no menu path', (t) => {
    const getMenuPath = stub().returns('');
    
    t.render('click', {
        options: {
            getMenuPath,
        },
        event: 'click',
    });
    t.end();
});

test('aleman: menu: addons: click', (t) => {
    const getMenuPath = stub().returns('Upload');
    
    t.render('click', {
        options: {
            getMenuPath,
        },
        state: {
            command: 'show',
        },
        event: 'click',
    });
    t.end();
});

test('aleman: menu: addons: click: beforeHide', (t) => {
    const getMenuPath = stub().returns('Upload');
    const beforeHide = stub();
    const args = [{
        command: 'show',
        index: -1,
        insideSubmenu: false,
        name: 'menu',
        position: {
            x: 0,
            y: 20,
        },
        showSubmenu: false,
        submenuIndex: 0,
    }];
    
    t.render('click', {
        options: {
            getMenuPath,
            beforeHide,
        },
        state: {
            command: 'show',
        },
        event: 'click',
    });
    
    t.calledWith(beforeHide, args);
    t.end();
}, {
    checkAssertionsCount: false,
});

test('aleman: menu: addons: click: no report with options: no menu path: not show', (t) => {
    const getMenuPath = stub().returns('');
    const state = {
        command: 'hide',
    };
    
    const options = {
        getMenuPath,
    };
    
    const event = 'click';
    
    const result = addon.filter({
        state,
        options,
        event,
    });
    
    t.notOk(result);
    t.end();
});
