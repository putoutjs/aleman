import {createTest} from '#test';
import * as addon from './k.js';
import {rules} from '../../rules/index.js';
import {initState} from '../../state.js';

const noop = () => {};
const test = createTest(import.meta.url, addon, {
    rules,
    options: {
        menu: {
            View: noop,
            Edit: noop,
        },
    },
    state: initState({
        name: 'menu',
    }),
});

test('aleman: menu: addons: k: no key k', (t) => {
    t.noReportOnRender('m', {
        event: {
            key: 'm',
        },
    });
    t.end();
});

test('aleman: menu: addons: k', (t) => {
    t.render('k', {
        state: {
            command: 'show',
            index: 1,
        },
        event: {
            key: 'k',
        },
    });
    t.end();
});
