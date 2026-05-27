import {test} from 'supertape';
import {parse, print} from 'putout';
import {montag} from 'montag';
import {convertMenuToState} from './convert-menu-to-state.js';

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
