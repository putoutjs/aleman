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
    
    let index = element.index || 0;
    const n = keys(menu).length - 1;
    
    if (key === DOWN && index < n)
        ++index;
    
    if (key === UP && index)
        --index;
    
    if (key === ENTER) {
        const fn = values(menu)[index];
        fn();
        index = 0;
        hideMenu({
            render,
            state,
        });
    }
    
    if (key === ESCAPE) {
        index = 0;
        hideMenu({
            render,
            state,
        });
    }
    
    if (key === F9) {
        index = 0;
        showMenu({
            render,
            state,
        });
    }
    
    render('select-next', {
        index,
    });
};

function hideMenu({render, state}) {
    render('menu', {
        command: 'hide',
    });
    
    state['menu-toggler'].command = 'hide';
}

function showMenu({render, state}) {
    render(['build-menu', 'menu'], {
        command: 'show',
        menu,
    });
    
    state['menu-toggler'].command = 'show';
}
