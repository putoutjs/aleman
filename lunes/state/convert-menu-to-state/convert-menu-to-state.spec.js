import {test} from 'supertape';
import {parse, print} from 'putout';
import {montag} from 'montag';
import {convertMenuToState} from './convert-menu-to-state.js';

const noop = () => {};

test('lunes: state: convert-menu-to-state', (t) => {
    const menu = {
        view: () => alert('x'),
        edit: () => alert('y'),
        new: {
            file: () => alert('file'),
            directory: () => alert('directory'),
        },
    };
    
    const state = convertMenuToState(menu);
    const ast = parse(state);
    const result = print(ast);
    
    const expected = montag`
        ['off', 'no-cursor', {
            view,
            edit,
            new: ['off', {
                file,
                directory,
            }],
        }];\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('lunes: state: convert-menu-to-state: labels with spaces and quotes', (t) => {
    const menu = {
        'Upload To Cloud': noop,
        '(Un)Select All': noop,
        "It's": noop,
        'a\\b': noop,
        'New Items': {
            'File Name': noop,
        },
    };
    
    const state = convertMenuToState(menu);
    const {body} = parse(state).program;
    const [
        first,
        second,
        third,
        fourth,
        fifth,
    ] = body[0].expression.elements[2].properties;
    const result = [
        first.key.value,
        second.key.value,
        third.key.value,
        fourth.key.value,
        fifth.key.value,
    ];
    const expected = [
        'Upload To Cloud',
        '(Un)Select All',
        `It's`,
        'a\\b',
        'New Items',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});
