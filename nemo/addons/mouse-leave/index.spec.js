import {test} from 'supertape';
import {createMouseEnter} from './index.js';
import {createState, updateState} from '../../state/state.js';
import {emit} from '../../../aleman/emit.js';
import {createVimParser} from '../../../aleman/vim.js';

const noop = () => {};
const menu = {View: noop, New: {File: noop}};
const addon = createMouseEnter('menu');

for (const type of ['keydown', 'mouseleave']) {
    test(`nemo: mouse-leave: ${type}`, (t) => {
        const state = createState({menu});
        updateState('down', state, {count: 2});
        updateState('right', state);
        const expected = type === 'mouseleave' ? createState({menu}) : structuredClone(state);
        const result = emit(addon, {
            state,
            options: {},
            event: {type},
            parseVim: createVimParser(),
        });
        
        t.deepEqual(result, expected);
        t.end();
    });
}
