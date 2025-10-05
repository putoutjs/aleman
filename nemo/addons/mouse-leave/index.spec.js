import {createTest} from '#test';
import {createMouseEnter} from './index.js';
import {rules} from '../../rules/index.js';
import {createState} from '../../state/state.js';

const noop = () => {};
const addon = createMouseEnter('menu');

const menu = {
    View: noop,
    Edit: noop,
};

const test = createTest(import.meta.url, addon, {
    rules,
    options: {
        menu,
    },
    state: createState({
        name: 'menu',
        menu,
    }),
});

test('aleman: menu: addons: mouseenter: wrong event', (t) => {
    t.noReportOnRender('unselect-all', {
        state: {
            index: 0,
            command: 'show',
        },
        event: {
            type: 'keydown',
        },
    });
    t.end();
});

test('aleman: menu: addons: mouseenter: command: hide', (t) => {
    t.render('mouse-enter', {
        state: {
            index: 0,
            command: 'show',
        },
        event: {
            type: 'mouseleave',
        },
    });
    t.end();
});
