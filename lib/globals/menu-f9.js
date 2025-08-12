import {select, showMenu} from './menu.js';

export const key = 'F9';

export const filter = ({event, state}) => {
    const {command} = state['menu-toggler'];
    return command !== 'show';
};

export const listener = ({event, render, element, state}) => {
    const index = -1;
    showMenu({
        render,
        state,
    });
    
    select({
        render,
        index,
    });
};

