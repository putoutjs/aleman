import {test} from 'supertape';
import {render} from './render.js';
import {rules} from './rules/index.js';

test('lunes: render: builds ul from the state', (t) => {
    const result = render(`['on', 'no-cursor', {view}];`, {
        position: {
            left: 1,
            top: 2,
        },
    });
    
    t.match(result, 'left: 1px; top: 2px');
    t.end();
});

test('lunes: render: rules', (t) => {
    const result = typeof rules['build-menu'].fix;
    const expected = 'function';
    
    t.equal(result, expected);
    t.end();
});
