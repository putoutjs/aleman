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

const position = {
    left: 1,
    top: 2,
};

test('lunes: render: icon: item gets icon classes', (t) => {
    const result = render(`['on', 'no-cursor', {view}];`, {
        position,
        icon: true,
    });
    
    t.match(result, 'class="menu-item icon icon-view"');
    t.end();
});

test('lunes: render: icon: name with spaces and parens', (t) => {
    const result = render(`['on', 'no-cursor', {'Upload To Cloud': null, '(Un)Select All': null}];`, {
        position,
        icon: true,
    });
    
    t.match(result, 'icon-upload-to-cloud');
    t.end();
});

test('lunes: render: icon: name with parens drops the parens', (t) => {
    const result = render(`['on', 'no-cursor', {'(Un)Select All': null}];`, {
        position,
        icon: true,
    });
    
    t.match(result, 'icon-unselect-all');
    t.end();
});

test('lunes: render: icon: selected item keeps both classes', (t) => {
    const result = render(`['on', 'no-cursor', {view: 'cursor'}];`, {
        position,
        icon: true,
    });
    
    t.match(result, 'class="menu-item icon icon-view menu-item-selected"');
    t.end();
});

test('lunes: render: icon: submenu and its items', (t) => {
    const result = render(`['on', 'no-cursor', {New: ['on', {File: null}]}];`, {
        position,
        icon: true,
    });
    
    t.match(result, 'class="menu-item icon icon-new menu-submenu menu-item-selected menu-submenu-show"');
    t.end();
});

test('lunes: render: icon: submenu item', (t) => {
    const result = render(`['on', 'no-cursor', {New: ['on', {File: null}]}];`, {
        position,
        icon: true,
    });
    
    t.match(result, 'class="menu-item icon icon-file"');
    t.end();
});

test('lunes: render: no icon option: no icon classes', (t) => {
    const result = render(`['on', 'no-cursor', {view}];`, {
        position,
    });
    
    t.notMatch(result, 'icon');
    t.end();
});

test('lunes: render: the parent of the opened submenu is selected', (t) => {
    const result = render(`['on', 'no-cursor', {New: ['on', {File: 'cursor'}]}];`, {
        position,
    });
    
    t.match(result, 'class="menu-item menu-submenu menu-item-selected menu-submenu-show"');
    t.end();
});

test('lunes: render: the parent of the opened submenu is selected: with icon', (t) => {
    const result = render(`['on', 'no-cursor', {New: ['on', {File: 'cursor'}]}];`, {
        position,
        icon: true,
    });
    
    t.match(result, 'class="menu-item icon icon-new menu-submenu menu-item-selected menu-submenu-show"');
    t.end();
});

test('lunes: render: the parent of the closed submenu is not selected', (t) => {
    const result = render(`['on', 'no-cursor', {New: ['off', {File: null}], view: 'cursor'}];`, {
        position,
    });
    
    t.match(result, 'class="menu-item menu-submenu"');
    t.end();
});

test('lunes: render: the parent with the cursor and the closed submenu is selected', (t) => {
    const result = render(`['on', 'no-cursor', {New: ['off', 'cursor', {File: null}]}];`, {
        position,
    });
    
    t.match(result, 'class="menu-item menu-submenu menu-item-selected"');
    t.end();
});
