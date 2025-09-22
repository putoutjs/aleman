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

test('aleman: menu: item-click: listener', (t) => {
    const {filter} = createItemClick('hi');
    const getMenuPath = stub().returns('hello');
    const result = filter({
        options: {
            getMenuPath,
            menu: {
                hello: {
                    world: 'world',
                },
            },
        },
    });
    
    t.notOk(result);
    t.end();
});
