import {test, stub} from 'supertape';
import {createItemClick} from './item-click.js';

test('aleman: menu: item-click: listener', (t) => {
    const {filter} = createItemClick('hi');
    const getMenuPath = stub().returns('hello');
    const result = filter({
        getMenuPath,
        options: {
            menu: {
                hello: {
                    world: 'world',
                },
            },
        },
    });
    
    t.notOk(result);
    t.end();
});
