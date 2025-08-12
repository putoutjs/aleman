import {menu} from '../menu/menu.js';

export const filter = ({event, state}) => {
    const {command} = state['menu-toggler'];
    return command !== 'hide';
};

export const select = ({render, index}) => {
    render('unselect', {
        index: index - 1,
    });
    
    render('select', {
        index,
    });
};

export function hideMenu({render, state}) {
    render('menu', {
        command: 'hide',
    });
    
    state['menu-toggler'].command = 'hide';
}

export function showMenu({render, state}) {
    render(['build-menu', 'menu'], {
        command: 'show',
        menu,
    });
    
    state['menu-toggler'].command = 'show';
}
