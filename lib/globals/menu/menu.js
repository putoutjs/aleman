import {menu} from '../../menu/menu.js';

export const filter = ({state}) => {
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
    state['menu-toggler'].command = 'hide';
    render(['menu', 'unselect-all'], {
        index: -1,
        command: 'hide',
    });
}

export function showMenu({render, state, left, top}) {
    state['menu-toggler'].command = 'show';
    render(['build-menu', 'menu'], {
        command: 'show',
        menu,
        left,
        top,
    });
}
