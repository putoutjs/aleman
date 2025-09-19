import {test} from 'supertape';
import {operator} from 'putout';
import {createRender} from './render.js';

const {
    hasTagName,
    addAttribute,
    setAttributeValue,
    remove,
} = operator;

test('aleman: render: skip', (t) => {
    const html = '<div class="hello"></div>';
    const render = createRender(html, {
        type: 'html',
        rules: {},
        state: {
            index: 1,
        },
    });
    
    const state = {
        index: 2,
    };
    
    const [result] = render(state);
    
    t.notOk(result);
    t.end();
});

test('aleman: render', (t) => {
    const html = '<div class="hello"></div>';
    const addDataName = {
        report: () => '',
        include: () => ['JSXElement'],
        fix: (path) => remove(path),
    };
    
    const render = createRender(html, {
        type: 'html',
        rules: {
            addDataName,
        },
    });
    
    const [result] = render();
    
    t.ok(result);
    t.end();
});

test('aleman: render: state', (t) => {
    const html = '<div class="hello"></div>';
    const addDataName = {
        report: () => '',
        include: () => ['JSXElement'],
        filter: (path) => hasTagName(path, 'div'),
        fix: (path, {options}) => {
            const {name} = options;
            setAttributeValue(path, 'data-name', name);
        },
    };
    
    const render = createRender(html, {
        type: 'html',
        rules: {
            addDataName,
        },
    });
    
    const [, result] = render({
        name: 'world',
    });
    
    const expected = '<div class="hello" data-name="world"></div>';
    
    t.equal(result, expected);
    t.end();
});
