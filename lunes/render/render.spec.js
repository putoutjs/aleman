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

test('lunes: render: label with spaces and parens', (t) => {
    const result = render(`['on', 'no-cursor', {'Upload To Cloud': null, '(Un)Select All': null}];`, {
        position: {
            left: 1,
            top: 2,
        },
    });
    
    t.match(result, '<label data-menu-path="Upload To Cloud">Upload To Cloud</label>');
    t.end();
});

test('lunes: render: label with markup characters is escaped', (t) => {
    const result = render(`['on', 'no-cursor', {'A & <B> {c} "q"': null}];`, {
        position: {
            left: 1,
            top: 2,
        },
    });
    
    t.match(result, '>A &amp; &lt;B&gt; &#123;c&#125; "q"</label>');
    t.end();
});

test('lunes: render: submenu label with spaces', (t) => {
    const result = render(`['on', 'no-cursor', {'New Items': ['off', {'File Name': null}]}];`, {
        position: {
            left: 1,
            top: 2,
        },
    });
    
    t.match(result, '<label data-menu-path="New Items.File Name">File Name</label>');
    t.end();
});
