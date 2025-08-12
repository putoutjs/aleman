import {hideMenu, select} from './menu.js';

export const key = 'Escape';

export {filter} from './menu.js';

export const listener = ({render, element, state}) => {
    const index = -1;
    
    hideMenu({
        render,
        state,
    });
    
    select({
        render,
        index,
    });
};
