import {test} from 'supertape';
import {createState, updateState} from '../../state/state.js';
import {createItemClick} from './item-click.js';

const noop = () => {};

const activate = () => {
    const menu = {hello: noop};
    const state = createState({menu});
    updateState('down', state);
    
    const {listener} = createItemClick('menu');
    return listener({
        event: {},
        state,
        options: {
            menu,
            getMenuPath: () => 'hello',
        },
    });
};

test('nemo: item-click: hides state', (t) => {
    const result = activate();
    
    t.equal(result.show, false);
    t.end();
});

test('nemo: item-click: clears selected items', (t) => {
    const result = activate();
    
    t.deepEqual(result.items, [{
        name: 'hello',
        path: 'hello',
        selected: false,
    }]);
    t.end();
});
