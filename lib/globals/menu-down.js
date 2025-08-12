import {menu} from '../menu/menu.js';
import {select} from './menu.js';
const {keys} = Object;

export const key = 'ArrowDown';

export {filter} from './menu.js';

export const listener = ({event, render, element}) => {
    let index = element.index ?? -1;
    const n = keys(menu).length - 1;
    
    if (index < n)
        ++index;
    
    select({
        render,
        index,
    });
};

