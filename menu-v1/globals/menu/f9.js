import {select, showMenu} from './menu.js';

export const key = 'F9';

export const filter = ({state}) => {
    const {command} = state['menu-toggler'];
    return command !== 'show';
};

export const listener = ({render, state}) => {
    const index = -1;
    
    showMenu({
        render,
        state,
    });
    
    select({
        render,
        index,
    });
    
    render('set-position', {
        left: 0,
        top: 20,
    });
};
