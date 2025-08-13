import {menu} from '../../menu/menu.js';
import {hideMenu, select} from './menu.js';

const {values} = Object;

export const key = 'Enter';

export {filter} from './menu.js';

export const listener = ({render, element, state}) => {
    let index = element.index ?? -1;
    
    run({
        index,
        render,
        state,
    });
    index = -1;
    
    select({
        render,
        index,
    });
};

function run({index, render, state}) {
    const fn = values(menu)[index];
    fn();
    hideMenu({
        render,
        state,
    });
}
