import {test} from 'supertape';
import {getCursor, getCursorPath} from './getter.js';

test('lunes: getter: getCursorPath: no cursor', (t) => {
    const result = getCursorPath(`['on', 'no-cursor', {view}];`);
    
    t.equal(result, '');
    t.end();
});

test('lunes: getter: getCursor: nested', (t) => {
    const state = `['on', {new: ['on', 'cursor', {file, directory}]}];`;
    const result = getCursor(state);
    const expected = 'new';
    
    t.equal(result, expected);
    t.end();
});
