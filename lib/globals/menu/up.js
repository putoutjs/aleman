import {select} from './menu.js';

export const key = 'ArrowUp';

export {filter} from './menu.js';
export const listener = ({render, element}) => {
    let index = element.index ?? -1;
    
    if (index)
        --index;
    
    select({
        render,
        index,
    });
};
