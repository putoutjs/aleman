import {menu} from '../menu/menu.js';

const {keys, values} = Object;
const UP = 'ArrowUp';
const DOWN = 'ArrowDown';
const ENTER = 'Enter';
const ESCAPE = 'Escape';
const F9 = 'F9';

const KEYS = [
    UP,
    DOWN,
    ENTER,
    ESCAPE,
];

export const events = ['keydown'];

export const filter = ({event, state}) => {
    const {key} = event;
    const {command} = state['menu-toggler'];
    
    if (key === F9 && command !== 'show')
        return true;
    
    if (!KEYS.includes(key))
        return false;
    
    return command !== 'hide';
};

export const listener = ({event, render, element, state}) => {
    const {key} = event;
    
    let index = element.index ?? -1;
    const n = keys(menu).length - 1;
    
    if (key === DOWN && index < n)
        ++index;
    
    if (key === UP && index)
        --index;
    
    if (key === ENTER) {
        run({
            index,
            render,
            state,
        });
        index = -1;
    }
    
    if (key === ESCAPE) {
        index = -1;
        hideMenu({
            render,
            state,
        });
    }
    
    if (key === F9) {
        index = -1;
        showMenu({
            render,
            state,
        });
    }
    
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

function run({index, render, state}) {
    const fn = values(menu)[index];
    fn();
    hideMenu({
        render,
        state,
    });
}
