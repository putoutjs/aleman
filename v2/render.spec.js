import {test} from 'supertape';
import {createRender} from './render.js';

const template = '<ul data-name="menu" class="menu menu-hidden"></ul>';

test('v2: render: re-exports createRender', (t) => {
    const render = createRender(template, {
        rules: {},
        options: {},
    });
    
    const result = typeof render;
    const expected = 'function';
    
    t.equal(result, expected);
    t.end();
});

test('v2: render: no rules: skips', (t) => {
    const render = createRender(template, {
        rules: {},
        options: {},
    });
    
    const [changed] = render({});
    
    t.notOk(changed);
    t.end();
});
