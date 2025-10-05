import {test} from 'supertape';
import {calculate} from './calculate.js';

test('aleman: menu: addons: set-position: iphone', (t) => {
    const event = {
        clientX: 128,
        clientY: 238,
    };
    
    const sizes = {
        heightMenu: 425,
        widthMenu: 667,
        innerHeight: 375,
        innerWidth: 233,
    };
    
    const result = calculate(event, sizes);
    
    const expected = {
        x: 0,
        y: -14,
    };
    
    t.deepEqual(result, expected);
    t.end();
});
