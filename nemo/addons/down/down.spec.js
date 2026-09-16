import {test} from 'supertape';
import {listener} from './down.js';
import {createState, updateState} from '../../state/state.js';

const noop = () => {};
const menu = {New: {File: noop, Directory: noop}};

for (const infiniteScroll of [false, true]) {
    test(`nemo: down: submenu: infiniteScroll ${infiniteScroll}`, (t) => {
        const state = createState({menu});
        updateState('down', state);
        updateState('right', state);
        const result = listener({state, options: {infiniteScroll}});
        
        t.deepEqual({
            index: result.index,
            submenuIndex: result.submenuIndex,
            selected: result.items[0].submenu.items.map(({selected}) => selected),
        }, {index: 0, submenuIndex: 1, selected: [false, true]});
        t.end();
    });
    
    test(`nemo: down: submenu end: infiniteScroll ${infiniteScroll}`, (t) => {
        const state = createState({menu});
        updateState('down', state);
        updateState('right', state);
        listener({state, options: {}});
        const result = listener({state, options: {infiniteScroll}});
        
        t.equal(result.submenuIndex, infiniteScroll ? 0 : 1);
        t.end();
    });
}

